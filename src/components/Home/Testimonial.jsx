import React from 'react'

const Testimonial = () => {
  return (
    <div
    className="py-12 px-5 overflow-hidden"
    style={{
      background:
        "linear-gradient(135deg,rgba(224,181,104,0.06),rgba(224,181,104,0.02))",
      borderTop: "1px solid rgba(224,181,104,0.1)",
      borderBottom: "1px solid rgba(224,181,104,0.1)"
    }}
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 rounded-xl border border-gold/10">
          <div className="text-gold text-3xl font-display mb-3">"</div>
          <p className="text-white/50 text-sm font-light leading-relaxed mb-4">
            "SafeDeal helped us find our dream home in record time. Truly
            professional and transparent."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-semibold">
              RG
            </div>
            <div className="text-left">
              <div className="text-white text-xs font-medium">Rahul Gupta</div>
              <div className="text-white/30 text-[10px]">Mumbai</div>
            </div>
          </div>
        </div>
        <div className="text-center p-6 rounded-xl border border-gold/10">
          <div className="text-gold text-3xl font-display mb-3">"</div>
          <p className="text-white/50 text-sm font-light leading-relaxed mb-4">
            "Exceptional service and a curated list of properties. SafeDeal
            exceeded all our expectations."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-semibold">
              PS
            </div>
            <div className="text-left">
              <div className="text-white text-xs font-medium">Priya Sharma</div>
              <div className="text-white/30 text-[10px]">Bengaluru</div>
            </div>
          </div>
        </div>
        <div className="text-center p-6 rounded-xl border border-gold/10">
          <div className="text-gold text-3xl font-display mb-3">"</div>
          <p className="text-white/50 text-sm font-light leading-relaxed mb-4">
            "The team's integrity and knowledge of the market is unparalleled.
            Highly recommended!"
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-semibold">
              AK
            </div>
            <div className="text-left">
              <div className="text-white text-xs font-medium">Arjun Kumar</div>
              <div className="text-white/30 text-[10px]">Delhi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Testimonial
