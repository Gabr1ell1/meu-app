import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View, 
    Image
} from "react-native";

import { AuthInput } from "@/components/auth/authInput";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";

export default function Login() {
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { width } = useWindowDimensions();

  const isMobile = width < 700;

  async function handleLogin() {
    const result = await signIn({
      username,
      password,
    });

    if (result.ok) {
      router.replace("/(app)");
    } else {
      setError("Usuário ou senha inválidos");
    }
  }

  return (
    <View style={styles.background}>

      {/* DECORAÇÕES LATERAIS */}

      <View style={[styles.decorTop, isMobile && styles.decorMobile]} />
      <View style={[styles.decorBottom, isMobile && styles.decorMobile]} />

      {/* CARD PRINCIPAL */}

      <View
        style={[
          styles.card,
          isMobile && styles.cardMobile,
        ]}
      >

        {/* LADO ESQUERDO */}

        <View
          style={[
            styles.presentation,
            isMobile && styles.presentationMobile,
          ]}
        >
          <View>
            <Text style={styles.brand}>MENTALINK</Text>

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

          {/* FUTURA IMAGEM / ILUSTRAÇÃO */}

          <View style={styles.imagePlaceholder}>
            <Image
                            source={require("@/assets/images/dddd.png")}
                            style={styles.image}
                            resizeMode="contain"
                            />
          </View>
        </View>

        {/* LADO DO LOGIN */}

        <View
          style={[
            styles.formContainer,
            isMobile && styles.formContainerMobile,
          ]}
        >
          <Text style={styles.welcome}>
            BEM-VINDO(A)
          </Text>

          <Text style={styles.formTitle}>
            Entre na sua conta
          </Text>

          <Text style={styles.formSubtitle}>
            Acesse sua rede profissional.
          </Text>

          {/* USUÁRIO */}

          <View style={styles.inputGroup}>
           
            <AuthInput
            label="Usuário"
            placeholder="Digite seu usuário"
            value={username}
            onChangeText={setUsername}
            />


          </View>

          {/* SENHA */}

          <View style={styles.inputGroup}>

           <AuthInput
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
          </View>

          {/* ERRO */}
          {error ? (
            <Text style={styles.error}>
              {error}
            </Text>
          ) : null}

          {/* ESQUECI SENHA */}
          <Pressable
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>
              Esqueci minha senha
            </Text>
          </Pressable>

          {/* BOTÃO */}

          <Pressable
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              ENTRAR
            </Text>
          </Pressable>

          {/* CADASTRO */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Ainda não possui uma conta?
            </Text>

            <Pressable
              onPress={() => router.push("/register")}
            >
              <Text style={styles.registerLink}>
                Cadastre-se
              </Text>
            </Pressable>
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
    minHeight: 570,

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
     LADO ESQUERDO
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
     FUTURA ILUSTRAÇÃO
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

  /* =========================
     FORMULÁRIO
  ========================= */

  formContainer: {
    flex: 1,

    paddingHorizontal: 60,
    paddingVertical: 55,

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

    marginBottom: 35,
  },

  /* =========================
     INPUTS
  ========================= */

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    color: "#526562",

    fontSize: 13,
    fontWeight: "600",

    marginBottom: 8,
  },

  input: {
    height: 50,

    borderBottomWidth: 1.5,
    borderBottomColor: "#BFCFCC",

    color: "#29413F",

    fontSize: 15,

    paddingHorizontal: 4,
  },

  /* =========================
     ERRO
  ========================= */

  error: {
    color: "#C95C5C",

    fontSize: 13,

    marginBottom: 10,
  },

  /* =========================
     ESQUECI SENHA
  ========================= */

  forgotButton: {
    alignSelf: "flex-end",

    marginTop: 2,
    marginBottom: 25,
  },

  forgotText: {
    color: "#4F8F8A",

    fontSize: 13,

    fontWeight: "600",
  },

  /* =========================
     BOTÃO LOGIN
  ========================= */

  loginButton: {
    height: 52,

    backgroundColor: "#4F8F8A",

    borderRadius: 26,

    justifyContent: "center",
    alignItems: "center",

    elevation: 2,
  },

  loginButtonText: {
    color: "#FFFFFF",

    fontSize: 13,
    fontWeight: "700",

    letterSpacing: 2,
  },

  /* =========================
     CADASTRO
  ========================= */

  registerContainer: {
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 30,

    gap: 5,
  },

  registerText: {
    color: "#71807E",

    fontSize: 13,
  },

  registerLink: {
    color: "#4F8F8A",

    fontSize: 13,
    fontWeight: "700",
  },
});