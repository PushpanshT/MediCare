// src/pages/patient/HealthTimeline.tsx
import { Calendar, Activity, HeartPulse, Thermometer, Droplets } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

interface VitalSnapshot {
  date: string;
  time: string;
  heartRate: number;
  bloodPressure: string;
  spo2: number;
  temperature: number;
}

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  type: "appointment" | "lab" | "diagnosis" | "medication";
  description: string;
  doctor?: string;
  facility?: string;
  tag?: string;
}

const vitals: VitalSnapshot[] = [
  {
    date: "2026-01-04",
    time: "08:15 AM",
    heartRate: 76,
    bloodPressure: "118/76",
    spo2: 98,
    temperature: 36.7,
  },
  {
    date: "2026-01-03",
    time: "09:00 PM",
    heartRate: 80,
    bloodPressure: "122/80",
    spo2: 97,
    temperature: 36.9,
  },
  {
    date: "2026-01-02",
    time: "07:45 AM",
    heartRate: 72,
    bloodPressure: "116/74",
    spo2: 99,
    temperature: 36.6,
  },
];

const events: TimelineEvent[] = [
  {
    id: 1,
    date: "2025-12-20",
    title: "Follow-up with Dr. Sarah Smith",
    type: "appointment",
    description: "Routine cardiology follow-up and medication review.",
    doctor: "Dr. Sarah Smith (Cardiologist)",
    facility: "City Care Hospital, Nagpur",
    tag: "Completed",
  },
  {
    id: 2,
    date: "2025-11-30",
    title: "Lipid profile and ECG",
    type: "lab",
    description: "Lipid profile and resting ECG; results within normal limits.",
    facility: "City Care Diagnostics",
    tag: "Normal",
  },
  {
    id: 3,
    date: "2025-10-10",
    title: "Hypertension diagnosed",
    type: "diagnosis",
    description: "Stage 1 hypertension, lifestyle modification advised.",
    doctor: "Dr. Michael Brown (General Physician)",
    facility: "Family Health Clinic",
    tag: "Ongoing",
  },
  {
    id: 4,
    date: "2025-10-10",
    title: "Amlodipine 5 mg started",
    type: "medication",
    description: "Once daily dose, to be taken in the evening.",
    doctor: "Dr. Michael Brown",
    tag: "Active Rx",
  },
];

const getEventAccent = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "appointment":
      return "bg-primary/10 text-primary";
    case "lab":
      return "bg-amber-100 text-amber-700";
    case "diagnosis":
      return "bg-destructive/10 text-destructive";
    case "medication":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const HealthTimeline = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 animate-slide-up">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Health Timeline
            </h1>
            <p className="text-muted-foreground">
              View your medical history and keep track of your vitals over time.
            </p>
          </div>

          {/* Top: Vitals overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-up stagger-1">
            <div className="stat-card">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Heart rate
                </span>
                <HeartPulse className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">
                {vitals[0].heartRate} bpm
              </p>
              <span className="text-xs text-muted-foreground">
                Last recorded at {vitals[0].time}
              </span>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Blood pressure
                </span>
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">
                {vitals[0].bloodPressure}
              </p>
              <span className="text-xs text-muted-foreground">
                Systolic / diastolic
              </span>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  SpO₂
                </span>
                <Droplets className="w-5 h-5 text-sky-500" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">
                {vitals[0].spo2}%
              </p>
              <span className="text-xs text-muted-foreground">
                Oxygen saturation
              </span>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Temperature
                </span>
                <Thermometer className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">
                {vitals[0].temperature} °C
              </p>
              <span className="text-xs text-muted-foreground">
                Within normal range
              </span>
            </div>
          </div>

          {/* Vitals history list */}
          <div className="card-healthcare p-6 mb-8 animate-slide-up stagger-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Recent vitals
              </h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Last {vitals.length} readings
              </div>
            </div>
            <div className="space-y-3">
              {vitals.map((v, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-muted/60"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {v.date}
                    </p>
                    <p className="text-xs text-muted-foreground">{v.time}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span className="px-2 py-1 rounded-full bg-background border border-border">
                      HR: <span className="font-medium">{v.heartRate} bpm</span>
                    </span>
                    <span className="px-2 py-1 rounded-full bg-background border border-border">
                      BP:{" "}
                      <span className="font-medium">{v.bloodPressure}</span>
                    </span>
                    <span className="px-2 py-1 rounded-full bg-background border border-border">
                      SpO₂: <span className="font-medium">{v.spo2}%</span>
                    </span>
                    <span className="px-2 py-1 rounded-full bg-background border border-border">
                      Temp:{" "}
                      <span className="font-medium">{v.temperature} °C</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="card-healthcare p-6 animate-slide-up stagger-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Medical history
              </h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Sorted from newest to oldest
              </div>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-6 pl-10">
                {events.map((event) => (
                  <div key={event.id} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-4 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                    <div className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">
                          {event.title}
                        </p>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full capitalize ${getEventAccent(
                            event.type
                          )}`}
                        >
                          {event.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {event.date}
                        {event.facility && ` • ${event.facility}`}
                      </p>
                      <p className="text-xs text-foreground mb-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                        {event.doctor && (
                          <span className="px-2 py-0.5 rounded-full bg-background border border-border">
                            {event.doctor}
                          </span>
                        )}
                        {event.tag && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                            {event.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthTimeline;