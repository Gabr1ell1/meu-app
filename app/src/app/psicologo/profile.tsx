import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { getPsychologistById } from "../../services/api";

// Nota: ainda não existe updatePsychologistProfile() na services/api.ts
// porque não definimos esse endpoint ainda. Esta tela por enquanto só
// exibe os dados - o botão "Salvar" fica pronto pra quando criarmos
// esse endpoint (mock ou real).
export default function PsychologistProfileScreen() {
    const { user } = useAuth();
    const [specialty, setSpecialty] = useState("");
    const [price, setPrice] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        getPsychologistById(user.userId).then((p) => {
            if (p) {
                setSpecialty(p.specialty);
                setPrice(String(p.price));
                setBio(p.bio);
            }
            setLoading(false);
        });
    }, [user]);

    function handleSave() {
        Alert.alert(
            "Ainda não implementado",
            "Falta criar o endpoint de atualização de perfil (mock ou real)."
        );
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu perfil</Text>

            <Text style={styles.label}>Especialidade</Text>
            <TextInput style={styles.input} value={specialty} onChangeText={setSpecialty} />

            <Text style={styles.label}>Preço da sessão (R$)</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Sobre você</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                value={bio}
                onChangeText={setBio}
                multiline
            />

            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 200, gap: 8 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
    label: { fontSize: 14, color: "#555", marginTop: 8 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12
    },
    textarea: { minHeight: 100, textAlignVertical: "top" }
});
