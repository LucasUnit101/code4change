import { Text, TouchableOpacity } from 'react-native';
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
        headerLeft: () => {
          return (
            <TouchableOpacity onPress={() => { 
              signOut();
              if (router.canDismiss()) {
                router.dismiss();
              } else {
                router.navigate('/');
              }
            }}>
              <Text style={{ marginLeft: 10 }}>Logout</Text>
            </TouchableOpacity>
          )
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: () => <AntDesign name="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: () => <AntDesign name="barschart" size={24} />
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: () => <AntDesign name="team" size={24} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => <AntDesign name="user" size={24} />
        }}
      />
    </Tabs>
  )
}