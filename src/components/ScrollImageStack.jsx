// ZoomParallax.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollImageStack = () => {
  const containerRef = useRef(null);
  const zoomRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const zoom = zoomRef.current;

    gsap.to(zoom, {
      scale: 6,
      scrollTrigger: {
        trigger: zoom,
        start: 'center center',
        end: '+=400',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    sectionsRef.current.forEach((sec, i) => {
      gsap.fromTo(sec,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sec,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          }
        });
    });

  }, []);

  return (
    <div className="relative w-full">
      {/* Section 1 */}
      <div className="h-screen flex items-center justify-center bg-blue-500 text-white text-4xl font-bold">
        Top Section
      </div>

      {/* Zoom Section */}
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={zoomRef}
          className="bg-orange-500 w-64 h-64 rounded-lg flex items-center justify-center text-white text-3xl font-bold origin-center"
        >
          Zoom Me
        </div>
      </div>

      {/* Section 2 */}
      <div
        ref={(el) => (sectionsRef.current[0] = el)}
        className="h-screen flex items-center justify-center bg-green-500 text-white text-4xl font-bold"
      >
        Scroll Section 1
      </div>

      {/* Section 3 */}
      <div
        ref={(el) => (sectionsRef.current[1] = el)}
        className="h-screen flex items-center justify-center bg-purple-600 text-white text-4xl font-bold"
      >
        Scroll Section 2
      </div>
    </div>
  );
};

export default ScrollImageStack;
