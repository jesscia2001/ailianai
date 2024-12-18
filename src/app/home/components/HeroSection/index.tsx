'use client';

import { FC } from 'react';

interface HeroProps {
  title: string;
  subtitle: string; 
  ctaText: string;
  onCtaClick: () => void;
}

const HeroSection: FC<HeroProps> = ({
  title = "发现你们的契合指数",
  subtitle = "基于科学算法的爱情匹配",
  ctaText = "开始匹配",
  onCtaClick
}) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {subtitle}
        </p>
        <button
          onClick={onCtaClick}
          className="bg-white text-[#FF6B6B] px-8 py-3 rounded-lg text-lg font-semibold
                     transform transition-all hover:scale-105 hover:shadow-lg"
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
};

export default HeroSection; 