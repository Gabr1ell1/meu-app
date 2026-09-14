import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { getPsychologists } from "../../services/api";
import { Psychologist } from "../../types/clinic";

export default function PatientHome() {
    const { user, signOut } = useAuth();
    const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPsychologists()
            .then(setPsychologists)
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Olá, {user?.username}!</Text>
                <Pressable onPress={signOut}>
                    <Text style={styles.logout}>Sair</Text>
                </Pressable>
            </View>

            <Link href="/paciente/appointments" style={styles.link}>
                Ver minhas consultas
            </Link>

            <Text style={styles.subtitle}>Psicólogos disponíveis</Text>

            {loading ? (
                <ActivityIndicator style={{ marginTop: 24 }} />
            ) : (
                <FlatList
                    data={psychologists}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ gap: 12 }}
                    renderItem={({ item }) => (
                        <Link href={`/paciente/psicologo/${item.id}`} asChild>
                            <Pressable style={styles.card}>
                                <Text style={styles.cardName}>{item.name}</Text>
                                <Text style={styles.cardSpecialty}>{item.specialty}</Text>
                                <Text style={styles.cardPrice}>
                                    R$ {item.price.toFixed(2)} / sessão
                                </Text>
                            </Pressable>
                        </Link>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 200, gap: 12 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: { fontSize: 20, fontWeight: "600" },
    logout: { color: "#c0392b" },
    link: { color: "#2563eb" },
    subtitle: { fontSize: 16, fontWeight: "600", marginTop: 8 },
    card: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        padding: 16,
        backgroundColor: "#fafafa"
    },
    cardName: { fontSize: 16, fontWeight: "600" },
    cardSpecialty: { color: "#555", marginTop: 2 },
    cardPrice: { color: "#2563eb", marginTop: 6, fontWeight: "500" }
});
