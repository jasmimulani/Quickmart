import React from 'react'
import { footerLinks } from '../assets/assets';

const Fotter = () => {
  
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-24 mt-24 bg-gray-50">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-gray-200 text-gray-600">
                <div>
                     <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Quickmart</h2>
                    <p className="max-w-[460px] mt-6">We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="text-gray-600 hover:text-blue-600 transition-colors">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-5 text-center text-sm md:text-base text-gray-500">
                © {new Date().getFullYear()} Quickmart. All rights reserved.
            </p>
        </div>
    );
}

export default Fotter   
