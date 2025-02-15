"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import PatronDesbloqueo from "./PatronDesbloqueo"

export default function NuevaOrden({ onAgregarOrden }) {
  const [orden, setOrden] = useState({
    cliente: "",
    telefono: "",
    tipoEquipo: "",
    marca: "",
    modelo: "",
    falla: "",
    estadoIngreso: [],
    urgente: false,
    // Campos específicos para computadoras
    microprocesador: "",
    memoria: "",
    placaVideo: "",
    // Campos específicos para celulares
    imei: "",
    tienePatron: false,
    patron: [],
    dni: "", // Added dni to the state
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setOrden((prevOrden) => ({
      ...prevOrden,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setOrden((prevOrden) => ({
      ...prevOrden,
      [name]: value,
    }))
  }

  const handleEstadoIngresoChange = (item) => {
    setOrden((prevOrden) => ({
      ...prevOrden,
      estadoIngreso: prevOrden.estadoIngreso.includes(item)
        ? prevOrden.estadoIngreso.filter((i) => i !== item)
        : [...prevOrden.estadoIngreso, item],
    }))
  }

  const handlePatronChange = (patron) => {
    setOrden((prevOrden) => ({
      ...prevOrden,
      patron,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAgregarOrden(orden)
    setOrden({
      cliente: "",
      telefono: "",
      tipoEquipo: "",
      marca: "",
      modelo: "",
      falla: "",
      estadoIngreso: [],
      urgente: false,
      microprocesador: "",
      memoria: "",
      placaVideo: "",
      imei: "",
      tienePatron: false,
      patron: [],
      dni: "", // Added dni to the reset state
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cliente">Nombre del Cliente</Label>
          <Input id="cliente" name="cliente" value={orden.cliente} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input id="telefono" name="telefono" value={orden.telefono} onChange={handleChange} required />
        </div>
        <div>
          {" "}
          {/* Added DNI input */}
          <Label htmlFor="dni">DNI</Label>
          <Input id="dni" name="dni" value={orden.dni} onChange={handleChange} required />
        </div>
      </div>
      <div>
        <Label htmlFor="tipoEquipo">Tipo de Equipo</Label>
        <Select name="tipoEquipo" onValueChange={(value) => handleSelectChange("tipoEquipo", value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el tipo de equipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="celular">Celular</SelectItem>
            <SelectItem value="computadora">Computadora</SelectItem>
            <SelectItem value="consola">Consola</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="marca">Marca</Label>
          <Input id="marca" name="marca" value={orden.marca} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="modelo">Modelo</Label>
          <Input id="modelo" name="modelo" value={orden.modelo} onChange={handleChange} required />
        </div>
      </div>

      {orden.tipoEquipo === "computadora" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="microprocesador">Microprocesador</Label>
            <Input id="microprocesador" name="microprocesador" value={orden.microprocesador} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="memoria">Memoria RAM</Label>
            <Input id="memoria" name="memoria" value={orden.memoria} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="placaVideo">Placa de Video</Label>
            <Input id="placaVideo" name="placaVideo" value={orden.placaVideo} onChange={handleChange} />
          </div>
        </div>
      )}

      {orden.tipoEquipo === "celular" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="imei">IMEI</Label>
            <Input id="imei" name="imei" value={orden.imei} onChange={handleChange} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tienePatron"
              name="tienePatron"
              checked={orden.tienePatron}
              onCheckedChange={(checked) =>
                handleChange({ target: { name: "tienePatron", type: "checkbox", checked } })
              }
            />
            <Label htmlFor="tienePatron">Tiene patrón de seguridad</Label>
          </div>
          {orden.tienePatron && <PatronDesbloqueo onChange={handlePatronChange} patron={orden.patron} />}
        </div>
      )}

      <div>
        <Label htmlFor="falla">Descripción de la Falla</Label>
        <Textarea id="falla" name="falla" value={orden.falla} onChange={handleChange} required />
      </div>
      <div>
        <Label>Estado de Ingreso</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Rayado", "Golpeado", "Pantalla rota", "Sin batería"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={orden.estadoIngreso.includes(item)}
                onCheckedChange={() => handleEstadoIngresoChange(item)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="urgente"
          name="urgente"
          checked={orden.urgente}
          onCheckedChange={(checked) => handleChange({ target: { name: "urgente", type: "checkbox", checked } })}
        />
        <Label htmlFor="urgente">Urgente</Label>
      </div>
      <Button type="submit">Crear Orden</Button>
    </form>
  )
}

