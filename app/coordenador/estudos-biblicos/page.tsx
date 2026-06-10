"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
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
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Send,
  Eye,
  Building2,
} from "lucide-react"

interface StudyRequest {
  id: string
  patientName: string
  phone: string
  email: string
  address: string
  city: string
  hospital: string
  requestDate: string
  preferredDay: string
  preferredTime: string
  notes: string
  status: "pendente" | "encaminhado" | "em_andamento" | "concluido"
  assignedTo: string | null
}

const initialStudyRequests: StudyRequest[] = [
  {
    id: "1",
    patientName: "José Pereira",
    phone: "(61) 99888-1111",
    email: "jose.pereira@email.com",
    address: "QNM 42, Conjunto A, Casa 15",
    city: "Taguatinga",
    hospital: "Hospital Santa Lúcia Sul",
    requestDate: "2026-06-15",
    preferredDay: "Sábado",
    preferredTime: "Manhã",
    notes: "Paciente demonstrou muito interesse durante a visita. Prefere estudos presenciais.",
    status: "pendente",
    assignedTo: null,
  },
  {
    id: "2",
    patientName: "Ana Maria Santos",
    phone: "(61) 99888-2222",
    email: "ana.santos@email.com",
    address: "SHIS QI 15, Conjunto 10",
    city: "Brasília",
    hospital: "Hospital de Base",
    requestDate: "2026-06-14",
    preferredDay: "Domingo",
    preferredTime: "Tarde",
    notes: "Familiar do paciente internado. Aceita estudos online.",
    status: "encaminhado",
    assignedTo: "Igreja Central",
  },
  {
    id: "3",
    patientName: "Carlos Silva",
    phone: "(61) 99888-3333",
    email: "carlos.silva@email.com",
    address: "SQSW 303, Bloco B",
    city: "Brasília",
    hospital: "Hospital Santa Lúcia Norte",
    requestDate: "2026-06-10",
    preferredDay: "Quarta",
    preferredTime: "Noite",
    notes: "",
    status: "em_andamento",
    assignedTo: "Igreja Asa Norte",
  },
  {
    id: "4",
    patientName: "Maria Fernanda",
    phone: "(61) 99888-4444",
    email: "maria.fernanda@email.com",
    address: "Rua das Acacia, 123",
    city: "Águas Claras",
    hospital: "Hospital Anchieta",
    requestDate: "2026-06-01",
    preferredDay: "Sábado",
    preferredTime: "Manhã",
    notes: "Completou os estudos com sucesso.",
    status: "concluido",
    assignedTo: "Igreja Águas Claras",
  },
  {
    id: "5",
    patientName: "Roberto Lima",
    phone: "(61) 99888-5555",
    email: "roberto.lima@email.com",
    address: "QNA 52, Lote 8",
    city: "Taguatinga",
    hospital: "Hospital Santa Lúcia Sul",
    requestDate: "2026-06-16",
    preferredDay: "Domingo",
    preferredTime: "Manhã",
    notes: "Solicitou material de estudo adicional.",
    status: "pendente",
    assignedTo: null,
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

export default function EstudosBiblicosPage() {
  const [requests, setRequests] = useState<StudyRequest[]>(initialStudyRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [selectedRequest, setSelectedRequest] = useState<StudyRequest | null>(null)
  
  const [isForwardOpen, setIsForwardOpen] = useState(false)
  const [forwardRequest, setForwardRequest] = useState<StudyRequest | null>(null)
  const [selectedIgreja, setSelectedIgreja] = useState("")
  const [forwardNotes, setForwardNotes] = useState("")

  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false)
  const [newPatient, setNewPatient] = useState({
    patientName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    hospital: "",
    preferredDay: "",
    preferredTime: "",
    notes: ""
  })

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone.includes(searchTerm) ||
      request.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "todos" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "encaminhado":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Send className="w-3 h-3 mr-1" />
            Encaminhado
          </Badge>
        )
      case "em_andamento":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <BookOpen className="w-3 h-3 mr-1" />
            Em Andamento
          </Badge>
        )
      case "concluido":
        return (
          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Concluído
          </Badge>
        )
      default:
        return null
    }
  }

  const handleForward = (request: StudyRequest) => {
    setForwardRequest(request)
    setIsForwardOpen(true)
  }

  const confirmForward = () => {
    if (!forwardRequest) return

    setRequests(prev => prev.map(req => 
      req.id === forwardRequest.id 
        ? { ...req, status: "encaminhado", assignedTo: selectedIgreja, notes: forwardNotes || req.notes }
        : req
    ))

    setIsForwardOpen(false)
    setForwardRequest(null)
    setSelectedIgreja("")
    setForwardNotes("")
  }

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault()
    
    const createdRequest: StudyRequest = {
      id: String(requests.length + 1),
      patientName: newPatient.patientName,
      phone: newPatient.phone,
      email: newPatient.email || "Não informado",
      address: newPatient.address || "Não informado",
      city: newPatient.city || "Não informada",
      hospital: newPatient.hospital,
      requestDate: new Date().toISOString().split('T')[0],
      preferredDay: newPatient.preferredDay || "Não informado",
      preferredTime: newPatient.preferredTime || "Não informado",
      notes: newPatient.notes,
      status: "pendente",
      assignedTo: null
    }

    setRequests(prev => [createdRequest, ...prev])
    setIsNewPatientOpen(false)
    
    setNewPatient({
      patientName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      hospital: "",
      preferredDay: "",
      preferredTime: "",
      notes: ""
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solicitações de Estudos Bíblicos</h1>
          <p className="text-gray-500">
            Gerencie e encaminhe as solicitações de estudos bíblicos dos pacientes
          </p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => setIsNewPatientOpen(true)}
        >
          + Novo Paciente
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {requests.filter((r) => r.status === "pendente").length}
                </p>
                <p className="text-sm text-gray-500">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {requests.filter((r) => r.status === "encaminhado").length}
                </p>
                <p className="text-sm text-gray-500">Encaminhados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {requests.filter((r) => r.status === "em_andamento").length}
                </p>
                <p className="text-sm text-gray-500">Em Andamento</p>
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
                  {requests.filter((r) => r.status === "concluido").length}
                </p>
                <p className="text-sm text-gray-500">Concluídos</p>
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
            placeholder="Buscar por nome, telefone ou hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["todos", "pendente", "encaminhado", "em_andamento", "concluido"].map(
            (status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={
                  statusFilter === status
                    ? "bg-green-600 hover:bg-green-700 text-white shrink-0"
                    : "shrink-0"
                }
              >
                {status === "todos"
                  ? "Todos"
                  : status === "em_andamento"
                  ? "Em Andamento"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-medium">
                        {request.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{request.patientName}</p>
                        <p className="text-sm text-gray-500">{request.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        {request.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        {request.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      {request.hospital}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(request.requestDate + "T00:00:00").toLocaleDateString("pt-BR")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {request.preferredDay} - {request.preferredTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(request.status)}
                    {request.assignedTo && (
                      <p className="text-xs text-gray-500 mt-1">
                        {request.assignedTo}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {request.status === "pendente" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => handleForward(request)}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Encaminhar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma solicitação encontrada
          </h3>
          <p className="text-gray-500">
            Não encontramos solicitações com os critérios de busca informados.
          </p>
        </div>
      )}

      {/* MODAL: Cadastro de Paciente para Estudo Bíblico */}
      <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nova Solicitação de Estudo Bíblico</DialogTitle>
            <DialogDescription>
              Insira os dados do paciente que demonstrou interesse em receber os estudos.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePatient} className="space-y-4 mt-2">
            <div className="space-y-1">
              <Label htmlFor="newName">Nome do Paciente *</Label>
              <Input 
                id="newName" 
                required 
                value={newPatient.patientName} 
                onChange={e => setNewPatient(prev => ({...prev, patientName: e.target.value}))}
                placeholder="Ex: João da Silva"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="newPhone">Telefone de Contato *</Label>
                <Input 
                  id="newPhone" 
                  required 
                  value={newPatient.phone} 
                  onChange={e => setNewPatient(prev => ({...prev, phone: e.target.value}))}
                  placeholder="Ex: (61) 99999-9999"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newEmail">E-mail (Opcional)</Label>
                <Input 
                  id="newEmail" 
                  type="email"
                  value={newPatient.email} 
                  onChange={e => setNewPatient(prev => ({...prev, email: e.target.value}))}
                  placeholder="Ex: paciente@email.com"
                />
              </div>
            </div>

            {/* MODIFICADO: Retirada a obrigatoriedade (required) do Endereço e da Cidade */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1">
                <Label htmlFor="newAddress">Endereço residencial (Opcional)</Label>
                <Input 
                  id="newAddress" 
                  value={newPatient.address} 
                  onChange={e => setNewPatient(prev => ({...prev, address: e.target.value}))}
                  placeholder="Ex: QNM 12, Conjunto H, Casa 2"
                />
              </div>
              <div className="col-span-1 space-y-1">
                <Label htmlFor="newCity">Cidade (Opcional)</Label>
                <Input 
                  id="newCity" 
                  value={newPatient.city} 
                  onChange={e => setNewPatient(prev => ({...prev, city: e.target.value}))}
                  placeholder="Ex: Ceilândia"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="newHospital">Hospital onde foi visitado *</Label>
              <Input 
                id="newHospital" 
                required 
                value={newPatient.hospital} 
                onChange={e => setNewPatient(prev => ({...prev, hospital: e.target.value}))}
                placeholder="Ex: Hospital de Base"
              />
            </div>

            {/* MODIFICADO: Retirada a obrigatoriedade (required) do Dia de Preferência */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Dia de Preferência (Opcional)</Label>
                <Select 
                  value={newPatient.preferredDay} 
                  onValueChange={value => setNewPatient(prev => ({...prev, preferredDay: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map(dia => (
                      <SelectItem key={dia} value={dia}>{dia}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Período de Preferência *</Label>
                <Select 
                  value={newPatient.preferredTime} 
                  onValueChange={value => setNewPatient(prev => ({...prev, preferredTime: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Manhã", "Tarde", "Noite"].map(periodo => (
                      <SelectItem key={periodo} value={periodo}>{periodo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="newNotes">Observações / Detalhes da visita</Label>
              <Textarea 
                id="newNotes" 
                rows={3}
                value={newPatient.notes} 
                onChange={e => setNewPatient(prev => ({...prev, notes: e.target.value}))}
                placeholder="Detalhes sobre o estado do paciente ou aceitação de estudos online/presenciais..."
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsNewPatientOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Cadastrar Solicitação
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Solicitação</DialogTitle>
            <DialogDescription>
              Informações completas da solicitação de estudo bíblico
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-2xl font-medium">
                  {selectedRequest.patientName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedRequest.patientName}</h3>
                  {getStatusBadge(selectedRequest.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {selectedRequest.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {selectedRequest.email}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Endereço</p>
                <p className="font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {selectedRequest.address}, {selectedRequest.city}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Hospital de Origem</p>
                  <p className="font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {selectedRequest.hospital}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Data da Solicitação</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(selectedRequest.requestDate + "T00:00:00").toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Preferência de Horário</p>
                <p className="font-medium">
                  {selectedRequest.preferredDay} - {selectedRequest.preferredTime}
                </p>
              </div>

              {selectedRequest.assignedTo && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Encaminhado para</p>
                  <p className="font-medium">{selectedRequest.assignedTo}</p>
                </div>
              )}

              {selectedRequest.notes && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Observações</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                    {selectedRequest.notes}
                  </p>
                </div>
              )}

              {selectedRequest.status === "pendente" && (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    const current = selectedRequest
                    setSelectedRequest(null)
                    handleForward(current)
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Encaminhar para Igreja
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Forward Modal */}
      <Dialog open={isForwardOpen} onOpenChange={setIsForwardOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Encaminhar Solicitação</DialogTitle>
            <DialogDescription>
              Selecione a igreja para encaminhar a solicitação de{" "}
              {forwardRequest?.patientName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Igreja de Destino</label>
              <Select value={selectedIgreja} onValueChange={setSelectedIgreja}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a igreja" />
                </SelectTrigger>
                <SelectContent>
                  {igrejas.map((igreja) => (
                    <SelectItem key={igreja} value={igreja}>
                      {igreja}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Observações para a Igreja</label>
              <Textarea
                value={forwardNotes}
                onChange={(e) => setForwardNotes(e.target.value)}
                placeholder="Adicione informações relevantes para o encaminhamento..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsForwardOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={confirmForward}
              disabled={!selectedIgreja}
            >
              <Send className="w-4 h-4 mr-2" />
              Confirmar Encaminhamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}