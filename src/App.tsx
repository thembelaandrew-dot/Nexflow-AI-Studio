/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import BoutiqueAgency from './components/BoutiqueAgency';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PointerGlow from './components/PointerGlow';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import LeadPopup from './components/LeadPopup';

export default function App() {
  return (
    <>
      <PointerGlow />
      <Preloader />
      
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <BoutiqueAgency />
        <Services />
        <Portfolio />
        <Pricing />
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
