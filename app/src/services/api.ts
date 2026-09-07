import { createApi } from '../integration/httpClient';
import { AuthRequest, RegisterRequest, SessionUser } from '../types/auth';
import { Appointment, Psychologist } from '../types/clinic';
import { mockLogin, mockRegister } from '../mock/mockAuth';
import {
    mockGetPsychologists,
    mockGetPsychologistById,
    mockRequestAppointment,
    mockGetAppointmentsByPatient,
    mockGetAppointmentsByPsychologist,
    mockUpdateAppointmentStatus
} from '../mock/mockClinic';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

const authApi = createApi(`${process.env.EXPO_PUBLIC_API_URL}/auth/v1`);
const clinicApi = createApi(`${process.env.EXPO_PUBLIC_API_URL}/clinic/v1`);

// ===== AUTH =====

export const login = async (data: AuthRequest): Promise<SessionUser> => {
    if (USE_MOCK) return mockLogin(data);
    const response = await authApi.post('/auth', data);
    return response.data;
};

export const register = async (data: RegisterRequest): Promise<void> => {
    if (USE_MOCK) return mockRegister(data);
    await authApi.post('/register', data);
};

export const logout = async (): Promise<void> => {
    if (USE_MOCK) return;
    await authApi.post('/logout');
};

export const getMe = async (): Promise<SessionUser> => {
    if (USE_MOCK) throw new Error('getMe não tem suporte a mock ainda');
    const response = await authApi.get('/me');
    return response.data;
};

// ===== CLÍNICA (paciente) =====

export const getPsychologists = async (): Promise<Psychologist[]> => {
    if (USE_MOCK) return mockGetPsychologists();
    const response = await clinicApi.get('/psychologists');
    return response.data;
};

export const getPsychologistById = async (
    id: string
): Promise<Psychologist | undefined> => {
    if (USE_MOCK) return mockGetPsychologistById(id);
    const response = await clinicApi.get(`/psychologists/${id}`);
    return response.data;
};

export const requestAppointment = async (
    patientId: string,
    patientName: string,
    psychologist: Psychologist,
    date: string
): Promise<Appointment> => {
    if (USE_MOCK) {
        return mockRequestAppointment(patientId, patientName, psychologist, date);
    }
    const response = await clinicApi.post('/appointments', {
        psychologistId: psychologist.id,
        date
    });
    return response.data;
};

export const getMyAppointmentsAsPatient = async (
    patientId: string
): Promise<Appointment[]> => {
    if (USE_MOCK) return mockGetAppointmentsByPatient(patientId);
    const response = await clinicApi.get('/appointments/mine');
    return response.data;
};

// ===== CLÍNICA (psicólogo) =====

export const getMyAppointmentsAsPsychologist = async (
    psychologistId: string
): Promise<Appointment[]> => {
    if (USE_MOCK) return mockGetAppointmentsByPsychologist(psychologistId);
    const response = await clinicApi.get('/appointments/agenda');
    return response.data;
};

export const updateAppointmentStatus = async (
    appointmentId: string,
    status: Appointment['status']
): Promise<Appointment> => {
    if (USE_MOCK) return mockUpdateAppointmentStatus(appointmentId, status);
    const response = await clinicApi.put(`/appointments/${appointmentId}`, { status });
    return response.data;
};
