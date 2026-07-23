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
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-electricBlue hover:bg-brand-cyanAccent text-white hover:text-black font-bold rounded-xl transition-all shadow-lg text-sm">
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all text-sm">
                <Github className="w-4 h-4" /> View Code
              </a>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          
          {/* Featured Image/Video Placeholder */}
          <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden group">
            <div className="text-center text-slate-500">
              <p className="font-bold tracking-widest uppercase mb-2">Embedded Demo Video / Hero Image</p>
              <p className="text-xs">Placeholder for {project.title}</p>
            </div>
            <div className="absolute inset-0 bg-brand-electricBlue/0 group-hover:bg-brand-electricBlue/5 transition-colors duration-500"></div>
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

              {/* Screenshots Gallery Placeholder */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Screenshots Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center">
                      <span className="text-xs text-slate-600 font-bold uppercase">Screenshot {i}</span>
                    </div>
                  ))}
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
