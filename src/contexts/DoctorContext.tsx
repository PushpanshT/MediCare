// src/contexts/DoctorContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export interface QueuePatient {
  id: number;
  name: string;
  reason: string;
  risk: "Normal" | "High";
  etaMinutes: number;
  status: "Waiting" | "In Progress" | "Completed";
}

export interface TeleCall {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: "Scheduled" | "In Progress" | "Completed";
}

interface DoctorContextValue {
  queue: QueuePatient[];
  setQueue: (updater: (prev: QueuePatient[]) => QueuePatient[]) => void;
  teleCalls: TeleCall[];
  setTeleCalls: (updater: (prev: TeleCall[]) => TeleCall[]) => void;
}

const DoctorContext = createContext<DoctorContextValue | null>(null);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueueState] = useState<QueuePatient[]>([
    {
      id: 1,
      name: "Robert Johnson",
      reason: "Chest pain, shortness of breath",
      risk: "High",
      etaMinutes: 0,
      status: "Waiting",
    },
    {
      id: 2,
      name: "Maria Garcia",
      reason: "Follow‑up consultation",
      risk: "Normal",
      etaMinutes: 15,
      status: "Waiting",
    },
  ]);

  const [teleCalls, setTeleCallsState] = useState<TeleCall[]>([
    {
      id: 1,
      patientName: "Robert Johnson",
      date: "2026-01-04",
      time: "10:30 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      patientName: "Maria Garcia",
      date: "2026-01-04",
      time: "11:15 AM",
      status: "Scheduled",
    },
  ]);

  const setQueue = (updater: (prev: QueuePatient[]) => QueuePatient[]) =>
    setQueueState((prev) => updater(prev));

  const setTeleCalls = (updater: (prev: TeleCall[]) => TeleCall[]) =>
    setTeleCallsState((prev) => updater(prev));

  return (
    <DoctorContext.Provider
      value={{ queue, setQueue, teleCalls, setTeleCalls }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorData = () => {
  const ctx = useContext(DoctorContext);
  if (!ctx) throw new Error("useDoctorData must be used within DoctorProvider");
  return ctx;
};
