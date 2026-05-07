import { useState } from "react";
import DashboardLayout from "../components/Layout";
import {  Menu} from "lucide-react";
import { useCart } from "../context/CartContext";
const mockCartItems = [
  {
    _id: "1",
    product: {
      _id: "p1",
      name: "Wireless Noise-Cancelling Headphones",
      description: "Premium audio experience with 30hr battery life",
      price: "149.99",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      stock: 12,
    },
    quantity: 1,
  },
  {
    _id: "2",
    product: {
      _id: "p2",
      name: "Mechanical Keyboard TKL",
      description: "Tactile switches with RGB backlight and aluminum frame",
      price: "89.99",
      category: "Peripherals",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
      stock: 5,
    },
    quantity: 2,
  },
  {
    _id: "3",
    product: {
      _id: "p3",
      name: "Ergonomic Mouse Pro",
      description: "Vertical design for reduced wrist strain",
      price: "59.99",
      category: "Peripherals",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      stock: 8,
    },
    quantity: 1,
  },
  {
    _id: "4",
    product: {
      _id: "p4",
      name: "Wireless Noise-Cancelling Headphones",
      description: "Premium audio experience with 30hr battery life",
      price: "149.99",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      stock: 12,
    },
    quantity: 1,
  },
  {
    _id: "5",
    product: {
      _id: "p5",
      name: "Wireless Noise-Cancelling Headphones",
      description: "Premium audio experience with 30hr battery life",
      price: "149.99",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      stock: 12,
    },
    quantity: 1,
  }
];
 
const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;
 
