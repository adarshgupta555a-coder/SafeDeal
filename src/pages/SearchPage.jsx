import React, { useEffect, useState } from 'react'
import PropertyCard from '../components/property/PropertyCard'
import { Link, useSearchParams } from 'react-router-dom'
import supabase from '../database/supabase';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [property, setProperty] = useState(null);
  const search = searchParams.get("name");
  const location = searchParams.get("location");
  const price = searchParams.get("price");

  useEffect(() => {
    console.log({ location, price, search })
    getSearchData()
  }, [search, location, price])


  const calculateSearch = () => {
    if (price == "Under ₹50 Lakh") {
      return { num1: 1000000, num2: 5000000 }
    } else if (price == "₹50L – ₹1 Crore") {
      return { num1: 5000000, num2: 10000000 }
    } else if (price == "₹1Cr – ₹3 Crore") {
      return { num1: 10000000, num2: 30000000 }
    } else if (price == "₹3Cr – ₹5 Crore") {
      return { num1: 30000000, num2: 50000000 }
    } else if (price == "Above ₹5 Crore") {
      return { num1: 50000000, num2: 100000000 }
    } else {
      return false
    }
  }

  const getSearchData = async () => {
    let query = supabase
      .from("properties")
      .select(`
      *,
      location!inner (
      id,
      name
      )
      `)

    if (location) {
      console.log(location)
      query = query.ilike("location.name", `%${location}%`)
    }

    if (query && search) {
      query = query.ilike("name", `%${search}%`)
    }

    const priceRange = calculateSearch();

    if (priceRange) {
      query = query
        .gte("price", priceRange.num1)
        .lte("price", priceRange.num2);
    }


    const { data, error } = await query;

    if (!error) {
      setProperty(data)
      console.log(data)
    }
  }

  return (
    <>
      <section id="properties" className="py-24 px-5 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs tracking-widest uppercase mb-4 font-light">
              <span className="block w-8 h-px bg-gold/60" />
              Search Listings
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-white">
              Searched{" "}
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
          {property?.map((item) => <Link to={`/property/${item.id}`} key={item.id}><PropertyCard  property={item}/></Link>)}

        </div>
      </section>
      <div className="divider max-w-5xl" />
    </>
  )
}

export default SearchPage
