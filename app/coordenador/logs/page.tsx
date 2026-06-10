"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import {
  Search,
  Shield,
  UserPlus,
  Trash2,
  Edit,
  Eye,
  FileText,
  Download,
  Filter,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  action: string
  category: "usuario" | "documento" | "sistema" | "seguranca"
  description: string
  performedBy: string
  performedByRole: string
  targetUser: string | null
  targetDocument: string | null
  ipAddress: string
  severity: "info" | "warning" | "error" | "success"
}

const logEntries: LogEntry[] = [
  {
    id: "1",
    timestamp: "2026-06-18T14:30:00",
    action: "Novo Usuário Cadastrado",
    category: "usuario",
    description: "Voluntário Maria Silva foi cadastrado no sistema",
    performedBy: "João Santos",
    performedByRole: "Coordenador",
    targetUser: "Maria Silva",
    targetDocument: null,
    ipAddress: "192.168.1.100",
    severity: "success",
  },
  {
    id: "2",
    timestamp: "2026-06-18T12:15:00",
    action: "Documento Excluído",
    category: "documento",
    description: "Certificado de treinamento de Ana Costa foi excluído",
    performedBy: "Pedro Lima",
    performedByRole: "Coordenador",
    targetUser: "Ana Costa",
    targetDocument: "certificado_treinamento.pdf",
    ipAddress: "192.168.1.105",
    severity: "warning",
  },
  {
    id: "3",
    timestamp: "2026-06-18T10:45:00",
    action: "Login Realizado",
    category: "seguranca",
    description: "Usuário realizou login no sistema",
    performedBy: "Carla Oliveira",
    performedByRole: "Voluntário",
    targetUser: null,
    targetDocument: null,
    ipAddress: "192.168.1.110",
    severity: "info",
  },
  {
    id: "4",
    timestamp: "2026-06-17T16:20:00",
    action: "Permissão Alterada",
    category: "seguranca",
    description: "Permissões de acesso de Roberto Alves foram atualizadas",
    performedBy: "Admin Sistema",
    performedByRole: "Administrador",
    targetUser: "Roberto Alves",
    targetDocument: null,
    ipAddress: "192.168.1.1",
    severity: "warning",
  },
  {
    id: "5",
    timestamp: "2026-06-17T14:00:00",
    action: "Documento Enviado",
    category: "documento",
    description: "Declaração de voluntariado foi enviada",
    performedBy: "Fernanda Lima",
    performedByRole: "Voluntário",
    targetUser: null,
    targetDocument: "declaracao_voluntariado.pdf",
    ipAddress: "192.168.1.120",
    severity: "success",
  },
  {
    id: "6",
    timestamp: "2026-06-17T11:30:00",
    action: "Tentativa de Acesso Negada",
    category: "seguranca",
    description: "Tentativa de acesso a área restrita foi bloqueada",
    performedBy: "Usuário Desconhecido",
    performedByRole: "-",
    targetUser: null,
    targetDocument: null,
    ipAddress: "192.168.1.200",
    severity: "error",
  },
  {
    id: "7",
    timestamp: "2026-06-16T09:15:00",
    action: "Novo Usuário Cadastrado",
    category: "usuario",
    description: "Voluntário Lucas Mendes foi cadastrado no sistema",
    performedBy: "João Santos",
    performedByRole: "Coordenador",
    targetUser: "Lucas Mendes",
    targetDocument: null,
    ipAddress: "192.168.1.100",
    severity: "success",
  },
  {
    id: "8",
    timestamp: "2026-06-16T08:00:00",
    action: "Backup Realizado",
    category: "sistema",
    description: "Backup automático do sistema foi concluído com sucesso",
    performedBy: "Sistema",
    performedByRole: "Sistema",
    targetUser: null,
    targetDocument: null,
    ipAddress: "localhost",
    severity: "info",
  },
  {
    id: "9",
    timestamp: "2026-06-15T17:45:00",
    action: "Usuário Desativado",
    category: "usuario",
    description: "Conta de Carlos Souza foi desativada por inatividade",
    performedBy: "Admin Sistema",
    performedByRole: "Administrador",
    targetUser: "Carlos Souza",
    targetDocument: null,
    ipAddress: "192.168.1.1",
    severity: "warning",
  },
  {
    id: "10",
    timestamp: "2026-06-15T15:30:00",
    action: "Documento Excluído",
    category: "documento",
    description: "Comprovante de endereço de Maria Silva foi excluído",
    performedBy: "Maria Silva",
    performedByRole: "Voluntário",
    targetUser: "Maria Silva",
    targetDocument: "comprovante_endereco.pdf",
    ipAddress: "192.168.1.130",
    severity: "warning",
  },
]

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("todos")
  const [severityFilter, setSeverityFilter] = useState<string>("todos")
  const [dateFilter, setDateFilter] = useState<string>("")

  const filteredLogs = logEntries.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.targetUser?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

    const matchesCategory =
      categoryFilter === "todos" || log.category === categoryFilter

    const matchesSeverity =
      severityFilter === "todos" || log.severity === severityFilter

    const matchesDate =
      !dateFilter || log.timestamp.startsWith(dateFilter)

    return matchesSearch && matchesCategory && matchesSeverity && matchesDate
  })

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "usuario":
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <User className="w-3 h-3 mr-1" />
            Usuário
          </Badge>
        )
      case "documento":
        return (
          <Badge className="bg-purple-100 text-purple-700">
            <FileText className="w-3 h-3 mr-1" />
            Documento
          </Badge>
        )
      case "sistema":
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <Shield className="w-3 h-3 mr-1" />
            Sistema
          </Badge>
        )
      case "seguranca":
        return (
          <Badge className="bg-orange-100 text-orange-700">
            <Shield className="w-3 h-3 mr-1" />
            Segurança
          </Badge>
        )
      default:
        return null
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getActionIcon = (action: string) => {
    if (action.includes("Cadastrado")) return <UserPlus className="w-4 h-4 text-green-600" />
    if (action.includes("Excluído")) return <Trash2 className="w-4 h-4 text-red-600" />
    if (action.includes("Alterada") || action.includes("Editado"))
      return <Edit className="w-4 h-4 text-blue-600" />
    if (action.includes("Login") || action.includes("Acesso"))
      return <Eye className="w-4 h-4 text-purple-600" />
    return <Shield className="w-4 h-4 text-gray-600" />
  }

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  // Stats
  const stats = {
    total: logEntries.length,
    today: logEntries.filter((l) =>
      l.timestamp.startsWith(new Date().toISOString().split("T")[0])
    ).length,
    warnings: logEntries.filter((l) => l.severity === "warning").length,
    errors: logEntries.filter((l) => l.severity === "error").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logs de Segurança</h1>
          <p className="text-gray-500">
            Acompanhe as atividades e alterações realizadas no sistema
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-500">Total de Logs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.today}</p>
                <p className="text-sm text-gray-500">Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.warnings}</p>
                <p className="text-sm text-gray-500">Avisos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.errors}</p>
                <p className="text-sm text-gray-500">Erros</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por ação, descrição ou usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas Categorias</SelectItem>
                <SelectItem value="usuario">Usuário</SelectItem>
                <SelectItem value="documento">Documento</SelectItem>
                <SelectItem value="sistema">Sistema</SelectItem>
                <SelectItem value="seguranca">Segurança</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Sucesso</SelectItem>
                <SelectItem value="warning">Aviso</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-[180px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Realizado por</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const dateTime = formatDateTime(log.timestamp)
                return (
                  <TableRow key={log.id} className="hover:bg-gray-50">
                    <TableCell>{getSeverityIcon(log.severity)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{dateTime.date}</p>
                        <p className="text-xs text-gray-500">{dateTime.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span className="font-medium">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(log.category)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{log.performedBy}</p>
                        <p className="text-xs text-gray-500">{log.performedByRole}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-600 truncate">
                          {log.description}
                        </p>
                        {log.targetUser && (
                          <p className="text-xs text-gray-400">
                            Usuário: {log.targetUser}
                          </p>
                        )}
                        {log.targetDocument && (
                          <p className="text-xs text-gray-400">
                            Documento: {log.targetDocument}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">IP: {log.ipAddress}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum log encontrado
          </h3>
          <p className="text-gray-500">
            Não encontramos logs com os critérios de busca informados.
          </p>
        </div>
      )}

      {/* Alert Section */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Atenção</h4>
              <p className="text-sm text-yellow-700">
                {stats.warnings > 0
                  ? `Existem ${stats.warnings} avisos recentes que requerem atenção. Verifique as exclusões de documentos e alterações de permissões.`
                  : "Não há avisos recentes no sistema."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
