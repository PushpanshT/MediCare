// src/pages/doctor/DoctorTeleConsultation.tsx
import { useState } from "react";
import { Video, Phone, Calendar, Clock, User, Link2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TeleSlot {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: "Scheduled" | "In Progress" | "Completed";
  meetingLink: string;
}

const initialSlots: TeleSlot[] = [
  {
    id: 1,
    patientName: "Robert Johnson",
    date: "2026-01-04",
    time: "10:30 AM",
    status: "Scheduled",
    meetingLink: "https://meet.example.com/robert-1030",
  },
  {
    id: 2,
    patientName: "Maria Garcia",
    date: "2026-01-04",
    time: "11:15 AM",
    status: "In Progress",
    meetingLink: "https://meet.example.com/maria-1115",
  },
];

const DoctorTeleConsultation = () => {
  const [slots, setSlots] = useState<TeleSlot[]>(initialSlots);
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");

  const handleSchedule = () => {
    if (!patientName || !date || !time || !link) return;
    const newSlot: TeleSlot = {
      id: slots.length ? slots[slots.length - 1].id + 1 : 1,
      patientName,
      date,
      time,
      status: "Scheduled",
      meetingLink: link,
    };
    setSlots((prev) => [...prev, newSlot]);
    setPatientName("");
    setDate("");
    setTime("");
    setLink("");
  };

  const startCall = (id: number) => {
    const slot = slots.find((s) => s.id === id);
    if (!slot) return;
    window.open(slot.meetingLink, "_blank", "noopener,noreferrer");
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "In Progress" } : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between animate-slide-up">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Tele‑Consultation
              </h1>
              <p className="text-muted-foreground">
                Schedule and join secure video consultations with your patients.
              </p>
            </div>
            <Video className="w-10 h-10 text-primary hidden md:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Schedule form */}
            <div className="lg:col-span-1 card-healthcare p-6 space-y-4 animate-slide-up stagger-1">
              <h2 className="font-display text-lg font-semibold text-foreground mb-1">
                Schedule call
              </h2>
              <p className="text-xs text-muted-foreground mb-2">
                Create a new tele‑consultation slot and share the meeting link.
              </p>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Patient name
                </label>
                <Input
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Patient full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Date
                  </label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Time
                  </label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-primary" />
                  Meeting link
                </label>
                <Input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <Button className="w-full gap-2" onClick={handleSchedule}>
                <Calendar className="w-4 h-4" />
                Add to schedule
              </Button>
            </div>

            {/* Slots list */}
            <div className="lg:col-span-2 card-healthcare p-6 space-y-4 animate-slide-up stagger-2">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Today&apos;s tele‑consults
              </h2>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {slots.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No tele‑consultations scheduled yet.
                  </p>
                )}

                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-xl bg-muted/40 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {slot.patientName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {slot.date} • {slot.time}
                        </p>
                        <p
                          className={`text-[11px] mt-1 inline-block px-2 py-0.5 rounded-full ${
                            slot.status === "Scheduled"
                              ? "bg-amber-100 text-amber-700"
                              : slot.status === "In Progress"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {slot.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => startCall(slot.id)}
                      >
                        <Video className="w-4 h-4" />
                        Join call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={slot.meetingLink} target="_blank" rel="noreferrer">
                          <Link2 className="w-4 h-4 mr-1" />
                          Copy link
                        </a>
                      </Button>
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

export default DoctorTeleConsultation;