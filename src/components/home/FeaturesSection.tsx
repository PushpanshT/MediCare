import { Calendar, MapPin, Video, FileText, TrendingUp, Bell } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Find Nearby Care',
    description: 'Discover hospitals, clinics, and pharmacies near you with our integrated map.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Book appointments based on real-time queue status and estimated wait times.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: Video,
    title: 'Tele-Consultation',
    description: 'Connect with doctors remotely through secure video consultations.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: FileText,
    title: 'E-Prescriptions',
    description: 'Receive digital prescriptions and easily share them with pharmacies.',
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    icon: TrendingUp,
    title: 'Health Analytics',
    description: 'Track your vitals, lab results, and health trends over time.',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss an appointment with automated email and SMS notifications.',
    color: 'text-secondary-foreground',
    bg: 'bg-secondary',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Better Health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform designed to streamline your healthcare experience from booking to recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="card-healthcare p-8 group hover:scale-[1.02] transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
