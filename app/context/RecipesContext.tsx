import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';

type Receita = {
  id: string;
  titulo: string;
  imagem: string;
  tempo?: string;
  dificuldade?: string;
  categoria?: string;
};

type RecipesContextType = {
  salvos: Receita[];
  salvarReceita: (receita: Receita) => void;
  removerReceita: (id: string) => void;
  adicionarReceita: (receita: Omit<Receita, 'id'>) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const [salvos, setSalvos] = useState<Receita[]>([]);

  function salvarReceita(receita: Receita) {
    setSalvos((prev) => {
      if (prev.find((r) => r.id === receita.id)) {
        Alert.alert('Receita já salva', 'Esta receita já está na sua coleção.');
        return prev;
      }
      Alert.alert('Receita salva', `${receita.titulo} foi adicionada aos seus salvos.`);
      return [...prev, receita];
    });
  }

  function removerReceita(id: string) {
    setSalvos((prev) => {
      const novaLista = prev.filter((r) => r.id !== id);
      if (novaLista.length !== prev.length) {
        Alert.alert('Receita removida', 'A receita foi removida da sua coleção.');
      }
      return novaLista;
    });
  }

  function adicionarReceita(receita: Omit<Receita, 'id'>) {
    const novaReceita = {
      ...receita,
      id: String(Date.now()),
    };
    // Aqui você pode adicionar lógica para salvar no backend também
    return novaReceita;
  }

  return (
    <RecipesContext.Provider value={{ salvos, salvarReceita, removerReceita, adicionarReceita }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipesContext);
  if (!context) throw new Error('useRecipes must be used within RecipesProvider');
  return context;
}

