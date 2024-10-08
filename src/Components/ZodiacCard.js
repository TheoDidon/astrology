import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function ZodiacCard({ sign }) {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const descriptionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        toggleActions: "play none none reverse",
        start: "top 50%",
        end: "bottom 50%",
      },
    });
    tl.from(imageRef.current, {
      y: 500,
      duration: 1,
      opacity: 0,
      rotate: 90,
      scale: 2,
    });

    tl.from(descriptionRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
    });
    tl.to(imageRef.current, {
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "ease-in-out",
    });
  });

  function leftImage() {
    return (
      <>
        <div className="mx-4">
          <img
            ref={imageRef}
            src={sign.image}
            className="zodiac-image object-contain rounded-[1rem]"
            alt=""
          />
        </div>
        <div ref={descriptionRef} className="flex flex-col">
          <p className="font-bold text-4xl mb-4">{sign.name}</p>
          <p className="text-xl">{sign.description}</p>
        </div>
      </>
    );
  }

  function rightImage() {
    return (
      <>
        <div ref={descriptionRef} className="flex flex-col">
          <p className="font-bold text-4xl mb-4">{sign.name}</p>
          <p className="text-xl">{sign.description}</p>
        </div>
        <div className="mx-4">
          <img
            ref={imageRef}
            src={sign.image}
            className="zodiac-image object-contain rounded-[1rem]"
            alt=""
          />
        </div>
      </>
    );
  }
  return (
    <div ref={containerRef} className="flex max-h-[40vh] my-36 mx-12 ">
      {sign.position === "left" ? leftImage() : rightImage()}
    </div>
  );
}

export default ZodiacCard;
