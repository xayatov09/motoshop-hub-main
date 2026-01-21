import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import ProductModal from '@/components/products/ProductModal';
import Layout from '@/components/layout/Layout';

const featuredProducts = products.slice(0, 6);

const features = [
  {
    icon: Zap,
    title: "Yuqori Sifat",
    description: "Dunyodagi eng yaxshi brendlardan mototsikllar"
  },
  {
    icon: Shield,
    title: "1 Yillik Kafolat",
    description: "Barcha mahsulotlar uchun to'liq kafolat"
  },
  {
    icon: Truck,
    title: "Bepul Yetkazish",
    description: "Butun O'zbekiston bo'ylab bepul yetkazib berish"
  },
  {
    icon: Award,
    title: "Original Mahsulot",
    description: "100% original mototsikllar va ehtiyot qismlar"
  }
];

const Index: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                  🏍️ #1 Mototsikl Do'koni O'zbekistonda
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Tezlik va </span>
                  <span className="text-gradient">Quvvat</span>
                  <br />
                  <span className="text-foreground">Bir Joyda</span>
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Dunyodagi eng mashhur brendlardan premium mototsikllarni tanlang. 
                Harley-Davidson, Honda, Yamaha, Ducati va boshqalar.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button variant="hero" size="lg">
                    Mototsikllarni Ko'rish
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Biz Haqimizda
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <span className="font-display text-3xl font-bold text-gradient">500+</span>
                  <p className="text-sm text-muted-foreground">Mototsikllar</p>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-gradient">10K+</span>
                  <p className="text-sm text-muted-foreground">Mijozlar</p>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-gradient">50+</span>
                  <p className="text-sm text-muted-foreground">Brendlar</p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 hero-gradient rounded-3xl blur-3xl opacity-30 animate-pulse-slow" />
              <div className="relative bg-card rounded-3xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={products[5].image}
                  alt="Featured Motorcycle"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                  <h3 className="font-display text-xl font-bold text-foreground">{products[5].name}</h3>
                  <p className="text-primary font-display font-bold text-2xl">${products[5].price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="text-center p-6 rounded-2xl bg-background hover:bg-primary/5 transition-colors duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl hero-gradient flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Top Mototsikllar
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Eng Mashhur <span className="text-gradient">Modellar</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg">
                Barcha Mototsikllarni Ko'rish
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              O'zingizning <span className="text-gradient">Orzu Mototsiklingizni</span> Toping
            </h2>
            <p className="text-lg text-muted-foreground">
              Bizning kollektsiyamizdan o'zingizga mos mototsiklni tanlang. 
              Professional maslahat va eng yaxshi narxlar kafolatlanadi.
            </p>
            <Link to="/products">
              <Button variant="hero" size="lg">
                Hoziroq Tanlash
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Layout>
  );
};

export default Index;
