import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Clock, Calendar, TrendingUp, FileText, Video, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const DoctorDashboard = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || role !== 'doctor')) {
      navigate('/auth');
    }
  }, [user, role, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft text-primary">Loading...</div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || 'Doctor';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 animate-slide-up">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Good morning, {userName}! 🩺
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your practice today.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="stat-card animate-slide-up stagger-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Today's Queue</span>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">12</p>
              <span className="text-xs text-success">5 completed</span>
            </div>

            <div className="stat-card animate-slide-up stagger-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Current Wait</span>
                <Clock className="w-5 h-5 text-info" />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">~25 min</p>
              <span className="text-xs text-muted-foreground">Per patient average</span>
            </div>

            <div className="stat-card animate-slide-up stagger-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">High Risk</span>
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">2</p>
              <span className="text-xs text-warning">Needs priority attention</span>
            </div>

            <div className="stat-card animate-slide-up stagger-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Tele-Consults</span>
                <Video className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-bold font-display text-foreground">3</p>
              <span className="text-xs text-muted-foreground">Scheduled for today</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link to="/doctor/queue" className="card-healthcare p-6 group hover:border-primary/50 transition-all animate-slide-up stagger-1">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">Queue Manager</h3>
                  <p className="text-sm text-muted-foreground">View and manage patient queue, swap priorities</p>
                </div>
              </div>
            </Link>

            <Link to="/doctor/prescriptions" className="card-healthcare p-6 group hover:border-primary/50 transition-all animate-slide-up stagger-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors">
                  <FileText className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">E-Prescriptions</h3>
                  <p className="text-sm text-muted-foreground">Create and manage digital prescriptions</p>
                </div>
              </div>
            </Link>

            <Link to="/doctor/teleconsult" className="card-healthcare p-6 group hover:border-primary/50 transition-all animate-slide-up stagger-3">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-info/10 group-hover:bg-info/20 transition-colors">
                  <Video className="w-6 h-6 text-info" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">Tele-Consultation</h3>
                  <p className="text-sm text-muted-foreground">Start or join video consultations</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Today's Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Queue */}
            <div className="card-healthcare p-6 animate-slide-up stagger-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">Current Queue</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/doctor/queue">Manage Queue</Link>
                </Button>
              </div>

              <div className="space-y-3">
                {/* High priority patient */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-warning/5 border border-warning/20">
                  <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">Robert Johnson</h4>
                      <span className="badge-warning">High Risk</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Chest pain, shortness of breath</p>
                  </div>
                  <Button size="sm" variant="warning">
                    See Now
                  </Button>
                </div>

                {/* Normal patients */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Maria Garcia</h4>
                    <p className="text-sm text-muted-foreground">Follow-up consultation</p>
                  </div>
                  <span className="text-sm text-muted-foreground">~15 min</span>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">James Wilson</h4>
                    <p className="text-sm text-muted-foreground">Annual checkup</p>
                  </div>
                  <span className="text-sm text-muted-foreground">~30 min</span>
                </div>
              </div>
            </div>

            {/* Today's Summary */}
            <div className="card-healthcare p-6 animate-slide-up stagger-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">Today's Summary</h2>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-success/5 border border-success/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-foreground">Completed</span>
                  </div>
                  <span className="text-xl font-bold font-display text-success">5</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">In Progress</span>
                  </div>
                  <span className="text-xl font-bold font-display text-primary">1</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Waiting</span>
                  </div>
                  <span className="text-xl font-bold font-display text-foreground">6</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-info/5 border border-info/20">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-info" />
                    <span className="font-medium text-foreground">Tele-Consults</span>
                  </div>
                  <span className="text-xl font-bold font-display text-info">3</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Estimated End Time</span>
                  <span className="font-display font-semibold text-foreground">5:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
