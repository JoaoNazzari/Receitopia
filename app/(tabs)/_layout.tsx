import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      {/* Logo em destaque no topo */}
      

      {/* Navegação por abas */}
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: '#888',
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: string;

            if (route.name === 'feed') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'explorar') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'salvos') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'conta') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'ellipse-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarStyle: {
            paddingBottom: 10,
            height: 70,
            borderTopWidth: 0,
            backgroundColor: '#FFF',
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          tabBarLabelStyle: {
            marginBottom: 5,
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
        })}
      >
        <Tabs.Screen name="feed" options={{ title: 'Início' }} />
        <Tabs.Screen name="explorar" options={{ title: 'Explorar' }} />
        <Tabs.Screen name="salvos" options={{ title: 'Salvos' }} />
        <Tabs.Screen name="conta" options={{ title: 'Perfil' }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F9',
  },
  logoContainer: {
    width: '100%',
    height: 140, // Aumentado para dar destaque
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: '100%',
    height: '100%', // Preenche toda a altura disponível do container
  },
});