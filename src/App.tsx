/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import BoutiqueAgency from './components/BoutiqueAgency';
import Services from './components/Services';
import PortfolioPreview from './components/PortfolioPreview';
import PainPoints from './components/PainPoints';
import Pricing from './components/Pricing';
import Referral from './components/Referral';
import OurProcess from './components/OurProcess';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PointerGlow from './components/PointerGlow';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import LeadPopup from './components/LeadPopup';

import PortfolioPage from './pages/PortfolioPage';
import ProjectPage from './pages/ProjectPage';

function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <BoutiqueAgency />
        <Services />
        <OurProcess />
        <PortfolioPreview />
        <PainPoints />
        <Pricing />
        <Referral />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      
      <Chatbot />
      <LeadPopup />
      <ScrollToTop />
    </>
  );
}

import { CurrencyProvider } from './lib/CurrencyContext';

export default function App() {
  return (
    <CurrencyProvider>
      <Router>
        <ScrollToHashElement />
        <PointerGlow />
        <Preloader />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<ProjectPage />} />
        </Routes>
      </Router>
    </CurrencyProvider>
  );
}
