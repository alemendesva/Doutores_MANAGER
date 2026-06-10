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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  MapPin,
  Building2,
  Phone,
  Mail,
  Edit,
  Trash2,
  Search,
  Users,
} from "lucide-react"

interface Hospital {
  id: string
  name: string
  address: string
}

interface Polo {
  id: string
  name: string
  address: string
  city: string
  state: string
  phone: string
  email: string
  coordinator: string
  hospitals: Hospital[]
  volunteersCount: number
  status: "ativo" | "inativo"
}

const initialPolos: Polo[] = [
  {
    id: "1",
    name: "Polo Brasília - Asa Sul",
    address: "SGAS 915, Conjunto A, Bloco C",
    city: "Brasília",
    state: "DF",
    phone: "(61) 3333-4444",
    email: "asasul@doutoresdeesperanca.org",
    coordinator: "Maria Silva",
    hospitals: [
      { id: "1", name: "Hospital Santa Lúcia Sul", address: "SHLS 716" },
      { id: "2", name: "Hospital Brasília", address: "SGAS 613" },
    ],
    volunteersCount: 24,
    status: "ativo",
  },
  {
    id: "2",
    name: "Polo Brasília - Asa Norte",
    address: "SCLN 315, Bloco B, Loja 42",
    city: "Brasília",
    state: "DF",
    phone: "(61) 3333-5555",
    email: "asanorte@doutoresdeesperanca.org",
    coordinator: "João Santos",
    hospitals: [
      { id: "3", name: "Hospital Santa Lúcia Norte", address: "SHLN 716" },
      { id: "4", name: "Hospital de Base", address: "SMHS Q 101" },
    ],
    volunteersCount: 18,
    status: "ativo",
  },
  {
    id: "3",
    name: "Polo Taguatinga",
    address: "QNA 42, Lote 15",
    city: "Taguatinga",
    state: "DF",
    phone: "(61) 3333-6666",
    email: "taguatinga@doutoresdeesperanca.org",
    coordinator: "Ana Costa",
    hospitals: [
      { id: "5", name: "Hospital Anchieta", address: "QNG AE 02" },
    ],
    volunteersCount: 12,
    status: "ativo",
  },
  {
    id: "4",
    name: "Polo Águas Claras",
    address: "Rua das Pitangueiras, Lote 8",
    city: "Águas Claras",
    state: "DF",
    phone: "(61) 3333-7777",
    email: "aguasclaras@doutoresdeesperanca.org",
    coordinator: "Pedro Lima",
    hospitals: [],
    volunteersCount: 8,
    status: "inativo",
  },
]

export default function PolosPage() {
  const [polos, setPolos] = useState<Polo[]>(initialPolos)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingPolo, setEditingPolo] = useState<Polo | null>(null)
  const [newPolo, setNewPolo] = useState({
    name: "",
    address: "",
    city: "",
    state: "DF",
    phone: "",
    email: "",
    coordinator: "",
  })

  const filteredPolos = polos.filter(
    (polo) =>
      polo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      polo.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreatePolo = () => {
    const polo: Polo = {
      id: Date.now().toString(),
      ...newPolo,
      hospitals: [],
      volunteersCount: 0,
      status: "ativo",
    }
    setPolos([...polos, polo])
    setNewPolo({
      name: "",
      address: "",
      city: "",
      state: "DF",
      phone: "",
      email: "",
      coordinator: "",
    })
    setIsCreateOpen(false)
  }

  const handleDeletePolo = (id: string) => {
    setPolos(polos.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Polos</h1>
          <p className="text-gray-500">
            Cadastre e gerencie os polos de atuação do projeto
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Polo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Polo</DialogTitle>
              <DialogDescription>
                Preencha as informações do novo polo de atuação
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Polo</Label>
                  <Input
                    id="name"
                    value={newPolo.name}
                    onChange={(e) => setNewPolo({ ...newPolo, name: e.target.value })}
                    placeholder="Ex: Polo Brasília - Centro"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinator">Coordenador Responsável</Label>
                  <Input
                    id="coordinator"
                    value={newPolo.coordinator}
                    onChange={(e) =>
                      setNewPolo({ ...newPolo, coordinator: e.target.value })
                    }
                    placeholder="Nome do coordenador"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea
                  id="address"
                  value={newPolo.address}
                  onChange={(e) => setNewPolo({ ...newPolo, address: e.target.value })}
                  placeholder="Endereço completo do polo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={newPolo.city}
                    onChange={(e) => setNewPolo({ ...newPolo, city: e.target.value })}
                    placeholder="Cidade"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={newPolo.state}
                    onChange={(e) => setNewPolo({ ...newPolo, state: e.target.value })}
                    placeholder="UF"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newPolo.phone}
                    onChange={(e) => setNewPolo({ ...newPolo, phone: e.target.value })}
                    placeholder="(00) 0000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPolo.email}
                    onChange={(e) => setNewPolo({ ...newPolo, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleCreatePolo}
              >
                Cadastrar Polo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar polos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Polos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPolos.map((polo) => (
          <Card key={polo.id} className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{polo.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {polo.city}, {polo.state}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={polo.status === "ativo" ? "default" : "secondary"}
                  className={
                    polo.status === "ativo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {polo.status === "ativo" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{polo.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{polo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{polo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{polo.volunteersCount} voluntários</span>
                </div>
              </div>

              {/* Hospitals */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Hospitais Vinculados ({polo.hospitals.length})
                </p>
                {polo.hospitals.length > 0 ? (
                  <div className="space-y-1">
                    {polo.hospitals.map((hospital) => (
                      <div
                        key={hospital.id}
                        className="text-sm text-gray-600 pl-6"
                      >
                        • {hospital.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 pl-6">
                    Nenhum hospital vinculado
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setEditingPolo(polo)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeletePolo(polo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPolos.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum polo encontrado
          </h3>
          <p className="text-gray-500 mb-4">
            Não encontramos polos com os critérios de busca informados.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Cadastrar Primeiro Polo
          </Button>
        </div>
      )}
    </div>
  )
}
