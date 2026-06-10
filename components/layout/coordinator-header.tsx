"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin, Bell, Menu } from "lucide-react"

interface HeaderProps {
  onMenuClick?: () => void
}

const polos = [
  { id: "1", name: "Polo Brasília - Asa Sul" },
  { id: "2", name: "Polo Brasília - Asa Norte" },
  { id: "3", name: "Polo Taguatinga" },
  { id: "4", name: "Polo Águas Claras" },
]

export function CoordinatorHeader({ onMenuClick }: HeaderProps) {
  const [selectedPolo, setSelectedPolo] = useState("1")

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">Polo:</span>
            <Select value={selectedPolo} onValueChange={setSelectedPolo}>
              <SelectTrigger className="w-[220px] border-gray-200">
                <SelectValue placeholder="Selecione um polo" />
              </SelectTrigger>
              <SelectContent>
                {polos.map((polo) => (
                  <SelectItem key={polo.id} value={polo.id}>
                    {polo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
