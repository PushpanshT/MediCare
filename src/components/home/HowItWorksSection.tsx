import { UserPlus, Search, CalendarCheck, Heart } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up as a patient or doctor and complete your profile with relevant information.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Find the Right Doctor',
    description: 'Search by symptoms, specialization, or location to find the perfect match for your needs.',
  },
  {
    icon: CalendarCheck,
    step: '03',
    title: 'Book Your Appointment',
    description: 'Check real-time availability, view queue status, and secure your slot with a small commitment fee.',
  },
  {
    icon: Heart,
    step: '04',
    title: 'Get Quality Care',
    description: 'Visit in-person or connect via video call. Receive prescriptions and track your health journey.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 gradient-hero-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to begin your healthcare journey.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.step}
                className="relative text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step number bubble */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full gradient-bg shadow-soft mb-6 z-10">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center shadow-sm">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
