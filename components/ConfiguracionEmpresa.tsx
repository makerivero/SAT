"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ConfiguracionEmpresa({ configuracionInicial, onGuardarConfiguracion }) {
  const [config, setConfig] = useState({
    nombreEmpresa: "",
    direccion: "",
    telefono: "",
    email: "",
    sitioWeb: "",
    logo: "",
    // Puedes agregar más campos según sea necesario
  })

  useEffect(() => {
    if (configuracionInicial) {
      setConfig(configuracionInicial)
    }
  }, [configuracionInicial])

  const handleChange = (e) => {
    const { name, value } = e.target
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGuardarConfiguracion(config)
    alert("Configuración guardada con éxito")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nombreEmpresa">Nombre de la Empresa</Label>
        <Input id="nombreEmpresa" name="nombreEmpresa" value={config.nombreEmpresa} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Textarea id="direccion" name="direccion" value={config.direccion} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="telefono">Teléfono</Label>
        <Input id="telefono" name="telefono" value={config.telefono} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={config.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="sitioWeb">Sitio Web</Label>
        <Input id="sitioWeb" name="sitioWeb" value={config.sitioWeb} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="logo">URL del Logo</Label>
        <Input
          id="logo"
          name="logo"
          value={config.logo}
          onChange={handleChange}
          placeholder="https://ejemplo.com/logo.png"
        />
      </div>
      <Button type="submit">Guardar Configuración</Button>
    </form>
  )
}

