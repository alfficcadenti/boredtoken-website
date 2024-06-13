import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(null);
  const clock = new THREE.Clock();


  useEffect(() => {
    let scrollPercent = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 10000);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // 0x000000 is black, 0 is the alpha value (fully transparent)

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/'); 
    loader.setDRACOLoader(dracoLoader);


    // const loader = new FBXLoader(); // Use FBXLoader instead of GLTFLoader
    let cube: THREE.Group<THREE.Object3DEventMap>;
    let mixer: THREE.AnimationMixer;
    loader.load(
      '/bored.glb',
      function (gltf) {

        cube = gltf.scene;
        let anim = gltf.animations[0];
        console.log(cube)

        mixer = new THREE.AnimationMixer(gltf.scene);
        console.log(gltf.animations)
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });



        cube.position.set(0, 0, 0);
        // cube.scale.set(4, 4, 4);

        scene.add(cube);

        const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const height = boundingBox.getSize(new THREE.Vector3()).y;

        camera.lookAt(new THREE.Vector3(center.x, center.y + height / 2, center.z));


        // Set the camera to be above the model
        // camera.position.set(center.x, center.y + height*20, center.z + height);
        camera.position.set(0, 50, 90);
        camera.lookAt(new THREE.Vector3(center.x, center.y + height, center.z));



      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }



    function lerp(x: number, y: number, a: number) {
      return (1 - a) * x + a * y;
    }

    function scalePercent(start: number, end: number) {
      return (scrollPercent - start) / (end - start);
    }

    const animationScripts = [
      {
        start: 0,
        end: 40,
        func: () => {
          if (cube) {
            const boundingBox = new THREE.Box3().setFromObject(cube);
            const center = boundingBox.getCenter(new THREE.Vector3());
            const height = boundingBox.getSize(new THREE.Vector3()).y;

            camera.lookAt(new THREE.Vector3(center.x, center.y + height / 2.5, center.z));
            cube.position.y = lerp(-10, 0, scalePercent(-20, 60))
            cube.scale.set(40,40,40);
          }
        },
      },
      {
        start: 40,
        end: 80,
        func: () => {
          if (cube) {
            const boundingBox = new THREE.Box3().setFromObject(cube);
            const center = boundingBox.getCenter(new THREE.Vector3());
            const height = boundingBox.getSize(new THREE.Vector3()).y;

            camera.lookAt(new THREE.Vector3(center.x, center.y + height / 2.5, center.z));
            // camera.position.set(0, 1, 2);
            cube.rotation.y = lerp(0, Math.PI, scalePercent(40, 60));
            // cube.scale.set(30,30,30);
          }
        },
      },
      // {
      //   start: 70,
      //   end: 80,
      //   func: () => {
      //     if (cube) {
      //       // camera.position.x = lerp(0, 5, scalePercent(60, 80));
      //       // camera.position.y = lerp(1, 5, scalePercent(60, 80));
      //       const boundingBox = new THREE.Box3().setFromObject(cube);
      //       const center = boundingBox.getCenter(new THREE.Vector3());
      //       const height = boundingBox.getSize(new THREE.Vector3()).y;

      //       camera.lookAt(new THREE.Vector3(center.x, center.y + height / 2, center.z));
      //       cube.scale.set(20,20,20);
      //     }
      //   },
      // },
      {
        start: 80,
        end: 101,
        func: () => {
          if (cube) {
            cube.rotation.y += 0.01;
          }
        },
      },
    ];

    function playScrollAnimations() {
      animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end && cube) {
          a.func();
        }
      });
    }

    document.body.onscroll = () => {
      scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
          ((document.documentElement.scrollHeight || document.body.scrollHeight) -
            document.documentElement.clientHeight)) *
        100;
    };

    function animate() {
      requestAnimationFrame(animate);
      playScrollAnimations();
      if (mixer) {
        mixer.update(clock.getDelta());
      }
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="fixed top-0 min-h-screen" ref={mountRef} />;
};

export default ThreeScene;
