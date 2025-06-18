import { useRecipes } from '@/app/context/RecipesContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Folder {
  id: string;
  name: string;
  recipes: any[];
}

interface Recipe {
  id: string;
  titulo: string;
  imagem: string;
  origem?: string;
}

export default function SavedScreen() {
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'Sobremesas', recipes: [] },
    { id: '2', name: 'Pratos principais', recipes: [] },
  ]);

  const [showImportModal, setShowImportModal] = useState(false);
  const { salvos, removerReceita } = useRecipes();
  
  // Adiciona a origem "app" para receitas salvas do feed e garante IDs únicos
  const recipesWithOrigin = salvos.map(recipe => ({
    ...recipe,
    id: `app_${recipe.id}`,
    origem: 'app'
  }));

  // Mock de dados para demonstração com IDs únicos
  const [demoSalvos, setDemoSalvos] = useState<Recipe[]>([
    {
      id: 'demo_1',
      titulo: 'Bolo de Chocolate',
      imagem: 'https://recipesblob.oetker.com.br/assets/e4907609f7e14c7ca1c9d68b5149499a/1272x764/bolo-de-chocolate-com-cobertura.webp',
      origem: 'instagram'
    },
    {
      id: 'demo_2',
      titulo: 'Pão Caseiro',
      imagem: 'https://recipesblob.oetker.com.br/assets/18efac19eac14ceb8c1e1006f5944dbf/636x382/po-caseiro-super-fofinho.jpg',
      origem: 'youtube'
    },
    {
      id: 'demo_3',
      titulo: 'Torta de Limão',
      imagem: 'https://recipesblob.oetker.com.br/assets/d044a4ef3cfe45998593f500c00942ef/1272x764/torta-de-limo.jpg',
      origem: 'tiktok'
    },
    {
      id: 'demo_4',
      titulo: 'Risoto de brie, parma e rúcula',
      imagem: 'https://receitaitaliana.com.br/wp-content/uploads/2024/09/receita-brie-com-parma-receita-italiana.png',
      origem: 'site'
    },
  ]);

  // Combina receitas salvas do feed com demonstrações
  const allSavedRecipes = [...recipesWithOrigin, ...demoSalvos];

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

   const renderSalvo = (item: Recipe) => {
    return (
      <View key={item.id} style={styles.card}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.titulo}</Text>
          
          <View style={[
            styles.sourceBadge,
            item.origem === 'instagram' && styles.instagramBadge,
            item.origem === 'youtube' && styles.youtubeBadge,
            item.origem === 'tiktok' && styles.tiktokBadge,
            item.origem === 'site' && styles.webBadge,
            item.origem === 'app' && styles.appBadge,
          ]}>
            <Ionicons 
              name={
                item.origem === 'instagram' ? 'logo-instagram' : 
                item.origem === 'youtube' ? 'logo-youtube' :
                item.origem === 'tiktok' ? 'logo-tiktok' : 
                item.origem === 'site' ? 'globe' : 'phone-portrait'
              } 
              size={14} 
              color="#fff" 
            />
            <Text style={styles.sourceText}>
              {item.origem === 'instagram' ? 'Instagram' :
               item.origem === 'youtube' ? 'YouTube' :
               item.origem === 'tiktok' ? 'TikTok' :
               item.origem === 'site' ? 'Site' : 'Nosso App'}
            </Text>
          </View>
          
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.moveButton}>
              <Ionicons name="folder" size={18} color="#555" />
              <Text style={styles.moveButtonText}>Mover</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                if (item.id.startsWith('app_')) {
                  removerReceita(item.id.replace('app_', ''));
                }
                // Não remove as receitas de demonstração
              }}
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
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.importButton}
              onPress={() => setShowImportModal(true)}
            >
              <Ionicons name="download" size={20} color="#FF6B6B" />
              <Text style={styles.importButtonText}>Importar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleCreateFolder}>
              <Ionicons name="add" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>

        {folders.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Pastas</Text>
            {folders.map(renderFolder)}
          </>
        )}

        {allSavedRecipes.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Receitas Salvas ({allSavedRecipes.length})</Text>
            {allSavedRecipes.map(renderSalvo)}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark" size={48} color="#ddd" />
            <Text style={styles.emptyText}>Nenhuma receita salva ainda</Text>
            <Text style={styles.emptySubtext}>Salve receitas do nosso app ou importe de outros lugares</Text>
            
            <TouchableOpacity 
              style={styles.importCtaButton}
              onPress={() => setShowImportModal(true)}
            >
              <Ionicons name="download" size={20} color="#fff" />
              <Text style={styles.importCtaButtonText}>Importar Receitas</Text>
            </TouchableOpacity>
            
            <View style={styles.sourcesGrid}>
              <View style={styles.sourceOption}>
                <Ionicons name="logo-instagram" size={24} color="#E1306C" />
                <Text style={styles.sourceOptionText}>Instagram</Text>
              </View>
              <View style={styles.sourceOption}>
                <Ionicons name="logo-youtube" size={24} color="#FF0000" />
                <Text style={styles.sourceOptionText}>YouTube</Text>
              </View>
              <View style={styles.sourceOption}>
                <Ionicons name="link" size={24} color="#007AFF" />
                <Text style={styles.sourceOptionText}>Links Web</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modal de Importação */}
      <Modal transparent={true} animationType="slide" visible={showImportModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Importar Receitas</Text>
            
            <TouchableOpacity style={styles.importOption}>
              <Ionicons name="logo-instagram" size={28} color="#E1306C" />
              <Text style={styles.importOptionText}>Do Instagram</Text>
              <Text style={styles.importOptionSubtext}>Salve posts e reels com receitas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.importOption}>
              <Ionicons name="logo-tiktok" size={28} color="#000000" />
              <Text style={styles.importOptionText}>Do TikTok</Text>
              <Text style={styles.importOptionSubtext}>Salve vídeos curtos com receitas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.importOption}>
              <Ionicons name="logo-youtube" size={28} color="#FF0000" />
              <Text style={styles.importOptionText}>Do YouTube</Text>
              <Text style={styles.importOptionSubtext}>Importe vídeos de receitas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.importOption}>
              <Ionicons name="link" size={28} color="#007AFF" />
              <Text style={styles.importOptionText}>De um link</Text>
              <Text style={styles.importOptionSubtext}>Cole URLs de receitas da web</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowImportModal(false)}
            >
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Os estilos permanecem exatamente os mesmos do código anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F9',
    paddingTop: 50,
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    padding: 8,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight: 10,
  },
  importButtonText: {
    marginLeft: 4,
    color: '#FF6B6B',
    fontSize: 14,
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
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  tiktokBadge: {
    backgroundColor: '#000000', 
  },
  webBadge: {
    backgroundColor: '#007AFF', 
  },
  appBadge: {
    backgroundColor: '#4CAF50', 
  },
  instagramBadge: {
    backgroundColor: '#E1306C',
  },
  youtubeBadge: {
    backgroundColor: '#FF0000',
  },
  sourceText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
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
    maxWidth: '80%',
  },
  importCtaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  importCtaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sourcesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  sourceOption: {
    alignItems: 'center',
    width: '30%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  sourceOptionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  importOption: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'flex-start',
  },
  importOptionText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    color: '#333',
  },
  importOptionSubtext: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
  },
  closeButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
});