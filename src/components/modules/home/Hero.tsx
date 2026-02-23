"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function HeroCarousel() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      title: "Explore The Ocean",
      description: "Discover the beauty of the deep blue sea and adventure beyond limits.",
    },
    {
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      title: "Mountain Adventure",
      description: "Experience breathtaking views and unforgettable journeys.",
    },
    {
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      title: "City Lights",
      description: "Feel the energy of modern life in the heart of the city.",
    },
  ]

  return (
    <div className="w-full  mx-auto py-10">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
                
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="max-w-xl text-sm md:text-lg mb-6">
                    {slide.description}
                  </p>
                  <Button size="lg">Explore Now</Button>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}