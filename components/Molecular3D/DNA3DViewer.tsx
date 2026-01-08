
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const DNA3DViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Nền trắng xám rất sạch

    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 20;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Ánh sáng đa hướng để làm nổi bật khối 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const dnaGroup = new THREE.Group();
    const numSteps = 40;
    const radius = 5;
    const heightPerStep = 0.7;
    const anglePerStep = 0.35;

    /**
     * Định nghĩa màu sắc chuẩn và cực kỳ tương phản:
     * A: Đỏ rực
     * T: Xanh lá neon
     * G: Xanh dương đậm
     * C: Vàng tươi
     */
    const baseColors: Record<string, number> = {
      'A': 0xff0000, // Red
      'T': 0x00ff00, // Green
      'G': 0x0000ff, // Blue
      'C': 0xffff00  // Yellow
    };

    const sequence = ['A', 'T', 'G', 'C', 'C', 'G', 'T', 'A']; // Trình tự lặp lại

    for (let i = 0; i < numSteps; i++) {
      const angle = i * anglePerStep;
      const y = (i - numSteps / 2) * heightPerStep;
      
      const base1Type = sequence[i % sequence.length];
      const base2Type = base1Type === 'A' ? 'T' : (base1Type === 'T' ? 'A' : (base1Type === 'G' ? 'C' : 'G'));

      // 1. Khung xương Phosphate-Đường (Hai dải xoắn bên ngoài)
      const backboneGeom = new THREE.SphereGeometry(0.4, 16, 16);
      const backboneMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3 }); // Màu chì xám
      
      const s1 = new THREE.Mesh(backboneGeom, backboneMat);
      s1.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      dnaGroup.add(s1);

      const s2 = new THREE.Mesh(backboneGeom, backboneMat);
      s2.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
      dnaGroup.add(s2);

      // 2. Liên kết các Base (Thanh nối giữa) - CHIA LÀM 2 NỬA MÀU KHÁC NHAU
      const stickRadius = 0.22;
      const stickHeight = radius * 0.95;

      // Nửa gậy thứ nhất (Base 1)
      const part1Geom = new THREE.CylinderGeometry(stickRadius, stickRadius, stickHeight, 12);
      const part1Mat = new THREE.MeshStandardMaterial({ color: baseColors[base1Type], emissive: baseColors[base1Type], emissiveIntensity: 0.2 });
      const part1 = new THREE.Mesh(part1Geom, part1Mat);
      part1.rotation.z = Math.PI / 2;
      part1.position.x = stickHeight / 2;

      // Nửa gậy thứ hai (Base 2)
      const part2Geom = new THREE.CylinderGeometry(stickRadius, stickRadius, stickHeight, 12);
      const part2Mat = new THREE.MeshStandardMaterial({ color: baseColors[base2Type], emissive: baseColors[base2Type], emissiveIntensity: 0.2 });
      const part2 = new THREE.Mesh(part2Geom, part2Mat);
      part2.rotation.z = Math.PI / 2;
      part2.position.x = -stickHeight / 2;

      const pairGroup = new THREE.Group();
      pairGroup.add(part1);
      pairGroup.add(part2);
      pairGroup.position.y = y;
      pairGroup.rotation.y = angle;
      
      dnaGroup.add(pairGroup);
    }

    scene.add(dnaGroup);

    const animate = () => {
      requestAnimationFrame(animate);
      dnaGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative bg-slate-50">
      {/* Legend điều chỉnh theo màu sắc mới */}
      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 shadow-xl z-10 space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b pb-1">Ký hiệu Base</p>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-md bg-[#ff0000] shadow-sm"></div>
          <span className="text-xs font-bold text-slate-700">Adenine (A)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-md bg-[#00ff00] shadow-sm"></div>
          <span className="text-xs font-bold text-slate-700">Thymine (T)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-md bg-[#0000ff] shadow-sm"></div>
          <span className="text-xs font-bold text-slate-700">Guanine (G)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-md bg-[#ffff00] shadow-sm border border-slate-100"></div>
          <span className="text-xs font-bold text-slate-700">Cytosine (C)</span>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-3">
          <div className="w-4 h-4 rounded-md bg-[#475569] shadow-sm"></div>
          <span className="text-[10px] font-medium text-slate-500">Đường - Phosphate</span>
        </div>
      </div>
      
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="bg-blue-600/10 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold border border-blue-200 backdrop-blur-sm">
          Mô phỏng 3D thời gian thực
        </div>
      </div>
    </div>
  );
};

export default DNA3DViewer;
