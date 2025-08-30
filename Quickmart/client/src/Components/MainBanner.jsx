import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <section className="relative rounded-3xl overflow-hidden shadow-strong mt-6" aria-label="Main promotional banner">
      {/* Background with gradient overlay */}
      <div className="relative h-[500px] md:h-[600px] gradient-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-indigo-900/20"></div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Fresh groceries delivered in 30 minutes
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Freshness You</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Can Trust</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover premium quality groceries at unbeatable prices. 
            Fast delivery, fresh products, and exceptional service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="group flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 transition-all duration-300 rounded-xl text-gray-900 font-semibold shadow-medium hover-lift text-lg min-w-[200px] justify-center"
              aria-label="Shop now"
            >
              <span>Shop Now</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              to="/products"
              className="group flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-white/10 transition-all duration-300 rounded-xl text-white font-semibold border-2 border-white/30 hover:border-white/50 text-lg min-w-[200px] justify-center backdrop-blur-sm"
              aria-label="Explore deals"
            >
              <span>Explore Deals</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Best Prices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainBanner

