import { useRecipes } from '@/app/context/RecipesContext';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const receitas = [
  { id: '1', titulo: 'Bolo de Cenoura', imagem: 'https://canaldareceita.com.br/wp-content/uploads/2025/01/BOLO-DE-CENOURA-FOFINHO-DE-LIQUIDIFICADOR.jpg' },
  { id: '2', titulo: 'Lasanha de Frango', imagem: 'https://canaldareceita.com.br/wp-content/uploads/2024/08/LASANHA-DE-FRANGO-COM-QUEIJO.png' },
  { id: '3', titulo: 'Salada Fit', imagem: 'https://blog.gsuplementos.com.br/wp-content/uploads/2024/07/salada-com-frango.webp' },
];

export default function Feed() {
  const { salvarReceita, salvos, removerReceita } = useRecipes();

  function toggleSalvar(receita: typeof receitas[0]) {
    if (salvos.find((r) => r.id === receita.id)) {
      removerReceita(receita.id);
    } else {
      salvarReceita(receita);
    }
  }

  const renderItem = ({ item }: { item: typeof receitas[0] }) => {
    const isSalvo = salvos.find((r) => r.id === item.id);
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <Text style={styles.title}>{item.titulo}</Text>
        <TouchableOpacity
          style={[styles.button, isSalvo && styles.buttonSalvo]}
          onPress={() => toggleSalvar(item)}
        >
          <Text style={styles.buttonText}>{isSalvo ? 'Remover' : 'Salvar'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={receitas}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
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
  button: {
    backgroundColor: '#e91e63',
    padding: 10,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  buttonSalvo: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: '#fff',
  },
});
