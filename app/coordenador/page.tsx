"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Calendar,
  TrendingUp,
  BookOpen,
  CheckSquare,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const statsCards = [
  {
    title: "Voluntários Ativos",
    value: "48",
    subtitle: "no polo atual",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Plantões Agendados",
    value: "12",
    subtitle: "esta semana",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Visitas Realizadas",
    value: "156",
    subtitle: "este mês",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Estudos Bíblicos",
    value: "8",
    subtitle: "solicitações pendentes",
    icon: BookOpen,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const upcomingShifts = [
  {
    id: 1,
    date: "20",
    month: "Jun",
    hospital: "Hospital Santa Lúcia Sul",
    type: "Canto",
    shift: "Turno da Manhã",
    volunteers: 4,
    maxVolunteers: 6,
    status: "confirmado",
  },
  {
    id: 2,
    date: "20",
    month: "Jun",
    hospital: "Hospital Santa Lúcia Norte",
    type: "Visita",
    shift: "Turno da Tarde",
    volunteers: 2,
    maxVolunteers: 4,
    status: "pendente",
  },
  {
    id: 3,
    date: "22",
    month: "Jun",
    hospital: "Hospital de Base",
    type: "Canto",
    shift: "Turno da Manhã",
    volunteers: 5,
    maxVolunteers: 5,
    status: "lotado",
  },
]

const recentActivities = [
  {
    id: 1,
    action: "Novo voluntário cadastrado",
    name: "Maria Silva",
    time: "Há 2 horas",
  },
  {
    id: 2,
    action: "Plantão confirmado",
    name: "Hospital Santa Lúcia Sul",
    time: "Há 4 horas",
  },
  {
    id: 3,
    action: "Solicitação de estudo bíblico",
    name: "João Santos",
    time: "Há 5 horas",
  },
  {
    id: 4,
    action: "Certificado enviado",
    name: "Ana Costa",
    time: "Há 1 dia",
  },
]

export default function CoordinatorDashboard() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Olá, Coordenador</h1>
        <p className="text-gray-500 capitalize">{currentDate}</p>
      </div>

      {/* Alert Banner */}
      <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg flex items-start gap-3">
        <CheckSquare className="w-5 h-5 text-green-600 mt-0.5" />
        <div>
          <p className="font-medium text-green-800">Treinamento</p>
          <p className="text-green-700 text-sm">
            {"Caros voluntários, nosso treinamento ocorrerá amanhã às 9h via Google Meet!"}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-xs text-gray-400">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Shifts */}
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Próximos Plantões</CardTitle>
            <Link href="/coordenador/plantoes">
              <Button variant="link" className="text-green-600 p-0 h-auto">
                Ver todos
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-center min-w-[50px]">
                    <p className="text-2xl font-bold text-gray-900">{shift.date}</p>
                    <p className="text-xs text-gray-500 uppercase">{shift.month}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{shift.hospital}</p>
                    <p className="text-sm text-gray-500">
                      {shift.type} • {shift.shift}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {shift.volunteers}/{shift.maxVolunteers}
                      </p>
                      <Progress
                        value={(shift.volunteers / shift.maxVolunteers) * 100}
                        className="h-1.5 w-16"
                      />
                    </div>
                    <Badge
                      variant={
                        shift.status === "confirmado"
                          ? "default"
                          : shift.status === "lotado"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        shift.status === "confirmado"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : shift.status === "lotado"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }
                    >
                      {shift.status === "confirmado"
                        ? "Confirmado"
                        : shift.status === "lotado"
                        ? "Lotado"
                        : "Pendente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Atividades Recentes</CardTitle>
            <Link href="/coordenador/logs">
              <Button variant="link" className="text-green-600 p-0 h-auto">
                Ver logs
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-gray-100"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.name}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/coordenador/polos">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>Gerenciar Polos</span>
              </Button>
            </Link>
            <Link href="/coordenador/plantoes">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Criar Plantão</span>
              </Button>
            </Link>
            <Link href="/coordenador/voluntarios">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                <span>Ver Voluntários</span>
              </Button>
            </Link>
            <Link href="/coordenador/estudos-biblicos">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600" />
                <span>Estudos Pendentes</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
