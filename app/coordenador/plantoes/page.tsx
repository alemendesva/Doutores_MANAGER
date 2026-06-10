"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
  Shuffle,
  Sparkles,
  BarChart3,
} from "lucide-react"

type VoluntarioRole = "coordenador" | "staff" | "clown" | "musico" | "intercessor" | "comunicacao"
type ShiftType = "visita_mensal" | "visita_extraordinaria" | "eventos"

interface Volunteer {
  id: string
  name: string
  status: "confirmado" | "pendente" | "cancelado"
  role: VoluntarioRole
}

interface Shift {
  id: string
  date: string
  startTime: string
  endTime: string
  hospital: string
  address: string
  type: ShiftType
  currentVolunteers: number
  volunteers: Volunteer[]
  status: "aberto" | "realizado" | "cancelado"
  notes: string
}

const hospitals = [
  { id: "1", name: "Hospital Santa Lúcia Sul", address: "SHLS 716" },
  { id: "2", name: "Hospital Santa Lúcia Norte", address: "SHLN 716" },
  { id: "3", name: "Hospital de Base", address: "SMHS Q 101" },
  { id: "4", name: "Hospital Brasília", address: "SGAS 613" },
  { id: "5", name: "Hospital Anchieta", address: "QNG AE 02" },
]

const initialShifts: Shift[] = [
  {
    id: "1",
    date: "2026-06-20",
    startTime: "08:00",
    endTime: "12:00",
    hospital: "Hospital Santa Lúcia Sul",
    address: "SHLS 716",
    type: "visita_mensal",
    currentVolunteers: 10,
    volunteers: [
      { id: "1", name: "Maria Silva", status: "confirmado", role: "coordenador" },
      { id: "2", name: "João Santos", status: "confirmado", role: "staff" },
      { id: "3", name: "Ana Costa", status: "confirmado", role: "clown" },
      { id: "4", name: "Pedro Lima", status: "confirmado", role: "clown" },
      { id: "5", name: "Lucas Ribeiro", status: "confirmado", role: "clown" },
      { id: "6", name: "Carla Souza", status: "confirmado", role: "musico" },
      { id: "7", name: "Mateus Rocha", status: "confirmado", role: "musico" },
      { id: "8", name: "Fernanda Alves", status: "confirmado", role: "intercessor" },
      { id: "9", name: "Ricardo Gomes", status: "confirmado", role: "intercessor" },
      { id: "10", name: "Beatriz Melo", status: "confirmado", role: "comunicacao" },
    ],
    status: "aberto",
    notes: "Levar hinários e instrumentos",
  },
  {
    id: "2",
    date: "2026-06-25",
    startTime: "14:00",
    endTime: "17:00",
    hospital: "Hospital de Base",
    address: "SMHS Q 101",
    type: "visita_extraordinaria",
    currentVolunteers: 2,
    volunteers: [
      { id: "11", name: "Carla Oliveira", status: "confirmado", role: "clown" },
      { id: "12", name: "Lucas Mendes", status: "pendente", role: "musico" },
    ],
    status: "aberto",
    notes: "Visita focada para membros específicos internados",
  },
  {
    id: "3",
    date: "2026-07-02",
    startTime: "09:00",
    endTime: "11:30",
    hospital: "Hospital Brasília",
    address: "SGAS 613",
    type: "eventos",
    currentVolunteers: 0,
    volunteers: [],
    status: "aberto",
    notes: "Apresentação institucional do projeto no auditório principal",
  }
]

