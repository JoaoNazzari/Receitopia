import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Explorar() {
  const [pesquisa, setPesquisa] = useState('');

  const receitas = [
    { id: '1', imagem: require('@/assets/images/receita1.jpg') },
    { id: '2', imagem: require('@/assets/images/receita2.jpg') },
    { id: '3', imagem: require('@/assets/images/receita3.webp') },
    { id: '4', imagem: require('@/assets/images/receita4.jpg') },
    { id: '5', imagem: require('@/assets/images/receita5.jpg') },
    { id: '6', imagem: require('@/assets/images/receita6.jpg') },
  ];

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa com ícone */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar receitas..."
          value={pesquisa}
          onChangeText={setPesquisa}
          onSubmitEditing={() => console.log('Pesquisado:', pesquisa)}
          returnKeyType="search"
        />
      </View>

      {/* Galeria de Receitas */}
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gallery}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.imagem} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  gallery: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: 150,
  },
});