'use client';

import { FC } from 'react';
import { IconType } from 'react-icons';
import { FaWpforms, FaCogs, FaBolt } from 'react-icons/fa';

interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FaWpforms,
    title: "仅需填写基本信息",
    description: "2分钟完成信息录入"
  },
  {
    icon: FaCogs,
    title: "科学的匹配系统",
    description: "多维度分析契合度"
  },
  {
    icon: FaBolt,
    title: "快速获取结果",
    description: "详细的匹配报告"
  }
];

const FeatureShowcase: FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border border-gray-200 hover:shadow-lg 
                         transition-all duration-300 transform hover:-translate-y-1"
            >
              <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase; 