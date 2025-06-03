
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user';

interface UserListProps { // Recebe a lista de usuários do tipo User
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    // Função para formatar datas apenas com dia/mês/ano no padrão brasileiro
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  // Função para formatar data e hora completas no padrão brasileiro
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };
 // Se não houver usuários na lista, exibe um card informando que está vazio
  if (users.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto animate-fade-in">
        <CardContent className="p-12 text-center">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum usuário cadastrado</h3>
            <p className="text-gray-500">Comece cadastrando o primeiro usuário na aba "Cadastro".</p>
          </div>
        </CardContent>
      </Card>
    );
  }
// Se houver usuários, exibe a lista com cards para cada usuário
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="animate-fade-in shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            Usuários Cadastrados ({users.length})
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <Card 
            key={user.id} 
            className="animate-slide-in shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                  {user.name}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  #{user.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <span className="text-sm text-gray-600 truncate">{user.email}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm text-gray-600">{user.phone}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v1a1 1 0 01-1 1h-1v8a3 3 0 01-3 3H8a3 3 0 01-3-3V9H4a1 1 0 01-1-1V7a1 1 0 011-1h4z" />
                  </svg>
                  <span className="text-sm text-gray-600">{formatDate(user.birthDate)}</span>
                </div>
                
                {user.address && (
                  <div className="flex items-start space-x-2">
                    <svg className="h-4 w-4 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-600 leading-relaxed">{user.address}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-400">
                  Cadastrado em: {formatDateTime(user.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserList;
