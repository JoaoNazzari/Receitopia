import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Explorar() {
  const [pesquisa, setPesquisa] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Dados de exemplo com mais informações
  const receitas = [
    { id: '1', imagem: require('@/assets/images/receita1.jpg'), titulo: 'Pão de queijo caseiro', tempo: '45 min', dificuldade: 'Média' },
    { id: '2', imagem: require('@/assets/images/receita2.jpg'), titulo: 'Brownie', tempo: '15 min', dificuldade: 'Fácil' },
    { id: '3', imagem: require('@/assets/images/receita3.webp'), titulo: 'Spaghetti ao sugo', tempo: '60 min', dificuldade: 'Difícil' },
    { id: '4', imagem: require('@/assets/images/receita4.jpg'), titulo: 'Hámburguer artesanal', tempo: '30 min', dificuldade: 'Média' },
    { id: '5', imagem: require('@/assets/images/receita5.jpg'), titulo: 'Torta de limão', tempo: '25 min', dificuldade: 'Fácil' },
    { id: '6', imagem: require('@/assets/images/receita6.jpg'), titulo: 'Prato do filme Ratatouile', tempo: '90 min', dificuldade: 'Difícil' },
    { id: '7', imagem: require('@/assets/images/receita7.jpg'), titulo: 'Carbonara', tempo: '40 min', dificuldade: 'Fácil' },
    { id: '8', imagem: require('@/assets/images/receita8.jpg'), titulo: 'Drinks sem álcool', tempo: '10 min', dificuldade: 'Fácil' },
    { id: '9', imagem: require('@/assets/images/receita9.jpg'), titulo: 'Risotto de filé com queijo', tempo: '70 min', dificuldade: 'Média' },
    { id: '10', imagem: require('@/assets/images/receita10.jpg'), titulo: 'Pudim de sorvete', tempo: '90 min', dificuldade: 'Difícil' },
  ];

  // Filtrar receitas baseado na pesquisa
  const receitasFiltradas = receitas.filter(receita =>
    receita.titulo.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const handlePesquisa = () => {
    setCarregando(true);
    // Simulando busca assíncrona
    setTimeout(() => {
      setCarregando(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Explorar Receitas</Text>
      </View>

      {/* Barra de Pesquisa melhorada */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar receitas..."
          placeholderTextColor="#888"
          value={pesquisa}
          onChangeText={setPesquisa}
          onSubmitEditing={handlePesquisa}
          returnKeyType="search"
        />
        {pesquisa.length > 0 && (
          <TouchableOpacity onPress={() => setPesquisa('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categorias */}
      <View style={styles.categoriasContainer}>
        <TouchableOpacity style={[styles.categoria, styles.categoriaAtiva]}>
          <Text style={styles.categoriaTexto}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoria}>
          <Text style={styles.categoriaTexto}>Fáceis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoria}>
          <Text style={styles.categoriaTexto}>Rápidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoria}>
          <Text style={styles.categoriaTexto}>Saudáveis</Text>
        </TouchableOpacity>
      </View>

      {/* Galeria de Receitas */}
      {carregando ? (
        <View style={styles.carregandoContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : (
        <FlatList
          data={receitasFiltradas}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gallery}
          ListEmptyComponent={
            <View style={styles.vazioContainer}>
              <Ionicons name="sad-outline" size={50} color="#888" />
              <Text style={styles.vazioTexto}>Nenhuma receita encontrada</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={item.imagem} style={styles.image} />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitulo}>{item.titulo}</Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardInfoTexto}><Ionicons name="time-outline" size={12} /> {item.tempo}</Text>
                  <Text style={styles.cardInfoTexto}><Ionicons name="speedometer-outline" size={12} /> {item.dificuldade}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  categoriasContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  categoria: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  categoriaAtiva: {
    backgroundColor: '#FF6B6B',
  },
  categoriaTexto: {
    fontSize: 14,
    color: '#333',
  },
  categoriaAtivaTexto: {
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
  },
  gallery: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    position: 'relative',
    minWidth: '48%',
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
  },
  cardTitulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoTexto: {
    color: '#fff',
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  vazioTexto: {
    marginTop: 15,
    fontSize: 16,
    color: '#888',
  },
});