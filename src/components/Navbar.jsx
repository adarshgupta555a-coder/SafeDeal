import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('header');
            if (window.scrollY > 40) {
                nav.style.background = 'rgba(0,3,46,0.92)';
            } else {
                nav.style.background = 'rgba(0,3,46,0.75)';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onToggleModal = () => {
        console.log("object")
        setOpen(prev => !prev);
    };
    return (
        <header className="glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center border border-gold/40"
                            style={{ background: "linear-gradient(135deg,#E0B568,#C49A45)" }}
                        >
                            <svg
                                width={18}
                                height={18}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#00032E"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <div className="leading-tight">
                            <span className="font-display text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">
                                SafeDeal
                            </span>
                            <span className="block text-[10px] tracking-[0.2em] text-gold/70 uppercase font-body font-light">
                                Properties
                            </span>
                        </div>
                    </a>
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/"
                        >
                            Home
                        </Link>
                        <Link
                            to="/properties"
                            className="nav-link text-sm text-white/80 hover:text-gold transition-colors duration-300 font-light tracking-wide"
                        >
                            Properties
                        </Link>
                        <a
                            href="#about"
                            className="nav-link text-sm text-white/80 hover:text-gold transition-colors duration-300 font-light tracking-wide"
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            className="nav-link text-sm text-white/80 hover:text-gold transition-colors duration-300 font-light tracking-wide"
                        >
                            Contact
                        </a>
                    </nav>
                    {/* CTA Button + Hamburger */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#properties"
                            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                            style={{
                                background: "linear-gradient(135deg,#E0B568,#C49A45)",
                                color: "#00032E"
                            }}
                        >
                            <svg
                                width={14}
                                height={14}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx={11} cy={11} r={8} />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            Search
                        </a>
                        <button
                            id="hamburger"
                            className="md:hidden p-2 rounded-lg border border-white/10 text-white/80 hover:border-gold/40 hover:text-gold transition-all duration-300"
                            onClick={onToggleModal}
                        >
                            <svg
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1={3} y1={6} x2={21} y2={6} />
                                <line x1={3} y1={12} x2={21} y2={12} />
                                <line x1={3} y1={18} x2={21} y2={18} />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div
                    id="mobile-menu"
                    className={`md:hidden flex-col gap-1 pb-4 border-t border-white/5 ${open ? "open" : "hidden"
                        }`}
                >
                    <a
                        href="#"
                        className="block px-3 py-3 text-sm text-white/80 hover:text-gold transition-colors duration-200"
                    >
                        Home
                    </a>
                    <a
                        href="#properties"
                        className="block px-3 py-3 text-sm text-white/80 hover:text-gold transition-colors duration-200"
                    >
                        Properties
                    </a>
                    <a
                        href="#about"
                        className="block px-3 py-3 text-sm text-white/80 hover:text-gold transition-colors duration-200"
                    >
                        About
                    </a>
                    <a
                        href="#contact"
                        className="block px-3 py-3 text-sm text-white/80 hover:text-gold transition-colors duration-200"
                    >
                        Contact
                    </a>
                    <a
                        href="#properties"
                        className="mt-2 mx-3 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium"
                        style={{
                            background: "linear-gradient(135deg,#E0B568,#C49A45)",
                            color: "#00032E"
                        }}
                    >
                        Search Properties
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Navbar
