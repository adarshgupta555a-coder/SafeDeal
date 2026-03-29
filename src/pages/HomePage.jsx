import React from 'react'
import HeroSection from "../components/Home/HeroSection";
import PreferencesProp from "../components/Home/PreferencesProp";
import LastestProperty from "../components/Home/LatestProperty";
import AboutSection from "../components/Home/AboutSection";
import Testimonial from "../components/Home/Testimonial";
import ContactSection from "../components/Home/ContactSection";
import FooterSection from "../components/Home/FooterSection";
const HomePage = () => {
    return (
        <>
            {/* ============================================================ HERO */}
            <HeroSection />
            {/* ============================================================ PREFERRED PLACES */}
            <PreferencesProp />
            {/* ============================================================ LATEST PROPERTIES */}
            <LastestProperty/>
            {/* ============================================================ ABOUT */}
            <AboutSection/>
            {/* ============================================================ TESTIMONIALS BANNER */}
            <Testimonial/>
            {/* ============================================================ CONTACT */}
            <ContactSection/>
            {/* ============================================================ FOOTER */}
            <FooterSection/>
        </>
    )
}

export default HomePage
