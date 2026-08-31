import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "@/src/context/AuthContext";

export default function Home() {
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo!
      </Text>

      <Text style={styles.subtitle}>
        Você está logado na Mentalink.
      </Text>
    
     <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          SAIR
        </Text>
      </Pressable>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7F6",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#29413F",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#71807E",
  },
   logoutButton: {
    marginTop: 30,

    paddingHorizontal: 35,
    height: 48,

    backgroundColor: "#4F8F8A",

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#FFFFFF",

    fontSize: 13,
    fontWeight: "700",

    letterSpacing: 1.5,
  },
});