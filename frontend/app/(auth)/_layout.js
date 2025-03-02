import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

/*
  Auth layout of app, contains all possible routes in (auth) subfolder
*/
export default function AuthLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => (
          <TouchableOpacity style={styles.backButton} onPress={router.back}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FA4616',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D8E0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',  
  },
  backButton: {
    marginBottom: 20, 
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',  
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D8E0',  
  },
  backText: {
    color: '#FA4616',  
    fontWeight: '600',
    fontSize: 16,
  }
});
