"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SVGProps,
} from "react"
import { AnimatePresence, motion } from "motion/react"

// Define the structure for our logo objects
interface Logo {
  name: string
  id: number
  img: React.ComponentType<React.SVGProps<SVGSVGElement>>
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
    const shuffled = shuffleArray(allLogos)
    const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

    // Distribute logos uniquely across columns, no duplicates
    shuffled.forEach((logo, index) => {
      columns[index % columnCount].push(logo)
    })

    return columns
  }

// Props for the LogoColumn component
interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

// LogoColumn component: Displays a single column of animated logos
const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 2000 // Time each logo is displayed (in milliseconds)
    const columnDelay = index * 200 // Stagger the start of each column's animation
    // Calculate which logo should be displayed based on the current time
    const adjustedTime =
      (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)

    // Memoize the current logo to prevent unnecessary re-renders
    const CurrentLogo = useMemo(
      () => logos[currentIndex].img,
      [logos, currentIndex]
    )

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
            key={`${logos[currentIndex].id}-${currentIndex}`}
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
              <CurrentLogo className="w-8 h-8 md:w-10 md:h-10" />
              <span className="font-mono text-sm font-medium text-foreground md:text-base">
                {logos[currentIndex].name}
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
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
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
      { name: "Next.js", id: 1, img: NextjsIcon },
      { name: "React", id: 2, img: ReactIcon },
      { name: "TypeScript", id: 3, img: TypeScriptIcon },
      { name: "JavaScript", id: 4, img: JavaScriptIcon },
      { name: "Node.js", id: 5, img: NodejsIcon },
      { name: "Tailwind CSS", id: 6, img: TailwindCSSIcon },
      { name: "Git", id: 7, img: GitIcon },
    ],
    []
  )

  // Distribute logos across columns when the component mounts or columnCount changes
  useEffect(() => {
    const distributedLogos = distributeLogos(allLogos, columnCount)
    setLogoSets(distributedLogos)
  }, [allLogos, columnCount])

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

function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 228" width="256" height="228" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="128" cy="114" rx="106" ry="32" fill="none" stroke="#00D8FF" strokeWidth="8"/>
      <ellipse cx="128" cy="114" rx="106" ry="32" fill="none" stroke="#00D8FF" strokeWidth="8" transform="rotate(60 128 114)"/>
      <ellipse cx="128" cy="114" rx="106" ry="32" fill="none" stroke="#00D8FF" strokeWidth="8" transform="rotate(120 128 114)"/>
      <circle cx="128" cy="114" r="28" fill="#00D8FF"/>
    </svg>
  )
}

function JavaScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" width="256" height="256" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#F7DF1E" d="M0 0h256v256H0V0z"/>
      <path fill="#000" d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"/>
    </svg>
  )
}

function NodejsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 292" width="256" height="292" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#539E43" d="M128 290.6c-2.7 0-5.4-.7-7.8-2L95 273.7c-3.7-2.1-1.9-2.8-.7-3.3 5-1.7 6-2.2 11.3-5.2.6-.3 1.3-.2 1.9.1l19.3 11.4c.7.4 1.2.1 1.2-.2V148.4c0-.9.5-1.8 1.3-2.2l16.3-9.4c.8-.5 1.4-.1 1.4.7v126.7c0 .6-.2 1.2-.6 1.8l-10.1 16c-2.3 3.7-7.2 5.9-12.5 5.9h0z"/>
      <path fill="#333" d="M140.8 268.2c-3.1 0-5.9-.6-7.8-2.3l-23.9-16c-2.4-1.6-4.9-4.4-4.9-7.7v-33.7c0-3.1 1.4-5.8 3.9-7.4l21.4-12.5c2.5-1.4 4.1-.4 4.1 1.6v6.9c0 .9-.2 1.8-.7 2.4-.5.7-1.1 1.1-1.8 1.5l-12.1 6.8c-.4.2-.7.7-.7 1.4v21c0 .7.3 1.2.7 1.4l11.7 6.5c.4.2.8.2 1.2 0l11.5-6.5c.4-.2.9-.7.9-1.4v-60.2c0-.7-.3-1.1-.8-1.3l-11.6-6.3c-.4-.2-1-.2-1.5 0l-11.4 6.6c-.5.2-.9.7-.9 1.4v12.6c0 .7-.5 1-1.1.7l-16.4-8.8c-.6-.3-1.1-1.1-1.1-1.8v-13.3c0-.7.3-1.5.8-1.8l26.7-16.5c1.2-.7 2.6-.8 3.8-.1l28.4 17c.6.3.9 1 .9 1.7v68.9c0 .6-.2 1.3-.6 1.8l-9.7 11.8c-2.5 3-5.5 4.6-9.4 4.6z"/>
    </svg>
  )
}

function GitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" width="256" height="256" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#DE4C36" d="M251.17 116.6L139.4 4.82a16.44 16.44 0 0 0-23.26 0l-23.7 23.7 29.38 29.37a19.53 19.53 0 0 1 24.75 24.92l28.31 28.31a19.53 19.53 0 1 1-11.73 11.04L135 94.08v62.02a19.53 19.53 0 1 1-16.07-.57V93.27a19.53 19.53 0 0 1-10.62-25.64L79.31 38.65 4.84 113.12a16.44 16.44 0 0 0 0 23.26l111.78 111.79a16.44 16.44 0 0 0 23.26 0l111.3-111.3a16.45 16.45 0 0 0-.01-23.27"/>
    </svg>
  )
}

const TypeScriptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 256"
    width={256}
    height={256}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path
      d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
      fill="#3178C6"
    />
    <path
      d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
      fill="#FFF"
    />
  </svg>
)



const TailwindCSSIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 54 33"
    {...props}
  >
    <g clipPath="url(#prefix__clip0)">
      <path
        fill="#38bdf8"
        fillRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" d="M0 0h54v32.4H0z" />
      </clipPath>
    </defs>
  </svg>
)

const NextjsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={180}
    height={180}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_408_139"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={180}
      height={180}
    >
      <circle cx={90} cy={90} r={90} fill="black" />
    </mask>
    <g mask="url(#mask0_408_139)">
      <circle
        cx={90}
        cy={90}
        r={87}
        fill="black"
        stroke="white"
        strokeWidth={6}
      />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_408_139)"
      />
      <rect
        x={115}
        y={54}
        width={12}
        height={72}
        fill="url(#paint1_linear_408_139)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_408_139"
        x1={109}
        y1={116.5}
        x2={144.5}
        y2={160.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_408_139"
        x1={121}
        y1={54}
        x2={120.799}
        y2={106.875}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
)

export { LogoCarousel }
export default LogoCarousel
