import React from 'react'
import getCurrencyName from '../../utils/getCurrencyName'

const PropertyCard = ({property}) => {
  return (
     <div
          className="prop-card group rounded-2xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 hover:shadow-2xl cursor-pointer"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="relative overflow-hidden h-56">
            <img
              src={property?.image}
              alt="Villa"
              className="prop-img w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: "#E0B568", color: "#00032E" }}
              >
                For Sale
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-navy/70 border border-white/10 text-white">
                New
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <button className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-navy/50 text-white/70 hover:text-gold hover:border-gold/40 transition-all duration-300">
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
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-5">
            <div className="font-display text-xl font-semibold text-white mb-1 group-hover:text-gold transition-colors duration-300">
              {property?.name}
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs mb-3">
              <svg
                width={11}
                height={11}
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
             {property?.location?.name}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-white/40 mb-4">
              <span className="flex items-center gap-1">
                <svg
                  width={11}
                  height={11}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                4 BHK
              </span>
              <span className="flex items-center gap-1">
                <svg
                  width={11}
                  height={11}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M4 22V2m0 14h16M4 6h16" />
                </svg>
                3 Baths
              </span>
              <span>2,400 sq.ft.</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-2xl font-semibold gold-text">
                  ₹{property?.price?getCurrencyName(property?.price):property?.price}
                </div>
                <div className="text-white/30 text-[10px]">Negotiable</div>
              </div>
              <a
                href="#"
                className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#E0B568,#C49A45)",
                  color: "#00032E"
                }}
              >
                View Details
              </a>
            </div>
          </div>
        </div>
  )
}

export default PropertyCard
