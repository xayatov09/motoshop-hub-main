import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+998 90 123 45 67",
    link: "tel:+998901234567"
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@motoshop.uz",
    link: "mailto:info@motoshop.uz"
  },
  {
    icon: MapPin,
    title: "Manzil",
    value: "Toshkent sh., Chilonzor t., 1-mavze",
    link: "#"
  },
  {
    icon: Clock,
    title: "Ish Vaqti",
    value: "Dush-Shan: 09:00 - 20:00",
    link: "#"
  }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Xabaringiz yuborildi! Tez orada bog'lanamiz.");
    setFormData({ name: '', email: '', phone: '', message: '' });
    setLoading(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Aloqa
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Biz Bilan <span className="text-gradient">Bog'laning</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Savollaringiz bormi? Biz har doim yordam berishga tayyormiz!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Aloqa Ma'lumotlari
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 mb-4 hero-gradient rounded-lg flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="aspect-video bg-card rounded-xl border border-border overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.50264869998!2d69.11455935!3d41.28252295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Xabar Yuboring
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Ismingiz</label>
                    <Input
                      placeholder="Ismingizni kiriting"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 bg-card"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Telefon</label>
                    <Input
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 bg-card"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 bg-card"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Xabar</label>
                  <Textarea
                    placeholder="Xabaringizni yozing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[150px] bg-card"
                    required
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? 'Yuborilmoqda...' : 'Xabar Yuborish'}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
