import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { getMyAppointmentsAsPsychologist, updateAppointmentStatus } from "../../services/api";
import { Appointment } from "../../types/clinic";

const STATUS_LABEL: Record<Appointment["status"], string> = {
    PENDING: "Aguardando sua confirmação",
    CONFIRMED: "Confirmada",
    CANCELLED: "Cancelada"
};

export default function PsychologistAgenda() {
    const { user, signOut } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        if (!user) return;
        setLoading(true);
        getMyAppointmentsAsPsychologist(user.userId)
            .then(setAppointments)
            .finally(() => setLoading(false));
    }, [user]);

    useEffect(() => {
        load();
    }, [load]);

    async function handleUpdateStatus(id: string, status: Appointment["status"]) {
        await updateAppointmentStatus(id, status);
        load();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Agenda de {user?.username}</Text>
                <Pressable onPress={signOut}>
                    <Text style={styles.logout}>Sair</Text>
                </Pressable>
            </View>

            <Link href="/psicologo/profile" style={styles.link}>
                Editar meu perfil
            </Link>

            {loading ? (
                <ActivityIndicator style={{ marginTop: 24 }} />
            ) : (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ gap: 12 }}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardName}>{item.patientName}</Text>
                            <Text style={styles.cardDate}>
                                {new Date(item.date).toLocaleString("pt-BR")}
                            </Text>
                            <Text style={styles.cardStatus}>{STATUS_LABEL[item.status]}</Text>

                            {item.status === "PENDING" && (
                                <View style={styles.actions}>
                                    <Pressable
                                        style={[styles.actionButton, styles.confirm]}
                                        onPress={() => handleUpdateStatus(item.id, "CONFIRMED")}
                                    >
                                        <Text style={styles.actionText}>Confirmar</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.actionButton, styles.cancel]}
                                        onPress={() => handleUpdateStatus(item.id, "CANCELLED")}
                                    >
                                        <Text style={styles.actionText}>Recusar</Text>
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={{ color: "#888" }}>Nenhuma consulta recebida ainda.</Text>
                    }
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
    card: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        padding: 16,
        backgroundColor: "#fafafa",
        gap: 4
    },
    cardName: { fontSize: 16, fontWeight: "600" },
    cardDate: { color: "#555" },
    cardStatus: { color: "#2563eb", fontWeight: "500" },
    actions: { flexDirection: "row", gap: 8, marginTop: 8 },
    actionButton: { flex: 1, padding: 10, borderRadius: 8, alignItems: "center" },
    confirm: { backgroundColor: "#2563eb" },
    cancel: { backgroundColor: "#c0392b" },
    actionText: { color: "#fff", fontWeight: "600" }
});
