import React, { createContext, ReactNode, useContext, useState } from 'react';

type Receita = {
  id: string;
  titulo: string;
  imagem: string;
};

type RecipesContextType = {
  salvos: Receita[];
  salvarReceita: (receita: Receita) => void;
  removerReceita: (id: string) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const [salvos, setSalvos] = useState<Receita[]>([]);

  function salvarReceita(receita: Receita) {
    setSalvos((prev) => {
      if (prev.find((r) => r.id === receita.id)) return prev; // não duplica
      return [...prev, receita];
    });
  }

  function removerReceita(id: string) {
    setSalvos((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <RecipesContext.Provider value={{ salvos, salvarReceita, removerReceita }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipesContext);
  if (!context) throw new Error('useRecipes must be used within RecipesProvider');
  return context;
}
