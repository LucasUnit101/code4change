import { Text, TouchableOpacity, Image } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

/*
  Tab layout of app, contains all possible routes in (tabs) subfolder
*/
export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs 
      screenOptions={{
        lazy: false,
        headerTitleAlign: 'center',
        headerLeft: () => {
          return (
            <TouchableOpacity onPress={() => { 
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