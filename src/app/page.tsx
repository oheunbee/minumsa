// src/app/page.tsx

'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Sparkles, Text, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

// 민음사를 포함한 총 9개 그룹의 데이터
const minumsaUniverseData = [
  { name: '민음사', path: '/minumsaGroup/minumsa', color: '#ff6347', size: 0.4, orbitRadius: 3, speed: 0.6 },
  { name: '비룡소', path: '/minumsaGroup/bir', color: '#1e90ff', size: 0.4, orbitRadius: 5, speed: 0.45 },
  { name: '황금가지', path: '/minumsaGroup/goldenbough', color: '#ffd700', size: 0.35, orbitRadius: 7, speed: 0.3 },
  { name: '사이언스북스', path: '/minumsaGroup/sciencebooks', color: '#32cd32', size: 0.5, orbitRadius: 9, speed: 0.25 },
  { name: '세미콜론', path: '/minumsaGroup/semicolon', color: '#483d8b', size: 0.3, orbitRadius: 11, speed: 0.2 },
  { name: '민음인', path: '/minumsaGroup/minumin', color: '#ff4500', size: 0.25, orbitRadius: 13, speed: 0.15 },
  { name: '판미동', path: '/minumsaGroup/panmidong', color: '#da70d6', size: 0.4, orbitRadius: 15, speed: 0.1 },
  { name: '반비', path: '/minumsaGroup/banbi', color: '#20b2aa', size: 0.3, orbitRadius: 17, speed: 0.08 },
  { name: '오렌지디', path: '/minumsaGroup/oranged', color: '#FFA500', size: 0.2, orbitRadius: 19, speed: 0.07},
];

// 공전하는 객체(그룹) 컴포넌트
const OrbitingGroup = (props: (typeof minumsaUniverseData)[0]) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * props.speed;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle) * props.orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * props.orbitRadius;
    }
  });

  const handleClick = () => {
    router.push(props.path);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  return (
    <group ref={groupRef}>
      <Sphere
        args={[props.size, 32, 32]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={props.color} roughness={0.4} metalness={0.1} />
      </Sphere>
      <Text position={[0, props.size + 0.4, 0]} fontSize={0.35} color="white" anchorX="center" anchorY="middle">
        {props.name}
      </Text>
    </group>
  );
};

// 궤도 선 컴포넌트 (@react-three/drei의 Line 사용)
const OrbitLine = ({ radius }: { radius: number }) => {
  const points = useMemo(() => {
    const p: THREE.Vector3[] = [];
    for (let i = 0; i <= 360; i++) {
      const angle = (i * Math.PI) / 180;
      p.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return p;
  }, [radius]);

  return <Line points={points} color="gray" lineWidth={1} transparent opacity={0.3} />;
};

// 메인 페이지 컴포넌트
export default function Home() {
  return (
    <div className="relative w-full h-screen bg-black cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 20, 30], fov: 60 }}>
        {/* 조명 설정 */}
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={3.0} color="white" />

        {/* 1. 중앙의 '민음사 그룹' (상징적인 객체) */}
        <Sphere args={[1.2, 32, 32]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} roughness={0.5} />
        </Sphere>
        
        {/* 배경 별 효과 */}
        <Sparkles count={3000} scale={45} size={1.2} speed={0.2} />
        
        {/* 2. 공전하는 9개의 그룹 렌더링 */}
        {minumsaUniverseData.map((company) => (
          <React.Fragment key={company.name}>
            <OrbitingGroup {...company} />
            <OrbitLine radius={company.orbitRadius} />
          </React.Fragment>
        ))}
        
        {/* 카메라 컨트롤 설정 */}
        <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={0.2} />
        
        {/* 후처리 효과 */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3} // 이 값보다 밝은 부분에만 효과 적용
            luminanceSmoothing={0.9}
            height={300}
            intensity={1.2} // 빛 번짐 효과 강도
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}