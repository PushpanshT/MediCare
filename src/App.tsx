import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppointmentProvider } from "@/contexts/AppointmentContext";
import { DoctorProvider } from "@/contexts/DoctorContext"; // <-- NEW

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PatientDashboard from "./pages/patient/PatientDashboard";
import FindDoctors from "./pages/patient/FindDoctors";
import AppointmentForm from "@/pages/patient/AppointmentForm";
import NearbyFacilities from "@/pages/patient/NearbyFacilities";
import HealthTimeline from "@/pages/patient/HealthTimeline";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import QueueManager from "./pages/doctor/QueueManager";
import DoctorEPrescriptions from "./pages/doctor/DoctorEPrescriptions";
import DoctorTeleConsultation from "./pages/doctor/DoctorTeleConsultation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppointmentProvider>
          <DoctorProvider>
            {/* toast / notifications */}
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />

                {/* Patient Routes */}
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/doctors" element={<FindDoctors />} />
                <Route path="/patient/map" element={<NearbyFacilities />} />
                <Route path="/patient/history" element={<HealthTimeline />} />
                <Route path="/patient/book" element={<AppointmentForm />} />

                {/* Doctor Routes */}
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/queue" element={<QueueManager />} />
                <Route
                  path="/doctor/prescriptions"
                  element={<DoctorEPrescriptions />}
                />
                <Route
                  path="/doctor/teleconsult"
                  element={<DoctorTeleConsultation />}
                />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </DoctorProvider>
        </AppointmentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;