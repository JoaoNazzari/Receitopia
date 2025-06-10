import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const imageSize = screenWidth / numColumns;

// Objeto com as imagens dos destaques pré-carregadas
const highlightImages: Record<number, any> = {
  1: require('@/assets/images/destaques1.jpg'),
  2: require('@/assets/images/destaques2.jpg'),
  3: require('@/assets/images/destaques3.jpg'),
};

export default function AccountScreen() {
  const router = useRouter();
  const username = 'Thomas Jeferson Uzumaki';
  const bio = 'Apaixonado por culinária e compartilhando minhas criações ✨🍳 | Criador de conteúdo gastronômico';
  const [activeTab, setActiveTab] = useState('posts');

  const posts = [
  { id: 'add-post', isAddButton: true }, // Novo item especial
  { id: '1', image: require('@/assets/images/post1.jpg'), likes: 42, saved: true },
  { id: '2', image: require('@/assets/images/post2.jpg'), likes: 38, saved: false },
  ];

  const stats = [
    { value: '2', label: 'Receitas' },
    { value: '495', label: 'Seguidores' },
    { value: '356', label: 'Seguindo' },
  ];

  const tabs: { id: string; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
    { id: 'posts', icon: 'grid', label: 'Publicações' },
    { id: 'liked', icon: 'heart', label: 'Curtidas' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cabeçalho do perfil */}
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <Image
              source={require('@/assets/images/profile.png')}
              style={styles.profileImage}
            />
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <TouchableOpacity key={index} style={styles.statItem}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.bio}>{bio}</Text>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingsButton}>
                <Feather name="settings" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Destaques/Histórias */}
        <View style={styles.highlightsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.highlightItem}>
              <View style={styles.highlightAdd}>
                <Ionicons name="add" size={24} color="#333" />
              </View>
              <Text style={styles.highlightText}>Novo</Text>
            </TouchableOpacity>
            
            {/* Destaques com imagens específicas para cada um */}
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.highlightItem}>
                <View style={styles.highlightCircle}>
                  <Image 
                    source={highlightImages[item]} 
                    style={styles.highlightImage} 
                  />
                </View>
                <Text style={styles.highlightText}>Destaque {item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Abas de navegação */}
        <View style={styles.tabsContainer}>
          {tabs.map(tab => (
            <TouchableOpacity 
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons 
                name={tab.icon} 
                size={24} 
                color={activeTab === tab.id ? '#FF6B6B' : '#888'} 
              />
              <Text style={[
                styles.tabText, 
                activeTab === tab.id && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conteúdo das abas */}
        {activeTab === 'posts' && (
          <View style={styles.galleryContainer}>
           <FlatList
  data={posts}
  keyExtractor={(item) => item.id}
  numColumns={numColumns}
  scrollEnabled={false}
  renderItem={({ item }) => (
    item.isAddButton ? (
      <TouchableOpacity 
        style={styles.addPostContainer}
        onPress={() => console.log('Adicionar novo post')}
      >
        <View style={styles.addPostContent}>
          <Ionicons name="add" size={32} color="#FF6B6B" />
          <Text style={styles.addPostText}>Nova Receita</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity 
        style={styles.postContainer}
        onPress={() => router.push('/receita-detalhes')}
      >
        <Image source={item.image} style={styles.postImage} />
        <View style={styles.postOverlay}>
          <View style={styles.postStats}>
            <View style={styles.postStat}>
              <Ionicons name="heart" size={16} color="white" />
              <Text style={styles.postStatText}>{item.likes}</Text>
            </View>
            <View style={styles.postStat}>
              <Ionicons 
                name={item.saved ? "bookmark" : "bookmark-outline"} 
                size={16} 
                color="white" 
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  )}
/>
          </View>
        )}

        {activeTab === 'saved' && (
          <View style={styles.emptyTabContainer}>
            <MaterialIcons name="bookmark-border" size={50} color="#888" />
            <Text style={styles.emptyTabText}>Receitas salvas aparecerão aqui</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

// Estilos (mantidos iguais ao anterior)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F9',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  userInfo: {
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  settingsButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  highlightsContainer: {
    paddingVertical: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  highlightsScroll: {
    paddingRight: 10,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 15,
    width: 70,
  },
  highlightCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  highlightAdd: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  highlightImage: {
    width: '100%',
    height: '100%',
  },
  highlightText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    marginLeft: 8,
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  galleryContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  postContainer: {
    position: 'relative',
  },
  postImage: {
    width: imageSize,
    height: imageSize,
    resizeMode: 'cover',
  },
  postOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 5,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  postStatText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  emptyTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#f8f8f8',
  },
  emptyTabText: {
    marginTop: 15,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
    addPostContainer: {
    width: imageSize,
    height: imageSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  addPostContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  addPostText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
});