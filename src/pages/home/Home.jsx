import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import ReactLenis from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../../components/layout/Footer";
import ScrollImageStack from "../../components/ScrollImageStack";
import { DrawLineText } from "../../components/DrawLineText";
import VelocityScrollText from "../../components/VelocityScrollText";
import ModelView from "../../components/ModelView";

gsap.registerPlugin(ScrollTrigger);

// 3D Model Component
const CanModel = React.forwardRef((props, ref) => {
  const { scene } = useGLTF("/model/josta.glb");
  return <primitive ref={ref} object={scene} scale={0.9} rotation={[0, Math.PI, 0]} {...props} />;
});

const Home = () => {
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;

    const model = modelRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#all-products", // this section marks the end of hero
        start: "top bottom", // when product grid is about to enter
        end: "top center",   // halfway into viewport
        scrub: true,
      },
    });

    // Stop floating motion
    gsap.killTweensOf(model.position);

    tl.to(model.rotation, {
      y: Math.PI * 2, // rotate to back side
      ease: "power2.inOut",
    }, 0);

    tl.to(model.position, {
      x: 2,     // move right
      y: -1,    // move lower
      z: -1.5,  // pull back
      ease: "power2.inOut",
    }, 0);

    tl.to(model.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      ease: "power2.inOut",
    }, 0);

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);





  return (
    <ReactLenis root>
      <main className="min-h-screen w-full overflow-hidden bg-white text-zinc-900 relative">
        {/* Header */}
        <header className="px-6 md:px-20 py-4 sticky top-0 bg-white z-50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl tracking-tighter font-bold">Logo</h2>
            <nav className="hidden md:flex items-center gap-8 text-sm md:text-base">
              <a href="#">Home</a>
              <a href="#">Products</a>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </nav>
            <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">Order now</button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero relative flex items-center justify-center min-h-[100vh] w-full px-4 overflow-hidden">
          <div className="relative text-center w-full h-full flex items-center justify-center">
            {/* 3D Canvas */}

            <div className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <img src="./images/can.png" className="h-[25vw] w-auto rotate-[30deg]" alt="" />
            </div>
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <img src="./images/can.png" className="h-[30vw] w-auto -rotate-12 animat" alt="" />

              {/* <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
                <ambientLight intensity={4.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <Suspense fallback={null}>
                  <CanModel ref={modelRef} position={[0, 0, 0]} scale={0.9} rotation={[0, Math.PI, 0]} />
                </Suspense>
                <OrbitControls enableZoom={false} enableRotate={false} />
              </Canvas> */}
            </div>



            {/* Text Content */}
            <div className="z-10">
              <h1 className="font-extrabold text-[20vw] md:text-[25rem] tracking-tight leading-none text-zinc-900">
                SODA
              </h1>
              <p className="px-4 md:px-20 font-normal text-base mt-4 pt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                Repellat consequatur officiis culpa porro rerum soluta deleniti sunt magni eos molestias!
              </p>
              <div className="mt-6">
                <button className="px-8 py-3 rounded-full bg-zinc-900 text-orange-400 text-2xl font-normal">
                  Order Now
                </button>
                <button className="px-8 py-3 rounded-full ml-4 text-black text-2xl font-normal shadow-md">
                  $49.99
                </button>
              </div>
            </div>
          </div>
        </section>

   <VelocityScrollText/>
<ModelView/>

        {/* CTA Section */}
        <section id="cta-section" className="w-full py-32 bg-zinc-100 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Discover Audira</h2>
          <p className="max-w-2xl mx-auto text-zinc-600">
            Elevate your sound experience with immersive quality and elegant design.
          </p>
        </section>


        {/* Product Grid Section */}
        <section id="all-products" className="w-full py-32 px-6 md:px-20 bg-white text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-12">All Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-40 h-40 bg-zinc-100 rounded-xl flex items-center justify-center shadow-md">
                <img src="/model/josta-thumbnail.png" alt="Josta Can" className="w-24 h-auto" />
              </div>
            ))}
          </div>
        </section>

        <div className="text-center flex  items-center justify-center">
          <DrawLineText
            className="font-medium"
            oneByOne={false}
            fontSize={200}
            strokeWidth={1.5}
            text="PaceUI"
            color="red"
          />
        </div>

        <div>
          <ScrollImageStack />
        </div>
        <Footer />
      </main>
    </ReactLenis>
  );
};

export default Home;
