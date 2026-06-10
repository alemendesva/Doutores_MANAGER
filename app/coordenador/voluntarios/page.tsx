"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  CheckCircle,
  Clock,
  Eye,
  Building2,
  Plus,
  XCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

type VoluntarioRole = "coordenador" | "staff" | "clown" | "musico" | "intercessor" | "comunicacao"
type VolunteerStatus = "ativo" | "pendente" | "inativo"

interface Volunteer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  preferredHospital: string
  joinDate: string
  preferredDay: string
  preferredTime: string
  notes: string
  status: VolunteerStatus
  role: VoluntarioRole
  igreja: string
}

const initialVolunteers: Volunteer[] = [
  {
    id: "1",
    name: "José Pereira",
    phone: "(61) 99888-1111",
    email: "jose.pereira@email.com",
    address: "QNM 42, Conjunto A, Casa 15",
    city: "Taguatinga",
    preferredHospital: "Hospital Santa Lúcia Sul",
    joinDate: "2026-01-10",
    preferredDay: "Sábado",
    preferredTime: "Manhã",
    notes: "Já possui experiência com palhaçaria de hospital. Disponível para viagens.",
    status: "ativo",
    role: "clown",
    igreja: "Igreja Taguatinga",
  },
  {
    id: "2",
    name: "Ana Maria Santos",
    phone: "(61) 99888-2222",
    email: "ana.santos@email.com",
    address: "SHIS QI 15, Conjunto 10",
    city: "Asa Sul",
    preferredHospital: "Hospital de Base",
    joinDate: "2026-03-15",
    preferredDay: "Domingo",
    preferredTime: "Tarde",
    notes: "Toca violão e ukulele. Prefere atuar no período da tarde.",
    status: "ativo",
    role: "musico",
    igreja: "Igreja Asa Sul",
  },
  {
    id: "3",
    name: "Marcos Oliveira",
    phone: "(61) 99123-4567",
    email: "marcos.oliver@email.com",
    address: "Residencial Sul, Bloco B",
    city: "Águas Claras",
    preferredHospital: "Hospital Brasília",
    joinDate: "2026-06-01",
    preferredDay: "Qualquer dia",
    preferredTime: "Noite",
    notes: "Aguardando o próximo treinamento básico de integração.",
    status: "pendente",
    role: "staff",
    igreja: "Igreja Águas Claras",
  },
]

const igrejas = [
  "Igreja Central",
  "Igreja Asa Norte",
  "Igreja Asa Sul",
  "Igreja Taguatinga",
  "Igreja Águas Claras",
  "Igreja Ceilândia",
]

const rolesMap: Record<VoluntarioRole, string> = {
  coordenador: "Coordenador",
  staff: "Staff / Apoio",
  clown: "Clown / Palhaço",
  musico: "Músico",
  intercessor: "Intercessor",
  comunicacao: "Comunicação",
}

