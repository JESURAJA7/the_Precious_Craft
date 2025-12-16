"use client";

import { useEffect, useRef, useState } from "react";
import { IoAdd, IoRemove, IoBagAdd } from "react-icons/io5";
import { useCart } from "react-use-cart";
import { Expand, Heart } from "lucide-react"; // Import Heart for Wishlist if needed
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

      <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-20">
          <Discount product={product} />
        </div>

        {/* Quick Actions (Appear on Hover) */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button
            onClick={() => handleModalOpen(!modalOpen, product._id)}
            className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 p-2 rounded-full shadow-md hover:bg-emerald-500 hover:text-white transition-colors"
            title="Quick View"
          >
            <Expand size={18} />
          </button>
          {/* Wishlist placeholder - if you have wishlist functionality */}
          {/* <button className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors">
              <Heart size={18} />
            </button> */}
        </div>

        {/* Image Section */}
        <div className="relative w-full aspect-[4/5] bg-gray-50 dark:bg-gray-700/50 overflow-hidden">
          <Link href={`/product/${product?.slug}`} className="block w-full h-full">
            <ImageWithFallback
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={product.title ? showingTranslateValue(product.title) : "Product Image"}
              src={product.image?.[0]}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Add to Cart Overlay (Bottom of Image) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-20 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {inCart(product._id) ? (
              <div className="flex items-center justify-between bg-emerald-600 text-white rounded-lg shadow-lg overflow-hidden py-2 px-4 w-full">
                <button onClick={() => updateItemQuantity(items.find(i => i.id === product._id).id, items.find(i => i.id === product._id).quantity - 1)} className="hover:text-emerald-200"><IoRemove size={20} /></button>
                <span className="font-semibold">{items.find(i => i.id === product._id).quantity}</span>
                <button
                  onClick={() => {
                    const item = items.find(i => i.id === product._id);
                    item?.variants?.length > 0 ? handleAddItem(item) : handleIncreaseQuantity(item)
                  }}
                  className="hover:text-emerald-200"><IoAdd size={20} /></button>
              </div>
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium shadow-lg hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <IoBagAdd /> Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {product.categories?.[0]?.name ? showingTranslateValue(product.categories[0].name) : "Jewelry"}
            </span>
          </div>

          <Link href={`/product/${product?.slug}`}>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-2 min-h-[40px]">
              {showingTranslateValue(product?.title)}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
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
            {/* Rating is minimal */}
            <div className="flex items-center">
              <Rating
                size="xs"
                showReviews={false}
                rating={product?.average_rating}
              />
              <span className="text-xs text-gray-400 ml-1">({product?.total_reviews || 0})</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
