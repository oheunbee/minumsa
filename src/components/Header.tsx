// components/Header.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Next.js의 Image 컴포넌트 import

// Header가 받을 props 타입 정의
interface HeaderProps {
  textColor: string;
  // 현재 페이지의 로고 정보
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  // 부모 그룹(브레드크럼) 정보 - 선택적
  parentLogoSrc?: string;
  parentLogoWidth?: number;
  parentLogoHeight?: number;
  parentPath?: string;
}

export default function Header({
  textColor,
  logoSrc,
  logoWidth,
  logoHeight,
  parentLogoSrc,
  parentLogoWidth,
  parentLogoHeight,
  parentPath = "/"
}: HeaderProps) {

  const linkClasses = `hover:opacity-75 transition-opacity ${textColor}`;

  return (
    <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
      
      {/* 로고 섹션 */}
      <div className="flex items-center space-x-3">
        {/* parentLogoSrc prop이 있을 경우에만 브레드크럼 형태로 렌더링 */}
        {parentLogoSrc && parentLogoWidth && parentLogoHeight ? (
          <>
            <Link href={parentPath} className="hover:opacity-75 transition-opacity">
              <Image
                src={parentLogoSrc}
                alt="Parent Logo"
                width={parentLogoWidth}
                height={parentLogoHeight}
              />
            </Link>
            <span className={`text-2xl font-light ${textColor}`}>/</span>
            {/* 자회사 페이지에서는 현재 로고는 링크가 아닌 이미지로 표시 */}
            <Image
              src={logoSrc}
              alt="Current Page Logo"
              width={logoWidth}
              height={logoHeight}
            />
          </>
        ) : (
          // parentLogoSrc가 없으면 (메인 페이지), 기본 로고만 렌더링
          <Link href="/">
            <Image
              src={logoSrc}
              alt="Main Logo"
              width={logoWidth}
              height={logoHeight}
            />
          </Link>
        )}
      </div>
      
      {/* 네비게이션 메뉴 */}
      <nav className="flex space-x-8 text-lg font-medium">
        <Link href="/about" className={linkClasses}>About</Link>
        <Link href="/gallery" className={linkClasses}>Gallery</Link>
        <Link href="/contact" className={linkClasses}>Contact</Link>
      </nav>
    </header>
  );
}