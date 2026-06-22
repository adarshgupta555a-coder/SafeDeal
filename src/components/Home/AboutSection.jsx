import React from 'react'

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-5 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
      {/* Left: Text */}
      <div>
        <div className="inline-flex items-center gap-2 text-gold text-xs tracking-widest uppercase mb-6 font-light">
          <span className="block w-8 h-px bg-gold/60" />
          About Us
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-6 leading-tight">
          Trusted by Thousands,
          <br />
          <em className="gold-text not-italic font-semibold">Built on Trust</em>
        </h2>
        <p className="text-white/50 font-light text-sm leading-7 mb-5">
          SafeDeal Properties was founded in 2009 with a singular vision: to
          redefine real estate transactions through transparency, integrity, and
          a relentless commitment to client satisfaction. Over 15 years, we've
          grown from a boutique agency into one of India's most respected
          property consultancies.
        </p>
        <p className="text-white/50 font-light text-sm leading-7 mb-8">
          Our team of expert advisors combines deep market knowledge with
          personalized service, ensuring every client — whether first-time buyer
          or seasoned investor — feels guided, informed, and confident
          throughout their journey.
        </p>
        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="stat-card rounded-xl p-4 text-center">
            <div className="font-display text-2xl font-semibold gold-text">
              15+
            </div>
            <div className="text-white/40 text-xs mt-1">Years Exp.</div>
          </div>
          <div className="stat-card rounded-xl p-4 text-center">
            <div className="font-display text-2xl font-semibold gold-text">
              1,200+
            </div>
            <div className="text-white/40 text-xs mt-1">Properties</div>
          </div>
          <div className="stat-card rounded-xl p-4 text-center">
            <div className="font-display text-2xl font-semibold gold-text">
              850+
            </div>
            <div className="text-white/40 text-xs mt-1">Happy Clients</div>
          </div>
          <div className="stat-card rounded-xl p-4 text-center">
            <div className="font-display text-2xl font-semibold gold-text">
              15
            </div>
            <div className="text-white/40 text-xs mt-1">Cities</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#E0B568,#C49A45)",
              color: "#00032E"
            }}
          >
            Work With Us
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-gold/30 text-gold hover:bg-gold/5 transition-all duration-300"
          >
            Browse Properties
          </a>
        </div>
      </div>
      {/* Right: Partner images */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-4">
          {/* Large image */}
          <div className="partner-frame col-span-1 row-span-2 rounded-2xl overflow-hidden h-80">
            <img
              src="/rakesh_bhai.png"
              alt="Partner 1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Small image 1 */}
          <div className="partner-frame rounded-2xl overflow-hidden h-36">
            <img
              src="/rakesh_bhai1.jpeg"
              alt="Partner 2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Quote card */}
          <div
            className="rounded-2xl p-4 flex flex-col justify-center h-36 border border-gold/20"
            style={{
              background:
                "linear-gradient(135deg,rgba(224,181,104,0.08),rgba(224,181,104,0.02))"
            }}
          >
            <div className="text-gold text-3xl font-display leading-none mb-2">
              "
            </div>
            <p className="text-white/60 text-xs font-light leading-relaxed">
              Your dream home is our life's work.
            </p>
            <div className="text-gold text-xs mt-2 font-medium">
              — SafeDeal Team
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-gold/10 -z-10" />
        <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full border border-gold/10 -z-10" />
      </div>
    </div>
  </section>
  )
}

export default AboutSection
