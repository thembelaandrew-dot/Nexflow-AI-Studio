export default function Portfolio() {
  return (
    <section id="featured-work" className="py-24 relative bg-brand-darkBlue/25 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 text-white">Featured Work</h2>
          <p className="text-slate-400 mt-2">A selection of websites and automation solutions built to help organizations establish a stronger digital presence.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glassmorphism rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between group transition-all duration-300 hover:border-brand-cyanAccent/30">
            <div className="relative overflow-hidden aspect-video bg-slate-950 flex items-center justify-center">
              <img src="https://i.imgur.com/XuhJePB.jpeg" alt="W.E.T.H Ministries Website" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" loading="lazy" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1438210159953-cf3f334b5104?auto=format&fit=crop&w=600&q=80'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded bg-brand-electricBlue text-white uppercase tracking-wider">Completed Project</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-brand-cyanAccent font-semibold uppercase tracking-wider block mb-1">Church Website</span>
                <h3 className="text-xl font-bold text-white mb-2">W.E.T.H Ministries Website</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Modern church website designed to showcase ministry activities, service schedules, community events, and visitor information for W.E.T.H Ministries.</p>
              </div>
            </div>
          </div>

          <div className="glassmorphism rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between group transition-all duration-300 hover:border-brand-cyanAccent/30">
            <div className="relative overflow-hidden aspect-video bg-slate-950 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Business Growth Website" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded bg-brand-cyanAccent text-black uppercase tracking-wider font-bold">Project Showcase</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-brand-cyanAccent font-semibold uppercase tracking-wider block mb-1">Business Website</span>
                <h3 className="text-xl font-bold text-white mb-2">Business Growth Website</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Professional business website focused on credibility, customer engagement, and lead generation.</p>
              </div>
            </div>
          </div>

          <div className="glassmorphism rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between group transition-all duration-300 hover:border-brand-cyanAccent/30">
            <div className="relative overflow-hidden aspect-video bg-slate-950 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" alt="AI Workflow Automation" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded bg-purple-600 text-white uppercase tracking-wider font-bold">Solution Showcase</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-brand-cyanAccent font-semibold uppercase tracking-wider block mb-1">Business Automation</span>
                <h3 className="text-xl font-bold text-white mb-2">AI Workflow Automation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Automation systems designed to streamline repetitive business processes and improve operational efficiency.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xs text-slate-500 italic">
            Additional client projects and case studies will continue to be added as NexaFlow AI expands its portfolio and services.
          </p>
        </div>
      </div>
    </section>
  );
}
