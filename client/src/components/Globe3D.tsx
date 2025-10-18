import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { RadioStation } from '@/store/radioStore';

interface Globe3DProps {
  stations: RadioStation[];
  onStationSelect: (station: RadioStation) => void;
  selectedStation: RadioStation | null;
}

export const Globe3D: React.FC<Globe3DProps> = ({
  stations,
  onStationSelect,
  selectedStation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [hoveredStation, setHoveredStation] = useState<RadioStation | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x0a0e27, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create globe
    const geometry = new THREE.IcosahedronGeometry(1, 64);
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1a2332';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some texture details
      ctx.fillStyle = '#2a3f5f';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 10;
        ctx.fillRect(x, y, size, size);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      emissive: 0x4a5f8f,
      emissiveIntensity: 0.2,
      shininess: 5,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Create station points
    const stationGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    stations.forEach((station) => {
      if (station.geo) {
        const lat = (station.geo.latitude * Math.PI) / 180;
        const lon = (station.geo.longitude * Math.PI) / 180;

        const x = Math.cos(lat) * Math.cos(lon);
        const y = Math.sin(lat);
        const z = Math.cos(lat) * Math.sin(lon);

        positions.push(x, y, z);

        // Color based on votes
        const intensity = Math.min(station.votes / 1000, 1);
        colors.push(0.5 + intensity * 0.5, 0.3 + intensity * 0.3, 1);
      }
    });

    stationGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    stationGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    const pointMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(stationGeometry, pointMaterial);
    scene.add(points);
    pointsRef.current = points;

    // Handle mouse move for raycasting
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObject(points);

      if (intersects.length > 0) {
        const index = intersects[0].index;
        if (index !== undefined) {
          setHoveredStation(stations[index]);
        }
      } else {
        setHoveredStation(null);
      }
    };

    // Handle click
    const onClick = () => {
      if (hoveredStation) {
        onStationSelect(hoveredStation);
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (globeRef.current) {
        globeRef.current.rotation.x += 0.0001;
        globeRef.current.rotation.y += 0.0005;
      }

      if (pointsRef.current) {
        pointsRef.current.rotation.x += 0.0001;
        pointsRef.current.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onClick);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      stationGeometry.dispose();
      pointMaterial.dispose();
      renderer.dispose();
    };
  }, [stations, onStationSelect]);

  // Animate to selected station
  useEffect(() => {
    if (selectedStation && selectedStation.geo && globeRef.current) {
      const lat = (selectedStation.geo.latitude * Math.PI) / 180;
      const lon = (selectedStation.geo.longitude * Math.PI) / 180;

      gsap.to(globeRef.current.rotation, {
        x: lat,
        y: lon,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }
  }, [selectedStation]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{ minHeight: '400px' }}
    >
      {hoveredStation && (
        <div className="absolute top-4 left-4 glassmorphic-dark p-4 rounded-lg max-w-xs">
          <p className="text-white font-semibold text-sm">{hoveredStation.name}</p>
          <p className="text-gray-300 text-xs">{hoveredStation.country}</p>
        </div>
      )}
    </div>
  );
};

