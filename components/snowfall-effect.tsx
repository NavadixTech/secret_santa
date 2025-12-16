"use client"

import { useEffect, useState } from "react"
import { Snowflake } from "lucide-react"

interface SnowflakeData {
  id: number
  left: number
  animationDuration: number
  opacity: number
  size: number
}

export function SnowfallEffect() {
  const [snowflakes, setSnowflakes] = useState<SnowflakeData[]>([])

  useEffect(() => {
    // Generate snowflakes
    const flakes: SnowflakeData[] = []
    for (let i = 0; i < 20; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.4,
        size: 12 + Math.random() * 8,
      })
    }
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: flake.opacity,
          }}
        >
          <Snowflake className="text-primary/30" style={{ width: flake.size, height: flake.size }} />
        </div>
      ))}
    </div>
  )
}
