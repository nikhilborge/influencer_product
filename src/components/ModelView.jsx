'use client';
import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function JuiceModel({ onLoaded }) {
    const modelRef = useRef();
    const { scene } = useGLTF('/model/josta.glb');

   useEffect(() => {
    if (scene && modelRef.current) {
      modelRef.current.position.set(0, -0.5, 0);
        onLoaded(modelRef.current);
    }
}, [scene, onLoaded]);


    return <primitive object={scene} ref={modelRef} scale={1.4} />;

}

export default function ModelView() {
    const containerRef = useRef();
    const bottleTargetRef = useRef();
    const [model, setModel] = useState(null);

    const products = [
        { name: 'Juices', count: 9 },
        { name: 'Cold pressed bottles', count: 9 },
        { name: 'The cleanse 330 ml', count: 21 },
        { name: 'Protein smoothies', count: 7 },
        { name: 'Smoothies', count: 13 },
    ];

  useEffect(() => {
    if (!model || !bottleTargetRef.current) return;

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=1000',
                scrub: true,
                pin: true,
            },
        });

        // 1. Full rotation
        tl.to(model.rotation, {
            y: Math.PI * 2,
            ease: 'none',
        }, 0);

        // 2. Shrink
        tl.to(model.scale, {
            x: 0.4,
            y: 0.4,
            z: 0.4,
            ease: 'power2.inOut',
        }, 0.6);

        // 3. Move to DOM target element (in world space)
       tl.add(() => {
    const rect = bottleTargetRef.current.getBoundingClientRect();

    // Project DOM center to normalized device coordinates
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
    const y = -((rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

    const vec = new THREE.Vector3(x, y, 0.5);
    vec.unproject(model.parent); // Convert to world space

    gsap.to(model.position, {
        x: vec.x,
        y: vec.y,
        z: vec.z,
        duration: 1,
        ease: 'power2.inOut',
    });
}, 0.8);

    }, containerRef);

    return () => ctx.revert();
}, [model]);



    return (
        <>
            <div className='relative'>
                {/* Overlay Text */}
                <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center text-center pointer-events-none z-20">
                    <h1 className="text-[12rem] font-bold text-black/10 tracking-tight">ORANGE</h1>
                    <div className="mt-10 text-xl font-medium text-black">
                        <p>Your <span className="text-green-500 font-bold">healthy</span> life starts here</p>
                        <p className="text-sm text-gray-500 mt-2 w-[300px] mx-auto">
                            A family-owned company giving you organic juice on the go.
                        </p>
                    </div>
                </div>

                {/* Canvas Section */}
                <section ref={containerRef} className="h-[100vh] w-full relative z-10">

                   <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
                        <ambientLight intensity={5} />
                        <directionalLight position={[5, 5, 5]} />
                        <JuiceModel onLoaded={setModel} />
                    </Canvas>
                </section>
            </div>

            {/* Product Grid */}
            <section className="relative z-0 bg-white py-24 px-8">
                <h2 className="text-4xl font-bold text-center mb-12">
                    <span className="text-lime-600">Menu</span> suited to your expectations
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-7xl mx-auto">
                    {products.map((p, i) => (
                        <div
                            key={i}
                            ref={i === 1 ? bottleTargetRef : null}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-[80px] h-[200px] bg-gray-100 rounded-xl flex items-center justify-center">
                                <span className="text-sm">{p.name.split(' ')[0]}</span>
                            </div>
                            <div className="text-sm text-gray-500">{p.count} products</div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
