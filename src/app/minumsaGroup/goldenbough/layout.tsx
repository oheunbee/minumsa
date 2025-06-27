// src/app/minumsaGroup/[groupName]/layout.tsx

import React from 'react';
// ▼▼▼ Header 컴포넌트의 상대 경로가 변경됩니다. ▼▼▼
import Header from '../../../components/Header'; 

// groupThemes 객체는 변경 없음
const groupThemes = {
  'minumsa': { logo: { src: '/logos/minumsa.png', width: 120, height: 40 }, textColor: 'text-red-800', bgColor: 'bg-red-50' },
  'bir': { logo: { src: '/logos/bir.svg', width: 110, height: 45 }, textColor: 'text-blue-800', bgColor: 'bg-blue-50' },
  // ... 나머지 테마들
  default: { logo: { src: '/logos/minumsa-group.svg', width: 180, height: 40 }, textColor: 'text-gray-800', bgColor: 'bg-gray-100' },
};

// layout 컴포넌트의 나머지 부분은 변경 없음
export default function GroupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { groupName: string };
}) {
  const { groupName } = params;
  const theme = groupThemes[groupName as keyof typeof groupThemes] || groupThemes.default;

  return (
    <div className={`relative w-full min-h-screen ${theme.bgColor}`}>
      <Header 
        parentLogoSrc="/logos/minumsa-group.svg"
        parentLogoWidth={150}
        parentLogoHeight={35}
        parentPath="/"
        logoSrc={theme.logo.src}
        logoWidth={theme.logo.width}
        logoHeight={theme.logo.height}
        textColor={theme.textColor} 
      />
      <main className="pt-32 px-8">
        {children}
      </main>
    </div>
  );
}