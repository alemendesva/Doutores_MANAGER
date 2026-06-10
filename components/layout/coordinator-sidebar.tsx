"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  MapPin,
  Users,
  Calendar,
  BarChart3,
  BookOpen,
  Shield,
  ChevronDown,
  Building2,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

const menuItems = [
  {
    title: "Coordenação",
    items: [
      { name: "Início", href: "/coordenador", icon: Home },
      { name: "Polos", href: "/coordenador/polos", icon: MapPin },
      { name: "Voluntários", href: "/coordenador/voluntarios", icon: Users },
      { name: "Plantões", href: "/coordenador/plantoes", icon: Calendar },
      { name: "Dashboard", href: "/coordenador/dashboard", icon: BarChart3 },
      { name: "Estudos Bíblicos", href: "/coordenador/estudos-biblicos", icon: BookOpen },
      { name: "Logs de Segurança", href: "/coordenador/logs", icon: Shield },
    ],
  },
]

export function CoordinatorSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>(["Coordenação"])

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    )
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Doutores de Esperança</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {menuItems.map((section) => (
          <Collapsible
            key={section.title}
            open={openSections.includes(section.title)}
            onOpenChange={() => toggleSection(section.title)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
              {section.title}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  openSections.includes(section.title) && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="space-y-1 mt-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-green-50 text-green-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            C
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Coordenador</p>
            <p className="text-xs text-gray-500 truncate">coordenador@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
