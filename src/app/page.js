'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    person1: { name: '', age: '', hobby: '', personality: '' },
    person2: { name: '', age: '', hobby: '', personality: '' }
  });
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('matchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 保存历史记录
  const saveToHistory = (matchResult) => {
    const newHistory = [{
      date: new Date().toLocaleString(),
      persons: {
        person1: formData.person1,
        person2: formData.person2
      },
      result: matchResult
    }, ...history].slice(0, 10); // 只保留最近10条记录

    setHistory(newHistory);
    localStorage.setItem('matchHistory', JSON.stringify(newHistory));
  };

  const handleChange = (person, field, value) => {
    setFormData(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: value
      }
    }));
  };

  const handleReset = () => {
    setFormData({
      person1: { name: '', age: '', hobby: '', personality: '' },
      person2: { name: '', age: '', hobby: '', personality: '' }
    });
    setResult(null);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 100;
    let analysis = [];
    
    // 年龄差异分析
    const ageDiff = Math.abs(Number(formData.person1.age) - Number(formData.person2.age));
    score -= ageDiff * 2;
    analysis.push({
      factor: "年龄差异",
      impact: ageDiff <= 3 ? "非常理想" : ageDiff <= 7 ? "可以接受" : "差异较大",
      score: -(ageDiff * 2)
    });

    // 兴趣爱好分析
    if (formData.person1.hobby === formData.person2.hobby) {
      score += 20;
      analysis.push({
        factor: "共同爱好",
        impact: "非常有利于感情发展",
        score: +20
      });
    } else {
      analysis.push({
        factor: "兴趣爱好",
        impact: "兴趣各异，可以互相学习",
        score: 0
      });
    }

    // 性格匹配分析
    const personalityMatch = getPersonalityMatch(formData.person1.personality, formData.person2.personality);
    score += personalityMatch.score;
    analysis.push({
      factor: "性格匹配",
      impact: personalityMatch.impact,
      score: personalityMatch.score
    });

    // 确保分数在0-100之间
    score = Math.max(0, Math.min(100, score));

    const matchResult = { score, analysis };
    setResult(matchResult);
    setShowModal(true);
    saveToHistory(matchResult);
  };

  // 清除历史记录
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('matchHistory');
  };

  const getPersonalityMatch = (p1, p2) => {
    if (p1 === p2) {
      return { score: 10, impact: "性格相似，容易产生共鸣" };
    }
    if ((p1 === "外向" && p2 === "内向") || (p1 === "内向" && p2 === "外向")) {
      return { score: 15, impact: "性格互补，能够相互平衡" };
    }
    return { score: 5, impact: "性格中性，关系发展空间大" };
  };

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold text-center mb-8">
        AI 恋爱契合度预测
      </h1>
      
      {/* 添加历史记录按钮 */}
      <div className="max-w-2xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          {showHistory ? '隐藏历史记录' : '查看历史记录'}
        </button>
      </div>

      {/* 历史记录面板 */}
      {showHistory && (
        <div className="max-w-2xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">历史记录</h2>
            <button
              onClick={clearHistory}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              清除历史
            </button>
          </div>
          
          {history.length === 0 ? (
            <p className="text-gray-500 text-center">暂无历史记录</p>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{item.date}</span>
                    <span className="font-bold text-blue-500">{item.result.score}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">{item.persons.person1.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.persons.person1.age}岁, {item.persons.person1.hobby}, 
                        {item.persons.person1.personality}性格
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">{item.persons.person2.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.persons.person2.age}岁, {item.persons.person2.hobby}, 
                        {item.persons.person2.personality}性格
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 第一个人的信息 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">你的信息</h2>
            <div>
              <label className="block text-sm font-medium mb-2">姓名</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                placeholder="请输入你的名字"
                value={formData.person1.name}
                onChange={(e) => handleChange('person1', 'name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">年龄</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md"
                placeholder="请输入你的年龄"
                value={formData.person1.age}
                onChange={(e) => handleChange('person1', 'age', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">主要兴趣爱好</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={formData.person1.hobby}
                onChange={(e) => handleChange('person1', 'hobby', e.target.value)}
                required
              >
                <option value="">请选择</option>
                <option value="运动">运动</option>
                <option value="阅读">阅读</option>
                <option value="音乐">音乐</option>
                <option value="电影">电影</option>
                <option value="旅行">旅行</option>
                <option value="美食">美食</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">性格类型</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={formData.person1.personality}
                onChange={(e) => handleChange('person1', 'personality', e.target.value)}
                required
              >
                <option value="">请选择</option>
                <option value="外向">外向</option>
                <option value="内向">内向</option>
                <option value="中性">中性</option>
              </select>
            </div>
          </div>

          {/* 第二个人的信息 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">对方信息</h2>
            <div>
              <label className="block text-sm font-medium mb-2">姓名</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                placeholder="请输入对方的名字"
                value={formData.person2.name}
                onChange={(e) => handleChange('person2', 'name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">年龄</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md"
                placeholder="请输入对方的年龄"
                value={formData.person2.age}
                onChange={(e) => handleChange('person2', 'age', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">主要兴趣爱好</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={formData.person2.hobby}
                onChange={(e) => handleChange('person2', 'hobby', e.target.value)}
                required
              >
                <option value="">请选择</option>
                <option value="运动">运动</option>
                <option value="阅读">阅读</option>
                <option value="音乐">音乐</option>
                <option value="电影">电影</option>
                <option value="旅行">旅行</option>
                <option value="美食">美食</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">性格类型</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={formData.person2.personality}
                onChange={(e) => handleChange('person2', 'personality', e.target.value)}
                required
              >
                <option value="">请选择</option>
                <option value="外向">外向</option>
                <option value="内向">内向</option>
                <option value="中性">中性</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              开始预测
            </button>
            <button 
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              重置
            </button>
          </div>
        </form>
      </div>

      {/* 结果模态框 */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">匹配结果分析</h2>
            
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-blue-500 mb-2">
                {result.score}%
              </div>
              <div className="text-gray-600">
                总体契合度
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {result.analysis.map((item, index) => (
                <div key={index} className="border-b pb-2">
                  <div className="font-semibold">{item.factor}</div>
                  <div className="text-gray-600">{item.impact}</div>
                  <div className="text-sm text-gray-500">
                    影响分数: {item.score > 0 ? `+${item.score}` : item.score}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-gray-600 mb-6">
              {result.score >= 80 ? "你们是天生一对！" :
               result.score >= 60 ? "你们很般配！" :
               result.score >= 40 ? "还有发展空间~" :
               "可能需要多些互相了解..."}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
