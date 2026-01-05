import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-primary">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                MediCare
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              Your trusted healthcare companion. Connecting patients with quality care providers since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/patient/doctors" className="text-background/70 hover:text-background text-sm transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=signup&role=doctor" className="text-background/70 hover:text-background text-sm transition-colors">
                  Join as Doctor
                </Link>
              </li>
              <li>
                <Link to="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Mail className="w-4 h-4" />
                support@medicare.com
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Phone className="w-4 h-4" />
                1-800-MEDICARE
              </li>
              <li className="flex items-start gap-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                123 Health Street, Medical City, HC 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;