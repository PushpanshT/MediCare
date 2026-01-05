import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero-bg">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-secondary/50 blur-3xl animate-float stagger-2" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 rounded-full bg-primary/10 blur-2xl animate-float stagger-3" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">HIPAA Compliant Healthcare Platform</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Your Health, <span className="gradient-text">Simplified</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up stagger-1">
            Connect with top healthcare professionals, manage appointments seamlessly, and take control of your medical journey—all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up stagger-2">
            <Button asChild variant="hero" size="xl">
              <Link to="/auth?mode=signup&role=patient">
                I'm a Patient
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/auth?mode=signup&role=doctor">
                I'm a Doctor
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up stagger-3">
            <div className="card-healthcare p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-warning" fill="currentColor" />
                <span className="text-2xl font-bold font-display text-foreground">4.9</span>
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="card-healthcare p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold font-display text-foreground">15 min</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
            </div>
            <div className="card-healthcare p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-2xl font-bold font-display text-foreground">10k+</span>
              </div>
              <p className="text-sm text-muted-foreground">Verified Doctors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
