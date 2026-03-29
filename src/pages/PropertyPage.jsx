import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import supabase from '../database/supabase';
import getCurrencyName from '../utils/getCurrencyName';

const PropertyPage = () => {
    const [url, setUrl] = useState(null);
    const [features, setFeatures] = useState('tab-overview');
    const [property, setProperty] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        getProperty()
    }, [])

    const switchImg = (urlData, mediaType = "image") => {
        console.log(url)
        setUrl({ mediaUrl: urlData, mediaType })
    }

    const getProperty = async () => {
        const { data, error } = await supabase
            .from("properties")
            .select(`
                  id,
                  name,
                  image,
                  media,
                  price,
                  location (
                  name
                )
            `)
            .single()
            .eq("id", id)

            if (!error) {
                setProperty(data)
                console.log(data)
            }
    }

    return (
        <>
            {/* ════════════════════════════════════════ BREADCRUMB + HEADER */}
            <section className="pt-[88px] pb-0">
                <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-6 pb-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-[11px] text-white/30 mb-6 flex-wrap">
                        <a href="#" className="hover:text-gold transition-colors">
                            Home
                        </a>
                        <span className="bc-sep">/</span>
                        <a href="#" className="hover:text-gold transition-colors">
                            Properties
                        </a>
                        <span className="bc-sep">/</span>
                        <a href="#" className="hover:text-gold transition-colors">
                            Mumbai
                        </a>
                        <span className="bc-sep">/</span>
                        <span className="text-gold/70">{property?.name}</span>
                    </nav>
                    {/* Page title row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                        <div className="fade-up">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span
                                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
                                    style={{ background: "#E0B568", color: "#00032E" }}
                                >
                                    For Sale
                                </span>
                                <span
                                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold border border-gold/30 text-gold"
                                    style={{ background: "rgba(224,181,104,0.08)" }}
                                >
                                    New Listing
                                </span>
                                <span
                                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold border border-emerald-500/40 text-emerald-400"
                                    style={{ background: "rgba(52,211,153,0.06)" }}
                                >
                                    <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 align-middle" />
                                    Verified
                                </span>
                            </div>
                            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
                                <em className="gold-text not-italic font-semibold">{property?.name}</em>
                            </h1>
                            <div className="flex items-center gap-1.5 mt-2 text-white/40 text-sm">
                                <svg
                                    width={13}
                                    height={13}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#E0B568"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx={12} cy={10} r={3} />
                                </svg>
                                <span>{property?.location?.name}</span>
                            </div>
                        </div>
                        <div className="fade-up-d1 text-left sm:text-right flex-shrink-0">
                            <div className="font-display text-4xl sm:text-5xl font-semibold gold-text leading-none">
                                ₹{property?.price?getCurrencyName(property?.price):property?.price}
                            </div>
                            <div className="text-white/30 text-xs mt-1">
                                ₹17,708 / sq.ft · Price Negotiable
                            </div>
                            <div className="flex items-center sm:justify-end gap-1 mt-2">
                                <span className="star text-sm">★★★★★</span>
                                <span className="text-white/40 text-xs">(48 reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ════════════════════════════════════════ MAIN CONTENT GRID */}
            <main className="max-w-7xl mx-auto px-5 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 items-start">
                    {/* ─────────────────── LEFT: MEDIA + DETAILS ─────────────── */}
                    <div className="space-y-7">
                        {/* ── Main Gallery ── */}
                        <div
                            className="fade-up rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
                            style={{ background: "rgba(6,8,60,0.5)" }}
                        >
                            {/* Main image */}
                            <div className="main-image-wrap relative w-full h-[280px] sm:h-[380px] lg:h-[440px] cursor-zoom-in">
                                {url?.mediaType === "image" ? (<img
                                    id="mainImg"
                                    src={url.mediaUrl || property?.image || "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=85"}
                                    alt="Luxury Sky Villa – Main View"
                                    className="w-full h-full object-cover"
                                />) : url?.mediaType === "video" ? (
                                    <video
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        controls
                                    >
                                        <source
                                            src={url.mediaUrl || "https://cdn.pixabay.com/video/2022/03/16/110923-689949643_large.mp4"}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>) : (<img
                                        id="mainImg"
                                        src={url?.mediaUrl || property?.image || "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=85"}
                                        alt="Luxury Sky Villa – Main View"
                                        className="w-full h-full object-cover"
                                    />)}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
                                {/* Image counter */}
                                <div
                                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium"
                                    style={{
                                        background: "rgba(0,3,46,0.75)",
                                        backdropFilter: "blur(8px)",
                                        border: "1px solid rgba(255,255,255,0.1)"
                                    }}
                                >
                                    <span id="imgCounter">1</span> / 6
                                </div>
                                {/* Fullscreen hint */}
                                <div
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                                    style={{
                                        background: "rgba(0,3,46,0.6)",
                                        backdropFilter: "blur(8px)",
                                        border: "1px solid rgba(255,255,255,0.12)"
                                    }}
                                    title="View fullscreen"
                                >
                                    <svg
                                        width={12}
                                        height={12}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                    </svg>
                                </div>
                                {/* Favourite */}
                                <button
                                    className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                                    style={{
                                        background: "rgba(0,3,46,0.6)",
                                        backdropFilter: "blur(8px)",
                                        border: "1px solid rgba(255,255,255,0.12)"
                                    }}
                                    onclick="this.classList.toggle('liked'); this.querySelector('svg').style.fill = this.classList.contains('liked') ? '#E0B568' : 'none'; this.querySelector('svg').style.stroke = this.classList.contains('liked') ? '#E0B568' : 'white';"
                                >
                                    <svg
                                        width={13}
                                        height={13}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ transition: "all .3s" }}
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </button>
                            </div>
                            {/* Thumbnails row */}
                            <div className="p-3 grid grid-cols-6 gap-2">
                                {/* Thumb 1 (active) */}
                                {property?.media?.images?.map((image,index)=> <div
                                    key={index}
                                    className="gal-thumb active rounded-xl overflow-hidden h-14 sm:h-16 cursor-pointer"
                                    onClick={() => switchImg(image)}
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>)}
                                {/* Thumb 4 */}
                              
                            
                                {/* Thumb 6: Video */}
                                 {property?.media?.video?.map((video,index)=> <div
                                    className="gal-thumb rounded-xl overflow-hidden h-14 sm:h-16 cursor-pointer relative"
                                    onClick={() => switchImg(video, "video")}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300&auto=format&fit=crop&q=75"
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-navy/40">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center"
                                            style={{ background: "rgba(224,181,104,0.8)" }}
                                        >
                                            <svg width={8} height={8} viewBox="0 0 24 24" fill="#00032E">
                                                <polygon points="5,3 19,12 5,21" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                        {/* ── Tab Navigation ── */}
                        <div className="fade-up-d1">
                            <div className="flex gap-0 border-b border-white/8 mb-5">
                                <button
                                    className="tab-btn active px-5 py-3 text-xs tracking-wide font-medium"
                                    onClick={() => setFeatures('tab-overview')}
                                >
                                    Overview
                                </button>
                                <button
                                    className="tab-btn px-5 py-3 text-xs tracking-wide font-medium text-white/40"
                                    onClick={() => setFeatures('tab-amenities')}
                                >
                                    Amenities
                                </button>
                                <button
                                    className="tab-btn px-5 py-3 text-xs tracking-wide font-medium text-white/40"
                                    onClick={() => setFeatures('tab-floorplan')}
                                >
                                    Floor Plan
                                </button>
                                <button
                                    className="tab-btn px-5 py-3 text-xs tracking-wide font-medium text-white/40"
                                    onClick={() => setFeatures('tab-location')}
                                >
                                    Location
                                </button>
                            </div>
                            {/* ── Tab: Overview ── */}
                            {features === "tab-overview" && <div id="tab-overview" className="tab-pane active space-y-7">
                                {/* Key Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="stat-pill rounded-xl p-4 text-center">
                                        <div className="text-gold mb-1">
                                            <svg
                                                className="mx-auto"
                                                width={20}
                                                height={20}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                <polyline points="9 22 9 12 15 12 15 22" />
                                            </svg>
                                        </div>
                                        <div className="font-display text-xl font-semibold text-white">
                                            4
                                        </div>
                                        <div className="text-white/35 text-[10px] mt-0.5 uppercase tracking-wider">
                                            Bedrooms
                                        </div>
                                    </div>
                                    <div className="stat-pill rounded-xl p-4 text-center">
                                        <div className="text-gold mb-1">
                                            <svg
                                                className="mx-auto"
                                                width={20}
                                                height={20}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M4 12h16M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6H4V6z" />
                                                <path d="M2 18h20v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2z" />
                                            </svg>
                                        </div>
                                        <div className="font-display text-xl font-semibold text-white">
                                            3
                                        </div>
                                        <div className="text-white/35 text-[10px] mt-0.5 uppercase tracking-wider">
                                            Bathrooms
                                        </div>
                                    </div>
                                    <div className="stat-pill rounded-xl p-4 text-center">
                                        <div className="text-gold mb-1">
                                            <svg
                                                className="mx-auto"
                                                width={20}
                                                height={20}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect x={3} y={3} width={18} height={18} rx={2} />
                                                <path d="M3 9h18M9 21V9" />
                                            </svg>
                                        </div>
                                        <div className="font-display text-xl font-semibold text-white">
                                            2,400
                                        </div>
                                        <div className="text-white/35 text-[10px] mt-0.5 uppercase tracking-wider">
                                            Sq. Ft.
                                        </div>
                                    </div>
                                    <div className="stat-pill rounded-xl p-4 text-center">
                                        <div className="text-gold mb-1">
                                            <svg
                                                className="mx-auto"
                                                width={20}
                                                height={20}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M12 8v4l3 3" />
                                            </svg>
                                        </div>
                                        <div className="font-display text-xl font-semibold text-white">
                                            2019
                                        </div>
                                        <div className="text-white/35 text-[10px] mt-0.5 uppercase tracking-wider">
                                            Year Built
                                        </div>
                                    </div>
                                </div>
                                {/* Description */}
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-white mb-3">
                                        About This Property
                                    </h3>
                                    <p className="text-white/45 text-sm font-light leading-7 mb-3">
                                        Perched high above the Arabian Sea, this stunning 4-bedroom sky
                                        villa redefines luxury living in Mumbai. The property commands
                                        breathtaking panoramic ocean views from every principal room,
                                        blending architectural grandeur with meticulous interior
                                        craftsmanship.
                                    </p>
                                    <p className="text-white/45 text-sm font-light leading-7 mb-3">
                                        The open-plan living and dining area features 12-foot
                                        floor-to-ceiling glazing, Italian marble flooring, and a bespoke
                                        chef's kitchen fitted with premium European appliances. Each
                                        bedroom is en-suite, with the master suite offering a private
                                        terrace, walk-in wardrobe, and a spa-style bathroom with
                                        freestanding tub.
                                    </p>
                                    <p className="text-white/45 text-sm font-light leading-7">
                                        Residents enjoy access to world-class building amenities
                                        including an infinity pool, fully-equipped gymnasium, landscaped
                                        rooftop garden, and 24×7 concierge service — all within minutes
                                        of Bandra's finest restaurants, schools, and the Bandra–Worli
                                        Sea Link.
                                    </p>
                                </div>
                                {/* Property Details Table */}
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-white mb-4">
                                        Property Details
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/5">
                                        <div
                                            className="flex justify-between items-center px-4 py-3 border-b border-r border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <span className="text-white/40 text-xs">Property Type</span>
                                            <span className="text-white text-xs font-medium">
                                                Sky Villa / Apartment
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between items-center px-4 py-3 border-b border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <span className="text-white/40 text-xs">Status</span>
                                            <span className="text-emerald-400 text-xs font-medium">
                                                Ready to Move
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-4 py-3 border-b border-r border-white/5">
                                            <span className="text-white/40 text-xs">Floor</span>
                                            <span className="text-white text-xs font-medium">
                                                32nd Floor
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-4 py-3 border-b border-white/5">
                                            <span className="text-white/40 text-xs">Total Floors</span>
                                            <span className="text-white text-xs font-medium">
                                                38 Floors
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between items-center px-4 py-3 border-b border-r border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <span className="text-white/40 text-xs">Carpet Area</span>
                                            <span className="text-white text-xs font-medium">
                                                2,400 sq.ft.
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between items-center px-4 py-3 border-b border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <span className="text-white/40 text-xs">Super Built-up</span>
                                            <span className="text-white text-xs font-medium">
                                                3,100 sq.ft.
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-4 py-3 border-r border-white/5">
                                            <span className="text-white/40 text-xs">Facing</span>
                                            <span className="text-white text-xs font-medium">
                                                Sea-Facing West
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center px-4 py-3">
                                            <span className="text-white/40 text-xs">Parking</span>
                                            <span className="text-white text-xs font-medium">
                                                2 Covered Slots
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Highlights */}
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-white mb-4">
                                        Highlights
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        <div
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <svg
                                                className="text-gold flex-shrink-0"
                                                width={14}
                                                height={14}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-white/60 text-xs">
                                                Panoramic Sea View
                                            </span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <svg
                                                className="text-gold flex-shrink-0"
                                                width={14}
                                                height={14}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-white/60 text-xs">
                                                Italian Marble Floors
                                            </span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <svg
                                                className="text-gold flex-shrink-0"
                                                width={14}
                                                height={14}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-white/60 text-xs">Private Terrace</span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <svg
                                                className="text-gold flex-shrink-0"
                                                width={14}
                                                height={14}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-white/60 text-xs">
                                                Smart Home System
                                            </span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <svg
                                                className="text-gold flex-shrink-0"
                                                width={14}
                                                height={14}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-white/60 text-xs">Chef's Kitchen</span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)" }}
                                        >
                                            <svg
                                                className="text-gold flex-shrink-0"
                                                width={14}
                                                height={14}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-white/60 text-xs">Spa Bathroom</span>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {/* ── Tab: Amenities ── */}
                            {features === "tab-amenities" && <div id="tab-amenities" className="tab-pane active space-y-7">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {/* Amenity: Pool */}
                                    <div
                                        className="amenity-card rounded-xl p-4 text-center border border-white/5 cursor-default"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: "rgba(224,181,104,0.1)",
                                                border: "1px solid rgba(224,181,104,0.2)"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#E0B568"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M2 12h20M2 12c0-5 2-7 5-7s5 4 5 4 2-4 5-4 5 2 5 7M2 12c0 5 2 7 5 7s5-4 5-4 2 4 5 4 5-2 5-7" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-xs font-medium">
                                            Infinity Pool
                                        </div>
                                        <div className="text-white/30 text-[10px] mt-0.5">Rooftop</div>
                                    </div>
                                    {/* Amenity: Gym */}
                                    <div
                                        className="amenity-card rounded-xl p-4 text-center border border-white/5 cursor-default"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: "rgba(224,181,104,0.1)",
                                                border: "1px solid rgba(224,181,104,0.2)"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#E0B568"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M6.5 6.5h11M6.5 17.5h11M4 12h16M4 12l-2-3M4 12l-2 3M20 12l2-3M20 12l2 3" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-xs font-medium">Gymnasium</div>
                                        <div className="text-white/30 text-[10px] mt-0.5">
                                            Fully Equipped
                                        </div>
                                    </div>
                                    {/* Amenity: Parking */}
                                    <div
                                        className="amenity-card rounded-xl p-4 text-center border border-white/5 cursor-default"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: "rgba(224,181,104,0.1)",
                                                border: "1px solid rgba(224,181,104,0.2)"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#E0B568"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect x={3} y={3} width={18} height={18} rx={2} />
                                                <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-xs font-medium">Parking</div>
                                        <div className="text-white/30 text-[10px] mt-0.5">
                                            2 Covered Slots
                                        </div>
                                    </div>
                                    {/* Amenity: Security */}
                                    <div
                                        className="amenity-card rounded-xl p-4 text-center border border-white/5 cursor-default"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: "rgba(224,181,104,0.1)",
                                                border: "1px solid rgba(224,181,104,0.2)"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#E0B568"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-xs font-medium">
                                            24×7 Security
                                        </div>
                                        <div className="text-white/30 text-[10px] mt-0.5">
                                            CCTV + Guards
                                        </div>
                                    </div>
                                    {/* Amenity: Lift */}
                                    <div
                                        className="amenity-card rounded-xl p-4 text-center border border-white/5 cursor-default"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: "rgba(224,181,104,0.1)",
                                                border: "1px solid rgba(224,181,104,0.2)"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#E0B568"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect x={5} y={2} width={14} height={20} rx={2} />
                                                <path d="M9 10l3-3 3 3M9 14l3 3 3-3" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-xs font-medium">
                                            High-Speed Lift
                                        </div>
                                        <div className="text-white/30 text-[10px] mt-0.5">
                                            4 Elevators
                                        </div>
                                    </div>
                                    {/* Amenity: Concierge */}
                                    <div
                                        className="amenity-card rounded-xl p-4 text-center border border-white/5 cursor-default"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: "rgba(224,181,104,0.1)",
                                                border: "1px solid rgba(224,181,104,0.2)"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#E0B568"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx={12} cy={7} r={4} />
                                            </svg>
                                        </div>
                                        <div className="text-white text-xs font-medium">Concierge</div>
                                        <div className="text-white/30 text-[10px] mt-0.5">
                                            24hr Service
                                        </div>
                                    </div>
                                    {/* Amenity: Garden */}
                                    <div
                                        className="amenity-card rounded-xl p-4 text-center border border-white/5 cursor-default"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: "rgba(224,181,104,0.1)",
                                                border: "1px solid rgba(224,181,104,0.2)"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#E0B568"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M12 22V12M12 12C12 7 7 5 3 7M12 12c0-5 5-7 9-5" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-xs font-medium">
                                            Rooftop Garden
                                        </div>
                                        <div className="text-white/30 text-[10px] mt-0.5">
                                            Landscaped
                                        </div>
                                    </div>
                                    {/* Amenity: Power */}
                                    <div
                                        className="amenity-card rounded-xl p-4 text-center border border-white/5 cursor-default"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: "rgba(224,181,104,0.1)",
                                                border: "1px solid rgba(224,181,104,0.2)"
                                            }}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#E0B568"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                            </svg>
                                        </div>
                                        <div className="text-white text-xs font-medium">
                                            Power Backup
                                        </div>
                                        <div className="text-white/30 text-[10px] mt-0.5">
                                            100% Backup
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {/* ── Tab: Floor Plan ── */}
                            {features === "tab-floorplan" && <div id="tab-floorplan" className="tab-pane active space-y-7">
                                <div
                                    className="rounded-2xl overflow-hidden border border-white/8 relative"
                                    style={{ background: "rgba(6,8,60,0.6)" }}
                                >
                                    <div className="p-5 border-b border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="text-white text-sm font-medium">
                                                32nd Floor Plan
                                            </div>
                                            <div className="text-white/35 text-xs mt-0.5">
                                                4 BHK · 2,400 sq.ft. carpet area
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="flex items-center gap-1.5 text-gold text-xs hover:underline"
                                        >
                                            <svg
                                                width={12}
                                                height={12}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1={12} y1={15} x2={12} y2={3} />
                                            </svg>
                                            Download PDF
                                        </a>
                                    </div>
                                    {/* SVG Floor Plan */}
                                    <div className="p-6 flex items-center justify-center min-h-[340px]">
                                        <svg
                                            viewBox="0 0 500 380"
                                            className="w-full max-w-xl"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {/* Outer boundary */}
                                            <rect
                                                x={20}
                                                y={20}
                                                width={460}
                                                height={340}
                                                rx={4}
                                                stroke="rgba(224,181,104,0.5)"
                                                strokeWidth="1.5"
                                                fill="rgba(224,181,104,0.03)"
                                            />
                                            {/* Master bedroom */}
                                            <rect
                                                x={20}
                                                y={20}
                                                width={160}
                                                height={140}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.35)"
                                                strokeWidth={1}
                                                fill="rgba(224,181,104,0.04)"
                                            />
                                            <text
                                                x={100}
                                                y={80}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.7)"
                                                fontSize={10}
                                                fontFamily="DM Sans"
                                            >
                                                Master Bedroom
                                            </text>
                                            <text
                                                x={100}
                                                y={96}
                                                textAnchor="middle"
                                                fill="rgba(255,255,255,0.25)"
                                                fontSize={8}
                                                fontFamily="DM Sans"
                                            >
                                                En-suite + Terrace
                                            </text>
                                            {/* Bedroom 2 */}
                                            <rect
                                                x={180}
                                                y={20}
                                                width={120}
                                                height={120}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.3)"
                                                strokeWidth={1}
                                                fill="rgba(6,8,60,0.3)"
                                            />
                                            <text
                                                x={240}
                                                y={76}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.6)"
                                                fontSize={10}
                                                fontFamily="DM Sans"
                                            >
                                                Bedroom 2
                                            </text>
                                            {/* Bedroom 3 */}
                                            <rect
                                                x={300}
                                                y={20}
                                                width={120}
                                                height={120}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.3)"
                                                strokeWidth={1}
                                                fill="rgba(6,8,60,0.3)"
                                            />
                                            <text
                                                x={360}
                                                y={76}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.6)"
                                                fontSize={10}
                                                fontFamily="DM Sans"
                                            >
                                                Bedroom 3
                                            </text>
                                            {/* Bedroom 4 */}
                                            <rect
                                                x={420}
                                                y={20}
                                                width={60}
                                                height={120}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.3)"
                                                strokeWidth={1}
                                                fill="rgba(6,8,60,0.3)"
                                            />
                                            <text
                                                x={450}
                                                y={76}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.5)"
                                                fontSize={8}
                                                fontFamily="DM Sans"
                                            >
                                                Bed 4
                                            </text>
                                            {/* Bathrooms */}
                                            <rect
                                                x={20}
                                                y={160}
                                                width={80}
                                                height={70}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.25)"
                                                strokeWidth={1}
                                                fill="rgba(6,8,60,0.4)"
                                            />
                                            <text
                                                x={60}
                                                y={198}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.5)"
                                                fontSize={8}
                                                fontFamily="DM Sans"
                                            >
                                                Bath 1
                                            </text>
                                            <rect
                                                x={100}
                                                y={160}
                                                width={80}
                                                height={70}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.25)"
                                                strokeWidth={1}
                                                fill="rgba(6,8,60,0.4)"
                                            />
                                            <text
                                                x={140}
                                                y={198}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.5)"
                                                fontSize={8}
                                                fontFamily="DM Sans"
                                            >
                                                Bath 2
                                            </text>
                                            {/* Living + Dining */}
                                            <rect
                                                x={180}
                                                y={140}
                                                width={240}
                                                height={130}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.4)"
                                                strokeWidth={1}
                                                fill="rgba(224,181,104,0.04)"
                                            />
                                            <text
                                                x={300}
                                                y={198}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.7)"
                                                fontSize={11}
                                                fontFamily="DM Sans"
                                            >
                                                Living + Dining
                                            </text>
                                            <text
                                                x={300}
                                                y={214}
                                                textAnchor="middle"
                                                fill="rgba(255,255,255,0.2)"
                                                fontSize={8}
                                                fontFamily="DM Sans"
                                            >
                                                Floor-to-ceiling glazing
                                            </text>
                                            {/* Kitchen */}
                                            <rect
                                                x={420}
                                                y={140}
                                                width={60}
                                                height={130}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.3)"
                                                strokeWidth={1}
                                                fill="rgba(6,8,60,0.4)"
                                            />
                                            <text
                                                x={450}
                                                y={204}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.6)"
                                                fontSize={8}
                                                fontFamily="DM Sans"
                                            >
                                                Kitchen
                                            </text>
                                            {/* Utility/Store */}
                                            <rect
                                                x={20}
                                                y={230}
                                                width={160}
                                                height={60}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.2)"
                                                strokeWidth={1}
                                                fill="rgba(6,8,60,0.3)"
                                            />
                                            <text
                                                x={100}
                                                y={264}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.4)"
                                                fontSize={9}
                                                fontFamily="DM Sans"
                                            >
                                                Utility + Store
                                            </text>
                                            {/* Entry + Hall */}
                                            <rect
                                                x={20}
                                                y={290}
                                                width={460}
                                                height={70}
                                                rx={2}
                                                stroke="rgba(224,181,104,0.25)"
                                                strokeWidth={1}
                                                fill="rgba(6,8,60,0.3)"
                                            />
                                            <text
                                                x={250}
                                                y={330}
                                                textAnchor="middle"
                                                fill="rgba(224,181,104,0.55)"
                                                fontSize={10}
                                                fontFamily="DM Sans"
                                            >
                                                Entry Foyer + Lobby Corridor
                                            </text>
                                            {/* Compass */}
                                            <g transform="translate(460,350)">
                                                <circle
                                                    cx={0}
                                                    cy={0}
                                                    r={12}
                                                    stroke="rgba(224,181,104,0.3)"
                                                    strokeWidth={1}
                                                    fill="rgba(0,3,46,0.6)"
                                                />
                                                <text
                                                    x={0}
                                                    y={-3}
                                                    textAnchor="middle"
                                                    fill="#E0B568"
                                                    fontSize={7}
                                                    fontFamily="DM Sans"
                                                >
                                                    N
                                                </text>
                                                <line
                                                    x1={0}
                                                    y1={-9}
                                                    x2={0}
                                                    y2={-4}
                                                    stroke="#E0B568"
                                                    strokeWidth={1}
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>}
                            {/* ── Tab: Location ── */}
                            {features === "tab-location" && <div id="tab-location" className="tab-pane space-y-4">
                                <div
                                    className="rounded-2xl overflow-hidden border border-white/8"
                                    style={{ height: 300 }}
                                >
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7023568!2d72.8356!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c83b53a1a7%3A0xd3a7c9de4b1e25!2sBandra+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1701254400000"
                                        className="w-full h-full"
                                        style={{
                                            border: 0,
                                            filter:
                                                "grayscale(100%) invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.1)"
                                        }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                                {/* Nearby places */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div
                                        className="rounded-xl p-3 border border-white/5 text-center"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div className="text-gold text-lg mb-1">🏫</div>
                                        <div className="text-white text-xs font-medium">Schools</div>
                                        <div className="text-white/35 text-[10px]">3 within 1 km</div>
                                    </div>
                                    <div
                                        className="rounded-xl p-3 border border-white/5 text-center"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div className="text-gold text-lg mb-1">🏥</div>
                                        <div className="text-white text-xs font-medium">Hospital</div>
                                        <div className="text-white/35 text-[10px]">0.8 km away</div>
                                    </div>
                                    <div
                                        className="rounded-xl p-3 border border-white/5 text-center"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div className="text-gold text-lg mb-1">🛍️</div>
                                        <div className="text-white text-xs font-medium">Mall</div>
                                        <div className="text-white/35 text-[10px]">1.2 km away</div>
                                    </div>
                                    <div
                                        className="rounded-xl p-3 border border-white/5 text-center"
                                        style={{ background: "rgba(255,255,255,0.02)" }}
                                    >
                                        <div className="text-gold text-lg mb-1">🚇</div>
                                        <div className="text-white text-xs font-medium">Metro</div>
                                        <div className="text-white/35 text-[10px]">0.5 km away</div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        {/* end tabs */}
                        {/* ── Reviews ── */}
                        <div className="fade-up-d2">
                            <div className="divider mb-7" />
                            <h3 className="font-display text-xl font-semibold text-white mb-5">
                                Client Reviews
                            </h3>
                            <div className="space-y-4">
                                <div
                                    className="rounded-xl p-4 border border-white/5"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-navy"
                                                style={{
                                                    background: "linear-gradient(135deg,#E0B568,#C49A45)"
                                                }}
                                            >
                                                RG
                                            </div>
                                            <div>
                                                <div className="text-white text-xs font-medium">
                                                    Rahul Gupta
                                                </div>
                                                <div className="text-white/30 text-[10px]">
                                                    Verified Buyer · Oct 2024
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-gold text-xs">★★★★★</div>
                                    </div>
                                    <p className="text-white/40 text-xs leading-relaxed">
                                        "Absolutely stunning property. SafeDeal made the entire purchase
                                        process seamless. The views are even better than the photos
                                        suggest — truly worth every rupee."
                                    </p>
                                </div>
                                <div
                                    className="rounded-xl p-4 border border-white/5"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-navy"
                                                style={{
                                                    background: "linear-gradient(135deg,#E0B568,#C49A45)"
                                                }}
                                            >
                                                PS
                                            </div>
                                            <div>
                                                <div className="text-white text-xs font-medium">
                                                    Priya Shah
                                                </div>
                                                <div className="text-white/30 text-[10px]">
                                                    Site Visit · Sep 2024
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-gold text-xs">★★★★☆</div>
                                    </div>
                                    <p className="text-white/40 text-xs leading-relaxed">
                                        "The interiors are exceptional — especially the kitchen and
                                        master suite. Highly recommended for anyone looking for premium
                                        sea-facing apartments in Mumbai."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end LEFT column */}
                    {/* ─────────────────── RIGHT: STICKY PANEL ─────────────────── */}
                    <div className="sticky-panel space-y-5 fade-up-d2">
                        {/* Price card */}
                        <div
                            className="rounded-2xl p-5 border border-gold/15 relative overflow-hidden"
                            style={{
                                background:
                                    "linear-gradient(135deg,rgba(224,181,104,0.07),rgba(6,8,60,0.8))"
                            }}
                        >
                            <div
                                className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16"
                                style={{
                                    background:
                                        "radial-gradient(circle,rgba(224,181,104,0.1),transparent 70%)",
                                    pointerEvents: "none"
                                }}
                            />
                            <div className="mb-4">
                                <div className="font-display text-4xl font-semibold gold-text leading-none mb-1">
                                    ₹{property?.price?getCurrencyName(property?.price):property?.price}
                                </div>
                                <div className="text-white/30 text-xs">
                                    ₹17,708 per sq.ft. · Price Negotiable
                                </div>
                            </div>
                            <div className="divider mb-4" />
                            {/* Quick facts */}
                            <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                                <div>
                                    <div className="font-display text-lg font-semibold text-white">
                                        4
                                    </div>
                                    <div className="text-white/30 text-[10px] uppercase tracking-wide">
                                        Beds
                                    </div>
                                </div>
                                <div>
                                    <div className="font-display text-lg font-semibold text-white">
                                        3
                                    </div>
                                    <div className="text-white/30 text-[10px] uppercase tracking-wide">
                                        Baths
                                    </div>
                                </div>
                                <div>
                                    <div className="font-display text-lg font-semibold text-white">
                                        2.4K
                                    </div>
                                    <div className="text-white/30 text-[10px] uppercase tracking-wide">
                                        Sq.ft
                                    </div>
                                </div>
                            </div>
                            {/* CTA Buttons */}
                            <div className="space-y-3">
                                <button
                                    onclick="showToast('Our agent will call you shortly!')"
                                    className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
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
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    Contact Agent
                                </button>
                                <button
                                    onclick="showToast('Visit scheduled! We\'ll confirm shortly.')"
                                    className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border border-gold/30 text-gold hover:bg-gold/8"
                                    style={{ background: "rgba(224,181,104,0.05)" }}
                                >
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
                                        <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                                        <line x1={16} y1={2} x2={16} y2={6} />
                                        <line x1={8} y1={2} x2={8} y2={6} />
                                        <line x1={3} y1={10} x2={21} y2={10} />
                                    </svg>
                                    Schedule a Visit
                                </button>
                            </div>
                        </div>
                        {/* Agent Card */}
                        <div className="agent-card rounded-2xl p-5 relative overflow-hidden">
                            <div className="text-white/25 text-[10px] uppercase tracking-widest mb-3 font-light">
                                Your Agent
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src="https://instagram.famd1-2.fna.fbcdn.net/v/t51.82787-15/656469163_18103789009938016_1777837264366262279_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=105&ig_cache_key=Mzg2MDUwOTAyMzE4MzYwNTQxNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5oZHIuQzMifQ%3D%3D&_nc_ohc=zMyvrlUKGyAQ7kNvwEX8T39&_nc_oc=AdqoBYmZenYVuDj5tdxynF1h6xtxIvpdHqk63X5wSm30s8S7I4Zh6X1FAmNa1Z3O_t5vIzGvbYQixs95AD97QQA1&_nc_ad=z-m&_nc_cid=2034&_nc_zt=23&_nc_ht=instagram.famd1-2.fna&_nc_gid=fP5Mynr2M48u39og6PtuGA&_nc_ss=7a32e&oh=00_AfyjDMwP370DLpWaAs4DQUFjp1wASQeHWy7PszAOiXiqzA&oe=69CDA00D"
                                        alt="Agent"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                                    />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-navy-card" />
                                </div>
                                <div>
                                    <div className="text-white text-sm font-medium">Sahil Ansari</div>
                                    <div className="text-white/35 text-xs">
                                        Senior Property Advisor
                                    </div>
                                    <div className="flex gap-0.5 mt-0.5">
                                        <span className="text-gold text-[10px]">★★★★★</span>
                                        <span className="text-white/25 text-[10px] ml-1">
                                            4.9 (120+ deals)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 mb-4">
                                <a
                                    href="tel:+919876543210"
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/6 hover:border-gold/25 transition-all duration-300 group"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <svg
                                        className="text-gold/60 group-hover:text-gold transition-colors"
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
                                    <span className="text-white/60 text-xs group-hover:text-white transition-colors">
                                        +91 70439 21914
                                    </span>
                                </a>
                                <a
                                    href="mailto:sahilansari@gmail.com"
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/6 hover:border-gold/25 transition-all duration-300 group"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <svg
                                        className="text-gold/60 group-hover:text-gold transition-colors"
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
                                    <span className="text-white/60 text-xs group-hover:text-white transition-colors">
                                        sahilansari@gmail.com
                                    </span>
                                </a>
                            </div>
                            {/* Share */}
                            <div className="pt-3 border-t border-white/5">
                                <div className="text-white/25 text-[10px] uppercase tracking-widest mb-2.5">
                                    Share This Property
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={`https://wa.me/917043921914?text=${property?.name}`}
                                        onclick="showToast('Shared on WhatsApp!')"
                                        className="share-btn flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium flex-1 justify-center border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/8 transition-colors"
                                    >
                                        <svg
                                            width={12}
                                            height={12}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                    <a
                                        href="#"
                                        onclick="showToast('Shared on Facebook!')"
                                        className="share-btn flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium flex-1 justify-center border border-blue-500/25 text-blue-400 hover:bg-blue-500/8 transition-colors"
                                    >
                                        <svg
                                            width={12}
                                            height={12}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        Facebook
                                    </a>
                                    <button
                                        onclick="navigator.clipboard.writeText(window.location.href); showToast('Link copied!');"
                                        className="share-btn flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-white/10 text-white/40 hover:border-gold/25 hover:text-gold transition-colors"
                                    >
                                        <svg
                                            width={12}
                                            height={12}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Contact Form card */}
                        <div
                            id="contact-form"
                            className="rounded-2xl p-5 border border-white/5"
                            style={{ background: "rgba(6,8,60,0.6)" }}
                        >
                            <h4 className="font-display text-lg font-semibold text-white mb-4">
                                Quick Enquiry
                            </h4>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="gold-input w-full px-4 py-3 rounded-xl text-xs font-light transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#fff"
                                    }}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="gold-input w-full px-4 py-3 rounded-xl text-xs font-light transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#fff"
                                    }}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="gold-input w-full px-4 py-3 rounded-xl text-xs font-light transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#fff"
                                    }}
                                />
                                <textarea
                                    rows={3}
                                    placeholder="I'm interested in this property…"
                                    className="gold-input w-full px-4 py-3 rounded-xl text-xs font-light transition-all duration-300 resize-none"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#fff"
                                    }}
                                    defaultValue={""}
                                />
                                <button
                                    onclick="showToast('Enquiry sent! We\'ll be in touch.')"
                                    className="w-full py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                                    style={{
                                        background: "linear-gradient(135deg,#E0B568,#C49A45)",
                                        color: "#00032E"
                                    }}
                                >
                                    Send Enquiry
                                </button>
                            </div>
                        </div>
                        {/* EMI Calculator Teaser */}
                        <div
                            className="rounded-2xl p-4 border border-white/5 flex items-center gap-3"
                            style={{ background: "rgba(6,8,60,0.5)" }}
                        >
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: "rgba(224,181,104,0.1)",
                                    border: "1px solid rgba(224,181,104,0.2)"
                                }}
                            >
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#E0B568"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x={2} y={3} width={20} height={14} rx={2} />
                                    <line x1={8} y1={21} x2={16} y2={21} />
                                    <line x1={12} y1={17} x2={12} y2={21} />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-white text-xs font-medium">EMI Calculator</div>
                                <div className="text-white/30 text-[10px]">
                                    ~₹2.8L/month at 8.5% for 20 yrs
                                </div>
                            </div>
                            <a
                                href="#"
                                className="text-gold text-[10px] hover:underline flex-shrink-0"
                            >
                                Calculate →
                            </a>
                        </div>
                    </div>
                    {/* end RIGHT column */}
                </div>
                {/* end main grid */}
            </main>
            {/* ════════════════════════════════════════ SIMILAR PROPERTIES */}
            <section className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
                <div className="divider mb-10" />
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <div className="text-gold text-[10px] tracking-widest uppercase mb-1 font-light flex items-center gap-2">
                            <span className="block w-6 h-px bg-gold/60" />
                            Similar Listings
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-light text-white">
                            You May{" "}
                            <em className="gold-text not-italic font-semibold">Also Like</em>
                        </h3>
                    </div>
                    <a
                        href="#"
                        className="text-gold text-xs hover:underline flex items-center gap-1 group"
                    >
                        View all
                        <svg
                            width={12}
                            height={12}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:translate-x-1 transition-transform"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Similar card 1 */}
                    <div
                        className="group rounded-2xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 hover:shadow-xl cursor-pointer"
                        style={{ background: "rgba(6,8,60,0.4)" }}
                    >
                        <div className="relative overflow-hidden h-48">
                            <img
                                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=80"
                                alt="Similar 1"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                                <span
                                    className="px-2 py-1 rounded-full text-[10px] font-semibold"
                                    style={{ background: "#E0B568", color: "#00032E" }}
                                >
                                    For Sale
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="font-display text-base font-semibold text-white mb-1 group-hover:text-gold transition-colors">
                                Marine Drive Penthouse
                            </div>
                            <div className="flex items-center gap-1 text-white/35 text-xs mb-3">
                                <svg
                                    width={10}
                                    height={10}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#E0B568"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx={12} cy={10} r={3} />
                                </svg>
                                Marine Drive, Mumbai
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="font-display text-xl font-semibold gold-text">
                                    ₹6.8 Cr
                                </div>
                                <div className="text-white/30 text-xs">3 BHK · 1,900 sq.ft.</div>
                            </div>
                        </div>
                    </div>
                    {/* Similar card 2 */}
                    <div
                        className="group rounded-2xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 hover:shadow-xl cursor-pointer"
                        style={{ background: "rgba(6,8,60,0.4)" }}
                    >
                        <div className="relative overflow-hidden h-48">
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80"
                                alt="Similar 2"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 flex gap-1.5">
                                <span
                                    className="px-2 py-1 rounded-full text-[10px] font-semibold"
                                    style={{ background: "#E0B568", color: "#00032E" }}
                                >
                                    For Sale
                                </span>
                                <span
                                    className="px-2 py-1 rounded-full text-[10px] font-semibold border border-gold/30 text-gold"
                                    style={{ background: "rgba(224,181,104,0.08)" }}
                                >
                                    New
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="font-display text-base font-semibold text-white mb-1 group-hover:text-gold transition-colors">
                                Heritage Garden Villa
                            </div>
                            <div className="flex items-center gap-1 text-white/35 text-xs mb-3">
                                <svg
                                    width={10}
                                    height={10}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#E0B568"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx={12} cy={10} r={3} />
                                </svg>
                                Juhu, Mumbai
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="font-display text-xl font-semibold gold-text">
                                    ₹5.1 Cr
                                </div>
                                <div className="text-white/30 text-xs">5 BHK · 3,200 sq.ft.</div>
                            </div>
                        </div>
                    </div>
                    {/* Similar card 3 */}
                    <div
                        className="group rounded-2xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 hover:shadow-xl cursor-pointer"
                        style={{ background: "rgba(6,8,60,0.4)" }}
                    >
                        <div className="relative overflow-hidden h-48">
                            <img
                                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop&q=80"
                                alt="Similar 3"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white">
                                    For Rent
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="font-display text-base font-semibold text-white mb-1 group-hover:text-gold transition-colors">
                                Sky Terrace Duplex
                            </div>
                            <div className="flex items-center gap-1 text-white/35 text-xs mb-3">
                                <svg
                                    width={10}
                                    height={10}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#E0B568"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx={12} cy={10} r={3} />
                                </svg>
                                Worli, Mumbai
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="font-display text-xl font-semibold gold-text">
                                    ₹1.4L/mo
                                </div>
                                <div className="text-white/30 text-xs">4 BHK · 2,800 sq.ft.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default PropertyPage
