import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Users, AlertTriangle, ArrowUp, ArrowDown, Clock, Phone, Video, CheckCircle, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useDoctorData } from "@/contexts/DoctorContext";

interface QueuePatient {
  id: string;
  name: string;
  position: number;
  complaint: string;
  riskLevel: 'low' | 'medium' | 'high';
  appointmentType: 'in-person' | 'tele-consult';
  scheduledTime: string;
  estimatedWait: string;
  phone: string;
  arrived: boolean;
}

const sampleQueue: QueuePatient[] = [
  {
    id: '1',
    name: 'Robert Johnson',
    position: 1,
    complaint: 'Chest pain, shortness of breath',
    riskLevel: 'high',
    appointmentType: 'in-person',
    scheduledTime: '10:00 AM',
    estimatedWait: 'Now',
    phone: '+1 234 567 8900',
    arrived: true,
  },
  {
    id: '2',
    name: 'Maria Garcia',
    position: 2,
    complaint: 'Follow-up consultation',
    riskLevel: 'low',
    appointmentType: 'in-person',
    scheduledTime: '10:30 AM',
    estimatedWait: '~15 min',
    phone: '+1 234 567 8901',
    arrived: true,
  },
  {
    id: '3',
    name: 'James Wilson',
    position: 3,
    complaint: 'Annual checkup',
    riskLevel: 'low',
    appointmentType: 'in-person',
    scheduledTime: '11:00 AM',
    estimatedWait: '~30 min',
    phone: '+1 234 567 8902',
    arrived: false,
  },
  {
    id: '4',
    name: 'Linda Chen',
    position: 4,
    complaint: 'Severe headache, dizziness',
    riskLevel: 'medium',
    appointmentType: 'tele-consult',
    scheduledTime: '11:30 AM',
    estimatedWait: '~45 min',
    phone: '+1 234 567 8903',
    arrived: true,
  },
  {
    id: '5',
    name: 'David Brown',
    position: 5,
    complaint: 'Routine blood pressure check',
    riskLevel: 'low',
    appointmentType: 'in-person',
    scheduledTime: '12:00 PM',
    estimatedWait: '~1 hr',
    phone: '+1 234 567 8904',
    arrived: false,
  },
];

