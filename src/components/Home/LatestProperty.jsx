import React, { useEffect, useState } from 'react'
import PropertyCard from '../property/PropertyCard';
import supabase from '../../database/supabase';
import { Link } from 'react-router-dom';
const LatestProperty = () => {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getPropertyData()
  },[])

  const getPropertyData = async () => {
    setLoading(true);
    const {data, error} = await supabase
    .from("properties")
    .select(`
      * ,
      location (
      id,
      name
      )
      `)
      .eq("status","active")


    if (!error) {
      setProperties(data);
      setLoading(false)
    }
  }
  return (<>
    {loading?<h1 className='text-4xl text-[#ECC87D] text-center m-6'>Properties Loading...</h1>:(<section id="properties" className="py-24 px-5 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 text-gold text-xs tracking-widest uppercase mb-4 font-light">
            <span className="block w-8 h-px bg-gold/60" />
            Latest Listings
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-white">
            Featured{" "}
            <em className="gold-text not-italic font-semibold">Properties</em>
          </h2>
        </div>
        <a
          href="#"
          className="self-start sm:self-auto inline-flex items-center gap-2 text-gold text-sm hover:gap-3 transition-all duration-300 group"
        >
          View all listings
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-1 transition-transform duration-300"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Property Card Template */}
        {/* Card 1 */}
        {properties?.map((property) => <Link to={`/property/${property.id}`} key={property.id}><PropertyCard  property={property}/></Link>)}
       
      </div>
    </section>)}
    <div className="divider max-w-5xl" />
  </>
  )
}

export default LatestProperty
