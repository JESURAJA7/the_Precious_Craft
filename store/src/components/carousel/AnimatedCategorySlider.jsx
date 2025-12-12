"use client";
import Image from "next/image";

export default function AnimatedCategorySlider() {
  const categories = [
    { name: "Men's Collection", image: "https://res.cloudinary.com/dqsbihveq/image/upload/v1762597473/product/Men%E2%80%99sCollection%282%29.png" },
    { name: "Chains", image: "https://res.cloudinary.com/dqsbihveq/image/upload/v1762597442/product/Chains.png" },
    { name: "Bangles", image: "https://res.cloudinary.com/dqsbihveq/image/upload/v1762597389/product/Bangles.png" },
    { name: "Earrings", image: "https://res.cloudinary.com/dqsbihveq/image/upload/v1762586144/product/Earrings.png" },
    { name: "Silver Articles", image: "https://res.cloudinary.com/dqsbihveq/image/upload/v1762597193/product/SilverArticles.png" },
    { name: "Kids Collection", image: "https://res.cloudinary.com/dqsbihveq/image/upload/v1762586403/product/KidsCollection.png" },
    { name: "Modern Silver", image: "https://res.cloudinary.com/dqsbihveq/image/upload/v1762597085/product/ModernSilver.png" },
  ];

  return (
    
    <div>
        
        <div>
      <div className="relative p-5">
              <h2  className="text-2xl py-6 font-semibold text-center mb-1 text-purple-900">Explore Our Collections</h2>
        <div className="slider-track flex space-x-6">
          {categories.concat(categories).map((item, index) => (
            <div key={index} className="flex-shrink-0 w-40">
              <div className="bg-white p-4 rounded-xl shadow-xl hover:scale-105 transition-transform">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover rounded-full"
                  />
                </div>
                <p className="text-center font-medium">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      </div>
      

      {/* Local animation — no global CSS needed */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .slider-track {
          animation: slide 25s linear infinite;
        }

        .slider-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
