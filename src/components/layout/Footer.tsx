import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-lg">M</span>
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-gradient">MOTO</span>
                <span className="text-foreground">SHOP</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dunyodagi eng yaxshi mototsikllarni taqdim etamiz. Sifat va ishonchlilik bizning ustuvorligimiz.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Tezkor Havolalar</h4>
            <div className="space-y-2">
              <Link to="/products" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Mototsikllar
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Biz Haqimizda
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Aloqa
              </Link>
              <Link to="/profile" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Mening Profilim
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Yordam</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Ko'p Beriladigan Savollar
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Yetkazib Berish
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Qaytarish Siyosati
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Kafolat
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Bog'lanish</h4>
            <div className="space-y-3">
              <a href="tel:+998901234567" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone className="h-4 w-4" />
                +998 90 123 45 67
              </a>
              <a href="mailto:info@motoshop.uz" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="h-4 w-4" />
                info@motoshop.uz
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Toshkent sh., Chilonzor t., 1-mavze</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 MotoShop. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Maxfiylik Siyosati
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Foydalanish Shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
