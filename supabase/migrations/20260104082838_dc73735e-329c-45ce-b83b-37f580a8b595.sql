-- Create enum types for the healthcare platform
CREATE TYPE public.user_role AS ENUM ('patient', 'doctor');
CREATE TYPE public.appointment_status AS ENUM ('scheduled', 'confirmed', 'in_queue', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE public.appointment_type AS ENUM ('in_person', 'tele_consult');
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high');

-- Profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  reward_points INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Doctor profiles with additional details
CREATE TABLE public.doctor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  qualifications TEXT NOT NULL,
  experience_years INTEGER NOT NULL DEFAULT 0,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  consultation_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
  bio TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  rating DECIMAL(2, 1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profile_id)
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  appointment_type appointment_type NOT NULL DEFAULT 'in_person',
  status appointment_status NOT NULL DEFAULT 'scheduled',
  complaint TEXT,
  risk_level risk_level DEFAULT 'low',
  commitment_fee DECIMAL(10, 2) DEFAULT 0,
  commitment_fee_paid BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Queue entries for real-time queue management
CREATE TABLE public.queue_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  queue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  position INTEGER NOT NULL,
  has_arrived BOOLEAN DEFAULT false,
  estimated_wait_minutes INTEGER DEFAULT 0,
  actual_start_time TIMESTAMP WITH TIME ZONE,
  actual_end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(appointment_id)
);

-- Prescriptions table for e-prescriptions
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  diagnosis TEXT,
  medicines JSONB NOT NULL DEFAULT '[]',
  tests_recommended TEXT[],
  care_instructions TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vitals tracking table
CREATE TABLE public.vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  heart_rate INTEGER,
  temperature DECIMAL(4, 1),
  weight DECIMAL(5, 2),
  notes TEXT,
  recorded_by UUID REFERENCES public.profiles(id),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Reward transactions for points system
CREATE TABLE public.reward_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queue_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view doctor profiles" ON public.profiles
  FOR SELECT USING (role = 'doctor');

-- Doctor profiles policies
CREATE POLICY "Anyone can view doctor details" ON public.doctor_profiles
  FOR SELECT USING (true);

CREATE POLICY "Doctors can update their own doctor profile" ON public.doctor_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = doctor_profiles.profile_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can insert their own doctor profile" ON public.doctor_profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = doctor_profiles.profile_id 
      AND profiles.user_id = auth.uid()
    )
  );

-- Appointments policies
CREATE POLICY "Patients can view their appointments" ON public.appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = appointments.patient_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can view appointments assigned to them" ON public.appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      JOIN public.profiles p ON dp.profile_id = p.id
      WHERE dp.id = appointments.doctor_id 
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Patients can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = appointments.patient_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can update their appointments" ON public.appointments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      JOIN public.profiles p ON dp.profile_id = p.id
      WHERE dp.id = appointments.doctor_id 
      AND p.user_id = auth.uid()
    )
  );

-- Queue entries policies
CREATE POLICY "Patients can view their queue position" ON public.queue_entries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.appointments a
      JOIN public.profiles p ON a.patient_id = p.id
      WHERE a.id = queue_entries.appointment_id 
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can view and manage their queue" ON public.queue_entries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      JOIN public.profiles p ON dp.profile_id = p.id
      WHERE dp.id = queue_entries.doctor_id 
      AND p.user_id = auth.uid()
    )
  );

-- Prescriptions policies
CREATE POLICY "Patients can view their prescriptions" ON public.prescriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = prescriptions.patient_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can manage prescriptions" ON public.prescriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      JOIN public.profiles p ON dp.profile_id = p.id
      WHERE dp.id = prescriptions.doctor_id 
      AND p.user_id = auth.uid()
    )
  );

-- Vitals policies
CREATE POLICY "Patients can view their vitals" ON public.vitals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = vitals.patient_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can view patient vitals for their appointments" ON public.vitals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.appointments a
      JOIN public.doctor_profiles dp ON a.doctor_id = dp.id
      JOIN public.profiles p ON dp.profile_id = p.id
      WHERE a.patient_id = vitals.patient_id 
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Doctors can insert vitals" ON public.vitals
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role = 'doctor'
    )
  );

-- Reward transactions policies
CREATE POLICY "Users can view their reward transactions" ON public.reward_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = reward_transactions.profile_id 
      AND profiles.user_id = auth.uid()
    )
  );

-- Functions for timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doctor_profiles_updated_at
  BEFORE UPDATE ON public.doctor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_queue_entries_updated_at
  BEFORE UPDATE ON public.queue_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  new_profile_id UUID;
BEGIN
  INSERT INTO public.profiles (user_id, role, full_name)
  VALUES (
    NEW.id, 
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'patient'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
  )
  RETURNING id INTO new_profile_id;
  
  -- If doctor, create doctor profile
  IF (NEW.raw_user_meta_data->>'role') = 'doctor' THEN
    INSERT INTO public.doctor_profiles (
      profile_id, 
      qualifications, 
      experience_years, 
      specializations,
      consultation_fee
    )
    VALUES (
      new_profile_id,
      COALESCE(NEW.raw_user_meta_data->>'qualifications', ''),
      COALESCE((NEW.raw_user_meta_data->>'experience')::INTEGER, 0),
      COALESCE(
        string_to_array(NEW.raw_user_meta_data->>'specialization', ','),
        '{}'
      ),
      COALESCE((NEW.raw_user_meta_data->>'consultation_fee')::DECIMAL, 0)
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for queue management
ALTER PUBLICATION supabase_realtime ADD TABLE public.queue_entries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;