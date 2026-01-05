import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import { useNavigate } from "react-router-dom";

// Sample symptoms for smart filter
const symptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Chest Pain",
  "Back Pain",
  "Skin Rash",
  "Fatigue",
  "Anxiety",
  "Joint Pain",
  "Stomach Ache",
];

// Sample doctors data (will be replaced with real data from DB)
const sampleDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    specialization: "Cardiologist",
    qualifications: "MBBS, MD, DM Cardiology",
    experience: 15,
    consultationFee: 1500,
    rating: 4.9,
    totalReviews: 234,
    queueCount: 5,
    waitTime: "~30 min",
    available: true,
    avatar: "SS",
    teleConsult: true,
  },
  {
    id: 2,
    name: "Dr. John Davis",
    specialization: "Dermatologist",
    qualifications: "MBBS, MD Dermatology",
    experience: 10,
    consultationFee: 1000,
    rating: 4.7,
    totalReviews: 189,
    queueCount: 3,
    waitTime: "~20 min",
    available: true,
    avatar: "JD",
    teleConsult: true,
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialization: "Neurologist",
    qualifications: "MBBS, DM Neurology",
    experience: 12,
    consultationFee: 1800,
    rating: 4.8,
    totalReviews: 156,
    queueCount: 8,
    waitTime: "~45 min",
    available: true,
    avatar: "EC",
    teleConsult: false,
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialization: "General Physician",
    qualifications: "MBBS, MD",
    experience: 8,
    consultationFee: 800,
    rating: 4.6,
    totalReviews: 312,
    queueCount: 2,
    waitTime: "~15 min",
    available: true,
    avatar: "MB",
    teleConsult: true,
  },
];

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Find a Doctor
            </h1>
            <p className="text-muted-foreground">
              Search by name, specialization, or select your symptoms for smart
              matching.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6 animate-slide-up stagger-1">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search doctors, specializations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </Button>
          </div>

          {/* Smart Symptom Filter */}
          <div
            className={`mb-8 animate-slide-up stagger-2 ${
              showFilters ? "" : "hidden"
            }`}
          >
            <div className="card-healthcare p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">
                What are your symptoms?
              </h3>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? "gradient-bg text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
              {selectedSymptoms.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing doctors who specialize in treating:{" "}
                    <span className="text-foreground font-medium">
                      {selectedSymptoms.join(", ")}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 animate-slide-up stagger-3">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {sampleDoctors.length}
              </span>{" "}
              doctors
            </p>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sampleDoctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="card-healthcare p-6 animate-slide-up"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground text-xl font-bold shrink-0">
                    {doctor.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          {doctor.name}
                        </h3>
                        <p className="text-primary font-medium">
                          {doctor.specialization}
                        </p>
                      </div>
                      {doctor.teleConsult && (
                        <div className="badge-info shrink-0">
                          <Video className="w-3 h-3" />
                          Tele-Consult
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {doctor.qualifications} • {doctor.experience} years exp.
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star
                          className="w-4 h-4 text-warning"
                          fill="currentColor"
                        />
                        <span className="font-medium text-foreground">
                          {doctor.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({doctor.totalReviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">₹{doctor.consultationFee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">3 km</span>
                      </div>
                    </div>

                    {/* Queue Status */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {doctor.queueCount} in queue
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {doctor.waitTime}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        className="flex-1"
                        onClick={() =>
                          navigate("/patient/book", {
                            state: { doctorName: doctor.name },
                          })
                        }
                      >
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindDoctors;