import { useRecipes } from '@/app/context/RecipesContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados mockados para stories e posts
const stories = [
  { id: '1', username: 'Chef Maria', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', username: 'Cozinha123', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
  { id: '3', username: 'Doces Caseiros', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '4', username: 'Sabor Nordeste', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { id: '5', username: 'VegPower', image: 'https://randomuser.me/api/portraits/women/63.jpg' },
  { id: '6', username: 'João_Vítor', image: 'https://randomuser.me/api/portraits/men/67.jpg' },
  { id: '7', username: 'Alessandra', image: 'https://randomuser.me/api/portraits/women/69.jpg' },
  { id: '8', username: 'Luiza Pedroso', image: 'https://randomuser.me/api/portraits/women/79.jpg'},
  { id: '9', username: 'Bernardo barbosa', image: 'https://randomuser.me/api/portraits/men/9.jpg'},
  { id: '10', username: 'Luiza Pedroso', image: 'https://randomuser.me/api/portraits/women/82.jpg'},
  { id: '11', username: 'Luis_everton', image: 'https://randomuser.me/api/portraits/men/79.jpg'},
];

const receitas = [
  {
    id: '1',
    titulo: 'Bolo de Cenoura com Cobertura de Chocolate',
    imagem: 'https://canaldareceita.com.br/wp-content/uploads/2025/01/BOLO-DE-CENOURA-FOFINHO-DE-LIQUIDIFICADOR.jpg',
    tempo: '45 min',
    dificuldade: 'Fácil',
    user: {
      username: 'doces_da_ana',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    likes: 124,
    comments: 23,
    time: 2,
    saved: 56,
    description: 'Receita de família que sempre faz sucesso! 🥕🍫 #sobremesa #doces',
    ingredientes: [
      '1/2 xícara (chá) de óleo',
      '3 cenouras médias raladas',
      '4 ovos',
      '2 xícaras (chá) de açúcar',
      '2 e 1/2 xícaras (chá) de farinha de trigo',
      '1 colher (sopa) de fermento em pó',
      '1 pitada de sal'
    ],
    modoPreparo: [
      'No liquidificador, bata a cenoura, os ovos e o óleo',
      'Acrescente o açúcar e bata por mais 5 minutos',
      'Em uma tigela, misture a farinha de trigo, o fermento e o sal',
      'Adicione a mistura do liquidificador e mexa bem',
      'Despeje em uma forma untada e enfarinhada',
      'Asse em forno médio (180°C) por cerca de 40 minutos',
      'Para a cobertura, misture 1 xícara de chocolate em pó com 1 xícara de leite e 1 colher de manteiga, leve ao fogo até engrossar e despeje sobre o bolo ainda quente'
    ]
  },
  {
    id: '2',
    titulo: 'Lasanha de Frango Cremosa',
    imagem: 'https://canaldareceita.com.br/wp-content/uploads/2024/08/LASANHA-DE-FRANGO-COM-QUEIJO.png',
    tempo: '50 min',
    dificuldade: 'Médio',
    user: {
      username: 'paulo vitor',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    likes: 89,
    comments: 12,
    time: 3,
    saved: 34,
    description: 'Perfeita para o almoço de domingo em família! 🍗🧀 #massas #frango',
    ingredientes: [
      '500g de peito de frango cozido e desfiado',
      '1 pacote de massa para lasanha (pré-cozida)',
      '1 cebola picada',
      '2 dentes de alho picados',
      '1 caixa de creme de leite',
      '200g de mussarela ralada',
      '200g de presunto fatiado',
      '2 colheres de sopa de óleo',
      '1 litro de leite',
      '3 colheres de sopa de farinha de trigo',
      'Sal e pimenta a gosto'
    ],
    modoPreparo: [
      'Refogue a cebola e o alho no óleo até dourarem',
      'Adicione o frango desfiado e tempere com sal e pimenta',
      'Em outra panela, prepare o molho branco: derreta a manteiga, acrescente a farinha e mexa, depois adicione o leite aos poucos até engrossar',
      'Monte a lasanha em um refratário: camada de molho, massa, frango, presunto, queijo e repita',
      'Finalize com molho branco e queijo por cima',
      'Asse em forno médio por cerca de 30 minutos até gratinar'
    ]
  },
  {
    id: '3',
    titulo: 'Salada Fit com Frango Grelhado',
    imagem: 'https://blog.gsuplementos.com.br/wp-content/uploads/2024/07/salada-com-frango.webp',
    tempo: '15 min',
    dificuldade: 'Fácil',
    user: {
      username: 'nutri em casa',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    likes: 210,
    comments: 45,
    time: 4,
    saved: 78,
    description: 'Refeição completa com apenas 350 calorias! 🥗💪 #fitness #saude',
    ingredientes: [
      '1 peito de frango temperado e grelhado',
      '2 xícaras de folhas verdes (alface, rúcula, espinafre)',
      '1 tomate picado',
      '1/2 pepino em rodelas',
      '1/2 abacate em cubos',
      '1 colher de sopa de azeite de oliva',
      'Suco de 1/2 limão',
      'Sal e pimenta a gosto',
      '1 colher de sopa de sementes (girassol, linhaça ou chia)'
    ],
    modoPreparo: [
      'Tempere o frango com sal, pimenta e um fio de azeite e grelhe até dourar',
      'Corte o frango em tiras após o cozimento',
      'Lave e seque bem as folhas verdes',
      'Em uma tigela grande, misture as folhas, tomate, pepino e abacate',
      'Tempere com azeite, suco de limão, sal e pimenta',
      'Coloque as tiras de frango por cima',
      'Finalize com as sementes e sirva imediatamente'
    ]
  },

  {
    id: '4',
    titulo: 'Panqueca Integral de Banana',
    imagem: 'https://p2.trrsf.com/image/fget/cf/942/530/images.terra.com/2023/06/07/panqueca-banana-s1b5vvlg2t69.jpg',
    tempo: '10 min',
    dificuldade: 'Fácil',
    user: {
      username: 'Pedro Bola',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg'
    },
    likes: 98,
    comments: 14,
    time: 7,
    saved: 32,
    description: 'Simples, rápida e perfeita para o café da manhã! 🍌🥞 #fit #cafe',
    ingredientes: [
      '1 banana madura',
      '2 ovos',
      '3 colheres de sopa de aveia em flocos',
      'Canela a gosto',
      '1 colher de chá de fermento'
    ],
    modoPreparo: [
      'Amasse a banana, adicione os ovos e a aveia',
      'Misture bem e adicione o fermento e a canela',
      'Despeje porções da massa em uma frigideira antiaderente e doure dos dois lados',
      'Sirva com mel ou frutas'
    ]
  },
  {
    id: '5',
    titulo: 'Escondidinho de Carne Moída',
    imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/6af8f580e799444e5a52119018e87a65_XL.jpg',
    tempo: '35 min',
    dificuldade: 'Médio',
    user: {
      username: 'Caseirices do Fernando',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
    },
    likes: 143,
    comments: 30,
    time: 7,
    saved: 47,
    description: 'Receita clássica, simples e muito saborosa! 🥩🥔 #jantar',
    ingredientes: [
      '500g de carne moída',
      '4 batatas médias cozidas e amassadas',
      '1 cebola picada',
      '2 colheres de manteiga',
      'Sal, alho e pimenta a gosto',
      'Queijo ralado para gratinar'
    ],
    modoPreparo: [
      'Refogue a carne com cebola, alho e temperos',
      'Misture a manteiga no purê de batatas',
      'Em uma travessa, monte uma camada de purê, carne e outra de purê',
      'Cubra com queijo e leve ao forno para gratinar'
    ]
  },
  {
    id: '6',
    titulo: 'Tapioca com Queijo Minas e Tomate',
    imagem: 'https://s2-receitas.glbimg.com/PNEppcLmYyso3HgpAxIibKRfFFQ=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2024/M/Q/KPA2KfQNSJ3l8ITAjVsQ/tapioca-com-queijo-e-tomate-seco.jpg',
    tempo: '5 min',
    dificuldade: 'Fácil',
    user: {
      username: 'CozinhaSimples',
      avatar: 'https://randomuser.me/api/portraits/women/51.jpg'
    },
    likes: 56,
    comments: 8,
    time: 8,
    saved: 20,
    description: 'Opção leve e saudável para qualquer hora! 🧀🍅 #saudavel #lancherápido',
    ingredientes: [
      '3 colheres de goma de tapioca',
      '3 fatias de queijo minas',
      '2 rodelas de tomate',
      'Orégano a gosto'
    ],
    modoPreparo: [
      'Espalhe a goma de tapioca em uma frigideira quente',
      'Quando começar a desgrudar, vire e adicione o queijo e o tomate',
      'Dobre a tapioca e deixe o queijo derreter',
      'Finalize com orégano e sirva'
    ]
  },
  {
    id: '7',
    titulo: 'Macarrão ao Alho e Óleo',
    imagem: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/6d06b5359dc896420f5cfc5b63c37496.webp?itok=pHAN_QBj',
    tempo: '20 min',
    dificuldade: 'Fácil',
    user: {
      username: 'João_Show',
      avatar: 'https://randomuser.me/api/portraits/men/66.jpg'
    },
    likes: 111,
    comments: 19,
    time: 8,
    saved: 38,
    description: 'Clássico rápido e delicioso. Ideal para emergências! 🍝🧄 #rapido #tradicional',
    ingredientes: [
      '250g de macarrão',
      '3 dentes de alho picados',
      '4 colheres de azeite',
      'Sal e pimenta a gosto',
      'Salsinha picada para finalizar'
    ],
    modoPreparo: [
      'Cozinhe o macarrão até ficar al dente',
      'Frite o alho no azeite até dourar',
      'Misture o macarrão escorrido e tempere',
      'Finalize com salsinha'
    ]
  },
  {
    id: '8',
    titulo: 'Cuscuz Nordestino com Ovo',
    imagem: 'https://sabores-new.s3.amazonaws.com/public/2024/11/cuscuz-de-milho-com-ovo-poch-1024x494.webp',
    tempo: '10 min',
    dificuldade: 'Fácil',
    user: {
      username: 'ChefRenata',
      avatar: 'https://randomuser.me/api/portraits/women/77.jpg'
    },
    likes: 99,
    comments: 18,
    time: 9,
    saved: 29,
    description: 'Tradicional e nutritivo! Uma delícia nordestina 🌽🍳 #brasil',
    ingredientes: [
      '1 xícara de flocão de milho',
      '1/2 xícara de água',
      'Sal a gosto',
      '1 ovo cozido ou frito'
    ],
    modoPreparo: [
      'Hidrate o flocão com a água e o sal por 10 minutos',
      'Coloque em cuscuzeira e cozinhe no vapor por 10 minutos',
      'Sirva com ovo por cima'
    ]
  },
  {
    id: '9',
    titulo: 'Smoothie de Morango com Aveia',
    imagem: 'https://redefoodservice.com.br/wp-content/uploads/2024/08/Smoothie-de-Morango.jpg',
    tempo: '5 min',
    dificuldade: 'Fácil',
    user: {
      username: 'refeitsaudavel',
      avatar: 'https://randomuser.me/api/portraits/women/30.jpg'
    },
    likes: 132,
    comments: 25,
    time: 10,
    saved: 50,
    description: 'Refrescante, doce e muito nutritivo! 🍓🥤 #smoothie #verao',
    ingredientes: [
      '1 xícara de morangos congelados',
      '1 banana madura',
      '1 colher de aveia',
      '1 copo de leite (ou vegetal)',
      'Mel a gosto'
    ],
    modoPreparo: [
      'Bata tudo no liquidificador até ficar cremoso',
      'Sirva gelado'
    ]
  },
  {
    id: '10',
    titulo: 'Arroz de Couve-flor Low Carb',
    imagem: 'https://www.receiteria.com.br/wp-content/uploads/arroz-de-couve-flor.jpg',
    tempo: '10 min',
    dificuldade: 'Fácil',
    user: {
      username: 'lowcarbfacil',
      avatar: 'https://randomuser.me/api/portraits/men/80.jpg'
    },
    likes: 76,
    comments: 11,
    time: 11,
    saved: 27,
    description: 'Substituto saudável e saboroso para o arroz tradicional 🥦🍚 #lowcarb',
    ingredientes: [
      '1 cabeça de couve-flor',
      '1 colher de azeite',
      '1 dente de alho picado',
      'Sal e pimenta a gosto'
    ],
    modoPreparo: [
      'Processe a couve-flor até virar grãos',
      'Refogue o alho no azeite e adicione a couve-flor',
      'Cozinhe por 5 minutos mexendo sempre',
      'Tempere e sirva'
    ]
  }
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

  function toggleLike() {
    console.log("Like!");
  }

  if (receitaSelecionada) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.postHeader}>
          <Image source={{ uri: receitaSelecionada.user.avatar }} style={styles.postUserImage} />
          <Text style={styles.postUsername}>{receitaSelecionada.user.username}</Text>
          <TouchableOpacity style={styles.postOptions}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        
        <Image source={{ uri: receitaSelecionada.imagem }} style={styles.image} />
        
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity onPress={toggleLike}>
              <Ionicons name="heart-outline" size={28} color="#333" style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={26} color="#333" style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="paper-plane-outline" size={26} color="#333" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => toggleSalvar(receitaSelecionada)}>
            <Ionicons 
              name={salvos.find(r => r.id === receitaSelecionada.id) ? "bookmark" : "bookmark-outline"} 
              size={26} 
              color="#333" 
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.likesText}>{receitaSelecionada.likes} curtidas</Text>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            <Text style={styles.boldText}>{receitaSelecionada.user.username}</Text> {receitaSelecionada.description}
          </Text>
        </View>
        
        <TouchableOpacity>
          <Text style={styles.commentsText}>Ver todos os {receitaSelecionada.comments} comentários</Text>
        </TouchableOpacity>
        
        <Text style={styles.timeText}>Há {receitaSelecionada.time} horas</Text>
        
        <View style={styles.recipeDetails}>
          <Text style={styles.sectionTitle}>⏱ Tempo: {receitaSelecionada.tempo}</Text>
          <Text style={styles.sectionTitle}>🔥 Dificuldade: {receitaSelecionada.dificuldade}</Text>
          
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {receitaSelecionada.ingredientes.map((ingrediente, index) => (
            <Text key={index} style={styles.detailText}>• {ingrediente}</Text>
          ))}
          
          <Text style={styles.sectionTitle}>Modo de Preparo</Text>
          {receitaSelecionada.modoPreparo.map((passo, index) => (
            <Text key={index} style={styles.detailText}>{index + 1}. {passo}</Text>
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setReceitaSelecionada(null)}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.buttonText}>Voltar ao Feed</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const renderPost = ({ item }: { item: typeof receitas[0] }) => {
    const isSalvo = salvos.find((r) => r.id === item.id);
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={{ uri: item.user.avatar }} style={styles.postUserImage} />
          <Text style={styles.postUsername}>{item.user.username}</Text>
          <TouchableOpacity style={styles.postOptions}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => setReceitaSelecionada(item)}>
          <Image source={{ uri: item.imagem }} style={styles.postImage} />
        </TouchableOpacity>
        
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={28} color="#333" style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={26} color="#333" style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="paper-plane-outline" size={26} color="#333" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => toggleSalvar(item)}>
            <Ionicons 
              name={isSalvo ? "bookmark" : "bookmark-outline"} 
              size={26} 
              color="#333" 
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.likesText}>{item.likes} curtidas</Text>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            <Text style={styles.boldText}>{item.user.username}</Text> {item.description}
          </Text>
        </View>
        
        <TouchableOpacity>
          <Text style={styles.commentsText}>Ver todos os {item.comments} comentários</Text>
        </TouchableOpacity>
        
        <Text style={styles.timeText}>Há {item.time} horas</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Receitopia</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="paper-plane-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        ListHeaderComponent={
          <>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesContainer}
            >
              {stories.map((story) => (
                <View key={story.id} style={styles.story}>
                  <View style={styles.storyBorder}>
                    <Image source={{ uri: story.image }} style={styles.storyImage} />
                  </View>
                  <Text style={styles.storyText}>{story.username}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.divider} />
          </>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Instagram',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
  },
  storiesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  story: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyBorder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ff8503',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUsername: {
    fontWeight: 'bold',
    flex: 1,
  },
  postOptions: {
    padding: 5,
  },
  postImage: {
    width: '100%',
    height: 375,
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginRight: 15,
  },
  likesText: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  descriptionText: {
    flex: 1,
  },
  commentsText: {
    color: '#888',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  timeText: {
    color: '#888',
    fontSize: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  recipeDetails: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  detailText: {
    marginBottom: 8,
    color: '#333',
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 375,
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
});