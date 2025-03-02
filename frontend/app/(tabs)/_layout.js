import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Redirect, Tabs, useRouter } from 'expo-router';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useSession } from "@context/ctx";

/*
  Tab layout of app, contains all possible routes in (tabs) subfolder
*/
export default function TabLayout() {
  const { session, signOut, isLoading } = useSession();
  
  const router = useRouter();

  if (isLoading) {
    return null;
  }
  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs 
      screenOptions={{
        lazy: false,
        headerTitleAlign: 'center',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: () => (
          <TouchableOpacity style={styles.logoutButton} onPress={() => { 
            signOut();
            if (router.canDismiss()) {
              router.dismiss();
            } else {
              router.navigate('/');
            }
          }}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ),
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: () => <AntDesign name="home" size={24} style={styles.icon} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: () => <AntDesign name="barschart" size={24} style={styles.icon} />
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: () => <AntDesign name="team" size={24} style={styles.icon} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => <AntDesign name="user" size={24} style={styles.icon} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FA4616', // Consistent theme color
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D8E0',  // Light gray border for header
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',  // White color for contrast
  },
  logoutButton: {
    marginLeft: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff', // White background for logout button
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D8E0',  // Subtle border color
  },
  logoutText: {
    color: '#FA4616', // Matching color with header
    fontWeight: '600',
    fontSize: 16,
  },
  tabBar: {
    backgroundColor: '#ffffff', // Light background for tab bar
    borderTopWidth: 1,
    borderTopColor: '#D1D8E0', // Soft gray border for the tab bar
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555', // Gray color for labels to be subtle but readable
  },
  tabBarIcon: {
    color: '#FA4616', // Icon color matching theme
  },
  icon: {
    color: '#FA4616', // Matching icon color to the header and other UI elements
  }
});
