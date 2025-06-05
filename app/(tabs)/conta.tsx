
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';

// largura da tela para calcular grid
const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const imageSize = screenWidth / numColumns - 10; // -10 para margem

// Exemplo de posts com imagens locais (coloque suas imagens jpg dentro de /assets)
const posts = [
  require('@/assets/images/post1.jpg'),
  require('@/assets/images/post2.jpg'),
];

export default function AccountScreen() {
  const username = 'Thomas Jeferson Uzumaki';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/profile.png')} // sua foto de perfil aqui
          style={styles.profileImage}
        />
        <Text style={styles.username}>{username}</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(_, index) => String(index)}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <Image source={item} style={styles.postImage} />
        )}
        contentContainerStyle={{ marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35, // círculo
    marginRight: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  postImage: {
    width: imageSize,
    height: imageSize,
    margin: 5,
    borderRadius: 5,
  },
});

