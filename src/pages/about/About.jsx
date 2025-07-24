import React, { useEffect, useRef } from 'react'
import ModelView from '../../components/ModelView'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from 'lenis/react';
import HorizontalGallery from '../../components/HorizontalGallery';

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  const leftRef = useRef(null);
  const rightRef = useRef(null);
const secondProductRef = useRef()
  useEffect(() => {
    const leftContent = leftRef.current.querySelector(".ticker-left");
    const rightContent = rightRef.current.querySelector(".ticker-right");

    // Duplicate content to enable seamless loop
    leftContent.innerHTML += leftContent.innerHTML;
    rightContent.innerHTML += rightContent.innerHTML;

    const leftWidth = leftContent.scrollWidth / 2;
    const rightWidth = rightContent.scrollWidth / 2;

    // 🔶 Animate Left (top orange) - move left
    gsap.to(leftContent, {
      x: `-=${leftWidth}`,
      duration: 20,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % leftWidth),
      },
    });

    // 🔷 Animate Right (bottom cream) - move right
    gsap.to(rightContent, {
      x: `+=${rightWidth}`,
      duration: 20,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % rightWidth),
      },
    });
  }, []);



  const heroCanRef = useRef(null);
  // const secondProductRef = useRef(null);



   const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);


  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;


    const scrollWidth = scrollContainer.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(scrollContainer, {
      x: () => `-${scrollWidth - viewportWidth}`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Clean up
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  useEffect(() => {
    // ... your ticker animation code ...

    // Ensure the DOM has rendered
    setTimeout(() => {
      if (!heroCanRef.current || !secondProductRef.current) return;

      const heroCan = heroCanRef.current;
      const targetProduct = secondProductRef.current;

      const heroRect = heroCan.getBoundingClientRect();
      const targetRect = targetProduct.getBoundingClientRect();

      // Create the ScrollTrigger animation
      gsap.to(heroCan, {
        scrollTrigger: {
          trigger: heroCan, // start when the hero image enters
          start: "top 20%",
          endTrigger: targetProduct,
          end: "top 60%",
          scrub: true,
        },
        x: () => {
          const dx = targetRect.left - heroRect.left;
          return dx;
        },
        y: () => {
          const dy = targetRect.top - heroRect.top;
          return dy;
        },
        scale: 0.6, // Optional: shrink a bit to fit the grid
        ease: "none",
      });
    }, 500);
  }, []);


  const products = [
    {
      label: "A",
      title: "Purple Berry",
      subtitle: "Bright Eyes, Healthy Kids",
      vitamin: "Vitamin A",
      bgColor: "bg-[#DD78F3]",
      accentColor: "text-[#4B0072]",
      icon: "🍇", // placeholder
      cartColor: "bg-[#1D005F]",
      image: "/images/can.png",
    },
    {
      label: "B",
      title: "Berry Burst",
      subtitle: "Energy to Explore",
      vitamin: "Vitamin B6 B12",
      bgColor: "bg-[#31A8F7]",
      accentColor: "text-[#002B6B]",
      icon: "🫐",
      cartColor: "bg-[#1D005F]",
      image: "/images/can.png",
    },
    {
      label: "C",
      title: "Cherry Zing",
      subtitle: "Immune Supercharge",
      vitamin: "Vitamin C",
      bgColor: "bg-[#FF6A3D]",
      accentColor: "text-[#7A1B00]",
      icon: "🍒",
      cartColor: "bg-[#1D005F]",
      image: "/images/can.png",
    },
    {
      label: "D",
      title: "Lime Splash",
      subtitle: "Sunshine for Strong Bones",
      vitamin: "Vitamin D",
      bgColor: "bg-[#C3D400]",
      accentColor: "text-[#404800]",
      icon: "🍋",
      cartColor: "bg-[#1D005F]",
      image: "/images/can.png",
    },

      {
      label: "A",
      title: "Purple Berry",
      subtitle: "Bright Eyes, Healthy Kids",
      vitamin: "Vitamin A",
      bgColor: "bg-[#DD78F3]",
      accentColor: "text-[#4B0072]",
      icon: "🍇", // placeholder
      cartColor: "bg-[#1D005F]",
      image: "/images/can.png",
    },
    {
      label: "B",
      title: "Berry Burst",
      subtitle: "Energy to Explore",
      vitamin: "Vitamin B6 B12",
      bgColor: "bg-[#31A8F7]",
      accentColor: "text-[#002B6B]",
      icon: "🫐",
      cartColor: "bg-[#1D005F]",
      image: "/images/can.png",
    },
    {
      label: "C",
      title: "Cherry Zing",
      subtitle: "Immune Supercharge",
      vitamin: "Vitamin C",
      bgColor: "bg-[#FF6A3D]",
      accentColor: "text-[#7A1B00]",
      icon: "🍒",
      cartColor: "bg-[#1D005F]",
      image: "/images/can.png",
    },
    {
      label: "D",
      title: "Lime Splash",
      subtitle: "Sunshine for Strong Bones",
      vitamin: "Vitamin D",
      bgColor: "bg-[#C3D400]",
      accentColor: "text-[#404800]",
      icon: "🍋",
      cartColor: "bg-[#1D005F]",
      image: "/images/can.png",
    },

    
  ];

  return (
    <ReactLenis root>
    <div className="w-full min-h-screen bg-[#1D005F] text-white overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 md:px-12">
        <div className="text-2xl md:text-4xl font-bold leading-tight font-syncopate">
          Happi <br className="md:hidden" />
          Loop
        </div>
        <nav className="hidden md:flex gap-8 font-medium text-lg">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Clients</a>
          <a href="#">How it Works</a>
          <a href="#">Testimonials</a>
        </nav>
        <button className="hidden md:block px-5 py-2 border border-white rounded-full font-semibold">
          Sign Up
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-10 md:py-20">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-bold leading-none font-bai uppercase text-white">
          Happi<span className="text-[#FFA1E3]">Loop</span>
        </h1>

        {/* Bottle & Emojis */}
        <div className="relative mt-12 w-full flex flex-col-reverse md:flex-row items-center justify-center gap-12">
          {/* Left Text */}
          <div className="text-left max-w-md">
            <p className="text-base md:text-lg mb-4">
              We’re committed to sustainability because we care about the planet our kids will inherit.
            </p>
            <button className="bg-lime-400 hover:bg-lime-500 px-6 py-2 rounded-full font-semibold text-black transition">
              Explore More →
            </button>
          </div>

          {/* Bottle */}
          <div className="relative w-[250px] md:w-[300px]">
            <img
              src="./images/can.png"
              alt="Vitamin Bottle"
              className="w-full"
              ref={heroCanRef}
            />

          </div>

          {/* Right Emojis */}
          <div className="text-left flex flex-col items-center">
            <p className="mb-3 text-sm text-white/70">Choose your fighters</p>
            <div className="grid grid-cols-2 gap-4">
              <img src="./images/can.png" alt="emoji A" className="w-12 h-12" />
              <img src="./images/can.png" alt="emoji B" className="w-12 h-12" />
              <img src="./images/can.png" alt="emoji C" className="w-12 h-12" />
              <img src="./images/can.png" alt="emoji D" className="w-12 h-12" />
            </div>
          </div>
        </div>
      </section>



      <section className="relative bg-[#F5F5F5] pt-20 pb-32 px-6 md:px-16 overflow-hidden">
        {/* Wavy Top Divider */}
        <div className="absolute -top-12 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 100"
            className="w-full h-20 rotate-180"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32L60,58.7C120,85,240,139,360,149.3C480,160,600,128,720,101.3C840,75,960,53,1080,64C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              fill="#1D005F"
            ></path>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D005F] mb-4">
              About <br />
              HappiLoop
            </h2>
            <p className="text-lg text-gray-700 mb-10 max-w-md">
              HappiLoop provides essential vitamins, supporting kids' growth with
              safe, fun, daily nutrition for happiness.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 text-[#1D005F] font-bold text-xl mb-10">
              <div>
                <span className="text-4xl text-[#C3D400]">97%</span>
                <p className="text-sm font-medium">Daily Smiles</p>
              </div>
              <div>
                <span className="text-4xl text-[#C3D400]">10K+</span>
                <p className="text-sm font-medium">Happy Families</p>
              </div>
              <div>
                <span className="text-4xl text-[#C3D400]">4.9K</span>
                <p className="text-sm font-medium">People Used</p>
              </div>
            </div>

            {/* Button */}
            <button className="inline-flex items-center gap-2 bg-[#C3D400] text-[#1D005F] font-semibold px-6 py-2 rounded-full transition hover:scale-105">
              Explore More
            </button>
          </div>

          {/* RIGHT IMAGES */}
          <div className="flex flex-col items-center justify-center gap-12">
            {/* Girl */}
            <div className="bg-[#C3D400] rounded-full p-3">
              <img
                src="./images/can.png"
                alt="Smiling girl with teddy"
                className="rounded-full w-52 h-52 object-cover"
              />
            </div>
            {/* Boy */}
            <div className="bg-[#C3D400] rounded-full p-3">
              <img
                src="./images/can.png"
                alt="Boy with ice cream"
                className="rounded-full w-52 h-52 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Wavy Bottom Divider */}
        <div className="absolute -bottom-12 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 100"
            className="w-full h-20"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32L60,58.7C120,85,240,139,360,149.3C480,160,600,128,720,101.3C840,75,960,53,1080,64C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              fill="#1D005F"
            ></path>
          </svg>
        </div>
      </section>




      <section
  ref={sectionRef}
  className="bg-[#1D005F] py-20 px-6 md:px-16 text-white overflow-hidden"
>
  <div className="max-w-7xl mx-auto mb-12">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-[#DD78F3]">Discover </span>
          The Happy Squad
        </h2>
      </div>
      <p className="max-w-md text-base text-gray-200 mt-4 md:mt-0">
        Meet the Happy Squad—our vibrant, kid-friendly characters who make
        taking vitamins fun and exciting!
      </p>
    </div>
  </div>

  <div ref={scrollContainerRef}  className="flex gap-6 w-fit">
    {products.map((product, i) => (
      <div
        key={i}
        ref={i === 1 ? secondProductRef : null}
        className={`min-w-[300px] md:min-w-[320px] rounded-[28px] px-5 pt-6 pb-8 flex flex-col justify-between ${product.bgColor} text-black`}
      >
        {/* Card Content */}
        <div className={`w-full h-full ${product.bgColor} p-2`}>
          <div className="text-2xl text-right mb-2">{product.icon}</div>
          <img
            src="./images/can.png"
            alt={product.title}
            className="w-full h-48 object-contain mb-4"
          />
          <p className="text-sm font-semibold text-gray-700">
            {product.vitamin}
          </p>
          <h3 className="text-3xl font-bold">{product.label}</h3>
          <p className="text-sm font-medium mt-1">{product.subtitle}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h4 className={`text-lg font-bold ${product.accentColor}`}>
            {product.title}
          </h4>
          <button
            className={`w-9 h-9 rounded-full ${product.cartColor} flex items-center justify-center`}
          >
            {/* Cart icon */}
          </button>
        </div>
      </div>
    ))}
  </div>
</section>





      <div className="relative my-20">
        {/* 🔸 Top Orange Banner */}
        <div className="bg-[#FF6A3D] transform -skew-y-3 overflow-hidden py-4 border-t-4 border-black">
          <div ref={leftRef} className="overflow-hidden whitespace-nowrap">
            <div className="ticker-left inline-flex items-center gap-10 text-xl md:text-3xl font-bold uppercase px-6 text-white">
              <span>FOR CHILDREN</span>
              <span>😎</span>
              <span>IMMUNITY BOOST</span>
              <span>🍊</span>
              <span>ENERGY BURST</span>
              <span>🍓</span>
            </div>
          </div>
        </div>


        <div className="bg-[#EFEAD9] transform -skew-y-10 overflow-hidden py-4 border-t-4 border-black">
          <div ref={rightRef} className="overflow-hidden whitespace-nowrap">
            <div className="ticker-right inline-flex items-center gap-10 text-xl md:text-3xl font-bold uppercase px-6 text-black">
              <span>FOR CHILDREN</span>
              <span>😎</span>
              <span>IMMUNITY BOOST</span>
              <span>🍊</span>
              <span>ENERGY BURST</span>
              <span>🍓</span>
            </div>
          </div>
        </div>

        {/* 🔹 Bottom Cream Banner */}
        {/* <div className="bg-[#EFEAD9] overflow-hidden py-4 border-b-4 border-black -mt-1">
          <div ref={rightRef} className="overflow-hidden whitespace-nowrap">
            <div className="ticker-right inline-flex items-center gap-10 text-xl md:text-3xl font-bold uppercase px-6 text-black">
              <span>LOW CALORIE</span>
              <span>💪</span>
              <span>100% HEALTHY</span>
              <span>🧃</span>
              <span>FOR KIDS</span>
              <span>🔥</span>
              
            </div>
          </div>
        </div> */}
      </div>



      <section className='cta-section'>

      </section>
      <section className='product-showcase'>

      </section>
      <section className='product-info-section'>

      </section>

      <footer className='footer'>

      </footer>
    </div>
    </ReactLenis>
  )
}

export default About
