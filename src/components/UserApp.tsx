
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserForm from './UserForm';
import UserList from './UserList';
import { User } from '@/types/user';

const UserApp: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState('cadastro');

  useEffect(() => {
    // Carregar usuários do localStorage quando o componente monta
    const loadUsers = () => {
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          setUsers(parsedUsers);
        }
      } catch (error) {
        console.error('Erro ao carregar usuários do localStorage:', error);
      }
    };

    loadUsers();
  }, []);

  const handleUserAdded = (newUser: User) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    // Mudar para a aba de usuários após cadastrar
    setActiveTab('usuarios');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Sistema de Cadastro
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gerencie usuários de forma simples e eficiente. Cadastre novos usuários e visualize todos os dados registrados.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white shadow-lg rounded-lg p-1">
            <TabsTrigger 
              value="cadastro" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-200"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Cadastro
            </TabsTrigger>
            <TabsTrigger 
              value="usuarios"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-200"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Usuários ({users.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cadastro" className="space-y-6">
            <UserForm onUserAdded={handleUserAdded} />
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-6">
            <UserList users={users} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 animate-fade-in">
        </footer>
      </div>
    </div>
  );
};

export default UserApp;
