import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const imageSize = screenWidth / numColumns;

export default function AccountScreen() {
  const router = useRouter();
  const username = 'Thomas Jeferson Uzumaki';
  const bio = 'Apaixonado por culinária e compartilhando minhas criações';

  const posts = [
    require('@/assets/images/post1.jpg'),
    require('@/assets/images/post2.jpg'),
    // ... mais posts
  ];

  const stats = [
    { value: '124', label: 'Receitas' },
    { value: '1.2k', label: 'Seguidores' },
    { value: '356', label: 'Seguindo' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/profile.png')}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.bio}>{bio}</Text>
          
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.tabActive]}>
          <Ionicons name="grid" size={24} color="#FF6B6B" />
          <Text style={styles.tabTextActive}>Publicações</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(_, index) => String(index)}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push('/receita-detalhes')}>
            <Image source={item} style={styles.postImage} />
            <View style={styles.postOverlay}>
              <View style={styles.postStat}>
                <Ionicons name="bookmark" size={16} color="white" />
                <Text style={styles.postStatText}>42</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.gallery}
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
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  editButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
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
  },
  tabTextActive: {
    marginLeft: 8,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  gallery: {
    paddingBottom: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  postStatText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
});