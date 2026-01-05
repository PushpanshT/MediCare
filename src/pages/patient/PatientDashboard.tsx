import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Search,
  Gift,
  TrendingUp,
  FileText,
  Bell,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/contexts/AppointmentContext";

const PatientDashboard = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const { appointments } = useAppointments(); // <-- NEW

  useEffect(() => {
    if (!loading && (!user || role !== "patient")) {
      navigate("/auth");
    }
  }, [user, role, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft text-primary">Loading...</div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || "Patient";
  const rewardPoints = 100; // Will come from database later

  // Derived values from appointments
  const upcomingCount = appointments.length;
  const nextAppointment = appointments[0]; // assuming list is already sorted soonest-first

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 animate-slide-up">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {userName.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Manage your appointments, find doctors, and track your health
              journey.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="stat-card animate-slide-up stagger-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Upcoming
                </span>
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">
                {upcomingCount}
              </p>
              <span className="text-xs text-muted-foreground">
                Appointments this week
              </span>
            </div>

            <div className="stat-card animate-slide-up stagger-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Next Appointment
                </span>
                <Clock className="w-5 h-5 text-info" />
              </div>
              {nextAppointment ? (
                <>
                  <p className="text-2xl font-bold font-display text-foreground">
                    {nextAppointment.date}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {nextAppointment.doctorName} at {nextAppointment.time}
                  </span>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold font-display text-foreground">
                    —
                  </p>
                  <span className="text-xs text-muted-foreground">
                    No upcoming appointments
                  </span>
                </>
              )}
            </div>

            <div className="stat-card animate-slide-up stagger-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Reward Points
                </span>
                <Gift className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">
                {rewardPoints}
              </p>
              <span className="text-xs text-success">
                +10 for on-time arrival
              </span>
            </div>

            <div className="stat-card animate-slide-up stagger-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Prescriptions
                </span>
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">
                3
              </p>
              <span className="text-xs text-muted-foreground">
                Active prescriptions
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link
              to="/patient/doctors"
              className="card-healthcare p-6 group hover:border-primary/50 transition-all animate-slide-up stagger-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Find Doctors
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Search by symptoms, specialization, or name
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/patient/map"
              className="card-healthcare p-6 group hover:border-primary/50 transition-all animate-slide-up stagger-2"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors">
                  <MapPin className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Nearby Facilities
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Find hospitals, clinics, and pharmacies
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/patient/history"
              className="card-healthcare p-6 group hover:border-primary/50 transition-all animate-slide-up stagger-3"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-info/10 group-hover:bg-info/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-info" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Health Timeline
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    View your medical history and vitals
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Upcoming Appointments */}
          <div className="card-healthcare p-6 animate-slide-up stagger-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Upcoming Appointments
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/patient/appointments">View All</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {appointments.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  You have no upcoming appointments. Book one from the Find
                  Doctors page.
                </p>
              )}

              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-semibold">
                    {appt.doctorName
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">
                      {appt.doctorName}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {appt.specialization
                        ? `${appt.specialization} • ${appt.type}`
                        : appt.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{appt.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {appt.time}
                    </p>
                  </div>
                  <div className="queue-indicator">
                    <Bell className="w-4 h-4" />
                    <span>In queue</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;