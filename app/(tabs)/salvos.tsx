import { useRecipes } from '@/app/context/RecipesContext';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Folder {
  id: string;
  name: string;
  recipes: any[];
}

export default function SavedScreen() {
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'Sobremesas', recipes: [] },
    { id: '2', name: 'Pratos principais', recipes: [] },
  ]);

  const { salvos, removerReceita } = useRecipes();

  const handleCreateFolder = () => {
    Alert.prompt(
      'Nova pasta',
      'Digite o nome da nova pasta:',
      (folderName) => {
        if (folderName && folderName.trim() !== '') {
          setFolders((old) => [
            ...old,
            { id: String(Date.now()), name: folderName.trim(), recipes: [] },
          ]);
        }
      }
    );
  };

  const handleImportRecipe = () => {
    Alert.alert('Importar receita', 'Funcionalidade ainda não implementada');
  };

  // Render das pastas, simples
  const renderFolder = (folder: Folder) => (
    <View key={folder.id} style={styles.folder}>
      <Text style={styles.folderName}>{folder.name}</Text>
      <Text style={styles.folderCount}>{folder.recipes.length} receitas</Text>
    </View>
  );

  // Render da receita salva igual ao Feed, com imagem e botão de remover
  const renderSalvo = (item: typeof salvos[0]) => {
    return (
      <View key={item.id} style={styles.card}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <Text style={styles.title}>{item.titulo}</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonRemove]}
          onPress={() => removerReceita(item.id)}
        >
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateFolder}>
          <Text style={styles.buttonText}>+ Nova pasta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleImportRecipe}>
          <Text style={styles.buttonText}>Importar receita</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Pastas</Text>
      {folders.length === 0 ? (
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>Nenhuma pasta criada</Text>
      ) : (
        folders.map(renderFolder)
      )}

      <Text style={styles.sectionTitle}>Receitas Salvas</Text>
      {salvos.length === 0 ? (
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>Nenhuma receita salva ainda.</Text>
      ) : (
        salvos.map(renderSalvo)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  folder: { padding: 16, backgroundColor: '#eee', borderRadius: 8, marginBottom: 12 },
  folderName: { fontSize: 18, fontWeight: 'bold' },
  folderCount: { fontSize: 14, color: '#666', marginTop: 4 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },

  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  buttonRemove: {
    backgroundColor: '#e91e63',
    padding: 10,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
});
