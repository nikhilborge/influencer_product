import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const pathsRef = useRef([]);
  const logosRef = useRef(null);

  useEffect(() => {
    // Animate textPaths on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        pathsRef.current.forEach((path, i) => {
          const offset = -40 + i * 40 + progress * 40;
          path.setAttribute("startOffset", `${offset}%`);
        });
      },
    });

    // Animate logos (move up)
    gsap.fromTo(
      logosRef.current,
      { y: 700 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef}>
      {/* Curved Text */}
      <svg className="w-full mb-40" viewBox="0 0 250 90">
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
        <text className="text-[6px] uppercase" style={{ fill: "red" }}>
          {[...Array(3)].map((_, i) => (
            <textPath
              key={i}
              ref={(el) => (pathsRef.current[i] = el)}
              startOffset={`${i * 40}%`}
              href="#curve"
            >
              Curabitur mattis efficitur velit
            </textPath>
          ))}
        </text>
      </svg>

      {/* Logos Section */}
      <div className="h-[250px] bg-black overflow-hidden">
        <div
          ref={logosRef}
          className="h-full bg-black flex justify-center gap-10 items-center p-10"
        >
          {[...Array(5)].map((_, i) => (
            <img
              key={`img_${i}`}
              className="w-[80px] h-[80px] object-cover"
              src={`/medias/${i + 1}.jpg`}
              alt={`Logo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
