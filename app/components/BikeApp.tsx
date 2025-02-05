"use client"

import React, { useState } from 'react'
import { LogOut } from 'lucide-react'

const BikeApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const handleLogout = () => {
    setIsAuthenticated(false)
  }
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  )
}

export default BikeApp
