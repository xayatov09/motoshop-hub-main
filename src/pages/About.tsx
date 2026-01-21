import React from 'react';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const stats = [
  { icon: Users, value: "10,000+", label: "Mijozlar" },
  { icon: Award, value: "15+", label: "Yillik Tajriba" },
  { icon: Globe, value: "50+", label: "Brendlar" },
  { icon: TrendingUp, value: "99%", label: "Mamnunlik" },
];

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Biz Haqimizda
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            O'zbekistondagi <span className="text-gradient">#1 Mototsikl</span> Do'koni
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            2009 yildan beri dunyodagi eng yaxshi mototsikllarni O'zbekiston bozoriga 
            olib kelmoqdamiz. Sifat va ishonchlilik bizning ustuvorligimiz.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-8 bg-card rounded-2xl border border-border">
                <div className="w-14 h-14 mx-auto mb-4 hero-gradient rounded-xl flex items-center justify-center">
                  <stat.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="font-display text-3xl font-bold text-gradient block mb-1">
                  {stat.value}
                </span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Bizning <span className="text-gradient">Hikoyamiz</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MotoShop 2009 yilda kichik bir ustaxona sifatida boshlangan va bugungi 
                  kunga kelib O'zbekistondagi eng yirik mototsikl dileri bo'lib qoldi.
                </p>
                <p>
                  Biz Harley-Davidson, Honda, Yamaha, Ducati, BMW, Kawasaki va boshqa 
                  ko'plab dunyoga mashhur brendlarning rasmiy dilerimiz.
                </p>
                <p>
                  Har bir mijozimizga individual yondashuv va professional maslahat 
                  beramiz. Bizning jamoamiz mototsikl ishqibozlaridan iborat va har bir 
                  mototsikl haqida batafsil ma'lumot bera olamiz.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 hero-gradient rounded-3xl blur-3xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
                alt="Showroom"
                className="relative rounded-3xl w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
            Bizning <span className="text-gradient">Qadriyatlarimiz</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">🏍️</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">Sifat</h3>
              <p className="text-muted-foreground">
                Faqat original va sifatli mototsikllarni sotamiz. Har bir mahsulot tekshiruvdan o'tadi.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">Ishonch</h3>
              <p className="text-muted-foreground">
                15 yillik tajriba va minglab mamnun mijozlar bizning ishonchliligimiz dalili.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">💪</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">Xizmat</h3>
              <p className="text-muted-foreground">
                Sotuvdan keyin ham to'liq qo'llab-quvvatlash va kafolat xizmati ko'rsatamiz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
