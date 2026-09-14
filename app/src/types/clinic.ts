export type Psychologist = {
    id: string;
    userId: string;
    name: string;
    specialty: string;
    price: number;
    bio: string;
    availableSlots: string[]; // ex: ["2026-09-10T14:00:00", ...]
};

export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export type Appointment = {
    id: string;
    patientId: string;
    patientName: string;
    psychologistId: string;
    psychologistName: string;
    date: string;
    status: AppointmentStatus;
};
