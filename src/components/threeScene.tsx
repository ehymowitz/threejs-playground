"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // init scene, camera, renderer
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.setZ(30);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current?.appendChild(renderer.domElement);

      // lighting
      const pointlight = new THREE.PointLight("white");
      pointlight.position.set(0, 0, 0);
      scene.add(pointlight);

      const ambientLight = new THREE.AmbientLight("white");
      scene.add(ambientLight);

      // helper
      const lightHelper = new THREE.PointLightHelper(pointlight);
      scene.add(lightHelper);

      const gridHelper = new THREE.GridHelper(200, 50);
      scene.add(gridHelper);

      // orbit controls
      const orbitControl = new OrbitControls(camera, renderer.domElement);

      // geometry
      const torusGeo = new THREE.TorusGeometry(10, 3, 16, 100);
      const torusMat = new THREE.MeshStandardMaterial({
        color: "tomato",
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      scene.add(torusMesh);

      // add stars
      const addStar = () => {
        const starGeo = new THREE.SphereGeometry(0.25, 24, 24);
        const starMat = new THREE.MeshStandardMaterial({ color: "white" });
        const star = new THREE.Mesh(starGeo, starMat);

        const [x, y, z] = Array(3)
          .fill(0)
          .map(() => THREE.MathUtils.randFloatSpread(100));
        star.position.set(x, y, z);
        scene.add(star);
      };
      Array(200).fill(0).forEach(addStar);

      // texture avatar
      const avatarTexture = new THREE.TextureLoader().load("./dog.png");
      const avatar = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshBasicMaterial({ map: avatarTexture })
      );
      scene.add(avatar);

      // scroll
      const moveCamera = () => {
        const t = document.body.getBoundingClientRect().top;
        torusMesh.rotation.x += 0.05;
        torusMesh.rotation.y += 0.075;
        torusMesh.rotation.z += 0.05;

        avatar.rotation.y += 0.01;
        avatar.rotation.z += 0.01;

        camera.position.z = t * -0.01;
        camera.position.x = t * -0.0002;
        camera.position.y = t * -0.0002;
      };
      document.body.onscroll = moveCamera;

      // animate scene
      const animate = () => {
        requestAnimationFrame(animate);

        // orbit controls
        orbitControl.update();

        // animate torus
        torusMesh.rotation.x += 0.01;
        torusMesh.rotation.z += 0.01;
        torusMesh.rotation.y += 0.005;
        renderer.render(scene, camera);
      };

      animate();
    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;
