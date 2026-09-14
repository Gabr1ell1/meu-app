import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function PsychologistLayout() {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href="/(auth)" />;
    }

    // Paciente tentando acessar rota de psicólogo -> manda pro dashboard dele
    if (user?.role !== "PSYCHOLOGIST") {
        return <Redirect href="/paciente" />;
    }

    return <Slot />;
}
