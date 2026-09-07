import { Appointment, Psychologist } from "../types/clinic";

function delay<T>(value: T, ms = 400): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const PSYCHOLOGISTS: Psychologist[] = [
    {
        id: "psi1",
        userId: "psi1",
        name: "Dra. Ana Souza",
        specialty: "Ansiedade e Estresse",
        price: 150,
        bio: "Psicóloga clínica com foco em TCC, atendimento adulto.",
        availableSlots: [
            "2026-09-10T14:00:00",
            "2026-09-10T15:00:00",
            "2026-09-11T09:00:00"
        ]
    },
    {
        id: "psi2",
        userId: "psi2",
        name: "Dr. Marcos Lima",
        specialty: "Terapia de Casal",
        price: 180,
        bio: "Atendimento a casais e famílias há 10 anos.",
        availableSlots: ["2026-09-09T10:00:00", "2026-09-12T16:00:00"]
    },
    {
        id: "psi3",
        userId: "psi3",
        name: "Dra. Camila Rocha",
        specialty: "Psicologia Infantil",
        price: 140,
        bio: "Especialista em desenvolvimento infantil e adolescência.",
        availableSlots: ["2026-09-10T11:00:00"]
    }
];

// Estado em memória - reseta quando a página recarrega. É só pra
// simular o comportamento da API real enquanto o backend não existe.
let APPOINTMENTS: Appointment[] = [
    {
        id: "a1",
        patientId: "p1",
        patientName: "paciente1",
        psychologistId: "psi1",
        psychologistName: "Dra. Ana Souza",
        date: "2026-09-10T14:00:00",
        status: "PENDING"
    }
];

export async function mockGetPsychologists(): Promise<Psychologist[]> {
    return delay(PSYCHOLOGISTS);
}

export async function mockGetPsychologistById(
    id: string
): Promise<Psychologist | undefined> {
    return delay(PSYCHOLOGISTS.find((p) => p.id === id));
}

export async function mockRequestAppointment(
    patientId: string,
    patientName: string,
    psychologist: Psychologist,
    date: string
): Promise<Appointment> {
    const appointment: Appointment = {
        id: `a${APPOINTMENTS.length + 1}`,
        patientId,
        patientName,
        psychologistId: psychologist.id,
        psychologistName: psychologist.name,
        date,
        status: "PENDING"
    };

    APPOINTMENTS = [...APPOINTMENTS, appointment];
    return delay(appointment);
}

export async function mockGetAppointmentsByPatient(
    patientId: string
): Promise<Appointment[]> {
    return delay(APPOINTMENTS.filter((a) => a.patientId === patientId));
}

export async function mockGetAppointmentsByPsychologist(
    psychologistId: string
): Promise<Appointment[]> {
    return delay(APPOINTMENTS.filter((a) => a.psychologistId === psychologistId));
}

export async function mockUpdateAppointmentStatus(
    appointmentId: string,
    status: Appointment["status"]
): Promise<Appointment> {
    APPOINTMENTS = APPOINTMENTS.map((a) =>
        a.id === appointmentId ? { ...a, status } : a
    );

    const updated = APPOINTMENTS.find((a) => a.id === appointmentId);
    if (!updated) {
        throw new Error("Consulta não encontrada");
    }

    return delay(updated);
}
