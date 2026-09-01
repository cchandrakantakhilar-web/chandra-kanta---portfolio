import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Subtle fog to create depth and seamless blending with the #050505 canvas
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ==========================================
    // 1. Central Hero Polyhedral Structure
    // ==========================================
    // Outer Icosahedron Wireframe
    const outerIcosaGeo = new THREE.IcosahedronGeometry(18, 1);
    const outerIcosaMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const outerIcosa = new THREE.Mesh(outerIcosaGeo, outerIcosaMat);
    outerIcosa.position.set(22, 5, -10);
    worldGroup.add(outerIcosa);

    // Outer Icosahedron Glowing Vertices
    const vertexPointsGeo = new THREE.BufferGeometry();
    const posAttribute = outerIcosaGeo.getAttribute('position');
    vertexPointsGeo.setAttribute('position', posAttribute);
    const vertexPointsMat = new THREE.PointsMaterial({
      color: 0xec4899,
      size: 1.8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const vertexPoints = new THREE.Points(vertexPointsGeo, vertexPointsMat);
    outerIcosa.add(vertexPoints);

    // Inner Torus Ring inside the icosahedron
    const torusGeo = new THREE.TorusGeometry(10, 0.6, 16, 60);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const innerTorus = new THREE.Mesh(torusGeo, torusMat);
    innerTorus.rotation.x = Math.PI / 3;
    outerIcosa.add(innerTorus);

    // ==========================================
    // 2. Floating 3D Geometric Polyhedrons (Left & Depth Space)
    // ==========================================
    const floatingMeshes: Array<{
      mesh: THREE.Mesh | THREE.LineSegments;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      initialY: number;
      floatSpeed: number;
      phase: number;
    }> = [];

    // Polyhedron configurations
    const shapeConfigs = [
      { geo: new THREE.OctahedronGeometry(8, 0), pos: [-28, 16, -15], color: 0x818cf8, opacity: 0.25 },
      { geo: new THREE.TetrahedronGeometry(6, 0), pos: [-22, -18, -5], color: 0xec4899, opacity: 0.22 },
      { geo: new THREE.IcosahedronGeometry(7, 0), pos: [32, -22, -20], color: 0xa855f7, opacity: 0.2 },
      { geo: new THREE.TorusGeometry(5, 0.4, 12, 36), pos: [-38, 2, -25], color: 0xc084fc, opacity: 0.25 },
      { geo: new THREE.OctahedronGeometry(4, 0), pos: [12, 28, -30], color: 0xf472b6, opacity: 0.2 },
    ];

    shapeConfigs.forEach((cfg, i) => {
      const wireGeo = new THREE.WireframeGeometry(cfg.geo);
      const lineMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
      });
      const lineMesh = new THREE.LineSegments(wireGeo, lineMat);
      lineMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      worldGroup.add(lineMesh);

      floatingMeshes.push({
        mesh: lineMesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        initialY: cfg.pos[1],
        floatSpeed: 0.0015 + i * 0.0005,
        phase: i * (Math.PI / 2.5),
      });
    });

    // ==========================================
    // 3. 3D Particle Cosmos & Constellation Cloud
    // ==========================================
    const particleCount = 380;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSpeeds: Array<{ x: number; y: number; z: number }> = [];

    const palette = [
      new THREE.Color(0xa855f7), // purple
      new THREE.Color(0xec4899), // pink
      new THREE.Color(0x818cf8), // indigo
      new THREE.Color(0xd946ef), // fuchsia
      new THREE.Color(0xffffff), // starlight white
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 160;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 140;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 120;

      const col = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i3] = col.r;
      particleColors[i3 + 1] = col.g;
      particleColors[i3 + 2] = col.b;

      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    const cosmosGeo = new THREE.BufferGeometry();
    cosmosGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    cosmosGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle Texture for smooth glowing circles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const cosmosMat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      map: particleTex,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const cosmosPoints = new THREE.Points(cosmosGeo, cosmosMat);
    worldGroup.add(cosmosPoints);

    // ==========================================
    // 4. Undulating 3D Cyber Wave Grid in Lower Depth
    // ==========================================
    const planeWidth = 160;
    const planeHeight = 100;
    const planeSegmentsW = 28;
    const planeSegmentsH = 20;
    const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight, planeSegmentsW, planeSegmentsH);
    planeGeo.rotateX(-Math.PI / 2.3);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    });
    const waveGrid = new THREE.Mesh(planeGeo, planeMat);
    waveGrid.position.set(0, -32, -35);
    worldGroup.add(waveGrid);

    // Store base vertices of wave plane
    const planePosAttr = planeGeo.attributes.position;
    const basePlaneY = new Float32Array(planePosAttr.count);
    for (let i = 0; i < planePosAttr.count; i++) {
      basePlaneY[i] = planePosAttr.getY(i);
    }

    // ==========================================
    // Mouse Interaction & Smooth Interpolation
    // ==========================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // ==========================================
    // Render Loop & Physics Animation
    // ==========================================
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Smooth scroll lerp
      currentScrollY += (targetScrollY - currentScrollY) * 0.05;

      // Parallax rotation of entire world group
      worldGroup.rotation.y = currentMouseX * 0.25 + elapsedTime * 0.02;
      worldGroup.rotation.x = currentMouseY * 0.15;
      worldGroup.position.y = -currentScrollY * 0.035;

      // Rotate Hero Icosahedron
      outerIcosa.rotation.x = elapsedTime * 0.12;
      outerIcosa.rotation.y = elapsedTime * 0.18;
      innerTorus.rotation.z = -elapsedTime * 0.25;

      // Floating polyhedrons animation
      floatingMeshes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;
        item.mesh.position.y =
          item.initialY + Math.sin(elapsedTime * 1.5 + item.phase) * 3;
      });

      // Subtle particle drift
      const positions = cosmosGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += particleSpeeds[i].x;
        positions[i3 + 1] += particleSpeeds[i].y;
        positions[i3 + 2] += particleSpeeds[i].z;

        // Boundary wrap
        if (positions[i3] > 80) positions[i3] = -80;
        if (positions[i3] < -80) positions[i3] = 80;
        if (positions[i3 + 1] > 70) positions[i3 + 1] = -70;
        if (positions[i3 + 1] < -70) positions[i3 + 1] = 70;
      }
      cosmosGeo.attributes.position.needsUpdate = true;

      // Cyber wave grid undulating motion
      const wavePos = planeGeo.attributes.position;
      for (let i = 0; i < wavePos.count; i++) {
        const u = i % (planeSegmentsW + 1);
        const v = Math.floor(i / (planeSegmentsW + 1));
        const zDisplace = Math.sin(elapsedTime * 1.5 + u * 0.35 + v * 0.25) * 2.2;
        wavePos.setZ(i, zDisplace);
      }
      planeGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // Cleanup on component unmount
    // ==========================================
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials to avoid memory leaks
      outerIcosaGeo.dispose();
      outerIcosaMat.dispose();
      vertexPointsGeo.dispose();
      vertexPointsMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      cosmosGeo.dispose();
      cosmosMat.dispose();
      particleTex.dispose();
      planeGeo.dispose();
      planeMat.dispose();

      floatingMeshes.forEach((item) => {
        item.mesh.geometry.dispose();
        if (Array.isArray(item.mesh.material)) {
          item.mesh.material.forEach((m) => m.dispose());
        } else {
          item.mesh.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};
