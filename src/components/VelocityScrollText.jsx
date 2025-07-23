'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VelocityScrollText() {
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const fgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Looping scroll effect for background (left)
            gsap.to(bgRef.current, {
                xPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Looping scroll effect for foreground (right)
            gsap.to(fgRef.current, {
                xPercent: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const words = [
        'Versatility',
        'Space-Saving Design',
        'Style Statement',
        'Customizable Illumination',
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full py-24 overflow-hidden bg-white"
        >
            {/* Background Looping Track */}
            <div className="absolute inset-0 flex items-center overflow-hidden z-0">
                <div
                    ref={bgRef}
                    className="flex gap-20 whitespace-nowrap will-change-transform"
                >
                    {[...words, ...words, ...words].map((word, i) => (
                        <div
                            key={`bg-${i}`}
                            className="text-6xl font-extrabold text-black/10 tracking-wider"
                        >
                            {word}
                        </div>
                    ))}
                </div>
            </div>

           {/* Foreground Looping Track */}
<div className="relative flex items-center overflow-hidden z-10 w-full">
  <div
    ref={fgRef}
    className="flex gap-10 whitespace-nowrap will-change-transform"
  >
    {/* Prepend the last word manually */}
    <div className="flex items-center gap-3 shrink-0">
      <h5 className="text-2xl font-medium whitespace-nowrap">
        {words[words.length - 1]}
      </h5>
      <span className="text-xl opacity-50">✦</span>
    </div>

    {/* Loop word sets multiple times to fill width */}
    {[...words, ...words, ...words, ...words].map((word, i, arr) => (
      <div key={`fg-${i}`} className="flex items-center gap-3 shrink-0">
        <h5 className="text-2xl font-medium whitespace-nowrap">{word}</h5>
        {i !== arr.length - 1 && (
          <span className="text-xl opacity-50">✦</span>
        )}
      </div>
    ))}

    {/* Append the first word manually to prevent gap at end */}
    <div className="flex items-center gap-3 shrink-0">
      <h5 className="text-2xl font-medium whitespace-nowrap">
        {words[0]}
      </h5>
    </div>
  </div>
</div>


        </section>
    );
}
