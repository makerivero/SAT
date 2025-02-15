"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import NuevaOrden from "./NuevaOrden"
import ListaOrdenes from "./ListaOrdenes"
import Alertas from "./Alertas"
import ConfiguracionEmpresa from "./ConfiguracionEmpresa"
import { ClipboardList, PenToolIcon as Tool, Calculator, Clock, CheckCircle, Settings } from "lucide-react"

export default function Dashboard() {
  const [ordenes, setOrdenes] = useState([])
  const [configuracionEmpresa, setConfiguracionEmpresa] = useState(null)

  useEffect(() => {
    const configGuardada = localStorage.getItem("configuracionEmpresa")
    if (configGuardada) {
      setConfiguracionEmpresa(JSON.parse(configGuardada))
    }
  }, [])

  const agregarOrden = (nuevaOrden) => {
    setOrdenes([...ordenes, { ...nuevaOrden, id: Date.now(), estado: "Ingresado" }])
  }

  const guardarConfiguracion = (config) => {
    setConfiguracionEmpresa(config)
    localStorage.setItem("configuracionEmpresa", JSON.stringify(config))
  }

  return (
    <div className="relative">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-blue-100 p-1">
          <TabsTrigger value="dashboard" className="rounded-lg data-[state=active]:bg-white">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="nueva-orden" className="rounded-lg data-[state=active]:bg-white">
            Nueva Orden
          </TabsTrigger>
          <TabsTrigger value="lista-ordenes" className="rounded-lg data-[state=active]:bg-white">
            Lista de Órdenes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className="bg-blue-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Órdenes Urgentes</CardTitle>
                <ClipboardList className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{ordenes.filter((o) => o.urgente).length}</div>
                <p className="text-xs text-blue-600">Requieren atención inmediata</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Reparación</CardTitle>
                <Tool className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {ordenes.filter((o) => o.estado === "En reparación").length}
                </div>
                <p className="text-xs text-green-600">Equipos en proceso</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Presupuesto</CardTitle>
                <Calculator className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {ordenes.filter((o) => o.estado === "Presupuestado").length}
                </div>
                <p className="text-xs text-yellow-600">Pendientes de aprobación</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Listos para Entregar</CardTitle>
                <CheckCircle className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {ordenes.filter((o) => o.estado === "Listo para entregar").length}
                </div>
                <p className="text-xs text-purple-600">Llamar al cliente</p>
              </CardContent>
            </Card>
            <Card className="bg-red-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Demorados</CardTitle>
                <Clock className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{ordenes.filter((o) => o.demorado).length}</div>
                <p className="text-xs text-red-600">Requieren seguimiento</p>
              </CardContent>
            </Card>
          </div>
          <Alertas ordenes={ordenes} />
        </TabsContent>
        <TabsContent value="nueva-orden">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Orden de Servicio</CardTitle>
              <CardDescription>Ingrese los datos del cliente y del equipo</CardDescription>
            </CardHeader>
            <CardContent>
              <NuevaOrden onAgregarOrden={agregarOrden} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lista-ordenes">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Órdenes</CardTitle>
              <CardDescription>Gestione las órdenes existentes</CardDescription>
            </CardHeader>
            <CardContent>
              <ListaOrdenes ordenes={ordenes} setOrdenes={setOrdenes} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="absolute top-0 right-0">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configuración de la Empresa</DialogTitle>
          </DialogHeader>
          <ConfiguracionEmpresa
            configuracionInicial={configuracionEmpresa}
            onGuardarConfiguracion={guardarConfiguracion}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

