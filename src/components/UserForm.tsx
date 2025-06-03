
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UserFormData, User } from '@/types/user';

interface UserFormProps {
  onUserAdded: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro de validação",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return false;
    }
  
  // Validação do email melhorada com regex:
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim() || !emailRegex.test(formData.email)) {
    toast({
      title: "Erro de validação",
      description: "Email válido é obrigatório",
      variant: "destructive"
    });
    return false;
  }
    
    if (!formData.phone.trim()) {
      toast({
        title: "Erro de validação",
        description: "Telefone é obrigatório",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.birthDate) {
      toast({
        title: "Erro de validação",
        description: "Data de nascimento é obrigatória",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      // Salvar no localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      onUserAdded(newUser);
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        address: ''
      });
      
      toast({
        title: "Sucesso!",
        description: "Usuário cadastrado com sucesso!",
      });
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar usuário. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">
          Cadastro de Usuário
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome Completo *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite seu nome completo"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                required
                
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Telefone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-medium">
                Data de Nascimento *
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Endereço
            </Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Digite seu endereço completo (opcional)"
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              rows={3}
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Usuário'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
