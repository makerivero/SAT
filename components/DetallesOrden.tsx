"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import PatronDesbloqueo from "./PatronDesbloqueo"
import GenerarRemito from "./GenerarRemito"
import GenerarMiniRemito from "./GenerarMiniRemito"
import GenerarRemitoPrespuesto from "./GenerarRemitoPrespuesto"

export default function DetallesOrden({ orden, onActualizarOrden }) {
  const [ordenEditada, setOrdenEditada] = useState(orden)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setOrdenEditada((prevOrden) => ({
      ...prevOrden,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setOrdenEditada((prevOrden) => ({
      ...prevOrden,
      [name]: value,
    }))
  }

  const handlePatronChange = (patron) => {
    setOrdenEditada((prevOrden) => ({
      ...prevOrden,
      patron,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onActualizarOrden(ordenEditada)
  }

  return (
    <ScrollArea className="h-[80vh] pr-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cliente">Cliente</Label>
            <Input id="cliente" name="cliente" value={ordenEditada.cliente} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" name="telefono" value={ordenEditada.telefono} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="dni">DNI</Label>
            <Input id="dni" name="dni" value={ordenEditada.dni} onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="tipoEquipo">Tipo de Equipo</Label>
            <Input id="tipoEquipo" name="tipoEquipo" value={ordenEditada.tipoEquipo} onChange={handleChange} readOnly />
          </div>
          <div>
            <Label htmlFor="marca">Marca</Label>
            <Input id="marca" name="marca" value={ordenEditada.marca} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="modelo">Modelo</Label>
            <Input id="modelo" name="modelo" value={ordenEditada.modelo} onChange={handleChange} />
          </div>
        </div>

        {ordenEditada.tipoEquipo === "computadora" && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="microprocesador">Microprocesador</Label>
              <Input
                id="microprocesador"
                name="microprocesador"
                value={ordenEditada.microprocesador}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="memoria">Memoria RAM</Label>
              <Input id="memoria" name="memoria" value={ordenEditada.memoria} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="placaVideo">Placa de Video</Label>
              <Input id="placaVideo" name="placaVideo" value={ordenEditada.placaVideo} onChange={handleChange} />
            </div>
          </div>
        )}

        {ordenEditada.tipoEquipo === "celular" && (
          <>
            <div>
              <Label htmlFor="imei">IMEI</Label>
              <Input id="imei" name="imei" value={ordenEditada.imei} onChange={handleChange} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="tienePatron"
                name="tienePatron"
                checked={ordenEditada.tienePatron}
                onCheckedChange={(checked) =>
                  handleChange({ target: { name: "tienePatron", type: "checkbox", checked } })
                }
              />
              <Label htmlFor="tienePatron">Tiene patrón de seguridad</Label>
            </div>
            {ordenEditada.tienePatron && (
              <PatronDesbloqueo onChange={handlePatronChange} patron={ordenEditada.patron} />
            )}
          </>
        )}

        <div>
          <Label htmlFor="falla">Falla</Label>
          <Textarea id="falla" name="falla" value={ordenEditada.falla} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="estado">Estado</Label>
            <Select
              name="estado"
              value={ordenEditada.estado}
              onValueChange={(value) => handleSelectChange("estado", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ingresado">Ingresado</SelectItem>
                <SelectItem value="En reparación">En reparación</SelectItem>
                <SelectItem value="Presupuestado">Presupuestado</SelectItem>
                <SelectItem value="Listo para entregar">Listo para entregar</SelectItem>
                <SelectItem value="Entregado">Entregado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="presupuesto">Presupuesto</Label>
            <Input
              id="presupuesto"
              name="presupuesto"
              type="number"
              value={ordenEditada.presupuesto || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="submit">Actualizar Orden</Button>
      </form>
      <div className="mt-8">
        <GenerarRemito orden={ordenEditada} />
      </div>
      <div className="mt-4">
        <GenerarMiniRemito orden={ordenEditada} />
      </div>
      <div className="mt-4">
        <GenerarRemitoPrespuesto orden={ordenEditada} />
      </div>
    </ScrollArea>
  )
}

