"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function GenerarRemito({ orden }) {
  const [imprimirDuplicado, setImprimirDuplicado] = useState(false)
  const [configuracionEmpresa, setConfiguracionEmpresa] = useState(null)

  useEffect(() => {
    const configGuardada = localStorage.getItem("configuracionEmpresa")
    if (configGuardada) {
      setConfiguracionEmpresa(JSON.parse(configGuardada))
    }
  }, [])

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    printWindow.document.write("<html><head><title>Remito de Servicio Técnico</title>")
    printWindow.document.write("<style>")
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; }
      .header { text-align: center; margin-bottom: 20px; }
      .content { margin-bottom: 20px; }
      .footer { text-align: center; font-size: 12px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      .patron { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; width: 100px; height: 100px; margin: 10px auto; }
      .punto { width: 20px; height: 20px; border-radius: 50%; border: 1px solid #007bff; }
      .punto.activo { background-color: #007bff; }
      .firma { margin-top: 30px; border-top: 1px solid #000; width: 200px; text-align: center; }
    `)
    printWindow.document.write("</style></head><body>")

    printWindow.document.write(`
      <div class="header">
        <h1>${configuracionEmpresa?.nombreEmpresa || "Servicio Técnico"}</h1>
        <p>${configuracionEmpresa?.direccion || ""}</p>
        <p>Tel: ${configuracionEmpresa?.telefono || ""} | Email: ${configuracionEmpresa?.email || ""}</p>
      </div>
      <div class="content">
        <h2>Remito de Servicio Técnico</h2>
        <p>Nº de Orden: ${orden.id}</p>
        <table>
          <tr>
            <th>Cliente</th>
            <td>${orden.cliente}</td>
          </tr>
          <tr>
            <th>Teléfono</th>
            <td>${orden.telefono}</td>
          </tr>
          <tr>
            <th>Equipo</th>
            <td>${orden.tipoEquipo} ${orden.marca} ${orden.modelo}</td>
          </tr>
          <tr>
            <th>Falla reportada</th>
            <td>${orden.falla}</td>
          </tr>
          <tr>
            <th>Estado de ingreso</th>
            <td>${orden.estadoIngreso.join(", ")}</td>
          </tr>
          <tr>
            <th>Fecha de ingreso</th>
            <td>${new Date(orden.id).toLocaleDateString()}</td>
          </tr>
          ${
            orden.tipoEquipo === "celular" && orden.tienePatron
              ? `
          <tr>
            <th>Patrón de desbloqueo</th>
            <td>
              <div class="patron">
                ${Array(9)
                  .fill()
                  .map(
                    (_, i) => `
                  <div class="punto${orden.patron.includes(i) ? " activo" : ""}"></div>
                `,
                  )
                  .join("")}
              </div>
            </td>
          </tr>
          `
              : ""
          }
        </table>
        <div class="firma">
          <p>Firma del cliente</p>
        </div>
      </div>
      <div class="footer">
        <p>Este remito es un comprobante de recepción del equipo. Por favor, consérvelo para retirar su dispositivo.</p>
        <p>El taller no se responsabiliza por equipos no retirados dentro de los 30 días posteriores al aviso de reparación finalizada.</p>
        <p>Garantía de reparación: 30 días a partir de la fecha de entrega, únicamente sobre el trabajo realizado.</p>
        <p>Este documento no tiene validez como factura. Solicite su factura al retirar el equipo.</p>
      </div>
    `)

    if (imprimirDuplicado) {
      printWindow.document.write('<div style="page-break-before: always;"></div>')
      printWindow.document.write('<h2 style="text-align: center;">DUPLICADO</h2>')
      // Repeat the content here for the duplicate
    }

    printWindow.document.write("</body></html>")
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="imprimir-duplicado" checked={imprimirDuplicado} onCheckedChange={setImprimirDuplicado} />
        <Label htmlFor="imprimir-duplicado">Imprimir duplicado</Label>
      </div>
      <Button onClick={handlePrint} className="w-full bg-blue-600 hover:bg-blue-700">
        Imprimir Remito
      </Button>
    </div>
  )
}

