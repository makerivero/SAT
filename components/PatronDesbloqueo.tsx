"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function PatronDesbloqueo({ onChange, patron = [] }) {
  const [puntos, setPuntos] = useState(Array(9).fill(false))

  useEffect(() => {
    if (patron.length > 0) {
      const nuevoPuntos = Array(9).fill(false)
      patron.forEach((index) => {
        nuevoPuntos[index] = true
      })
      setPuntos(nuevoPuntos)
    }
  }, [patron])

  const togglePunto = (index) => {
    const nuevoPuntos = [...puntos]
    nuevoPuntos[index] = !nuevoPuntos[index]
    setPuntos(nuevoPuntos)
    onChange(nuevoPuntos.map((p, i) => (p ? i : null)).filter((p) => p !== null))
  }

  return (
    <div className="w-64 h-64 grid grid-cols-3 gap-4 mx-auto">
      {puntos.map((activo, index) => (
        <Button
          key={index}
          className={`w-16 h-16 rounded-full ${activo ? "bg-blue-500" : "bg-gray-200"}`}
          onClick={() => togglePunto(index)}
        />
      ))}
    </div>
  )
}

