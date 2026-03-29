import React from 'react'

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-5 max-w-7xl mx-auto">
            <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 text-gold text-xs tracking-widest uppercase mb-4 font-light">
                    <span className="block w-8 h-px bg-gold/60" />
                    Get In Touch
                    <span className="block w-8 h-px bg-gold/60" />
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-3">
                    Let's Find Your{" "}
                    <em className="gold-text not-italic font-semibold">Perfect Home</em>
                </h2>
                <p className="text-white/40 font-light max-w-md mx-auto text-sm leading-relaxed">
                    Reach out to our experts and we'll guide you every step of the way.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div
                    className="rounded-2xl p-6 sm:p-8 border border-white/5"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                >
                    <h3 className="font-display text-2xl font-semibold text-white mb-6">
                        Send a Message
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase font-light">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Rahul Gupta"
                                    className="gold-input w-full px-4 py-3 rounded-xl text-sm font-light transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#fff"
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase font-light">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="rahul@email.com"
                                    className="gold-input w-full px-4 py-3 rounded-xl text-sm font-light transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#fff"
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase font-light">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="+91 98765 43210"
                                className="gold-input w-full px-4 py-3 rounded-xl text-sm font-light transition-all duration-300"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#fff"
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase font-light">
                                Looking For
                            </label>
                            <select
                                className="gold-input w-full px-4 py-3 rounded-xl text-sm font-light appearance-none transition-all duration-300"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "rgba(255,255,255,0.7)"
                                }}
                            >
                                <option style={{ background: "#050742" }}>Buy a Property</option>
                                <option style={{ background: "#050742" }}>Rent a Property</option>
                                <option style={{ background: "#050742" }}>Sell a Property</option>
                                <option style={{ background: "#050742" }}>
                                    Investment Consultation
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase font-light">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Tell us about your requirements…"
                                className="gold-input w-full px-4 py-3 rounded-xl text-sm font-light transition-all duration-300 resize-none"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#fff"
                                }}
                                defaultValue={""}
                            />
                        </div>
                        <button
                            className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                background: "linear-gradient(135deg,#E0B568,#C49A45)",
                                color: "#00032E",
                                letterSpacing: "0.08em"
                            }}
                        >
                            Send Message
                        </button>
                    </div>
                    {/* Contact quick links */}
                    <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-4">
                        <a
                            href="tel:+919876543210"
                            className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors duration-300 text-xs"
                        >
                            <svg
                                width={13}
                                height={13}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            +91 98765 43210
                        </a>
                        <a
                            href="mailto:info@safedeal.in"
                            className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors duration-300 text-xs"
                        >
                            <svg
                                width={13}
                                height={13}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            info@safedeal.in
                        </a>
                    </div>
                </div>
                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-white/5 relative h-full min-h-[400px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59541.06421961612!2d72.80464284793031!3d21.1397986245957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be051cc2121e169%3A0xe5144dafaf376dd!2sUdhana%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1774763753214!5m2!1sen!2sin"
                        className="w-full h-full min-h-[400px] grayscale contrast-125"
                        style={{
                            border: 0,
                            filter:
                                "grayscale(100%) invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)"
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    {/* Map overlay card */}
                    <div
                        className="absolute top-4 left-4 right-4 rounded-xl p-4 border border-gold/20"
                        style={{
                            background: "rgba(0,3,46,0.85)",
                            backdropFilter: "blur(12px)"
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: "linear-gradient(135deg,#E0B568,#C49A45)" }}
                            >
                                <svg
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#00032E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx={12} cy={10} r={3} />
                                </svg>
                            </div>
                            <div>
                                <div className="text-white text-xs font-medium">
                                    SafeDeal Properties HQ
                                </div>
                                <div className="text-white/40 text-[10px]">
                                    SG Highway, Ahmedabad, Gujarat 380054
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30">
                            <span>Mon–Sat: 9am – 7pm</span>
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Open Now
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
