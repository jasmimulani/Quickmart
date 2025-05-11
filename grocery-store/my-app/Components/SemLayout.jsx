
import React from 'react';
// import { Button } from '@/components/ui/button';
// import { ArrowRight } from 'lucide-react';
// import { cn } from "@/lib/utils";

const SemLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10" style={{backgroundColor:"#E6F3FA"}}>
          <span className="text-yellow-400 text-sm font-semibold mb-2 block">100% Natural</span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Fresh Smoothie & <br /> Summer Juice
          </h2>
          <p className="text-gray-300 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.
          </p>
          {/* <Button
            variant="outline"
            className={cn(
                "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                "hover:bg-yellow-500/30 hover:text-yellow-300",
                "transition-colors duration-200"
            )}
          >
            Shop Now
          </Button> */}
        </div>

        {/* Middle Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <span className="text-green-400 text-sm font-semibold mb-2 block">20% Off</span>
            <h3 className="text-2xl font-bold text-white mb-4">Fruits & Vegetables</h3>
            {/* <Button
                variant="link"
                className={cn(
                    "text-green-400 px-0",
                    "hover:text-green-300",
                    "transition-colors duration-200",
                    "flex items-center gap-1"
                )}
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Button> */}
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 flex items-center justify-center" style={{backgroundColor:"#F9EBE7"}}>
          <div className="text-center">
            <span className=" text-sm font-semibold mb-2 block">15% Off</span>
            <h3 className="text-2xl font-bold text-white mb-4">Baked Products</h3>
             {/* <Button
                variant="link"
                className={cn(
                    "text-pink-400 px-0",
                    "hover:text-pink-300",
                    "transition-colors duration-200",
                    "flex items-center gap-1"
                )}
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemLayout;
