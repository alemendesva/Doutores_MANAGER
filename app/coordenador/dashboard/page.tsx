"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { useState } from "react"
import {
  TrendingUp,
  Users,
  Book,
  FileText,
  Calendar,
  Download,
} from "lucide-react"

const visitasData = [
  { month: "Jan", visitas: 45, meta: 50 },
  { month: "Fev", visitas: 52, meta: 50 },
  { month: "Mar", visitas: 48, meta: 55 },
  { month: "Abr", visitas: 61, meta: 55 },
  { month: "Mai", visitas: 55, meta: 60 },
  { month: "Jun", visitas: 67, meta: 60 },
]

const materiaisData = [
  { month: "Jan", livros: 120, folhetos: 350 },
  { month: "Fev", livros: 145, folhetos: 420 },
  { month: "Mar", livros: 135, folhetos: 380 },
  { month: "Abr", livros: 160, folhetos: 450 },
  { month: "Mai", livros: 155, folhetos: 410 },
  { month: "Jun", livros: 180, folhetos: 520 },
]

const voluntariosPorHospital = [
  { name: "Santa Lúcia Sul", value: 15, color: "#22c55e" },
  { name: "Santa Lúcia Norte", value: 12, color: "#3b82f6" },
  { name: "Hospital de Base", value: 10, color: "#f97316" },
  { name: "Hospital Brasília", value: 8, color: "#facc15" },
  { name: "Anchieta", value: 5, color: "#ef4444" },
]

const atividadesPorTipo = [
  { name: "Canto", value: 45, color: "#8b5cf6" },
  { name: "Visita", value: 35, color: "#3b82f6" },
  { name: "Oração", value: 20, color: "#f97316" },
]

const weeklyData = [
  { day: "Seg", visitas: 5 },
  { day: "Ter", visitas: 3 },
  { day: "Qua", visitas: 4 },
  { day: "Qui", visitas: 6 },
  { day: "Sex", visitas: 2 },
  { day: "Sáb", visitas: 12 },
  { day: "Dom", visitas: 8 },
]

export default function DashboardPage() {
  const [period, setPeriod] = useState("6m")

  const statsCards = [
    {
      title: "Total de Visitas",
      value: "328",
      change: "+12%",
      positive: true,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Voluntários Ativos",
      value: "48",
      change: "+5",
      positive: true,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Livros Entregues",
      value: "895",
      change: "+18%",
      positive: true,
      icon: Book,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Folhetos Distribuídos",
      value: "2.530",
      change: "+25%",
      positive: true,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            Métricas e indicadores do polo
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Último mês</SelectItem>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <span
                      className={`text-sm font-medium ${
                        stat.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitas por Mês */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Visitas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="visitas"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  name="Visitas Realizadas"
                />
                <Bar
                  dataKey="meta"
                  fill="#e5e7eb"
                  radius={[4, 4, 0, 0]}
                  name="Meta"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Materiais Entregues */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Materiais Entregues</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={materiaisData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="livros"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Livros"
                />
                <Line
                  type="monotone"
                  dataKey="folhetos"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Folhetos"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voluntários por Hospital */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Voluntários por Hospital</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={voluntariosPorHospital}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {voluntariosPorHospital.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {voluntariosPorHospital.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades por Tipo */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Atividades por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={atividadesPorTipo}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {atividadesPorTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {atividadesPorTipo.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visitas por Dia da Semana */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Visitas por Dia da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#888" fontSize={12} />
                <YAxis type="category" dataKey="day" stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="visitas" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Resumo do Período
              </h3>
              <p className="text-gray-600 mt-1">
                O polo teve um crescimento de <strong>12%</strong> nas visitas em relação ao período anterior.
                A meta de distribuição de materiais foi atingida em <strong>95%</strong>.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">95%</p>
                <p className="text-sm text-gray-500">Meta Atingida</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">A+</p>
                <p className="text-sm text-gray-500">Avaliação</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
