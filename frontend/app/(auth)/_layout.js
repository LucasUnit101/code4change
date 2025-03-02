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
    backgroundColor: '#FA4616', // Match the button's color for consistency
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D8E0',  // Light gray border for the header
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',  // White title for contrast
  },
  backButton: {
    marginLeft: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',  // White background for button
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D8E0',  // Subtle border color
  },
  backText: {
    color: '#FA4616',  // Matching color to the header
    fontWeight: '600',
    fontSize: 16,
  }
});
