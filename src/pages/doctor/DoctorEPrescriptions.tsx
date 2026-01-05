// src/pages/doctor/DoctorEPrescriptions.tsx
import { useState } from "react";
import { FileText, Plus, Search, Calendar, User, Pill, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Prescription {
  id: number;
  patientName: string;
  age: number;
  diagnosis: string;
  medicines: string;
  date: string;
}

const initialPrescriptions: Prescription[] = [
  {
    id: 1,
    patientName: "Robert Johnson",
    age: 54,
    diagnosis: "Hypertension",
    medicines: "Amlodipine 5mg OD\nAspirin 75mg OD",
    date: "2026-01-04",
  },
  {
    id: 2,
    patientName: "Maria Garcia",
    age: 42,
    diagnosis: "Type 2 Diabetes",
    medicines: "Metformin 500mg BD",
    date: "2026-01-03",
  },
];

const DoctorEPrescriptions = () => {
  const [prescriptions, setPrescriptions] =
    useState<Prescription[]>(initialPrescriptions);
  const [search, setSearch] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");

  const filtered = prescriptions.filter((p) =>
    p.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!patientName || !age || !diagnosis || !medicines) return;
    const newRx: Prescription = {
      id: prescriptions.length ? prescriptions[prescriptions.length - 1].id + 1 : 1,
      patientName,
      age: Number(age),
      diagnosis,
      medicines,
      date: new Date().toISOString().slice(0, 10),
    };
    setPrescriptions((prev) => [newRx, ...prev]);
    setPatientName("");
    setAge("");
    setDiagnosis("");
    setMedicines("");
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
                E‑Prescriptions
              </h1>
              <p className="text-muted-foreground">
                Create, manage, and share digital prescriptions with your patients.
              </p>
            </div>
            <FileText className="w-10 h-10 text-primary hidden md:block" />
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create prescription form */}
            <div className="lg:col-span-1 card-healthcare p-6 space-y-4 animate-slide-up stagger-1">
              <h2 className="font-display text-lg font-semibold text-foreground mb-1">
                New prescription
              </h2>
              <p className="text-xs text-muted-foreground mb-2">
                Fill in patient details and medicines, then save to add to the list.
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
                  <label className="text-sm font-medium text-foreground">
                    Age
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Years"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">
                    Date
                  </label>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-md px-3 py-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Diagnosis
                </label>
                <Input
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Primary diagnosis"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Pill className="w-4 h-4 text-primary" />
                  Medicines & instructions
                </label>
                <textarea
                  rows={5}
                  value={medicines}
                  onChange={(e) => setMedicines(e.target.value)}
                  placeholder={"Amlodipine 5mg OD\nAspirin 75mg OD"}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <Button className="w-full gap-2" onClick={handleCreate}>
                <Plus className="w-4 h-4" />
                Save prescription
              </Button>
            </div>

            {/* Prescriptions list */}
            <div className="lg:col-span-2 card-healthcare p-6 space-y-4 animate-slide-up stagger-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Recent prescriptions
                </h2>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    className="h-9 w-52"
                    placeholder="Search by patient name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {filtered.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No prescriptions found. Create one using the form on the left.
                  </p>
                )}

                {filtered.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col md:flex-row md:items-start md:justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {rx.patientName} • {rx.age} yrs
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        {rx.date}
                      </p>
                      <p className="text-xs font-medium text-foreground mb-1">
                        Diagnosis: {rx.diagnosis}
                      </p>
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                        {rx.medicines}
                      </pre>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="w-3 h-3" />
                        Download PDF
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

export default DoctorEPrescriptions;