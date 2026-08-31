import { useState } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";

import { router } from "expo-router";

import { useAuth } from "../../src/context/AuthContext";

import { AuthInput } from "@/components/auth/authInput";

export default function Register() {
  const { signUp } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  async function handleRegister() {
    setError("");

    if (
      !username ||
      !password ||
      !confirmPassword
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const result = await signUp({
      username,
      password,
      
    });

    if (result.ok) {
      router.replace("/(auth)");
    } else {
      setError(
        result.error || "Não foi possível realizar o cadastro."
      );
    }
  }

  return (
    <View style={styles.background}>

      {/* =========================
          DECORAÇÕES
      ========================= */}

      <View
        style={[
          styles.decorTop,
          isMobile && styles.decorMobile,
        ]}
      />

      <View
        style={[
          styles.decorBottom,
          isMobile && styles.decorMobile,
        ]}
      />

      {/* =========================
          CARD PRINCIPAL
      ========================= */}

      <View
        style={[
          styles.card,
          isMobile && styles.cardMobile,
        ]}
      >

        {/* =========================
            FORMULÁRIO
        ========================= */}

        <View
          style={[
            styles.formContainer,
            isMobile && styles.formContainerMobile,
          ]}
        >

          <Text style={styles.welcome}>
            FAÇA PARTE
          </Text>

          <Text style={styles.formTitle}>
            Crie sua conta
          </Text>

          <Text style={styles.formSubtitle}>
            Conecte-se à nossa rede profissional.
          </Text>

    
          {/* USUÁRIO */}
          <View style={styles.inputGroup}>
            <AuthInput
              label="Usuário"
              placeholder="Digite aqui..."
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* SENHA */}

          <View style={styles.inputGroup}>
            <AuthInput
              label="Senha"
              placeholder="Crie uma senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* CONFIRMAR SENHA */}

          <View style={styles.inputGroup}>
            <AuthInput
              label="Confirmar senha"
              placeholder="Digite sua senha novamente"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* ERRO */}

          {error ? (
            <Text style={styles.error}>
              {error}
            </Text>
          ) : null}

          {/* BOTÃO */}

          <Pressable
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>
              CRIAR CONTA
            </Text>
          </Pressable>

          {/* LOGIN */}

          <View style={styles.loginContainer}>

            <Text style={styles.loginText}>
              Já possui uma conta?
            </Text>

            <Pressable
              onPress={() => router.push("/(auth)")}
            >
              <Text style={styles.loginLink}>
                Entrar
              </Text>
            </Pressable>

          </View>

        </View>

        {/* =========================
            LADO DIREITO
        ========================= */}

        <View
          style={[
            styles.presentation,
            isMobile && styles.presentationMobile,
          ]}
        >

          <View>

            <Text style={styles.brand}>
              MENTALINK
            </Text>

            <Text style={styles.presentationTitle}>
              Conectando pessoas
              {"\n"}
              ao cuidado que elas
              {"\n"}
              precisam.
            </Text>

            <Text style={styles.presentationText}>
              Encontre profissionais de psicologia,
              compartilhe experiências e construa
              conexões que fazem a diferença.
            </Text>

          </View>

          {/* FUTURA ILUSTRAÇÃO */}

          <View style={styles.imagePlaceholder}>
             <Image
                source={require("@/assets/images/dddd.png")}
                style={styles.image}
                resizeMode="contain"
                />
          </View>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /* =========================
     BACKGROUND
  ========================= */

  background: {
    flex: 1,

    backgroundColor: "#F4F7F6",

    justifyContent: "center",
    alignItems: "center",

    padding: 24,

    overflow: "hidden",
  },

  /* =========================
     DECORAÇÕES
  ========================= */

  decorTop: {
    position: "absolute",

    width: 330,
    height: 180,

    backgroundColor: "#DDEDEA",

    top: -90,
    left: 80,

    borderRadius: 100,
  },

  decorBottom: {
    position: "absolute",

    width: 300,
    height: 170,

    backgroundColor: "#E9B872",

    bottom: -80,
    right: 40,

    borderRadius: 100,
  },

  decorMobile: {
    opacity: 0.7,
  },

  /* =========================
     CARD
  ========================= */

  card: {
    width: "92%",

    maxWidth: 1050,

    minHeight: 650,

    backgroundColor: "#FFFFFF",

    borderRadius: 10,

    flexDirection: "row",

    overflow: "hidden",

    elevation: 8,

    shadowColor: "#000",

    shadowOpacity: 0.12,

    shadowRadius: 20,

    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  cardMobile: {
    width: "100%",

    minHeight: 0,

    flexDirection: "column",
  },
imageContainer: {
  height: 220,
  justifyContent: "center",
  alignItems: "center",
},

image: {
  width: "100%",
  height: "100%",
},
  /* =========================
     FORMULÁRIO
  ========================= */

  formContainer: {
    flex: 1,

    paddingHorizontal: 55,

    paddingVertical: 45,

    justifyContent: "center",
  },

  formContainerMobile: {
    paddingHorizontal: 30,

    paddingVertical: 40,
  },

  welcome: {
    color: "#4F8F8A",

    fontSize: 13,

    fontWeight: "700",

    letterSpacing: 2,

    marginBottom: 10,
  },

  formTitle: {
    color: "#29413F",

    fontSize: 28,

    fontWeight: "700",

    marginBottom: 8,
  },

  formSubtitle: {
    color: "#71807E",

    fontSize: 14,

    marginBottom: 28,
  },

  /* =========================
     INPUTS
  ========================= */

  inputGroup: {
    marginBottom: 8,
  },

  /* =========================
     ERRO
  ========================= */

  error: {
    color: "#C95C5C",

    fontSize: 13,

    marginTop: 5,

    marginBottom: 10,
  },

  /* =========================
     BOTÃO
  ========================= */

  registerButton: {
    height: 52,

    backgroundColor: "#4F8F8A",

    borderRadius: 26,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 8,

    elevation: 2,
  },

  registerButtonText: {
    color: "#FFFFFF",

    fontSize: 13,

    fontWeight: "700",

    letterSpacing: 2,
  },

  /* =========================
     LOGIN
  ========================= */

  loginContainer: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 25,

    gap: 5,
  },

  loginText: {
    color: "#71807E",

    fontSize: 13,
  },

  loginLink: {
    color: "#4F8F8A",

    fontSize: 13,

    fontWeight: "700",
  },

  /* =========================
     LADO DIREITO
  ========================= */

  presentation: {
    flex: 1,

    backgroundColor: "#4F8F8A",

    paddingHorizontal: 55,

    paddingVertical: 55,

    justifyContent: "space-between",
  },

  presentationMobile: {
    paddingHorizontal: 30,

    paddingVertical: 35,

    minHeight: 280,
  },

  brand: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",

    letterSpacing: 3,

    marginBottom: 45,
  },

  presentationTitle: {
    color: "#FFFFFF",

    fontSize: 32,

    fontWeight: "700",

    lineHeight: 42,

    marginBottom: 20,
  },

  presentationText: {
    color: "#E8F3F1",

    fontSize: 15,

    lineHeight: 24,

    maxWidth: 400,
  },

  /* =========================
     ILUSTRAÇÃO
  ========================= */

  imagePlaceholder: {
    height: 170,

    justifyContent: "center",

    alignItems: "center",
  },

  imagePlaceholderText: {
    color: "#DDEDEA",

    fontSize: 14,

    opacity: 0.7,
  },
});