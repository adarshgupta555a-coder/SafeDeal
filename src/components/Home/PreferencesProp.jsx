import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../../database/supabase';

const PreferencesProp = () => {
  const [places, setPlaces] = useState(null);

  useEffect(()=> {
    getSearchPlace()
  },[])

  const getSearchPlace = async () => {
    const {data, error} = await supabase
    .from("location")
    .select("*")

    if (!error) {
      setPlaces(data)
    }
  }

  if (places == null) {
    return <h1 className='text-4xl text-[#ECC87D] text-center'>Places Loading...</h1>
  }

  return (
    <>
    <section id="places" className="py-24 px-5 max-w-7xl mx-auto">
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 text-gold text-xs tracking-widest uppercase mb-4 font-light">
        <span className="block w-8 h-px bg-gold/60" />
        Explore Locations
        <span className="block w-8 h-px bg-gold/60" />
      </div>
      <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-3">
        Preferred <em className="gold-text not-italic font-semibold">Places</em>
      </h2>
      <p className="text-white/40 font-light max-w-md mx-auto text-sm leading-relaxed">
        Handpicked locations across India offering the finest living experiences
        and investment opportunities.
      </p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Place 1 */}
      {places?.map((place) =>
      <Link
        to={`/search?location=${place.name}`}
        key={place.id}
        className="place-card group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] block"
      >
        <div className="place-img absolute inset-0">
          <img
            src={place.image ||"https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&auto=format&fit=crop&q=80"}
            alt="Mumbai"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="font-display text-lg font-semibold text-white">
            {place.name}
          </div>
          {/* <div className="text-gold/70 text-xs font-light">Maharashtra</div> */}
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-2xl transition-all duration-500 z-20" />
      </Link>
      )}
    </div>
  </section>
    <div className="divider max-w-5xl" />
</>
  )
}

export default PreferencesProp
