import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { getMyAppointmentsAsPatient } from "../../services/api";
import { Appointment } from "../../types/clinic";

const STATUS_LABEL: Record<Appointment["status"], string> = {
    PENDING: "Aguardando confirmação",
    CONFIRMED: "Confirmada",
    CANCELLED: "Cancelada"
};

export default function PatientAppointments() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        getMyAppointmentsAsPatient(user.userId)
            .then(setAppointments)
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas consultas</Text>

            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardName}>{item.psychologistName}</Text>
                        <Text style={styles.cardDate}>
                            {new Date(item.date).toLocaleString("pt-BR")}
                        </Text>
                        <Text style={styles.cardStatus}>{STATUS_LABEL[item.status]}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={{ color: "#888" }}>Nenhuma consulta ainda.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 200, gap: 12 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 20, fontWeight: "600" },
    card: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        padding: 16,
        backgroundColor: "#fafafa"
    },
    cardName: { fontSize: 16, fontWeight: "600" },
    cardDate: { color: "#555", marginTop: 2 },
    cardStatus: { color: "#2563eb", marginTop: 6, fontWeight: "500" }
});