export default function VoluntariosPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [statusTargetVolunteer, setStatusTargetVolunteer] = useState<Volunteer | null>(null)
  const [updatedStatus, setUpdatedStatus] = useState<VolunteerStatus>("ativo")

  // Estados para o formulário de cadastro de novo voluntário
  const [isNewVolunteerOpen, setIsNewVolunteerOpen] = useState(false)
  const [newVolunteer, setNewVolunteer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    preferredHospital: "",
    preferredDay: "",
    preferredTime: "",
    role: "clown" as VoluntarioRole,
    igreja: "",
    notes: ""
  })

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.phone.includes(searchTerm) ||
      volunteer.preferredHospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "todos" || volunteer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: VolunteerStatus) => {
    switch (status) {
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pendente (Treinamento)
          </Badge>
        )
      case "ativo":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ativo
          </Badge>
        )
      case "inativo":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Inativo
          </Badge>
        )
      default:
        return null
    }
  }

  const handleOpenStatusModal = (volunteer: Volunteer) => {
    setStatusTargetVolunteer(volunteer)
    setUpdatedStatus(volunteer.status)
    setIsStatusModalOpen(true)
  }

  const confirmStatusUpdate = () => {
    if (statusTargetVolunteer) {
      setVolunteers(prev => prev.map(vol => 
        vol.id === statusTargetVolunteer.id 
          ? { ...vol, status: updatedStatus } 
          : vol
      ))
    }
    setIsStatusModalOpen(false)
    setStatusTargetVolunteer(null)
  }

  const handleCreateVolunteer = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newRecord: Volunteer = {
      id: String(Date.now()),
      ...newVolunteer,
      joinDate: new Date().toISOString().split('T')[0],
      status: "pendente"
    }

    setVolunteers([newRecord, ...volunteers])
    setIsNewVolunteerOpen(false)
    
    setNewVolunteer({
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      preferredHospital: "",
      preferredDay: "",
      preferredTime: "",
      role: "clown",
      igreja: "",
      notes: ""
    })
  }

  return (
    <div className="space-y-6">
      {/* Header com o botão corrigido */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Voluntários</h1>
          <p className="text-gray-500">
            Cadastre, gerencie e acompanhe a situação dos voluntários do Doutores da Esperança
          </p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => setIsNewVolunteerOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Voluntário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 p-6 flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{volunteers.length}</p>
            <p className="text-sm text-gray-500">Total Inscritos</p>
          </div>
        </Card>
        <Card className="border-gray-200 p-6 flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {volunteers.filter((v) => v.status === "ativo").length}
            </p>
            <p className="text-sm text-gray-500">Ativos em Plantão</p>
          </div>
        </Card>
        <Card className="border-gray-200 p-6 flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {volunteers.filter((v) => v.status === "pendente").length}
            </p>
            <p className="text-sm text-gray-500">Aguardando Treinamento</p>
          </div>
        </Card>
        <Card className="border-gray-200 p-6 flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {volunteers.filter((v) => v.role === "clown").length}
            </p>
            <p className="text-sm text-gray-500">Clowns / Palhaços</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nome, telefone ou hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["todos", "ativo", "pendente", "inativo"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={
                statusFilter === status
                  ? "bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
                  : "whitespace-nowrap"
              }
            >
              {status === "todos" ? "Todos" : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voluntário / Função</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Hospital de Preferência</TableHead>
                <TableHead>Data de Entrada</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-medium">
                        {volunteer.name ? volunteer.name.charAt(0) : "V"}
                      </div>
                      <div>
                        <p className="font-medium">{volunteer.name}</p>
                        <Badge variant="secondary" className="text-xs mt-0.5">
                          {rolesMap[volunteer.role]}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3" /> {volunteer.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" /> {volunteer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      {volunteer.preferredHospital}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(volunteer.joinDate + "T00:00:00").toLocaleDateString("pt-BR")}
                    </div>
                    <div className="text-xs text-gray-400">
                      {volunteer.preferredDay} ({volunteer.preferredTime})
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedVolunteer(volunteer)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-600 border-purple-200 hover:bg-purple-50 text-xs"
                        onClick={() => handleOpenStatusModal(volunteer)}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                        Status
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MODAL DE CADASTRO DE NOVO VOLUNTÁRIO */}
      <Dialog open={isNewVolunteerOpen} onOpenChange={setIsNewVolunteerOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Voluntário</DialogTitle>
            <DialogDescription>
              Insira as informações do novo voluntário para compor as equipes do Doutores da Esperança.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateVolunteer} className="space-y-4 mt-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nome Completo *</label>
              <Input 
                required
                value={newVolunteer.name}
                onChange={e => setNewVolunteer({...newVolunteer, name: e.target.value})}
                placeholder="Ex: Carlos Augusto Silva"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Telefone / WhatsApp *</label>
                <Input 
                  required
                  value={newVolunteer.phone}
                  onChange={e => setNewVolunteer({...newVolunteer, phone: e.target.value})}
                  placeholder="(61) 99999-9999"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">E-mail *</label>
                <Input 
                  required
                  type="email"
                  value={newVolunteer.email}
                  onChange={e => setNewVolunteer({...newVolunteer, email: e.target.value})}
                  placeholder="voluntario@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1">
                <label className="text-sm font-medium">Endereço</label>
                <Input 
                  value={newVolunteer.address}
                  onChange={e => setNewVolunteer({...newVolunteer, address: e.target.value})}
                  placeholder="Rua, Conjunto, Casa..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Região / Cidade *</label>
                <Input 
                  required
                  value={newVolunteer.city}
                  onChange={e => setNewVolunteer({...newVolunteer, city: e.target.value})}
                  placeholder="Ex: Ceilândia"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Função Ministerial *</label>
                <Select 
                  value={newVolunteer.role} 
                  onValueChange={value => setNewVolunteer({...newVolunteer, role: value as VoluntarioRole})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clown">Clown / Palhaço</SelectItem>
                    <SelectItem value="musico">Músico</SelectItem>
                    <SelectItem value="intercessor">Intercessor</SelectItem>
                    <SelectItem value="staff">Staff / Apoio</SelectItem>
                    <SelectItem value="coordenador">Coordenador</SelectItem>
                    <SelectItem value="comunicacao">Comunicação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Igreja / Congregação</label>
                <Select 
                  value={newVolunteer.igreja} 
                  onValueChange={value => setNewVolunteer({...newVolunteer, igreja: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a igreja" />
                  </SelectTrigger>
                  <SelectContent>
                    {igrejas.map(igreja => (
                      <SelectItem key={igreja} value={igreja}>{igreja}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Hospital de Preferência para Atuação</label>
              <Input 
                value={newVolunteer.preferredHospital}
                onChange={e => setNewVolunteer({...newVolunteer, preferredHospital: e.target.value})}
                placeholder="Ex: Hospital de Base / Santa Lúcia"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Dia Preferencial</label>
                <Select 
                  value={newVolunteer.preferredDay} 
                  onValueChange={value => setNewVolunteer({...newVolunteer, preferredDay: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo", "Qualquer dia"].map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Período Preferencial</label>
                <Select 
                  value={newVolunteer.preferredTime} 
                  onValueChange={value => setNewVolunteer({...newVolunteer, preferredTime: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Manhã", "Tarde", "Noite"].map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Histórico ou Notas Importantes</label>
              <Textarea 
                value={newVolunteer.notes}
                onChange={e => setNewVolunteer({...newVolunteer, notes: e.target.value})}
                placeholder="Observações sobre o voluntário, talentos, restrições médicas ou experiências anteriores..."
                rows={2}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsNewVolunteerOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Salvar Voluntário
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL DE DETALHES DO VOLUNTÁRIO */}
      <Dialog open={!!selectedVolunteer} onOpenChange={() => setSelectedVolunteer(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ficha Completa do Voluntário</DialogTitle>
          </DialogHeader>

          {selectedVolunteer && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-2xl font-medium">
                  {selectedVolunteer.name ? selectedVolunteer.name.charAt(0) : "V"}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedVolunteer.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {rolesMap[selectedVolunteer.role]}
                    </Badge>
                    {getStatusBadge(selectedVolunteer.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Telefone / WhatsApp</p>
                  <p className="text-sm font-medium flex items-center gap-2 mt-0.5">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {selectedVolunteer.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">E-mail</p>
                  <p className="text-sm font-medium flex items-center gap-2 mt-0.5">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {selectedVolunteer.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Endereço de Residência</p>
                  <p className="text-sm font-medium flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {selectedVolunteer.address ? `${selectedVolunteer.address}, ` : ""}{selectedVolunteer.city}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Igreja Vinculada</p>
                  <p className="text-sm font-medium mt-0.5">{selectedVolunteer.igreja || "Não informada"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Hospital Preferencial</p>
                  <p className="text-sm font-medium flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {selectedVolunteer.preferredHospital || "Qualquer Hospital"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Data de Cadastro</p>
                  <p className="text-sm font-medium flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(selectedVolunteer.joinDate + "T00:00:00").toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-medium">Disponibilidade de Horários</p>
                <p className="text-sm font-medium mt-0.5">
                  {selectedVolunteer.preferredDay} — Período da {selectedVolunteer.preferredTime}
                </p>
              </div>

              {selectedVolunteer.notes && (
                <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                  <p className="text-xs font-semibold text-amber-800">Observações Gerais</p>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                    {selectedVolunteer.notes}
                  </p>
                </div>
              )}

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-2"
                onClick={() => {
                  setSelectedVolunteer(null)
                  handleOpenStatusModal(selectedVolunteer)
                }}
              >
                Alterar Status / Permissão
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL DE ALTERAÇÃO DE STATUS */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Alterar Situação do Voluntário</DialogTitle>
            <DialogDescription>
              Modifique o status operacional de {statusTargetVolunteer?.name} no sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status Atual de Atuação</label>
              <Select 
                value={updatedStatus} 
                onValueChange={(value) => setUpdatedStatus(value as VolunteerStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o novo status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo (Pode ser escalado em plantões)</SelectItem>
                  <SelectItem value="pendente">Pendente (Aguardando treinamento/ficha)</SelectItem>
                  <SelectItem value="inativo">Inativo (Afastado temporariamente)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={confirmStatusUpdate}
            >
              Atualizar Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}