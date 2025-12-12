import React from "react";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";

//internal import

import Card from "@components/order-card/Card";
import RecentOrder from "@components/order/RecentOrder";
import { showingTranslateValue } from "@lib/translate";
import { getOrderCustomer } from "@services/OrderServices";

import { getStoreCustomizationSetting, getGlobalSetting } from "@services/SettingServices";

const Dashboard = async ({ searchParams }) => {
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const { globalSetting } = await getGlobalSetting();

  // Determine what to show: Slider > Cover > Legacy Banner
  const sliderImages = globalSetting?.banner_slider || [];
  const coverImage = globalSetting?.banner_cover || globalSetting?.banner;

  const { page } = await searchParams;

  const dashboard = storeCustomizationSetting?.dashboard;

  // console.log("searchParams", page);

  const { data, error } = await getOrderCustomer({
    page: Number(page || 1),
    limit: 10,
  });

  // console.log("dashboard data:", dashboard);
  // console.log("dashboard error:", error);

  // console.log("searchParams", searchParams, "page", page, "query", query);

  return (
    <>
      <div className="overflow-hidden border-0">
        <h2 className="text-xl font-semibold mb-5">
          {showingTranslateValue(dashboard?.dashboard_title)}
        </h2>

        {/* Banner Logic: Slider or Single Image */}
        {/* <div className="mb-8 w-full relative rounded-lg overflow-hidden">
          {sliderImages.length > 0 ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {sliderImages.map((img, idx) => (
                <div key={idx} className="w-full flex-shrink-0 snap-center relative h-[200px] md:h-[300px]">
                  <Image
                    src={img}
                    alt={`Banner ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : coverImage ? (
            <div className="relative h-[200px] md:h-[300px] w-full">
              <Image
                src={coverImage}
                alt="Dashboard Banner"
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </div> */}

        <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <Card
            title={showingTranslateValue(dashboard?.total_order)}
            Icon={FiShoppingCart}
            quantity={data?.totalDoc}
            className="text-red-600  bg-red-200"
          />
          <Card
            title={showingTranslateValue(dashboard?.pending_order)}
            Icon={FiRefreshCw}
            quantity={data?.pending}
            className="text-orange-600 bg-orange-200"
          />
          <Card
            title={showingTranslateValue(dashboard?.processing_order)}
            Icon={FiTruck}
            quantity={data?.processing}
            className="text-indigo-600 bg-indigo-200"
          />
          <Card
            title={showingTranslateValue(dashboard?.complete_order)}
            Icon={FiCheck}
            quantity={data?.delivered}
            className="text-purple-600 bg-purple-200"
          />
        </div>
        <RecentOrder
          data={data}
          error={error}
          title={dashboard?.recent_order}
        />
      </div>
    </>
  );
};

export default Dashboard;
