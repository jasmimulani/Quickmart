import React from 'react'
import printrest from '../src/assets/printrest.svg'
import instagram from '../src/assets/instagram.svg'
import fb from '../src/assets/fb.svg'
import visa from'../src/assets/visa.svg'
import webmoney from'../src/assets/webmoney.svg'
import meastro from '../src/assets/meastro.svg'
import jcb from '../src/assets/jcb.svg'
import discover from '../src/assets/discover.svg'
import exprees from'../src//assets/exprees.svg'


function Footer() {
  return (
    <footer>
      <div className='h-[1px] bg-[#c7c8cb]'></div>
      <div>
        <div className="flex pt-20 pb-36 px-65 max-xl:pt-20 max-xl:pb-20 max-xl:px-0 container ">
          <div className="m-auto">
            <div className='flex justify-center mb-10 max-sm:mb-6'>
              <svg xmlns="http://www.w3.org/2000/svg" width="52" height="42" viewBox="0 0 52 42" fill="none"><path d="M6.00098 1H46.001C48.751 1 51.001 3.25 51.001 6V36C51.001 38.75 48.751 41 46.001 41H6.00098C3.25098 41 1.00098 38.75 1.00098 36V6C1.00098 3.25 3.25098 1 6.00098 1Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.001 6L26.001 23.5L1.00098 6" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <div className="text-center">
              <h1 className="text-5xl pb-12 max-xl:pb-6 max-md:text-2xl  max-lg:text-3xl">Subscribe newsletter</h1>
              <span className="text-gray-500 max-sm:px-5 text-xl  max-lg:text-lg max-sm:text-base">
                Subscribe Now and get more offers
              </span>
            </div>
            <div className="flex pt-4 gap-3 justify-center max-md:block ">
              <div className='pt-4'>
                <input
                  type="Email"
                  name="email"
                  placeholder="Your email adress..."
                  className="bg-gray-200 text-black border-none outline-none py-3 px-5 w-[500px] max-md:w-[300px] max-md:ml-[10px]" />
              </div>
              <div className="pt-4 ">
                <button className="bg-black text-white py-3  px-5 max-md:w-[300px] max-md:ml-[10px]">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='h-[1px] bg-[#c7c8cb]'></div>
        <div className='container p-4 max-xl:p-3 '>
          <div className="flex justify-between items-center max-sm:block">
            <div className='col flex justify-start max-sm:justify-center max-sm:py-1'>
              <ul className='flex items-center'>
                <li className='px-2'>
                  <a href="https://www.instagram.com/">
                    <img src={instagram} alt="" />
                  </a>
                </li>
                <li className='px-2'>
                  <a href="https://www.facebook.com/">
                    <img src={fb} alt="" />
                  </a>
                </li>
                <li className='px-2'>
                  <a href="https://www.pinterest.com/">
                    <img src={printrest} alt="" />
                  </a>
                </li>
                <li className='px-2'>
                  <a href="https://www.youtube.com/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 23 15" fill="none"><rect width="23" height="15" rx="4" fill="#989898"></rect><path d="M16 7.5L10 10.5311V4.46891L16 7.5Z" fill="#FEFCFB"></path></svg>
                  </a>
                </li>
              </ul>
            </div>
            {/* <div className='col flex justify-center max-sm:py-1'>
              <div className="flex">
                <span className='text-base text-gray-500'>Designed by:<span className='font-bold'>Wpignite
                </span></span>
              </div>
            </div> */}
            <div className='col flex justify-end max-sm:justify-center max-sm:py-1'>
              <ul className='flex'>
                <li className='h-[35px] w-[50px] px-2'>
                  <img src={visa}alt="" />
                </li>
                <li className='h-[35px] w-[50px] px-2'>
                  <img src={webmoney} alt="" />
                </li>
                <li className='h-[35px] w-[50px] px-2'>
                  <img src={meastro} alt="" />
                </li>
                <li className='h-[35px] w-[50px] px-2'>
                  <img src={jcb} alt="" />
                </li>
                <li className='h-[35px] w-[50px] px-2'>
                  <img src={discover} alt="" />
                </li>
                <li className='h-[35px] w-[50px] px-2'>
                  <img src={exprees} alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer