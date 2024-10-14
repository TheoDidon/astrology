import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function ZodiacCard({ sign }) {
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const descriptionRef = useRef(null);

  const checkMobileScreen = () => {
    setIsMobile(window.innerWidth < 550);
  };

  useEffect(() => {
    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    return () => {
      window.removeEventListener("resize", checkMobileScreen);
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        toggleActions: "play reverse play reverse",
        start: "top 60%",
        end: "bottom 30%",
      },
    });
    if (isMobile) {
      tl.from(imageRef.current, {
        y: -100,
        duration: 1,
        opacity: 0,
        scale: 0,
      });

      tl.from(descriptionRef.current, {
        x: 200,
        opacity: 0,
        duration: 1,
      });

      tl.to(imageRef.current, {
        y: -15,
        repeat: -1,
        yoyo: true,
      });
    } else {
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
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "ease-in-out",
      });
    }
  });

  function leftImage() {
    return (
      <div className="flex items-center mx-4">
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
      </div>
    );
  }

  function rightImage() {
    return (
      <div className="flex items-center mx-4">
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
      </div>
    );
  }

  function mobileDisplay() {
    return (
      <div className="flex flex-col items-start justify-start mx-4">
        <div className="">
          <img
            ref={imageRef}
            src={sign.image}
            className="zodiac-image object-contain rounded-[1rem]"
            alt=""
          />
        </div>
        <div ref={descriptionRef} className="flex flex-col my-4">
          <p className="font-bold text-4xl mb-4">{sign.name}</p>
          <p className="text-xl">{sign.description}</p>
        </div>
      </div>
    );
  }
  return (
    <div
      ref={containerRef}
      className="flex flex-col max-h-[40vh] my-36 mx-12 lg:max-w-[50vw] "
    >
      {isMobile
        ? mobileDisplay()
        : sign.position === "left"
        ? leftImage()
        : rightImage()}
    </div>
  );
}

export default ZodiacCard;
