'use client';

import { FC } from 'react';

interface QuickStartProps {
  onStart: () => void;
  isLoading?: boolean;
}

const QuickStart: FC<QuickStartProps> = ({ onStart, isLoading = false }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          立即开始你的匹配之旅
        </h2>
        <p className="text-xl mb-8 opacity-90">
          免费、快速、准确
        </p>
        <button
          onClick={onStart}
          disabled={isLoading}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold
                     transform transition-all hover:scale-105 hover:shadow-lg
                     disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? '加载中...' : '开始匹配'}
        </button>
      </div>
    </section>
  );
};

export default QuickStart; 