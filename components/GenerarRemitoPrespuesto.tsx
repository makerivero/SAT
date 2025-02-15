"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function GenerarRemitoPrespuesto({ orden }) {
  const [detalles, setDetalles] = useState("")
  const [total, setTotal] = useState(orden.presupuesto || "")

  const generarRemito = () => {
    const remito = `
🧾 *Presupuesto de Servicio Técnico* 🛠️

👤 Cliente: ${orden.cliente}
🆔 DNI: ${orden.dni}
📞 Teléfono: ${orden.telefono}

🔧 Equipo: ${orden.marca} ${orden.modelo}
🚨 Falla reportada: ${orden.falla}

📝 Detalles del presupuesto:
${detalles}

💰 Total: $${total}

🏷️ Nº de Orden: ${orden.id}
📅 Fecha: ${new Date().toLocaleDateString()}

Por favor, confirme si desea proceder con la reparación.
¡Gracias por confiar en nuestro servicio! 😊
    `.trim()

    const whatsappUrl = `https://wa.me/${orden.telefono}?text=${encodeURIComponent(remito)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Generar Remito de Presupuesto</h3>
      <div>
        <Label htmlFor="detalles">Detalles del presupuesto</Label>
        <Textarea
          id="detalles"
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
          placeholder="Ingrese los detalles del presupuesto"
        />
      </div>
      <div>
        <Label htmlFor="total">Total del presupuesto</Label>
        <Input
          id="total"
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="Ingrese el total del presupuesto"
        />
      </div>
      <Button onClick={generarRemito} className="w-full bg-green-600 hover:bg-green-700">
        Enviar Remito de Presupuesto por WhatsApp
      </Button>
    </div>
  )
}

