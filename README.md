# MediCare

MediCare is a comprehensive dual-portal healthcare platform designed to optimize the patient-doctor experience. By combining real-time queue transparency, a commitment-based booking system, and AI-driven clinical insights, MediCare ensures that the most critical patients receive care exactly when they need it.

# Website Prototype

Live website : https://medicare-webapp-woad.vercel.app/

for testing purpose you can use

Patient ID and password :
  email id : pushpansht@gmail.com
  password : care123@

Doctor ID and password :
  email id : bhushank@gmail.com
  password : care123@

Or you can create your own id also that will also work completely fine
  
# Key Features

# Patient Portal
Smart Location Services: Find nearby hospitals, clinics, and pharmacies via Google Maps API.

Complaint-Based Filtering: Automatically filter doctors by specialization based on your current symptoms.

Live Queue Insights: View exactly how many patients are in the queue for the day before you book.

Commitment System: Pay a fixed commitment fee to secure your slot (automatically deducted from your final bill).

Reward Wallet: * Start with 100 base points.

+10 points for on-time arrival.

-20 points for no-shows.

Redeem points for discounts on future appointments.

Smart Alerts: Automated SMS/Email reminders triggered 1 hour before your appointment.

# Doctor Portal

Emergency Triage (Risk-Based Swap): Dynamically reorder the queue. Doctors can swap a low-risk patient with a high-risk patient based on medical urgency.

Advanced E-Prescriptions: Generate structured digital prescriptions including medicines, dosages, care instructions, and required tests.

Profile Management: Display qualifications, work experience, and consultation fees to build trust with patients.

Tele-Consultation: High-quality built-in video calling for remote patient care.

Advanced Patient Analytics Vitals Tracking: Long-term tracking and visualization of blood pressure, heart rate, and more.

Lab Report Integration: Upload and view lab results within the patient timeline.

Vertex AI Summary: Gemini-powered summaries of patient history for quick clinical decision-making.

# Tech Stack (Google Ecosystem)

Layer -> Technology

Frontend -> React.js / Next.js

Styling -> Tailwind CSS

Database -> Cloud Firestore (History/Profiles) & Firebase Realtime DB (Queues)

Authentication -> Firebase Auth (Patient & Doctor roles)

Maps -> "Google Maps Platform (Places, Distance Matrix)"

AI/ML -> Google Vertex AI (Patient History Summarization)

Payments -> Google Pay API (Commitment fees)

Notifications -> Firebase Cloud Functions + Twilio / SendGrid
