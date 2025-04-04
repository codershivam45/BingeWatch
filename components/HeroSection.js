import React from 'react'
import Image from 'next/image'

const HeroSection = ({item}) => {
    return (
        <div className="relative h-[30vh] sm:h-[35vh] md:h-[40vh]  overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10" />
            <Image
                src="/hero.png"
                alt="Popular Movies"
                fill
                className="object-cover"
                style={{ objectPosition: "top " }}
                priority
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
                        {item.name}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl">
                        {item.desc}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
