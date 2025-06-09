import { useRecipes } from '@/app/context/RecipesContext';
import { Ionicons } from '@expo/vector-icons';
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
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Criar',
          onPress: (folderName) => {
            if (folderName && folderName.trim() !== '') {
              setFolders((old) => [
                ...old,
                { id: String(Date.now()), name: folderName.trim(), recipes: [] },
              ]);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const renderFolder = (folder: Folder) => (
    <TouchableOpacity key={folder.id} style={styles.folder}>
      <View style={styles.folderIcon}>
        <Ionicons name="folder" size={24} color="#FF6B6B" />
      </View>
      <View style={styles.folderInfo}>
        <Text style={styles.folderName}>{folder.name}</Text>
        <Text style={styles.folderCount}>{folder.recipes.length} receitas</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );

  const renderSalvo = (item: typeof salvos[0]) => {
    return (
      <View key={item.id} style={styles.card}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.titulo}</Text>
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.moveButton}>
              <Ionicons name="folder" size={18} color="#555" />
              <Text style={styles.moveButtonText}>Mover</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removerReceita(item.id)}
            >
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Suas Coleções</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleCreateFolder}>
            <Ionicons name="add" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        {folders.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Pastas</Text>
            {folders.map(renderFolder)}
          </>
        )}

        {salvos.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Receitas Salvas ({salvos.length})</Text>
            {salvos.map(renderSalvo)}
          </>
        )}

        {folders.length === 0 && salvos.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark" size={48} color="#ddd" />
            <Text style={styles.emptyText}>Nenhuma receita salva ainda</Text>
            <Text style={styles.emptySubtext}>Toque no ícone de salvar nas receitas para adicioná-las aqui</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F9',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#555',
  },
  folder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  folderIcon: {
    marginRight: 15,
  },
  folderInfo: {
    flex: 1,
  },
  folderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  folderCount: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  moveButtonText: {
    marginLeft: 8,
    color: '#555',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
  },
  removeButtonText: {
    marginLeft: 8,
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
    textAlign: 'center',
    maxWidth: '80%',
  },
});