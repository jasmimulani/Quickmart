import React from 'react'
import MainBanner from '../Components/MainBanner'
import Categoris from '../Components/Categoris'
import BestSeller from '../Components/BestSeller'
import BottomBanner from '../Components/BottomBanner'
import NewLetter from '../Components/NewLetter'

const Home = () => {
  return (
    <main className="mt-10" aria-label="Homepage">
      <section aria-label="Main banner">
        <MainBanner />
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-label="Product categories" className="mt-16">
          <Categoris />
        </section>
        <hr className="mt-12 border-gray-200/60" />
        <section aria-label="Best sellers" className="mt-12">
          <BestSeller />
        </section>
      </div>
      <section aria-label="Why we are the best" className="mt-20">
        <BottomBanner />
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-label="Newsletter" className="mt-20">
          <NewLetter />
        </section>
      </div>
    </main>
  )
}

export default Home
