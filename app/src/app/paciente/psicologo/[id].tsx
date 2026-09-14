import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { getPsychologistById, requestAppointment } from "../../../services/api";
import { Psychologist } from "../../../types/clinic";

export default function PsychologistProfile() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useAuth();
    const [psychologist, setPsychologist] = useState<Psychologist | null>(null);
    const [loading, setLoading] = useState(true);
    const [requesting, setRequesting] = useState(false);

    useEffect(() => {
        if (!id) return;
        getPsychologistById(id)
            .then((p) => setPsychologist(p ?? null))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleRequest(slot: string) {
        if (!psychologist || !user) return;

        setRequesting(true);
        try {
            await requestAppointment(user.userId, user.username, psychologist, slot);
            Alert.alert("Consulta solicitada!", "Aguarde a confirmação.", [
                { text: "OK", onPress: () => router.replace("/paciente/appointments") }
            ]);
        } catch {
            Alert.alert("Erro", "Não foi possível solicitar a consulta.");
        } finally {
            setRequesting(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    if (!psychologist) {
        return (
            <View style={styles.center}>
                <Text>Psicólogo não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{psychologist.name}</Text>
            <Text style={styles.specialty}>{psychologist.specialty}</Text>
            <Text style={styles.price}>R$ {psychologist.price.toFixed(2)} / sessão</Text>
            <Text style={styles.bio}>{psychologist.bio}</Text>

            <Text style={styles.subtitle}>Horários disponíveis</Text>
            <FlatList
                data={psychologist.availableSlots}
                keyExtractor={(item) => item}
                contentContainerStyle={{ gap: 8 }}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.slot}
                        disabled={requesting}
                        onPress={() => handleRequest(item)}
                    >
                        <Text style={styles.slotText}>
                            {new Date(item).toLocaleString("pt-BR")}
                        </Text>
                    </Pressable>
                )}
                ListEmptyComponent={
                    <Text style={{ color: "#888" }}>Sem horários disponíveis.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 200, gap: 8 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    name: { fontSize: 22, fontWeight: "700" },
    specialty: { fontSize: 16, color: "#555" },
    price: { fontSize: 16, color: "#2563eb", fontWeight: "600" },
    bio: { marginTop: 8, color: "#333" },
    subtitle: { fontSize: 16, fontWeight: "600", marginTop: 16 },
    slot: {
        borderWidth: 1,
        borderColor: "#2563eb",
        borderRadius: 8,
        padding: 12,
        alignItems: "center"
    },
    slotText: { color: "#2563eb", fontWeight: "500" }
});
