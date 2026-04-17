import React from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Hero from "@/components/home/Hero";
import AboutIntro from "@/components/home/AboutIntro";
import PressMarquee from "@/components/home/PressMarquee";
import Services from "@/components/home/Services";
import MeetLaura from "@/components/home/MeetLaura";
import ChooseExperience from "@/components/home/ChooseExperience";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import BlogPreview from "@/components/home/BlogPreview";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="bg-ivory">
      <Navbar />
      <main>
        <Hero />
        <AboutIntro />
        <PressMarquee />
        <Services />
        <MeetLaura />
        <ChooseExperience />
        <ClientsMarquee />
        <BlogPreview />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}