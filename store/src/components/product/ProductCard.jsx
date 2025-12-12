"use client";

import { useEffect, useRef, useState } from "react";
import {
  IoAdd,
  IoRemove,
  IoExpand,
  IoBagAdd,
} from "react-icons/io5";
import { useCart } from "react-use-cart";
import { Expand } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

//internal import
import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import { notifyError } from "@utils/toast";
import Rating from "@components/common/Rating";
import useAddToCart from "@hooks/useAddToCart";
import { useSetting } from "@context/SettingContext";
import Discount from "@components/common/Discount";
import { handleLogEvent } from "src/lib/analytics";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@components/modal/ProductModal";
import ImageWithFallback from "@components/common/ImageWithFallBack";

const ProductCard = ({ product, attributes }) => {
  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { globalSetting } = useSetting();

  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { showingTranslateValue } = useUtilsFunction();

  const currency = globalSetting?.default_currency || "$";

  // console.log('attributes in product cart',attributes)

  const handleAddItem = (p) => {
    if (p.stock < 1) return notifyError("Insufficient stock!");

    if (p?.variants?.length > 0) {
      setModalOpen(!modalOpen);
      return;
    }
    const { slug, variants, categories, description, ...updatedProduct } =
      product;
    const newItem = {
      ...updatedProduct,
      title: showingTranslateValue(p?.title),
      id: p._id,
      variant: p.prices,
      price: p.prices.price,
      originalPrice: product.prices?.originalPrice,
    };
    addItem(newItem);
  };

  const handleModalOpen = (event, id) => {
    setModalOpen(event);
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setModalOpen]);

  // console.log("product", product);

  return (
    <>
      {modalOpen && (
        <ProductModal
          product={product}
          modalOpen={modalOpen}
          attributes={attributes}
          globalSetting={globalSetting}
          setModalOpen={setModalOpen}
        />
      )}

      <div className="
  group relative flex flex-col overflow-hidden 
  bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900
  rounded-lg shadow-2xl
  transition-all duration-500 ease-out 
  hover:shadow-[0_20px_60px_rgba(168,85,247,0.4)]
  hover:-translate-y-2
  border border-gold/30
  hover:border-gold/60
">
        {/* Velvet texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] pointer-events-none" />

        {/* Spotlight effect */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Section - Discount Badge */}
        <div className="w-full flex justify-between p-3 relative z-10">
          <Discount product={product} />
        </div>

        {/* Image Section with Spotlight */}
        <div className="relative w-full min-h-64 lg:h-72 overflow-hidden bg-gradient-to-b from-slate-800/50 to-transparent">
          <Link
            href={`/product/${product?.slug}`}
            className="block w-full h-full"
          >
            {/* Soft spotlight on image */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_60%)] pointer-events-none z-10" />

            <ImageWithFallback
              fill
              sizes="100%"
              alt="product"
              src={product.image?.[0]}
              className="transition-all duration-700 group-hover:scale-110 object-contain p-6"
            />
          </Link>

          {/* Quick View Button */}
          <div className="absolute bottom-4 inset-x-4 
      opacity-0 lg:invisible 
      group-hover:opacity-100 group-hover:visible 
      transition-all duration-300 flex justify-center z-20">
            <button
              aria-label="quick view"
              onClick={() => handleModalOpen(!modalOpen, product._id)}
              className="
          inline-flex items-center rounded-full py-2.5 px-5 
          bg-gradient-to-r from-amber-600 to-yellow-600
          text-white text-sm font-medium
          shadow-lg shadow-amber-900/50
          hover:from-amber-500 hover:to-yellow-500
          transition-all duration-300
          border border-amber-400/50
        "
            >
              <IoExpand className="mr-1.5" />
              <span className="hidden xl:block lg:block">Quick View</span>
            </button>
          </div>

          {/* Add to Cart Floating Button */}
          <div className="
      absolute top-4 right-4 z-20 flex items-center justify-center 
      rounded-full 
      transition-all duration-300 ease-in-out 
    ">
            {inCart(product._id) ? (
              <div>
                {items.map(
                  (item) =>
                    item.id === product._id && (
                      <div
                        key={item.id}
                        className="
                    flex flex-col w-12 h-24 items-center p-1.5 
                    justify-between 
                    bg-gradient-to-b from-amber-600 to-yellow-700
                    text-white 
                    rounded-full 
                    shadow-lg shadow-amber-900/50
                    border border-amber-400/50
                  "
                      >
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        >
                          <span className="text-lg"><IoRemove /></span>
                        </button>

                        <p className="text-sm font-bold">{item.quantity}</p>

                        <button
                          onClick={() =>
                            item?.variants?.length > 0
                              ? handleAddItem(item)
                              : handleIncreaseQuantity(item)
                          }
                        >
                          <span className="text-lg"><IoAdd /></span>
                        </button>
                      </div>
                    )
                )}
              </div>
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                className="
            w-12 h-12 flex items-center justify-center rounded-full 
            bg-gradient-to-br from-amber-600 to-yellow-700
            text-white 
            shadow-lg shadow-amber-900/50
            hover:from-amber-500 hover:to-yellow-600
            transition-all duration-300
            border border-amber-400/50
          "
              >
                <IoBagAdd className="text-xl" />
              </button>
            )}
          </div>
        </div>

        {/* Product Info with Gold Typography */}
        <div className="flex flex-col space-y-3 px-5 pt-4 pb-5 relative z-10 bg-gradient-to-b from-transparent to-slate-900/50">
          <Link
            href={`/product/${product?.slug}`}
            className="text-sm font-serif font-medium text-amber-100
        line-clamp-2 transition-colors hover:text-amber-300 min-h-[2.5rem]"
          >
            {showingTranslateValue(product?.title)}
          </Link>

          <Rating
            size="sm"
            showReviews={true}
            rating={product?.average_rating}
            totalReviews={product?.total_reviews}
          />

          <div className="flex items-baseline gap-2">
            <Price
              card
              product={product}
              currency={currency}
              price={
                product?.isCombination
                  ? product?.variants[0]?.price
                  : product?.prices?.price
              }
              originalPrice={
                product?.isCombination
                  ? product?.variants[0]?.originalPrice
                  : product?.prices?.originalPrice
              }
            />
          </div>

          {/* Thin gold bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>
      </div>

    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
