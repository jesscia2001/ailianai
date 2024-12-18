import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '爱情预测器',
  description: '基于科学算法的爱情匹配系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
} 