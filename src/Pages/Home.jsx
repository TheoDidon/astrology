import React from "react";
import "semantic-ui-css/semantic.min.css";
import "../styles/base.css";
import "../index.css";
import Navbar from "../Components/Navbar";
import ZodiacCard from "../Components/ZodiacCard";
import { zodiac } from "../zodiac";
import { frenchZodiac } from "../frenchZodiac";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Description from "../Components/Description";
import Footer from "../Components/Footer";
import { useLanguage } from "../Components/context/useLanguage";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { isFrench } = useLanguage();
  return (
    <main className="flex flex-col overflow-hidden">
      <Navbar isFrench={isFrench} />
      <Description isFrench={isFrench} />
      <div className="flex flex-col justify-center items-center">
        {isFrench
          ? Object.values(frenchZodiac).map((z, index) => (
              <ZodiacCard key={index} sign={z} />
            ))
          : Object.values(zodiac).map((z, index) => (
              <ZodiacCard key={index} sign={z} />
            ))}
      </div>
      <Footer />
    </main>
  );
}

export default Home;
