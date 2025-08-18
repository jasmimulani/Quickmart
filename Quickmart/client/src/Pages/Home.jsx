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
      <section aria-label="Product categories" className="mt-12">
        <Categoris />
      </section>
      <section aria-label="Best sellers" className="mt-12">
        <BestSeller />
      </section>
      <section aria-label="Why we are the best" className="mt-16">
        <BottomBanner />
      </section>
      <section aria-label="Newsletter" className="mt-16">
        <NewLetter />
      </section>
    </main>
  )
}

export default Home
