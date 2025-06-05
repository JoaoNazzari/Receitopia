import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      {/* Logo no topo */}
      <Image
        source={require('@/assets/images/logo.jpg')} // Ajuste o caminho da sua imagem
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Tabs */}
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            if (route.name === 'feed') {
              iconName = 'home-outline';
            } else if (route.name === 'explorar') {
              iconName = 'search-outline';
            } else if (route.name === 'salvos') {
              iconName = 'bookmark-outline';
            } else if (route.name === 'conta') {
              iconName = 'person-outline';
            } else {
              iconName = 'ellipse-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarStyle: {
            paddingBottom: 10,
            height: 70,
          },
          tabBarLabelStyle: {
            marginBottom: 5,
          },
        })}
      >
        <Tabs.Screen name="feed" />
        <Tabs.Screen name="explorar" />
        <Tabs.Screen name="salvos" />
        <Tabs.Screen name="conta" />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: '100%',
    height: 80,
    marginTop: 40,
    marginBottom: 10,
  },
});
