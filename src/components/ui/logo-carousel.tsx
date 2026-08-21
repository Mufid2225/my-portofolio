"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"

// Define the structure for our logo objects
interface Logo {
  name: string
  id: number
  src: string
}

// Utility function to randomly shuffle an array
// This is used to mix up the order of logos for a more dynamic display
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Utility function to distribute logos across multiple columns
// This ensures each column has a balanced number of logos
const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  if (!allLogos || allLogos.length === 0 || columnCount <= 0) return []
  const shuffled = shuffleArray(allLogos)
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  // Distribute logos uniquely across columns, no duplicates
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  return columns.filter((col) => col.length > 0)
}

// Props for the LogoColumn component
interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

// LogoColumn component: Displays a single column of animated logos
const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  function LogoColumn({ logos, index, currentTime }) {
    if (!logos || logos.length === 0) return null

    const cycleInterval = 2000 // Time each logo is displayed (in milliseconds)
    const columnDelay = index * 200 // Stagger the start of each column's animation
    const totalDuration = cycleInterval * logos.length
    const adjustedTime = ((currentTime + columnDelay) % totalDuration + totalDuration) % totalDuration
    const currentIndex = Math.max(0, Math.min(Math.floor(adjustedTime / cycleInterval), logos.length - 1))
    const currentLogo = logos[currentIndex]

    if (!currentLogo) return null

    return (
      // Framer Motion component for the column container
      <motion.div
        className="w-32 h-14 sm:w-48 sm:h-24 overflow-hidden relative"
        initial={{ opacity: 0, y: 50 }} // Start invisible and below final position
        animate={{ opacity: 1, y: 0 }} // Animate to full opacity and final position
        transition={{
          delay: index * 0.1, // Stagger the animation of each column
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        {/* AnimatePresence enables animation of components that are removed from the DOM */}
        <AnimatePresence mode="wait">
          {/* Framer Motion component for each logo */}
          <motion.div
            key={`${currentLogo.id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            // Animation for when the logo enters
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            // Animation for when the logo is displayed
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            // Animation for when the logo exits
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 shrink-0 md:h-10 md:w-10">
                <Image
                  src={currentLogo.src}
                  alt={currentLogo.name}
                  fill
                  sizes="(max-width: 768px) 32px, 40px"
                  className="object-contain"
                />
              </div>
              <span className="font-mono text-sm font-medium text-foreground md:text-base">
                {currentLogo.name}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)

// Main LogoCarousel component
function LogoCarousel({ columnCount: propColumnCount }: { columnCount?: number }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [columnCount, setColumnCount] = useState(propColumnCount ?? 2)

  useEffect(() => {
    const check = () => setColumnCount(window.innerWidth < 640 ? 2 : (propColumnCount ?? 2))
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [propColumnCount])

  // Memoize the array of logos to prevent unnecessary re-renders
  const allLogos: Logo[] = useMemo(
    () => [
      { name: "Next.js", id: 1, src: "/logo_carousel/nextjs.png" },
      { name: "React", id: 2, src: "/logo_carousel/react.png" },
      { name: "TypeScript", id: 3, src: "/logo_carousel/typescript.png" },
      { name: "JavaScript", id: 4, src: "/logo_carousel/js.png" },
      { name: "Python", id: 5, src: "/logo_carousel/python.png" },
      { name: "Node.js", id: 6, src: "/logo_carousel/nodejs.png" },
      { name: "Bun", id: 7, src: "/logo_carousel/bun.png" },
      { name: "FastAPI", id: 8, src: "/logo_carousel/fastapi.png" },
      { name: "Tailwind CSS", id: 9, src: "/logo_carousel/tailwind.png" },
      { name: "Git", id: 10, src: "/logo_carousel/git.png" },
      { name: "Electron", id: 11, src: "/logo_carousel/electron.png" },
      { name: "MySQL", id: 12, src: "/logo_carousel/mysql.png" },
      { name: "SQLite", id: 13, src: "/logo_carousel/sqlite.png" },
      { name: "PostgreSQL", id: 14, src: "/logo_carousel/postgre.png" },
      { name: "Redis", id: 15, src: "/logo_carousel/redis.png" },
      { name: "Docker", id: 16, src: "/logo_carousel/docker.png" },
      { name: "Ollama", id: 17, src: "/logo_carousel/ollama.png" },
    ],
    []
  )

  const logoSets = useMemo(
    () => distributeLogos(allLogos, columnCount),
    [allLogos, columnCount]
  )

  // Function to update the current time (used for logo cycling)
  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  // Set up an interval to update the time every 100ms
  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  // Render the logo columns
  return (
    <div className="flex space-x-4">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}

export { LogoCarousel }
export default LogoCarousel
