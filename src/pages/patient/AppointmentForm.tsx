// src/pages/patient/AppointmentForm.tsx
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Stethoscope,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppointments } from "@/contexts/AppointmentContext";

// Reuse the same doctors you show in FindDoctors
const doctors = [
  { id: 1, name: "Dr. Sarah Smith", specialization: "Cardiologist" },
  { id: 2, name: "Dr. John Davis", specialization: "Dermatologist" },
  { id: 3, name: "Dr. Emily Chen", specialization: "Neurologist" },
  { id: 4, name: "Dr. Michael Brown", specialization: "General Physician" },
];

const AppointmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addAppointment } = useAppointments(); // <-- NEW

  // If you navigate with state: navigate("/patient/book", { state: { doctorName } });
  const preselectedDoctor = (location.state as { doctorName?: string } | null)
    ?.doctorName;

  const [doctorName, setDoctorName] = useState<string>(
    preselectedDoctor || doctors[0].name
  );
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: replace with real API call
    const payload = {
      doctorName,
      fullName,
      age: Number(age),
      gender,
      phone,
      email,
      date,
      time,
      reason,
    };

    try {
      // Example POST call:
      // await fetch("/api/appointments", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // Update global appointments so dashboard reflects the new one
      const selected = doctors.find((d) => d.name === doctorName);
      addAppointment({
        doctorName,
        specialization: selected?.specialization || "",
        // You can format date label however you like; here we keep the raw value
        date: date || "Upcoming",
        time,
        type: "In-Person Visit",
      });

      console.log("Appointment payload:", payload);
      alert("Appointment request submitted!");

      navigate("/patient/dashboard");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-6 animate-slide-up">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Book Appointment
            </h1>
            <p className="text-muted-foreground">
              Choose a doctor, select date and time, and share a few details.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="card-healthcare p-6 space-y-5 animate-slide-up stagger-1"
          >
            {/* Doctor */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-primary" />
                Doctor
              </label>
              <select
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} — {d.specialization}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full name
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Age
                </label>
                <Input
                  type="number"
                  min={0}
                  required
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone
                </label>
                <Input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email (optional)
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Date & time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Preferred date
                </label>
                <Input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Preferred time
                </label>
                <Input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Reason / symptoms
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe your symptoms or reason for visit"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Confirm Appointment"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AppointmentForm;