import { ColorfulBorder } from "@/components/layout/colorful-border"
import { CoordinatorSidebar } from "@/components/layout/coordinator-sidebar"
import { CoordinatorHeader } from "@/components/layout/coordinator-header"

export default function CoordinatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ColorfulBorder />
      
      <div className="flex pt-2 pb-2 pl-2 pr-2">
        <CoordinatorSidebar />
        
        <div className="flex-1 flex flex-col min-h-[calc(100vh-16px)]">
          <CoordinatorHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
