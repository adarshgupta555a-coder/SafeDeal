import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState({
    name: "",
    location: "",
    price: ""
  });

  const onChangeInput = (val) => {
    const { name, value } = val.target;
    setSearch((prev) => ({ ...prev, [name]: value }))
  }
  const onSearch = () => {
  // URLSearchParams ek object hai jo query string banane me help karta hai
  const params = new URLSearchParams();

  // Agar name empty nahi hai (trim se spaces remove ho jate hain)
  // tabhi usse URL me add karo
  if (search.name.trim()) {
    params.append("name", search.name.trim());
  }

  // Agar location empty nahi hai to URL me add karo
  if (search.location.trim()) {
    params.append("location", search.location.trim());
  }

  // Agar price select kiya gaya hai to URL me add karo
  if (search.price.trim()) {
    params.append("price", search.price.trim());
  }

  // Final URL generate karke navigate karo
  // params.toString() automatically query string bana deta hai
  // Example: name=villa&location=ahmedabad
  navigate(`/search?${params.toString()}`);
};
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image (Unsplash) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&auto=format&fit=crop&q=80"
          alt="Luxury home"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />
      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-5 text-center pt-28 pb-16">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 mb-6 text-xs tracking-widest text-gold/80 uppercase font-light"
          style={{ background: "rgba(224,181,104,0.08)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Premium Real Estate
        </div>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-4 text-white">
          Find Your
          <br />
          <em className="gold-text not-italic font-semibold">Dream Home</em>
        </h1>
        <p className="text-white/60 font-light text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Discover exceptional properties tailored to your lifestyle. Curated
          listings from India's most sought-after locations.
        </p>
        {/* Search Box */}
        <div className="hero-search rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto">
          {/* Search input */}
          <div className="relative mb-3">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx={11} cy={11} r={8} />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by location, type, or keyword…"
              className="gold-input w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-light transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff"
              }}
              name='name'
              onChange={onChangeInput}
              value={search?.name}
            />
          </div>
          {/* Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none"
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx={12} cy={10} r={3} />
              </svg>
              <select
                className="gold-input w-full pl-10 pr-4 py-3 rounded-xl text-sm font-light appearance-none cursor-pointer transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.8)"
                }}
                value={search?.location}
                name='location'
                onChange={onChangeInput}
              >
                <option value="" style={{ background: "#050742" }}>
                  Select Location
                </option>
                <option value={"Katargam"} style={{ background: "#050742" }}>
                  Katargam
                </option>
                <option value={"Adajan"} style={{ background: "#050742" }}>
                  Adajan
                </option>
                <option value={"Piplod"} style={{ background: "#050742" }}>
                  Piplod
                </option>
                <option value={"Vesu"} style={{ background: "#050742" }}>
                  Vesu
                </option>
              </select>
            </div>
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none"
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={12} y1={1} x2={12} y2={23} />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <select
                className="gold-input w-full pl-10 pr-4 py-3 rounded-xl text-sm font-light appearance-none cursor-pointer transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.8)"
                }}
                value={search?.price}
                onChange={onChangeInput}
                name='price'
              >
                <option value="" style={{ background: "#050742" }}>
                  Price Range
                </option>
                <option style={{ background: "#050742" }} value={"Under ₹50 Lakh"}>Under ₹50 Lakh</option>
                <option style={{ background: "#050742" }} value={"₹50L – ₹1 Crore"}>₹50L – ₹1 Crore</option>
                <option style={{ background: "#050742" }} value={"₹1Cr – ₹3 Crore"}>₹1Cr – ₹3 Crore</option>
                <option style={{ background: "#050742" }} value={"₹3Cr – ₹5 Crore"}>₹3Cr – ₹5 Crore</option>
                <option style={{ background: "#050742" }} value={"Above ₹5 Crore"}>Above ₹5 Crore</option>
              </select>
            </div>
          </div>
          <button
            className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg,#E0B568,#C49A45)",
              color: "#00032E",
              letterSpacing: "0.1em"
            }}
            onClick={onSearch}
          >
            Search Properties
          </button>
        </div>
        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-center">
          <div>
            <div className="font-display text-3xl font-semibold gold-text">
              1,200+
            </div>
            <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">
              Properties
            </div>
          </div>
          <div className="w-px bg-white/10 self-stretch" />
          <div>
            <div className="font-display text-3xl font-semibold gold-text">
              850+
            </div>
            <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">
              Happy Clients
            </div>
          </div>
          <div className="w-px bg-white/10 self-stretch" />
          <div>
            <div className="font-display text-3xl font-semibold gold-text">
              15+
            </div>
            <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">
              Cities
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 scroll-bounce">
        <a
          href="#places"
          className="flex flex-col items-center gap-1.5 text-white/30 hover:text-gold transition-colors duration-300"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default HeroSection
