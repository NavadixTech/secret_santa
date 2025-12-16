"use client"

import { useEffect, useRef } from "react"

interface SecretSantaCircleProps {
  participants: string[]
}

export function SecretSantaCircle({ participants }: SecretSantaCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = Math.min(window.innerWidth - 40, 800)
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.35

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw connecting lines
    ctx.strokeStyle = "oklch(0.42 0.15 158)"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    for (let i = 0; i < participants.length; i++) {
      const angle = (i * 2 * Math.PI) / participants.length - Math.PI / 2
      const nextAngle = ((i + 1) * 2 * Math.PI) / participants.length - Math.PI / 2

      const x1 = centerX + radius * Math.cos(angle)
      const y1 = centerY + radius * Math.sin(angle)
      const x2 = centerX + radius * Math.cos(nextAngle)
      const y2 = centerY + radius * Math.sin(nextAngle)

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Draw arrow
      const arrowSize = 10
      const angle2 = Math.atan2(y2 - y1, x2 - x1)
      ctx.beginPath()
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2 - arrowSize * Math.cos(angle2 - Math.PI / 6), y2 - arrowSize * Math.sin(angle2 - Math.PI / 6))
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2 - arrowSize * Math.cos(angle2 + Math.PI / 6), y2 - arrowSize * Math.sin(angle2 + Math.PI / 6))
      ctx.stroke()
    }

    // Draw participant circles
    participants.forEach((name, i) => {
      const angle = (i * 2 * Math.PI) / participants.length - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      // Draw circle
      ctx.fillStyle = "oklch(0.98 0.005 106)"
      ctx.strokeStyle = "oklch(0.68 0.18 24)"
      ctx.lineWidth = 3
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.arc(x, y, 30, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()

      // Draw name
      ctx.fillStyle = "oklch(0.23 0.02 106)"
      ctx.font = "bold 11px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const firstName = name.split(" ")[0]
      ctx.fillText(firstName, x, y)
    })
  }, [participants])

  return (
    <div className="flex justify-center py-8">
      <canvas ref={canvasRef} className="max-w-full h-auto" />
    </div>
  )
}
