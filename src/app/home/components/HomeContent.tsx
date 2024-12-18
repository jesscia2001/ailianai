'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from './HeroSection';
import FeatureShowcase from './FeatureShowcase';
import ProcessGuide from './ProcessGuide';
import QuickStart from './QuickStart';

export default function HomeContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    try {
      await router.push('/match');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <HeroSection 
        title="发现你们的契合指数"
        subtitle="基于科学算法的爱情匹配"
        ctaText="开始匹配"
        onCtaClick={handleStart}
      />
      <FeatureShowcase />
      <ProcessGuide />
      <QuickStart onStart={handleStart} isLoading={isLoading} />
    </main>
  );
} 