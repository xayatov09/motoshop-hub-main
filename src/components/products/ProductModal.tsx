import React from 'react';
import { X, Star, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose }) => {
  const { addToCart, items, updateQuantity } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  const cartItem = product ? items.find(item => item.product.id === product.id) : null;

  React.useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity}x ${product.name} savatga qo'shildi!`);
    onClose();
  };

  const features = [
    "1 yillik kafolat",
    "Bepul yetkazib berish",
    "30 kunlik qaytarish",
    "Original ehtiyot qismlar"
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4 hero-gradient border-0 uppercase text-sm font-bold">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader className="text-left space-y-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({product.rating} baho)</span>
              </div>

              <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.color && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Mavjud ranglar:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.color.map((color, idx) => (
                    <Badge key={idx} variant="secondary" className="px-3 py-1">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mt-6 space-y-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="font-display text-4xl font-bold text-gradient">
                ${product.price.toLocaleString()}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-auto pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Miqdor:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-display font-bold text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Savatga Qo'shish - ${(product.price * quantity).toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
