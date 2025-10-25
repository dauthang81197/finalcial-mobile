// app/(tabs)/_layout.tsx
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: Colors.background,
          alignItems: "center",
          flexDirection: "row",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 25,
                borderWidth: focused ? 5 : 0,
                borderColor: Colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="home" size={24} color={Colors.text.colorBlack} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="transaction/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 25,
                borderWidth: focused ? 5 : 0,
                borderColor: Colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="wallet"
                size={24}
                color={Colors.text.colorBlack}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
