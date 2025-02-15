"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import DetallesOrden from "./DetallesOrden"

export default function ListaOrdenes({ ordenes, setOrdenes }) {
  const [busqueda, setBusqueda] = useState("")
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null)

  const ordenesFiltradas = ordenes.filter(
    (orden) =>
      orden.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      orden.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
      orden.dni.toLowerCase().includes(busqueda.toLowerCase()),
  )

  const actualizarOrden = (ordenActualizada) => {
    setOrdenes(ordenes.map((orden) => (orden.id === ordenActualizada.id ? ordenActualizada : orden)))
    setOrdenSeleccionada(null)
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar por cliente, modelo o DNI..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>DNI</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordenesFiltradas.map((orden) => (
            <TableRow key={orden.id}>
              <TableCell>{orden.cliente}</TableCell>
              <TableCell>{`${orden.marca} ${orden.modelo}`}</TableCell>
              <TableCell>{orden.estado}</TableCell>
              <TableCell>{orden.dni}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setOrdenSeleccionada(orden)}>
                      Ver Detalles
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detalles de la Orden</DialogTitle>
                    </DialogHeader>
                    {ordenSeleccionada && (
                      <DetallesOrden orden={ordenSeleccionada} onActualizarOrden={actualizarOrden} />
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