const QueueManager = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [queue, setQueue] = useState<QueuePatient[]>(sampleQueue);
  
  const QueueManager = () => {
  const { queue, setQueue } = useDoctorData();

  // when you change status / reorder / complete:
  const markCompleted = (id: number) => {
    setQueue((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "Completed" } : p
      )
    );
  };

  // render from `queue`
};

  useEffect(() => {
    if (!loading && (!user || role !== 'doctor')) {
      navigate('/auth');
    }
  }, [user, role, loading, navigate]);

  const movePatientUp = (patientId: string) => {
    const index = queue.findIndex(p => p.id === patientId);
    if (index > 0) {
      const newQueue = [...queue];
      [newQueue[index - 1], newQueue[index]] = [newQueue[index], newQueue[index - 1]];
      // Update positions
      newQueue.forEach((p, i) => p.position = i + 1);
      setQueue(newQueue);
      toast({
        title: 'Queue Updated',
        description: `${queue[index].name} moved up in queue. Affected patients will be notified.`,
      });
    }
  };

  const movePatientDown = (patientId: string) => {
    const index = queue.findIndex(p => p.id === patientId);
    if (index < queue.length - 1) {
      const newQueue = [...queue];
      [newQueue[index], newQueue[index + 1]] = [newQueue[index + 1], newQueue[index]];
      newQueue.forEach((p, i) => p.position = i + 1);
      setQueue(newQueue);
      toast({
        title: 'Queue Updated',
        description: `${queue[index].name} moved down in queue.`,
      });
    }
  };

  const prioritizePatient = (patientId: string) => {
    const patient = queue.find(p => p.id === patientId);
    if (patient && patient.position > 1) {
      const newQueue = queue.filter(p => p.id !== patientId);
      newQueue.unshift(patient);
      newQueue.forEach((p, i) => p.position = i + 1);
      setQueue(newQueue);
      toast({
        title: 'Priority Updated',
        description: `${patient.name} has been moved to the front of the queue. All affected patients will be notified.`,
        variant: 'default',
      });
    }
  };

  const markComplete = (patientId: string) => {
    const patient = queue.find(p => p.id === patientId);
    setQueue(prev => prev.filter(p => p.id !== patientId).map((p, i) => ({ ...p, position: i + 1 })));
    toast({
      title: 'Appointment Completed',
      description: `${patient?.name}'s appointment has been marked as complete.`,
    });
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <span className="badge-warning"><AlertTriangle className="w-3 h-3" /> High Risk</span>;
      case 'medium':
        return <span className="badge-info">Medium Risk</span>;
      default:
        return <span className="badge-success">Low Risk</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Queue Manager
              </h1>
              <p className="text-muted-foreground">
                Manage your patient queue, prioritize urgent cases, and notify patients.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="queue-indicator">
                <Users className="w-4 h-4" />
                <span>{queue.length} patients</span>
              </div>
            </div>
          </div>

          {/* Queue Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-slide-up stagger-1">
            <div className="card-healthcare p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Arrived</p>
                <p className="text-xl font-bold font-display text-foreground">
                  {queue.filter(p => p.arrived).length}
                </p>
              </div>
            </div>
            <div className="card-healthcare p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-xl font-bold font-display text-foreground">
                  {queue.filter(p => p.riskLevel === 'high').length}
                </p>
              </div>
            </div>
            <div className="card-healthcare p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-info/10">
                <Video className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tele-Consults</p>
                <p className="text-xl font-bold font-display text-foreground">
                  {queue.filter(p => p.appointmentType === 'tele-consult').length}
                </p>
              </div>
            </div>
          </div>

          {/* Queue List */}
          <div className="card-healthcare overflow-hidden animate-slide-up stagger-2">
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Patient</div>
                <div className="col-span-3">Complaint</div>
                <div className="col-span-1">Risk</div>
                <div className="col-span-1">Time</div>
                <div className="col-span-1">Wait</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            <div className="divide-y divide-border">
              {queue.map((patient, index) => (
                <div 
                  key={patient.id}
                  className={`p-4 transition-colors ${
                    patient.riskLevel === 'high' ? 'bg-warning/5' : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Position */}
                    <div className="col-span-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'gradient-bg text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {patient.position}
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-secondary-foreground">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{patient.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {patient.appointmentType === 'tele-consult' ? (
                              <Video className="w-3 h-3" />
                            ) : (
                              <Users className="w-3 h-3" />
                            )}
                            <span className="capitalize">{patient.appointmentType.replace('-', ' ')}</span>
                            {patient.arrived && (
                              <span className="flex items-center gap-1 text-success">
                                <CheckCircle className="w-3 h-3" /> Arrived
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Complaint */}
                    <div className="col-span-3">
                      <p className="text-sm text-foreground line-clamp-2">{patient.complaint}</p>
                    </div>

                    {/* Risk Level */}
                    <div className="col-span-1">
                      {getRiskBadge(patient.riskLevel)}
                    </div>

                    {/* Scheduled Time */}
                    <div className="col-span-1">
                      <p className="text-sm text-foreground">{patient.scheduledTime}</p>
                    </div>

                    {/* Estimated Wait */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {patient.estimatedWait}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1">
                        {patient.riskLevel === 'high' && patient.position > 1 && (
                          <Button 
                            size="sm" 
                            variant="warning"
                            onClick={() => prioritizePatient(patient.id)}
                            className="text-xs"
                          >
                            Prioritize
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => movePatientUp(patient.id)}
                          disabled={index === 0}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => movePatientDown(patient.id)}
                          disabled={index === queue.length - 1}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => markComplete(patient.id)}
                          className="text-success hover:text-success"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {queue.length === 0 && (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">No patients in queue</h3>
                <p className="text-muted-foreground">Your queue is empty. Patients will appear here when they book appointments.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QueueManager;
