import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Alertas({ ordenes }) {
  const ordenesUrgentes = ordenes.filter((o) => o.urgente && o.estado !== "Entregado")
  const ordenesDemoradas = ordenes.filter((o) => {
    const fechaIngreso = new Date(o.id) // Usamos el id como timestamp de ingreso
    const diasTranscurridos = (Date.now() - fechaIngreso.getTime()) / (1000 * 3600 * 24)
    return diasTranscurridos > 7 && o.estado !== "Entregado"
  })

  return (
    <div className="space-y-4 mt-4">
      {ordenesUrgentes.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Órdenes Urgentes</AlertTitle>
          <AlertDescription>Hay {ordenesUrgentes.length} órdenes urgentes pendientes.</AlertDescription>
        </Alert>
      )}
      {ordenesDemoradas.length > 0 && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Órdenes Demoradas</AlertTitle>
          <AlertDescription>Hay {ordenesDemoradas.length} órdenes con más de 7 días sin entregar.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

