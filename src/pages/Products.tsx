import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import ProductModal from '@/components/products/ProductModal';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

const priceRanges = [
  { label: "Barchasi", min: 0, max: Infinity },
  { label: "$0 - $10,000", min: 0, max: 10000 },
  { label: "$10,000 - $20,000", min: 10000, max: 20000 },
  { label: "$20,000 - $30,000", min: 20000, max: 30000 },
  { label: "$30,000+", min: 30000, max: Infinity },
];

const sortOptions = [
  { value: "default", label: "Standart" },
  { value: "price-asc", label: "Narx: Arzondan" },
  { value: "price-desc", label: "Narx: Qimmatdan" },
  { value: "rating", label: "Reyting bo'yicha" },
  { value: "name", label: "Nom bo'yicha" },
];

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Price filter
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, sortBy, priceRange, minRating]);

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    setPriceRange([0, 100000]);
    setMinRating(0);
  };

  const hasActiveFilters = searchQuery || sortBy !== 'default' || priceRange[0] > 0 || priceRange[1] < 100000 || minRating > 0;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Barcha <span className="text-gradient">Mototsikllar</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dunyoning eng yaxshi brendlaridan {products.length}+ mototsikllarni ko'ring
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Mototsikl qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px] h-12 bg-card border-border">
                <SelectValue placeholder="Saralash" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 md:hidden">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filterlar
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="font-display">Filterlar</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-8">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-foreground mb-4">Narx Oralig'i</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={(v) => setPriceRange(v as [number, number])}
                      max={100000}
                      step={1000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Min Rating */}
                  <div>
                    <h4 className="font-medium text-foreground mb-4">Minimal Reyting</h4>
                    <div className="flex gap-2">
                      {[0, 3, 4, 4.5].map(rating => (
                        <Button
                          key={rating}
                          variant={minRating === rating ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setMinRating(rating)}
                        >
                          {rating === 0 ? 'Barchasi' : `${rating}+`}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <Button variant="outline" className="w-full" onClick={clearFilters}>
                      Filterlarni Tozalash
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex gap-4 mb-8 flex-wrap">
            {/* Price Range Buttons */}
            <div className="flex gap-2 flex-wrap">
              {priceRanges.map((range, idx) => (
                <Button
                  key={idx}
                  variant={
                    priceRange[0] === range.min && priceRange[1] === range.max
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => setPriceRange([range.min, range.max === Infinity ? 100000 : range.max])}
                >
                  {range.label}
                </Button>
              ))}
            </div>

            {/* Rating Filter */}
            <div className="flex gap-2">
              {[0, 4, 4.5].map(rating => (
                <Button
                  key={rating}
                  variant={minRating === rating ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMinRating(rating)}
                >
                  {rating === 0 ? 'Barcha Reytinglar' : `⭐ ${rating}+`}
                </Button>
              ))}
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Tozalash
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts.length}</span> ta mototsikl topildi
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Hech narsa topilmadi
              </h3>
              <p className="text-muted-foreground mb-6">
                Qidiruv so'zingizni o'zgartiring yoki filterlarni tozalang
              </p>
              <Button onClick={clearFilters}>
                Filterlarni Tozalash
              </Button>
            </div>
          )}
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

export default Products;
