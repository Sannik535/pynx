"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCart } from "@/app/context/CartContext";

type ProductImage = {
  id: string;
  url: string;
  alt: string | null;
  position: number;
};

type ProductVariant = {
  id: string;
  color: string | null;
  size: string | null;
  stock: number;
  images: ProductImage[];
};

type ProductDetail = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  rating: number | null;
  stock: number;
  color: string | null;
  createdAt: Date;
  images: ProductImage[];
  variants: ProductVariant[];
  category: { name: string; slug: string };
};

// best-effort mapping so common color names render as an actual swatch;
// anything not listed just falls back to a neutral dot + its text label
const COLOR_SWATCH_MAP: Record<string, string> = {
  black: "#171717",
  white: "#f5f5f5",
  obsidian: "#1c1c1e",
  "obsidian black": "#1c1c1e",
  silver: "#c0c0c0",
  gray: "#8a8a8a",
  grey: "#8a8a8a",
  blue: "#3b5bdb",
  navy: "#1e2a52",
  red: "#c0392b",
  green: "#2f7d4f",
  gold: "#c9a227",
  rose: "#b76e79",
  "rose gold": "#b76e79",
};

function swatchColor(name: string) {
  return COLOR_SWATCH_MAP[name.trim().toLowerCase()] ?? "#d4d4d4";
}

function isNewProduct(createdAt: Date) {
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
  return Date.now() - createdAt.getTime() < fourteenDaysMs;
}

export function ProductDetailClient({ product }: { product: ProductDetail }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const hasVariants = product.variants.length > 0;

  const colors = useMemo(() => {
    const set = new Set<string>();
    product.variants.forEach((v) => v.color && set.add(v.color));
    return Array.from(set);
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors[0] ?? null
  );

  const sizesForColor = useMemo(() => {
    const set = new Set<string>();
    product.variants
      .filter((v) => !selectedColor || v.color === selectedColor)
      .forEach((v) => v.size && set.add(v.size));
    return Array.from(set);
  }, [product.variants, selectedColor]);

  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizesForColor[0] ?? null
  );

  const selectedVariant = useMemo(() => {
    if (!hasVariants) return null;
    return (
      product.variants.find(
        (v) =>
          (v.color ?? null) === selectedColor && (v.size ?? null) === selectedSize
      ) ?? null
    );
  }, [product.variants, selectedColor, selectedSize, hasVariants]);

  const galleryImages =
    selectedVariant && selectedVariant.images.length > 0
      ? selectedVariant.images
      : product.images;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0];

  const [quantity, setQuantity] = useState(1);

  const availableStock = hasVariants
    ? selectedVariant?.stock ?? 0
    : product.stock;

  const canAddToCart = hasVariants ? Boolean(selectedVariant) : true;
  const inStock = availableStock > 0;

  function handleColorSelect(color: string) {
    setSelectedColor(color);
    setActiveImageIndex(0);
    const nextSizes = new Set<string>();
    product.variants
      .filter((v) => v.color === color)
      .forEach((v) => v.size && nextSizes.add(v.size));
    const nextSizeList = Array.from(nextSizes);
    setSelectedSize(nextSizeList[0] ?? null);
  }

  function buildCartItem() {
    return {
      id: selectedVariant?.id ?? product.id,
      name: product.name,
      color: selectedColor ?? product.color ?? "",
      size: selectedSize ?? undefined,
      image: activeImage?.url,
      price: product.price,
      quantity,
    };
  }

  function handleAddToCart() {
    if (!canAddToCart || !inStock) return;
    addToCart(buildCartItem());
  }

  function handleBuyNow() {
    if (!canAddToCart || !inStock) return;
    addToCart(buildCartItem());
    router.push("/cart");
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[100px_1fr_1fr]">
      {/* thumbnails */}
      <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveImageIndex(index)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border transition ${
              index === activeImageIndex
                ? "border-foreground"
                : "border-foreground/15 hover:border-foreground/40"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt ?? product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* main image */}
      <div className="relative order-1 aspect-square w-full overflow-hidden rounded-xl bg-foreground/5 lg:order-2">
        {isNewProduct(product.createdAt) && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
            NEW ARRIVAL
          </span>
        )}
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={activeImage.alt ?? product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 500px, 90vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-foreground/40">
            No image
          </div>
        )}
      </div>

      {/* details */}
      <div className="order-3">
        <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <StarRating rating={product.rating ?? 0} />
          <span className="text-foreground/60">
            {(product.rating ?? 0).toFixed(1)}
          </span>
        </div>

        <p className="mt-4 text-2xl font-bold text-foreground">
          ${product.price.toFixed(2)}
        </p>

        <p
          className={`mt-1 text-sm font-medium ${
            inStock ? "text-green-600" : "text-red-600"
          }`}
        >
          {inStock ? "IN STOCK — READY TO SHIP" : "OUT OF STOCK"}
        </p>

        {product.description && (
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            {product.description}
          </p>
        )}

        {colors.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-wide text-foreground/70">
                COLOR
              </p>
              {selectedColor && (
                <p className="text-xs text-foreground/50">{selectedColor}</p>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={color}
                  onClick={() => handleColorSelect(color)}
                  className={`h-9 w-9 rounded-full border-2 transition ${
                    selectedColor === color
                      ? "border-foreground"
                      : "border-transparent ring-1 ring-foreground/15"
                  }`}
                  style={{ backgroundColor: swatchColor(color) }}
                />
              ))}
            </div>
          </div>
        )}

        {sizesForColor.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold tracking-wide text-foreground/70">
              SIZE
            </p>
            <div className="mt-2 flex gap-2">
              {sizesForColor.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/20 text-foreground/80 hover:border-foreground/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-foreground/20">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-foreground/70 hover:text-foreground"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                setQuantity((q) => Math.min(availableStock || 1, q + 1))
              }
              className="flex h-11 w-11 items-center justify-center text-foreground/70 hover:text-foreground"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            disabled={!canAddToCart || !inStock}
            onClick={handleAddToCart}
            className="flex-1 rounded-lg bg-foreground py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ADD TO CART
          </button>
        </div>

        <button
          type="button"
          disabled={!canAddToCart || !inStock}
          onClick={handleBuyNow}
          className="mt-3 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5 text-foreground">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}