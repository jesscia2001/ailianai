'use client';

import { FC } from 'react';
import { FaUserEdit, FaHeart, FaChartBar } from 'react-icons/fa';

interface Step {
  icon: typeof FaUserEdit;
  title: string;
  description: string;
  bgColor: string;
}

const steps: Step[] = [
  {
    icon: FaUserEdit,
    title: '填写基本信息',
    description: '填写基本个人信息',
    bgColor: 'bg-pink-100'
  },
  {
    icon: FaHeart,
    title: '选择兴趣爱好',
    description: '选择你的兴趣爱好',
    bgColor: 'bg-purple-100'
  },
  {
    icon: FaChartBar,
    title: '查看匹配结果',
    description: '获取详细的匹配报告',
    bgColor: 'bg-blue-100'
  }
];

const ProcessGuide: FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          使用流程
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`relative w-full aspect-video mb-4 rounded-lg ${step.bgColor} 
                              flex items-center justify-center`}>
                <step.icon className="w-16 h-16 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessGuide; 