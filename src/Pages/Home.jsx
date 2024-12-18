import React from 'react'
import HeroSection from '../Components/HeroSection'
import Features from '../Components/LandingPage/Features'
import HowItWorks from '../Components/LandingPage/HowItWorks'
import Testimonials from '../Components/LandingPage/Testimonials'
import CTA from '../Components/LandingPage/CTA'


const Home = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  )
}

export default Home
