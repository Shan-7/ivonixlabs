"use client"
import Image from "next/image"

const technologies = [
  {
    name: "PCB Design",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-477huqR7Iq4iRVz1oQZIA7YOeWVYfC.png",
  },
  {
    name: "OpenCV",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pdcnsvDA537FCF6tHxiRSWonL0ISPI.png",
  },
  {
    name: "MATLAB",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0rt0eRRBHcHe8QvO1qXctScbHPLKFq.png",
  },
  {
    name: "Raspberry Pi",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ixcLxot16NgbwDEFwXbXBJFXxhks9Y.png",
  },
  {
    name: "Arduino",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ymumCHm2r9H0OHATagWmXBx3aZyFIr.png",
  },
  {
    name: "Python",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5oY8Lz3zU6NwEj2V3HKX4vLVPUX5ww.png",
  },
  {
    name: "JavaScript",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JQUZn7rbOe1sEYX0Fq1g4PCMKJncq4.png",
  },
  {
    name: "Blockchain",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fXyEwDGufHHbIbwG3j0orBILVaPmm7.png",
  },
  {
    name: "ESP32",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-g6jtYiWlvAOs44OPaaUmJOGaqT1tzG.png",
  },
]

export default function TechStack() {
  return (
    <div className="w-full overflow-hidden bg-black/50 backdrop-blur-sm py-4">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-scroll flex space-x-12 whitespace-nowrap">
          {technologies.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className="flex flex-col items-center justify-center w-20 flex-shrink-0">
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                />
              </div>
              <span className="text-xs text-gray-400">{tech.name}</span>
            </div>
          ))}
          {technologies.map((tech, index) => (
            <div
              key={`${tech.name}-duplicate-${index}`}
              className="flex flex-col items-center justify-center w-20 flex-shrink-0"
            >
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                />
              </div>
              <span className="text-xs text-gray-400">{tech.name}</span>
            </div>
          ))}
        </div>
        <div className="animate-scroll flex space-x-12 whitespace-nowrap">
          {technologies.map((tech, index) => (
            <div
              key={`${tech.name}-second-${index}`}
              className="flex flex-col items-center justify-center w-20 flex-shrink-0"
            >
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                />
              </div>
              <span className="text-xs text-gray-400">{tech.name}</span>
            </div>
          ))}
          {technologies.map((tech, index) => (
            <div
              key={`${tech.name}-second-duplicate-${index}`}
              className="flex flex-col items-center justify-center w-20 flex-shrink-0"
            >
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                />
              </div>
              <span className="text-xs text-gray-400">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
