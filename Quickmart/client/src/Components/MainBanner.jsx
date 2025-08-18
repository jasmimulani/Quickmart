import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <section className="relative rounded-2xl overflow-hidden shadow-lg mt-4" aria-label="Main promotional banner">
      {/* Banner Images */}
      <img src={assets.main_banner_bg} alt="Main banner background" className="w-full hidden md:block object-cover" loading="lazy" />
      <img src={assets.main_banner_bg_sm} alt="Main banner background mobile" className="w-full md:hidden object-cover" loading="lazy" />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-transparent pointer-events-none" aria-hidden="true"></div>

      {/* Banner Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white md:text-left text-center max-w-2xl leading-tight drop-shadow-lg">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        <nav aria-label="Banner actions" className="flex items-center mt-8 gap-4">
          <Link
            to="/products"
            className="group flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dull transition rounded-lg text-white font-semibold shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Shop now"
          >
            Shop now
            <img className="md:hidden transition group-focus:translate-x-1 w-5" src={assets.white_arrow_icon} alt="Arrow icon" loading="lazy" />
          </Link>

          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-100 transition rounded-lg text-primary font-semibold shadow-md text-lg border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Explore deals"
          >
            Explore deals
            <img className="transition group-hover:translate-x-1 w-5" src={assets.black_arrow_icon} alt="Arrow icon" loading="lazy" />
          </Link>
        </nav>
      </div>
    </section>
  )
}

export default MainBanner

