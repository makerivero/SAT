import { Button } from "@/components/ui/button"

export default function GenerarMiniRemito({ orden }) {
  const generarMiniRemito = () => {
    const emoji = {
      celular: "📱",
      computadora: "💻",
      consola: "🎮",
    }

    const miniRemito = `
🧾 *Remito de Servicio Técnico* 🛠️

👤 Cliente: ${orden.cliente}
🆔 DNI: ${orden.dni}
📞 Teléfono: ${orden.telefono}

${emoji[orden.tipoEquipo] || "🔧"} Equipo: ${orden.marca} ${orden.modelo}
🚨 Falla: ${orden.falla}

💰 Presupuesto: $${orden.presupuesto || "Pendiente"}

🏷️ Nº de Orden: ${orden.id}
📅 Fecha: ${new Date(orden.id).toLocaleDateString()}

¡Gracias por confiar en nuestro servicio! 😊
    `.trim()

    const whatsappUrl = `https://wa.me/${orden.telefono}?text=${encodeURIComponent(miniRemito)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={generarMiniRemito} className="w-full bg-green-600 hover:bg-green-700 mt-2">
      Enviar Mini Remito por WhatsApp
    </Button>
  )
}

