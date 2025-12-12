"use client";

import { BellIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { ShoppingBag, Heart } from "lucide-react";

// Internal imports
import CartDrawer from "@components/drawer/CartDrawer";

const NotifyIcon = ({ currency }) => {
  const { totalItems } = useCart();
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  let [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <CartDrawer
        currency={currency}
        open={openCartDrawer}
        setOpen={setOpenCartDrawer}
      />
      <div className="flex items-center justify-center space-x-4">
        <button
          type="button"
          aria-label={isHydrated ? `Cart with ${totalItems} items` : "Cart"}
          onClick={() => setOpenCartDrawer(!openCartDrawer)}
          className="flex flex-col items-center justify-center relative flex-shrink-0 rounded-full text-black p-1 hover:text-purple-900 focus:outline-none"
        >
          {isHydrated && totalItems > 0 && (
            <span className="absolute z-10 top-0 -right-2 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
              {totalItems}
            </span>
          )}
          <ShoppingBag className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs mt-1 text-center">Cart</span>
        </button>
        <button
          type="button"
          aria-label="Notification"
          className="flex flex-col items-center justify-center relative flex-shrink-0 rounded-full text-black p-1 hover:text-purple-900 focus:outline-none"
        >
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1 text-center">Notification</span>
        </button>
        <button
          type="button"
          aria-label="Wishlist"
          className="flex flex-col items-center justify-center relative flex-shrink-0 rounded-full text-black p-1 hover:text-purple-900 focus:outline-none"
        >
          <Heart className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs mt-1 text-center">Wishlist</span>
        </button>
      </div>
      <span className="mx-4 h-6 w-px bg-gray-700 lg:mx-6" aria-hidden="true" />
    </>
  );
};

export default NotifyIcon;
