import React from 'react'
import MainBanner from '../Components/MainBanner'
import Categoris from '../Components/Categoris'
import BestSeller from '../Components/BestSeller'
import BottomBanner from '../Components/BottomBanner'
import NewLetter from '../Components/NewLetter'

const Home = () => {
  return (
    <div className='mt-10'>
          <MainBanner/>
          <Categoris/>
          <BestSeller/>
          <BottomBanner/>
          <NewLetter/>
    </div>
  )
}

export default Home
