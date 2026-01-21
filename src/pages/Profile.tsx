import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Package, LogOut, Clock, CheckCircle, Truck, Box } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const statusConfig = {
  pending: { label: 'Kutilmoqda', icon: Clock, className: 'bg-yellow-500/10 text-yellow-500' },
  processing: { label: 'Tayyorlanmoqda', icon: Box, className: 'bg-blue-500/10 text-blue-500' },
  shipped: { label: 'Yo\'lda', icon: Truck, className: 'bg-purple-500/10 text-purple-500' },
  delivered: { label: 'Yetkazildi', icon: CheckCircle, className: 'bg-green-500/10 text-green-500' },
};

const Profile: React.FC = () => {
  const { user, orders, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast.success("Chiqish amalga oshirildi");
    navigate('/');
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 hero-gradient rounded-full flex items-center justify-center glow-effect">
                    <span className="font-display text-3xl font-bold text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">{user.name}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-background rounded-xl">
                    <span className="font-display text-2xl font-bold text-gradient">{orders.length}</span>
                    <p className="text-sm text-muted-foreground">Buyurtmalar</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-xl">
                    <span className="font-display text-2xl font-bold text-gradient">
                      ${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
                    </span>
                    <p className="text-sm text-muted-foreground">Jami xarid</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Chiqish
                </Button>
              </div>
            </div>

            {/* Orders */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Buyurtmalar Tarixi
              </h2>

              {orders.length === 0 ? (
                <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Buyurtmalar Yo'q
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Siz hali hech narsa buyurtma qilmagansiz
                  </p>
                  <Button variant="hero" onClick={() => navigate('/products')}>
                    Xarid Qilish
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const status = statusConfig[order.status];
                    const StatusIcon = status.icon;

                    return (
                      <div
                        key={order.id}
                        className="bg-card rounded-xl border border-border p-6"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Buyurtma #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('uz-UZ', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <Badge className={status.className}>
                            <StatusIcon className="h-4 w-4 mr-1" />
                            {status.label}
                          </Badge>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-foreground">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="text-muted-foreground">
                                ${(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer */}
                        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                          {order.promoCode && (
                            <Badge variant="secondary">
                              {order.promoCode} (-{order.discount}%)
                            </Badge>
                          )}
                          <span className="font-display text-xl font-bold text-gradient ml-auto">
                            ${order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
