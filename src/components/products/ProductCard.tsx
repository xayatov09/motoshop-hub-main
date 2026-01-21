import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} savatga qo'shildi!`);
  };

  return (
    <div 
      className="group bg-card rounded-2xl overflow-hidden border border-border hover-lift cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.badge && (
          <Badge className="absolute top-4 left-4 hero-gradient border-0 uppercase text-xs font-bold">
            {product.badge}
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <Button 
            variant="glass" 
            size="sm" 
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Qo'shish
          </Button>
          <Button 
            variant="glass" 
            size="icon"
            className="shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-primary text-primary'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
        </div>

        {/* Name */}
        <h3 className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-2xl font-bold text-gradient">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