export default function CartPage() {
  
  // const [cartItems, setCartItems] = useState(mockCartItems);
  const { cartItems, removeItem, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
 
  // const updateQuantity = (itemId, delta) => {
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item._id === itemId
  //         ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, item.quantity + delta)) }
  //         : item
  //     )
  //   );
  // };
 const handleRemove = (itemId) => {
    setRemovingId(itemId);
    setTimeout(() => {
      removeItem(itemId);
      setRemovingId(null);
    }, 350);
  };

  // const removeItem = (itemId) => {
  //   setRemovingId(itemId);
  //   setTimeout(() => {
  //     setCartItems((prev) => prev.filter((i) => i._id !== itemId));
  //     setRemovingId(null);
  //   }, 350);
  // };
 
  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") setPromoApplied(true);
  };
 
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;
  const shipping = discountedSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + shipping + tax;
  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - discountedSubtotal);
 
  const handleCheckout = () => {
    setCheckoutLoading(true);
    setTimeout(() => setCheckoutLoading(false), 2000);
  };
   const [open, setOpen] = useState(false);
  return (
    <>
    <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4 sticky top-0 z-30">
          <button className="lg:hidden" onClick={() => setOpen(true)}><Menu className="w-5 h-5" /></button>
          <div className="flex-1" />
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">JD</div>
        </header>
      
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-10 px-4">
        
      <div className="max-w-6xl mx-auto mb-4">
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Cart
          <span className="ml-3 text-base font-medium px-2.5 py-0.5 rounded-full bg-[hsl(var(--primary))] text-white align-middle">
            {cartItems.length}
          </span>
        </h1>
      </div>
 
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-3">
            {freeShippingRemaining > 0 && (
              <div className="rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-5 py-4 shadow-[var(--shadow-soft)]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">
                    Add{" "}
                    <span className="font-semibold text-[hsl(var(--foreground))]">
                      ${freeShippingRemaining.toFixed(2)}
                    </span>{" "}
                    more for free shipping
                  </span>
                  <span className="text-xs text-[hsl(var(--accent))] font-medium">
                    🚚 Free at ${SHIPPING_THRESHOLD}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (discountedSubtotal / SHIPPING_THRESHOLD) * 100)}%`,
                      background: "var(--gradient-accent)",
                    }}
                  />
                </div>
              </div>
            )}
            {shipping === 0 && (
              <div className="rounded-2xl bg-[hsl(152,60%,45%,0.1)] border border-[hsl(152,60%,45%,0.3)] px-5 py-3 flex items-center gap-2">
                <span className="text-sm font-medium text-[hsl(var(--success))]">
                  You've unlocked free shipping!
                </span>
              </div>
            )}
 
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                removing={removingId === item._id}
                onQuantityChange={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
 
          <div className="space-y-4">
            <div className="rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-6 shadow-[var(--shadow-card)] sticky top-6">
              <h2
                className="text-lg font-semibold mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Order Summary
              </h2>
 
              <div className="mb-5">
                <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-medium block mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. SAVE10"
                    disabled={promoApplied}
                    className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] disabled:opacity-50 disabled:cursor-not-allowed transition"
                  />
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied || !promoCode.trim()}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {promoApplied ? "✓" : "Apply"}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-[hsl(var(--success))] mt-1.5 font-medium">
                    ✓ 10% discount applied
                  </p>
                )}
              </div>
 
              <div className="space-y-3 border-t border-[hsl(var(--border))] pt-4">
                <PriceLine label="Subtotal" value={subtotal} />
                {promoApplied && (
                  <PriceLine label="Discount (10%)" value={-discount} accent />
                )}
                <PriceLine
                  label="Shipping"
                  value={shipping}
                  note={shipping === 0 ? "Free" : null}
                />
                <PriceLine label={`Tax (${(TAX_RATE * 100).toFixed(0)}%)`} value={tax} muted />
              </div>
 
              <div className="border-t border-[hsl(var(--border))] mt-4 pt-4 flex justify-between items-center">
                <span
                  className="text-base font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Total
                </span>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
 
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="mt-5 w-full py-3.5 rounded-xl font-semibold text-white text-sm tracking-wide transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-elevated)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: "var(--gradient-primary)" }}
              >
                {checkoutLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing…
                  </span>
                ) : (
                  "Proceed to Checkout →"
                )}
              </button>
 
              <button className="mt-2.5 w-full py-3 rounded-xl font-medium text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
                ← Continue Shopping
              </button>
 
              <div className="mt-5 pt-4 border-t border-[hsl(var(--border))] flex justify-around">
                {[
                  { icon: "🔒", label: "Secure" },
                  { icon: "↩️", label: "30-day Returns" },
                  { icon: "💳", label: "All Cards" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="text-lg">{icon}</span>
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-medium">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
}
 
function CartItem({ item, removing, onQuantityChange, onRemove }) {
  const { product, quantity } = item;
  const lineTotal = (parseFloat(product.price) * quantity).toFixed(2);
 
  return (
    <div
      className={`rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-4 shadow-[var(--shadow-soft)] transition-all duration-350 ${
        removing ? "opacity-0 scale-95 -translate-x-4" : "opacity-100 scale-100 translate-x-0"
      }`}
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[hsl(var(--muted))]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
 
        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[hsl(var(--primary))] block mb-0.5">
                {product.category}
              </span>
              <h3
                className="font-semibold text-sm leading-snug truncate"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {product.name}
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 line-clamp-1">
                {product.description}
              </p>
            </div>
            <button
              onClick={() => onRemove(item._id)}
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))] transition-colors p-1 flex-shrink-0 rounded-lg hover:bg-[hsl(var(--muted))]"
              aria-label="Remove item"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
 
          <div className="flex items-center justify-between mt-3">
            {/* Quantity */}
            <div className="flex items-center gap-1 bg-[hsl(var(--muted))] rounded-xl p-0.5">
              <button
                onClick={() => onQuantityChange(item._id, -1)}
                disabled={quantity <= 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" strokeLinecap="round" />
                </svg>
              </button>
              <span className="w-7 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => onQuantityChange(item._id, 1)}
                disabled={quantity >= product.stock}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card))] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </button>
            </div>
 
            <div className="text-right">
              <span
                className="text-base font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ${lineTotal}
              </span>
              {quantity > 1 && (
                <span className="block text-[10px] text-[hsl(var(--muted-foreground))]">
                  ${parseFloat(product.price).toFixed(2)} each
                </span>
              )}
            </div>
          </div>
 
          {quantity >= product.stock && (
            <p className="text-[10px] text-[hsl(var(--warning))] font-medium mt-1.5">
              ⚠ Max stock reached ({product.stock} available)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
 
function PriceLine({ label, value, accent, muted, note }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span
        className={
          muted
            ? "text-[hsl(var(--muted-foreground))]"
            : "text-[hsl(var(--foreground))]"
        }
      >
        {label}
      </span>
      <span
        className={
          accent
            ? "text-[hsl(var(--success))] font-semibold"
            : muted
            ? "text-[hsl(var(--muted-foreground))]"
            : "font-medium"
        }
      >
        {note ? (
          <span className="text-[hsl(var(--success))] font-medium">{note}</span>
        ) : (
          `${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`
        )}
      </span>
    </div>
  );
}
 
function EmptyCart() {
  return (
    <div className="max-w-md mx-auto text-center py-24">
      <div
        className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl"
        style={{ background: "var(--gradient-primary)" }}
      >
        🛒
      </div>
      <h2
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Your cart is empty
      </h2>
      <p className="text-[hsl(var(--muted-foreground))] mb-8 text-sm">
        Looks like you haven't added anything yet. Browse our catalog to get started.
      </p>
      <button
        className="px-8 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:shadow-[var(--shadow-elevated)]"
        style={{ background: "var(--gradient-primary)" }}
      >
        Browse Products →
      </button>
    </div>
  );
}