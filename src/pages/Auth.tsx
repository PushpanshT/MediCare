import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Heart, Mail, Lock, User, Stethoscope, ArrowLeft, Eye, EyeOff, Award, Briefcase, DollarSign, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, user, role } = useAuth();
  const { toast } = useToast();

  const [mode, setMode] = useState<'login' | 'signup'>(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>(
    (searchParams.get('role') as 'patient' | 'doctor') || 'patient'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // Doctor-specific fields
  const [qualifications, setQualifications] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [consultationFee, setConsultationFee] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user && role) {
      navigate(role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    }
  }, [user, role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      emailSchema.parse(email);
      passwordSchema.parse(password);

      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Login Failed',
            description: error.message || 'Invalid email or password',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully logged in.',
          });
        }
      } else {
        const metadata: Record<string, unknown> = {
          full_name: fullName,
        };

        if (selectedRole === 'doctor') {
          metadata.qualifications = qualifications;
          metadata.experience = experience;
          metadata.specialization = specialization;
          metadata.consultation_fee = consultationFee;
        }

        const { error } = await signUp(email, password, selectedRole, metadata);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account Exists',
              description: 'This email is already registered. Please login instead.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Sign Up Failed',
              description: error.message || 'Something went wrong',
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Account Created!',
            description: 'Welcome to MediCare. Redirecting to your dashboard...',
          });
        }
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: validationError.errors[0].message,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero-bg flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 -left-20 w-60 h-60 rounded-full bg-secondary/50 blur-3xl animate-float stagger-2" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to home */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Card */}
        <div className="card-healthcare p-8 animate-slide-up">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="p-2 rounded-xl gradient-bg">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">
              Medi<span className="gradient-text">Care</span>
            </span>
          </div>

          {/* Mode Toggle */}
          <div className="flex rounded-lg bg-muted p-1 mb-8">
            <button
              type="button"
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                mode === 'login' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                mode === 'signup' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => setMode('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Role Selection (only for signup) */}
          {mode === 'signup' && (
            <div className="mb-6">
              <Label className="text-sm font-medium text-foreground mb-3 block">I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'patient'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRole('patient')}
                >
                  <User className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'patient' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${selectedRole === 'patient' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Patient
                  </span>
                </button>
                <button
                  type="button"
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'doctor'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRole('doctor')}
                >
                  <Stethoscope className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'doctor' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${selectedRole === 'doctor' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Doctor
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Dr. John Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Doctor-specific fields */}
            {mode === 'signup' && selectedRole === 'doctor' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="qualifications">Qualifications</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="qualifications"
                      type="text"
                      placeholder="MBBS, MD"
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="experience"
                      type="number"
                      placeholder="10"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="pl-10"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="specialization"
                      type="text"
                      placeholder="Cardiology, Internal Medicine"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="consultationFee"
                      type="number"
                      placeholder="100"
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(e.target.value)}
                      className="pl-10"
                      required
                      min="0"
                    />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
