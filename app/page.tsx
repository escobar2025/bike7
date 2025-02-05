"use client"

import BikeApp  from "@/components/BikeApp";

export default function Page() {
  return <BikeApp />;
}

import React, { useState } from 'react';
import { Clock, Wrench, AlertTriangle, User, LogOut } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BikeMaintenanceApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    setIsAuthenticated(true);
    setIsAdmin(email === 'admin@bike.com');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setEmail('');
    setPassword('');
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6" />
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="********"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            >
              Entrar
            </button>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Admin Dashboard
  if (isAdmin) {
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
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Área administrativa em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User Dashboard
  const [totalKm, setTotalKm] = useState(0);
  const components = [
    { name: 'Corrente', interval: 500 },
    { name: 'Freios', interval: 1000 },
    { name: 'Pneus', interval: 2000 }
  ];

  const getMaintenanceStatus = (interval) => {
    const remaining = interval - (totalKm % interval);
    return (remaining / interval) * 100 <= 20 ? 'critical' : 'ok';
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bem-vindo, {email}</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Quilometragem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={totalKm}
              onChange={(e) => setTotalKm(Number(e.target.value))}
              className="border rounded p-2 w-32"
              min="0"
            />
            <span>km</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {components.map((component) => (
          <Card key={component.name}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                {component.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span>Próxima manutenção em: {component.interval - (totalKm % component.interval)} km</span>
              </div>
              {getMaintenanceStatus(component.interval) === 'critical' && (
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    Manutenção necessária em breve!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BikeMaintenanceApp;
