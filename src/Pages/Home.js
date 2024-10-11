import React from "react";
import "../styles/base.css";
import Navbar from "../Components/Navbar";
import ZodiacCard from "../Components/ZodiacCard";
import { zodiac } from "../zodiac";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Description from "../Components/Description";
import Footer from "../Components/Footer";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  return (
    <main className="flex flex-col overflow-hidden">
      <Navbar />
      <Description />
      <div className="flex flex-col justify-center items-center">
        {Object.values(zodiac).map((z, index) => (
          <ZodiacCard key={index} sign={z} />
        ))}
      </div>
      <Footer />
    </main>
  );
}

export default Home;
