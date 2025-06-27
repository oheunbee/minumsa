// src/app/minumsaGroup/[groupName]/page.tsx

import React from 'react';

export default function GroupMainPage({ params }: { params: { groupName: string } }) {
  const { groupName } = params;
  return (
    <div>
      <h1 className="text-4xl font-bold capitalize">
        Welcome to {groupName}
      </h1>
      <p className="mt-4 text-lg">
        이곳은 {groupName} 그룹의 메인 페이지입니다.
      </p>
    </div>
  );
}