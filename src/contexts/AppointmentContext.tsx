// src/contexts/AppointmentContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export interface Appointment {
  id: number;
  doctorName: string;
  specialization: string;
  date: string;   // e.g. "Tomorrow" or "2026-01-05"
  time: string;   // e.g. "10:00 AM"
  type: "In-Person Visit" | "Tele-Consultation";
}

interface AppointmentContextValue {
  appointments: Appointment[];
  addAppointment: (appt: Omit<Appointment, "id">) => void;
}

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctorName: "Dr. Sarah Smith",
      specialization: "Cardiologist",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "In-Person Visit",
    },
    {
      id: 2,
      doctorName: "Dr. John Davis",
      specialization: "Dermatologist",
      date: "Friday",
      time: "2:30 PM",
      type: "Tele-Consultation",
    },
  ]);

  const addAppointment = (appt: Omit<Appointment, "id">) => {
    setAppointments((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, ...appt },
    ]);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error("useAppointments must be used within AppointmentProvider");
  return ctx;
};