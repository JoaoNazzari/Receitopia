import { useRecipes } from '@/app/context/RecipesContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const receitas = [
  { 
    id: '1', 
    titulo: 'Bolo de Cenoura', 
    imagem: 'https://canaldareceita.com.br/wp-content/uploads/2025/01/BOLO-DE-CENOURA-FOFINHO-DE-LIQUIDIFICADOR.jpg',
    tempo: '45 min',
    dificuldade: 'Fácil'
  },
  { 
    id: '2', 
    titulo: 'Lasanha de Frango', 
    imagem: 'https://canaldareceita.com.br/wp-content/uploads/2024/08/LASANHA-DE-FRANGO-COM-QUEIJO.png',
    tempo: '50 min',
    dificuldade: 'Difícil'
  },
  { 
    id: '3', 
    titulo: 'Salada Fit', 
    imagem: 'https://blog.gsuplementos.com.br/wp-content/uploads/2024/07/salada-com-frango.webp', 
    tempo: '10 min',
    dificuldade: 'Fácil'
  },
];

export default function Feed() {
  const { salvarReceita, salvos, removerReceita } = useRecipes();
  const [receitaSelecionada, setReceitaSelecionada] = useState<typeof receitas[0] | null>(null);

  function toggleSalvar(receita: typeof receitas[0]) {
    if (salvos.find((r) => r.id === receita.id)) {
      removerReceita(receita.id);
    } else {
      salvarReceita(receita);
    }
  }

  if (receitaSelecionada) {
    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: receitaSelecionada.imagem }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{receitaSelecionada.titulo}</Text>
          <Text style={styles.metaText}>⏱ Tempo: {receitaSelecionada.tempo}</Text>
          <Text style={styles.metaText}>🔥 Dificuldade: {receitaSelecionada.dificuldade}</Text>

          <Text style={[styles.title, { marginTop: 20 }]}>Ingredientes</Text>
          <Text style={styles.metaText}>• 1/2 xícara (chá) de óleo</Text>
          <Text style={styles.metaText}>• 3 cenouras médias raladas</Text>
          <Text style={styles.metaText}>• 4 ovos</Text>
          <Text style={styles.metaText}>• 2 xícaras (chá) de açúcar</Text>
          <Text style={styles.metaText}>• 2 e 1/2 xícaras (chá) de farinha de trigo</Text>
          <Text style={styles.metaText}>• 1 colher (sopa) de fermento em pó</Text>

          <Text style={[styles.title, { marginTop: 20 }]}>Cobertura</Text>
          <Text style={styles.metaText}>• 1 colher (sopa) de manteiga</Text>
          <Text style={styles.metaText}>• 3 colheres (sopa) de chocolate em pó</Text>
          <Text style={styles.metaText}>• 1 xícara (chá) de açúcar</Text>
          <Text style={styles.metaText}>• 1 xícara (chá) de leite</Text>

          <Text style={[styles.title, { marginTop: 20 }]}>Modo de Preparo</Text>
          <Text style={styles.metaText}>1. No liquidificador, bata a cenoura, os ovos e o óleo até misturar bem.</Text>
          <Text style={styles.metaText}>2. Acrescente o açúcar e bata por mais 5 minutos.</Text>
          <Text style={styles.metaText}>3. Em uma tigela, misture a farinha de trigo com o conteúdo do liquidificador.</Text>
          <Text style={styles.metaText}>4. Adicione o fermento e mexa delicadamente com uma colher.</Text>
          <Text style={styles.metaText}>5. Leve ao forno preaquecido a 180 °C por aproximadamente 40 minutos.</Text>
          <Text style={styles.metaText}>6. Para a cobertura, misture todos os ingredientes e leve ao fogo até obter uma calda cremosa.</Text>
          <Text style={styles.metaText}>7. Despeje a calda sobre o bolo ainda quente.</Text>

          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={() => setReceitaSelecionada(null)}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const renderItem = ({ item }: { item: typeof receitas[0] }) => {
    const isSalvo = salvos.find((r) => r.id === item.id);
    return (
      <TouchableOpacity style={styles.card} onPress={() => setReceitaSelecionada(item)}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.titulo}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{item.tempo}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="speedometer-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{item.dificuldade}</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.button, isSalvo && styles.buttonSalvo]}
            onPress={() => toggleSalvar(item)}
          >
            <Ionicons 
              name={isSalvo ? "bookmark" : "bookmark-outline"} 
              size={20} 
              color="white" 
            />
            <Text style={styles.buttonText}>{isSalvo ? 'Salvo' : 'Salvar'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F9',
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSalvo: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});