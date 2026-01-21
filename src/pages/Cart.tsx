import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight, X, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, promoCode, discount, applyPromoCode, removePromoCode, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discount / 100;

  const handleApplyPromo = () => {
    setPromoError('');
    if (!promoInput.trim()) {
      setPromoError("Promokodni kiriting");
      return;
    }
    const success = applyPromoCode(promoInput);
    if (success) {
      toast.success(`Promokod qo'llanildi! ${discount}% chegirma`);
      setPromoInput('');
    } else {
      setPromoError("Noto'g'ri promokod");
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Buyurtma berish uchun tizimga kiring");
      navigate('/login');
      return;
    }

    addOrder({
      items: items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: totalPrice,
      promoCode: promoCode || undefined,
      discount: discount || undefined,
    });

    clearCart();
    toast.success("Buyurtmangiz qabul qilindi!");
    navigate('/profile');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                Savatingiz Bo'sh
              </h1>
              <p className="text-muted-foreground mb-8">
                Siz hali hech narsa tanlamadingiz. Mototsikllarni ko'rib chiqing!
              </p>
              <Link to="/products">
                <Button variant="hero" size="lg">
                  Mototsikllarni Ko'rish
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">
            Savatcha <span className="text-gradient">({items.length})</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                      {product.description}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <span className="font-display font-bold text-lg text-gradient">
                      ${(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Buyurtma Xulosasi
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Promokod
                  </label>
                  {promoCode ? (
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{promoCode}</span>
                        <span className="text-sm text-muted-foreground">(-{discount}%)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={removePromoCode}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Promokod kiriting"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="bg-background"
                        />
                        <Button onClick={handleApplyPromo}>
                          <Tag className="h-4 w-4" />
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-sm text-destructive">{promoError}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Maslahat: MOTO10, SPEED20, RIDER15, NEWBIKE
                      </p>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Jami</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Chegirma ({discount}%)</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Yetkazib berish</span>
                    <span className="text-primary">Bepul</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between">
                    <span className="font-semibold text-foreground">Umumiy</span>
                    <span className="font-display text-2xl font-bold text-gradient">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={handleCheckout}>
                  Buyurtma Berish
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <Link to="/products" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    Xarid Qilishni Davom Ettirish
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
