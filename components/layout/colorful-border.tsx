"use client"

export function ColorfulBorder() {
  return (
    <>
      {/* Top border */}
      <div className="fixed top-0 left-0 right-0 h-2 flex z-50">
        <div className="flex-1 bg-[#22c55e]" />
        <div className="flex-1 bg-[#facc15]" />
        <div className="flex-1 bg-[#ef4444]" />
        <div className="flex-1 bg-[#22c55e]" />
        <div className="flex-1 bg-[#3b82f6]" />
      </div>
      
      {/* Bottom border */}
      <div className="fixed bottom-0 left-0 right-0 h-2 flex z-50">
        <div className="flex-1 bg-[#22c55e]" />
        <div className="flex-1 bg-[#facc15]" />
        <div className="flex-1 bg-[#22c55e]" />
        <div className="flex-1 bg-[#3b82f6]" />
      </div>
      
      {/* Left border */}
      <div className="fixed top-0 left-0 bottom-0 w-2 flex flex-col z-50">
        <div className="flex-1 bg-[#22c55e]" />
        <div className="flex-1 bg-[#facc15]" />
        <div className="flex-1 bg-[#f97316]" />
        <div className="flex-1 bg-[#ef4444]" />
        <div className="flex-1 bg-[#3b82f6]" />
        <div className="flex-1 bg-[#22c55e]" />
      </div>
      
      {/* Right border */}
      <div className="fixed top-0 right-0 bottom-0 w-2 flex flex-col z-50">
        <div className="flex-1 bg-[#f97316]" />
        <div className="flex-1 bg-[#ef4444]" />
        <div className="flex-1 bg-[#22c55e]" />
        <div className="flex-1 bg-[#3b82f6]" />
      </div>
    </>
  )
}
