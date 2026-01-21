import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Parollar mos kelmaydi");
      return;
    }

    setLoading(true);

    const success = await signup(email, password, name);
    
    if (success) {
      toast.success("Ro'yxatdan o'tdingiz!");
      navigate('/profile');
    } else {
      toast.error("Bu email allaqachon ro'yxatdan o'tgan");
    }
    
    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-20 min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-6 hero-gradient rounded-xl flex items-center justify-center glow-effect">
                <span className="font-display text-2xl font-bold text-primary-foreground">M</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Ro'yxatdan O'tish
              </h1>
              <p className="text-muted-foreground">
                Yangi hisob yarating va xarid qilishni boshlang
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Ism</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Ismingiz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 h-12 bg-card"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-card"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Parol</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 bg-card"
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Parolni Tasdiqlang</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 h-12 bg-card"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan O'tish"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Hisobingiz bormi?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Kirish
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