export default function PlantoesPage() {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)
  
  // Estados para o Sorteio de Equipes
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false)
  const [activeShift, setActiveShift] = useState<Shift | null>(null)
  const [drawnTeam, setDrawnTeam] = useState<{
    coordenador: Volunteer[]
    staff: Volunteer[]
    clowns: Volunteer[]
    musicos: Volunteer[]
    intercessores: Volunteer[]
    comunicacao: Volunteer[]
  } | null>(null)

  const [newShift, setNewShift] = useState({
    date: "",
    startTime: "",
    endTime: "",
    hospital: "",
    type: "visita_mensal" as ShiftType,
    notes: "",
  })

  const filteredShifts = shifts.filter((shift) => {
    const matchesSearch =
      shift.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "todos" || shift.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Algoritmo de Sorteio Baseado em Funções
  const handleDrawTeam = (shift: Shift) => {
    setActiveShift(shift)
    
    const confirmados = shift.volunteers.filter(v => v.status === "confirmado")

    const filtrarEEmbaralhar = (role: VoluntarioRole) => {
      return confirmados
        .filter(v => v.role === role)
        .sort(() => Math.random() - 0.5)
    }

    const coordenadoresDisponiveis = filtrarEEmbaralhar("coordenador")
    const staffDisponiveis = filtrarEEmbaralhar("staff")
    const clownsDisponiveis = filtrarEEmbaralhar("clown")
    const musicosDisponiveis = filtrarEEmbaralhar("musico")
    const intercessoresDisponiveis = filtrarEEmbaralhar("intercessor")
    const comunicacaoDisponiveis = filtrarEEmbaralhar("comunicacao")

    const qtdClowns = clownsDisponiveis.length >= 2 ? 2 : 1
    const qtdMusicos = musicosDisponiveis.length >= 2 ? 2 : 1
    const qtdIntercessores = intercessoresDisponiveis.length >= 2 ? 2 : 1

    setDrawnTeam({
      coordenador: coordenadoresDisponiveis.slice(0, 1),
      staff: staffDisponiveis.slice(0, 1),
      clowns: clownsDisponiveis.slice(0, qtdClowns),
      musicos: musicosDisponiveis.slice(0, qtdMusicos),
      intercessores: intercessoresDisponiveis.slice(0, qtdIntercessores),
      comunicacao: comunicacaoDisponiveis.slice(0, 1),
    })

    setIsDrawModalOpen(true)
  }

  const handleCreateShift = () => {
    const hospital = hospitals.find((h) => h.id === newShift.hospital)
    if (!hospital) return

    const shift: Shift = {
      id: Date.now().toString(),
      date: newShift.date,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
      hospital: hospital.name,
      address: hospital.address,
      type: newShift.type,
      currentVolunteers: 0,
      volunteers: [],
      status: "aberto",
      notes: newShift.notes,
    }
    setShifts([...shifts, shift])
    setNewShift({
      date: "",
      startTime: "",
      endTime: "",
      hospital: "",
      type: "visita_mensal",
      notes: "",
    })
    setIsCreateOpen(false)
  }

  const handleDeleteShift = (id: string) => {
    setShifts(shifts.filter((s) => s.id !== id))
  }

  const getTypeBadge = (type: ShiftType) => {
    switch (type) {
      case "visita_mensal":
        return <Badge className="bg-purple-100 text-purple-700 font-medium">Visita Mensal</Badge>
      case "visita_extraordinaria":
        return <Badge className="bg-blue-100 text-blue-700 font-medium">Visita Extraordinária</Badge>
      case "eventos":
        return <Badge className="bg-amber-100 text-amber-700 font-medium">Eventos / Apresentações</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aberto":
        return <Badge className="bg-green-100 text-green-700">Aberto</Badge>
      case "realizado":
        return <Badge className="bg-gray-100 text-gray-600">Realizado</Badge>
      case "cancelado":
        return <Badge className="bg-red-100 text-red-700">Cancelado</Badge>
      default:
        return null
    }
  }

  const getRoleLabel = (role: VoluntarioRole) => {
    const labels: Record<VoluntarioRole, string> = {
      coordenador: "Coordenador",
      staff: "Staff",
      clown: "Clown",
      musico: "Músico",
      intercessor: "Intercessor",
      comunicacao: "Comunicação",
    }
    return labels[role]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00")
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
      full: date.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plantões</h1>
          <p className="text-gray-500">
            Crie e gerencie as agendas, visitas e eventos para os voluntários
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Plantão / Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Plantão ou Evento</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para disponibilizar na agenda geral de voluntariado.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="hospital">Local / Hospital</Label>
                <Select
                  value={newShift.hospital}
                  onValueChange={(value) => setNewShift({ ...newShift, hospital: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o local" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={newShift.date}
                  onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Horário Início</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newShift.startTime}
                    onChange={(e) =>
                      setNewShift({ ...newShift, startTime: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Horário Fim</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newShift.endTime}
                    onChange={(e) =>
                      setNewShift({ ...newShift, endTime: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Atividade</Label>
                <Select
                  value={newShift.type}
                  onValueChange={(value: ShiftType) =>
                    setNewShift({ ...newShift, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visita_mensal">Visita Mensal</SelectItem>
                    <SelectItem value="visita_extraordinaria">Visita Extraordinária (Para Membros)</SelectItem>
                    <SelectItem value="eventos">Eventos (Apresentações / Divulgação)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={newShift.notes}
                  onChange={(e) => setNewShift({ ...newShift, notes: e.target.value })}
                  placeholder="Informações relevantes, pautas do evento ou recomendações..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleCreateShift}
              >
                Criar Registro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {shifts.filter((s) => s.status === "aberto").length}
                </p>
                <p className="text-sm text-gray-500">Agendados / Abertos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{shifts.length}</p>
                <p className="text-sm text-gray-500">Total de Atividades</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {shifts.filter((s) => s.status === "realizado").length}
                </p>
                <p className="text-sm text-gray-500">Realizados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {shifts.reduce((acc, s) => acc + s.volunteers.length, 0)}
                </p>
                <p className="text-sm text-gray-500">Total de Inscritos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por local..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["todos", "aberto", "realizado"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={
                statusFilter === status
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : ""
              }
            >
              {status === "todos" ? "Todos" : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Shifts List */}
      <div className="space-y-4">
        {filteredShifts.map((shift) => {
          const dateInfo = formatDate(shift.date)
          return (
            <Card key={shift.id} className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px] p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{dateInfo.day}</p>
                    <p className="text-xs text-gray-500 uppercase">{dateInfo.month}</p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{shift.hospital}</h3>
                      {getTypeBadge(shift.type)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {shift.startTime} - {shift.endTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {shift.address}
                      </span>
                    </div>
                    {shift.notes && (
                      <p className="text-sm text-gray-400 mt-1">{shift.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* EXIBIÇÃO SIMPLIFICADA DE INSCRITOS (SEM LIMITE/BARRA) */}
                    <div className="text-right min-w-[100px]">
                      <p className="text-sm font-semibold text-gray-900">
                        {shift.volunteers.length} {shift.volunteers.length === 1 ? 'inscrito' : 'inscritos'}
                      </p>
                      <p className="text-xs text-gray-400">Sem limite de vagas</p>
                    </div>

                    {getStatusBadge(shift.status)}

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedShift(shift)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteShift(shift.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Volunteers List Area */}
                {shift.volunteers.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">
                        Voluntários Inscritos:
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-purple-600 border-purple-200 hover:bg-purple-50 text-xs h-7 px-2"
                        onClick={() => handleDrawTeam(shift)}
                      >
                        <Shuffle className="w-3 h-3 mr-1" />
                        Sortear Equipe
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {shift.volunteers.map((volunteer) => (
                        <Badge
                          key={volunteer.id}
                          variant="outline"
                          className={
                            volunteer.status === "confirmado"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : volunteer.status === "pendente"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {volunteer.status === "confirmado" && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {volunteer.status === "cancelado" && (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {volunteer.name} <span className="text-xs text-gray-400 ml-1">({getRoleLabel(volunteer.role)})</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* MODAL DE EXIBIÇÃO DO RESULTADO DO SORTEIO */}
      <Dialog open={isDrawModalOpen} onOpenChange={setIsDrawModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-purple-700">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Equipe Escalada por Sorteio
            </DialogTitle>
            <DialogDescription>
              Escala gerada aleatoriamente baseada nas funções dos voluntários confirmados para este registro no {activeShift?.hospital}.
            </DialogDescription>
          </DialogHeader>

          {drawnTeam && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-purple-50/50 border-purple-100">
                  <CardContent className="p-3">
                    <p className="text-xs font-semibold text-purple-700 mb-1">👑 Coordenador (1)</p>
                    {drawnTeam.coordenador.length > 0 ? (
                      drawnTeam.coordenador.map(v => <p key={v.id} className="text-sm font-medium text-gray-800">{v.name}</p>)
                    ) : (
                      <p className="text-xs text-red-500 italic">Vaga não preenchida</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-blue-50/50 border-blue-100">
                  <CardContent className="p-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">📋 Staff (1)</p>
                    {drawnTeam.staff.length > 0 ? (
                      drawnTeam.staff.map(v => <p key={v.id} className="text-sm font-medium text-gray-800">{v.name}</p>)
                    ) : (
                      <p className="text-xs text-red-500 italic">Vaga não preenchida</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-amber-50/50 border-amber-100">
                <CardContent className="p-3">
                  <p className="text-xs font-semibold text-amber-700 mb-1">🤡 Clowns / Palhaços (1 ou 2)</p>
                  {drawnTeam.clowns.length > 0 ? (
                    <div className="space-y-1">
                      {drawnTeam.clowns.map(v => <p key={v.id} className="text-sm font-medium text-gray-800">• {v.name}</p>)}
                    </div>
                  ) : (
                    <p className="text-xs text-red-500 italic">Nenhum palhaço disponível</p>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-emerald-50/50 border-emerald-100">
                  <CardContent className="p-3">
                    <p className="text-xs font-semibold text-emerald-700 mb-1">🎵 Músicos (1 ou 2)</p>
                    {drawnTeam.musicos.length > 0 ? (
                      drawnTeam.musicos.map(v => <p key={v.id} className="text-sm font-medium text-gray-800">• {v.name}</p>)
                    ) : (
                      <p className="text-xs text-red-500 italic">Vaga não preenchida</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-orange-50/50 border-orange-100">
                  <CardContent className="p-3">
                    <p className="text-xs font-semibold text-orange-700 mb-1">🙏 Intercessores (1 ou 2)</p>
                    {drawnTeam.intercessores.length > 0 ? (
                      drawnTeam.intercessores.map(v => <p key={v.id} className="text-sm font-medium text-gray-800">• {v.name}</p>)
                    ) : (
                      <p className="text-xs text-red-500 italic">Vaga não preenchida</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-rose-50/50 border-rose-100">
                <CardContent className="p-3">
                  <p className="text-xs font-semibold text-rose-700 mb-1">📸 Comunicação (1)</p>
                  {drawnTeam.comunicacao.length > 0 ? (
                    drawnTeam.comunicacao.map(v => <p key={v.id} className="text-sm font-medium text-gray-800">{v.name}</p>)
                  ) : (
                    <p className="text-xs text-red-500 italic">Vaga não preenchida</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => activeShift && handleDrawTeam(activeShift)}
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Refazer Sorteio
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setIsDrawModalOpen(false)}>
              Confirmar Escala
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {filteredShifts.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum registro encontrado
          </h3>
          <p className="text-gray-500 mb-4">
            Não encontramos atividades ou eventos com os critérios informados.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeiro Registro
          </Button>
        </div>
      )}
    </div>
  )
}