import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { playSynthBeep } from '../lib/audio';
import ScrollToTop from '../components/ScrollToTop';
import Chatbot from '../components/Chatbot';

export default function ProjectPage() {
  const { id } = useParams();

  const projectsData: Record<string, any> = {
    'nomas-kitchen': {
      title: "NOMA'S Kitchen",
      category: "Restaurant Website",
      client: "NOMA'S Kitchen",
      challenge: "NOMA'S Kitchen needed a digital storefront that matched the high quality of their culinary offerings. Their previous setup lacked a proper ordering system, making it difficult for customers to view the menu and place orders seamlessly. They needed a fast, mobile-friendly solution to capture local delivery traffic.",
      solution: "We designed and developed a bespoke, high-performance web application tailored for food delivery and catering inquiries. The focus was on high-quality imagery, clear calls-to-action, and a frictionless mobile experience.",
      tech: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
      features: [
        "Dynamic Menu Display",
        "Mobile-First Responsive Layout",
        "Integrated Contact & Ordering Flow",
        "Fast Loading Architecture",
        "SEO Optimized"
      ],
      results: "The new website resulted in a 40% increase in online inquiries and a significant boost in mobile user engagement within the first month of launch.",
      lessons: "Balancing high-quality food photography with fast load times required careful asset optimization and lazy loading techniques."
    },
    'church-website': {
      title: "Church Website",
      category: "Business / Church Website",
      client: "Local Ministry",
      challenge: "The church was struggling to keep their congregation informed and engaged outside of Sunday services. They needed a centralized hub for announcements, sermon recordings, event registrations, and a secure way to accept online tithes and offerings.",
      solution: "We built a warm, inviting website that serves as a digital home for the community. It includes a built-in media player for sermons, an integrated events calendar, and a secure payment gateway for donations.",
      tech: ['React', 'Next.js', 'Stripe', 'CMS'],
      features: [
        "Sermon Audio & Video Archive",
        "Secure Online Giving",
        "Event Calendar & Registration",
        "Volunteer Sign-up Forms",
        "Responsive Design"
      ],
      results: "Online engagement increased by 60%, and online giving became the primary method for donations within three months.",
      lessons: "Designing for a multi-generational audience meant keeping the navigation extremely simple and accessible."
    },
    'ai-lead-generation': {
      title: "AI Lead Generation Automation",
      category: "Automation Showcase",
      client: "Internal / Showcase",
      challenge: "Many businesses lose potential clients because they fail to respond to inquiries quickly or lose track of leads in messy inboxes. Manual lead qualification is time-consuming and prone to human error.",
      solution: "We engineered an end-to-end AI automation pipeline. When a lead submits an inquiry, an AI chatbot qualifies them, extracts key data, automatically populates a CRM (like Google Sheets), and triggers a personalized email sequence.",
      tech: ['Node.js', 'Gemini AI', 'Make/Zapier', 'EmailJS'],
      features: [
        "Intelligent Chatbot Qualification",
        "Automated CRM Data Entry",
        "Instant Email Follow-ups",
        "Lead Scoring",
        "24/7 Availability"
      ],
      results: "Response times dropped from hours to seconds. Lead conversion rates increased by 35% due to immediate, personalized follow-ups.",
      lessons: "Prompt engineering is critical. Ensuring the AI stays on script and gracefully hands over complex queries to humans was the biggest hurdle we solved."
    }
  };

  const project = projectsData[id || ''] || projectsData['nomas-kitchen'];

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-[#010309]">
        
        {/* Hero Section */}
        <div className="bg-brand-deep border-b border-white/5 pt-20 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-electricBlue/20 via-transparent to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium"
              onClick={() => playSynthBeep(400, 0.1)}
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            
            <div className="mb-4">
              <span className="text-xs text-brand-cyanAccent uppercase tracking-widest font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full">{project.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8">
              {project.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://nexacasestudy.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-electricBlue hover:bg-brand-cyanAccent text-white hover:text-black font-bold rounded-xl transition-all shadow-lg text-sm"
                onClick={() => playSynthBeep(700, 0.08)}
              >
                <ExternalLink className="w-4 h-4" /> Live Case Study
              </a>
              <a 
                href="https://wa.me/26879375018?text=Hi%2C%20I'm%20interested%20in%20a%20project%20similar%20to%20this" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all text-sm"
                onClick={() => playSynthBeep(550, 0.05)}
              >
                Inquire About Similar Build
              </a>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          
          {/* Featured Project Showcase Window */}
          <div className="aspect-video rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl relative overflow-hidden flex flex-col">
            {/* Top Browser Bar */}
            <div className="px-4 py-3 bg-slate-800/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="px-6 py-1 rounded-md bg-slate-900/90 border border-white/5 text-[11px] text-slate-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.digital
              </div>
              <span className="text-[10px] text-brand-cyanAccent uppercase font-bold tracking-wider">Production Build</span>
            </div>

            {/* Showcase Stage */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-gradient-to-b from-slate-900 to-[#02050c]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-electricBlue/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-4 max-w-lg">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-xs font-semibold">
                  {project.category}
                </span>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{project.solution}</p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <a
                    href="https://nexacasestudy.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-electricBlue hover:bg-brand-cyanAccent hover:text-black text-white text-xs font-bold transition-all"
                  >
                    <span>View Interactive Experience</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
                <p className="text-slate-400 leading-relaxed">{project.challenge}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">The Solution</h2>
                <p className="text-slate-400 leading-relaxed">{project.solution}</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Development Process</h2>
                <p className="text-slate-400 leading-relaxed">
                  We followed our agile methodology, starting with a comprehensive design phase to establish the visual language. Development was executed in sprints, focusing first on core layout and mobile responsiveness, followed by integration of interactive elements and performance optimization.
                </p>
              </section>

              {/* Core Architecture & Technical Highlights */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Technical Highlights & Architecture</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                    <p className="text-brand-cyanAccent font-mono text-xs font-bold uppercase tracking-wider">01 // Architecture</p>
                    <h3 className="text-white font-bold text-sm">Ultra-Low Latency</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Engineered with modular code splitting and CDN asset distribution for sub-second page loads globally.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                    <p className="text-brand-electricBlue font-mono text-xs font-bold uppercase tracking-wider">02 // Automation</p>
                    <h3 className="text-white font-bold text-sm">Instant Lead Capture</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Automated webhook routing pushes new inquiries directly to stakeholder channels within seconds.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                    <p className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">03 // Experience</p>
                    <h3 className="text-white font-bold text-sm">Mobile-First Gestures</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Custom touch optimization and zero-CLS typography crafted specifically for modern high-DPI screens.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                    <p className="text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">04 // Conversion</p>
                    <h3 className="text-white font-bold text-sm">Conversion Lift</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Engineered user funnels designed to minimize drop-off and maximize client discovery.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Final Result & Impact</h2>
                <p className="text-slate-400 leading-relaxed">{project.results}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Lessons Learned</h2>
                <p className="text-slate-400 leading-relaxed">{project.lessons}</p>
              </section>

            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-black border border-slate-800 text-slate-300 text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyanAccent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
      <Chatbot />
      <ScrollToTop />
    </>
  );
}
