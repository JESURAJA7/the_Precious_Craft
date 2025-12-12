// import { Suspense } from "react";

// import Link from "next/link";

// //internal import
// import Banner from "@components/banner/Banner";
// import CardTwo from "@components/cta-card/CardTwo";
// import OfferCard from "@components/offer/OfferCard";
// import StickyCart from "@components/cart/StickyCart";
// import ProductCard from "@components/product/ProductCard";
// import MainCarousel from "@components/carousel/MainCarousel";
// import CMSkeletonTwo from "@components/preloader/CMSkeleton";
// import FeatureCategory from "@components/category/FeatureCategory";
// import { getShowingStoreProducts } from "@services/ProductServices";
// import { getShowingAttributes } from "@services/AttributeServices";
// import {
//   getGlobalSetting,
//   getStoreCustomizationSetting,
// } from "@services/SettingServices";
// import DiscountedCard from "@components/product/DiscountedCard";

// const Home = async () => {
//   const { attributes } = await getShowingAttributes();
//   const { storeCustomizationSetting, error: storeCustomizationError } =
//     await getStoreCustomizationSetting();
//   const { popularProducts, discountedProducts, error } =
//     await getShowingStoreProducts({
//       category: "",
//       title: "",
//     });

//   const { globalSetting } = await getGlobalSetting();
//   const currency = globalSetting?.default_currency || "$";

//   // console.log("storeCustomizationSetting", storeCustomizationSetting);

//   return (
//     <div className="min-h-screen dark:bg-zinc-900">
//       {/* sticky cart section */}
//       <StickyCart currency={currency} />

//       <div className="bg-white dark:bg-zinc-900">
//         <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
//           <div className="flex w-full">
//             {/* Home page main carousel */}
//             <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-full">
//               <Suspense fallback={<p>Loading carousel...</p>}>
//                 <MainCarousel />
//               </Suspense>
//             </div>
//             {/* Coupon Offer Card */}
//             {/* <div className="w-full hidden lg:flex ">
//               <Suspense fallback={<p>Loading coupons...</p>}>
//                 <OfferCard />
//               </Suspense>
//             </div> */}
//           </div>

//           {/* Banner */}
//           {/* <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 dark:bg-slate-600">
//             <Banner storeCustomizationSetting={storeCustomizationSetting} />
//           </div> */}
//         </div>
//       </div>

//       {/* feature category's */}
//       {storeCustomizationSetting?.home?.featured_status && (
//         <div className="bg-gray-100 dark:bg-zinc-800 lg:py-16 py-10">
//           <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
//             <div className="mb-10 flex justify-center">
//               <div className="text-center w-full lg:w-2/5">
//                 <h2 className="text-xl lg:text-2xl mb-2 font-semibold">
//                   <CMSkeletonTwo
//                     count={1}
//                     height={30}
//                     loading={false}
//                     error={storeCustomizationError}
//                     data={storeCustomizationSetting?.home?.feature_title}
//                   />
//                 </h2>
//                 <p className="text-base text-gray-600 dark:text-gray-400 leading-6">
//                   <CMSkeletonTwo
//                     count={4}
//                     height={10}
//                     loading={false}
//                     error={storeCustomizationError}
//                     data={storeCustomizationSetting?.home?.feature_description}
//                   />
//                 </p>
//               </div>
//             </div>

//             <Suspense fallback={<p>Loading feature category...</p>}>
//               <FeatureCategory />
//             </Suspense>
//           </div>
//         </div>
//       )}

//       {/* popular products */}
//       {storeCustomizationSetting?.home?.popular_products_status && (
//         <div className="bg-gray-50 dark:bg-zinc-900 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
//           <div className="mb-10 flex justify-center">
//             <div className="text-center w-full lg:w-2/5">
//               <h2 className="text-xl lg:text-2xl mb-2  font-semibold">
//                 <CMSkeletonTwo
//                   count={1}
//                   height={30}
//                   loading={false}
//                   error={storeCustomizationError}
//                   data={storeCustomizationSetting?.home?.popular_title}
//                 />
//               </h2>
//               <p className="text-base font-sans text-gray-600 dark:text-gray-400 leading-6">
//                 <CMSkeletonTwo
//                   count={5}
//                   height={10}
//                   loading={false}
//                   error={storeCustomizationError}
//                   data={storeCustomizationSetting?.home?.popular_description}
//                 />
//               </p>
//             </div>
//              <div>
//       <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
//         Categories
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
//         {categories.map((image, index) => (
//           <div
//             key={index}
//             className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square cursor-pointer"
//           >
//             <img
//               src={image}
//               alt={`Category ${index + 1}`}
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//           </div>
//         ))}
//       </div>
//     </div>
//           </div>
    
         
          

//           <div className="flex">
//             <div className="w-full">
//               {error ? (
//                 <CMSkeletonTwo
//                   count={20}
//                   height={20}
//                   error={error}
//                   loading={false}
//                 />
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
//                   {popularProducts
//                     ?.slice(
//                       0,
//                       storeCustomizationSetting?.home
//                         ?.latest_discount_product_limit
//                     )
//                     .map((product) => (
//                       <ProductCard
//                         key={product._id}
//                         product={product}
//                         attributes={attributes}
//                         currency={currency}
//                       />
//                     ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* promotional banner card */}
//       {storeCustomizationSetting?.home?.delivery_status && (
//         <div className="block mx-auto max-w-screen-2xl">
//           <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
//             <div className="lg:p-16 p-6 bg-purple-500 shadow-sm border text-black rounded-lg">
//               <CardTwo />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* discounted products */}
//       {storeCustomizationSetting?.home?.discount_product_status &&
//         discountedProducts?.length > 0 && (
//           <div
//             id="discount"
//             className="bg-gray-50 dark:bg-zinc-800 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
//           >
//             <div className="mb-10 flex justify-center">
//               <div className="text-center w-full lg:w-2/5">
//                 <h2 className="text-xl lg:text-2xl mb-2  font-semibold">
//                   <CMSkeletonTwo
//                     count={1}
//                     height={30}
//                     loading={false}
//                     error={storeCustomizationError}
//                     data={
//                       storeCustomizationSetting?.home?.latest_discount_title
//                     }
//                   />
//                 </h2>
//                 <p className="text-base font-sans text-gray-600 leading-6">
//                   <CMSkeletonTwo
//                     count={5}
//                     height={20}
//                     loading={false}
//                     error={storeCustomizationError}
//                     data={
//                       storeCustomizationSetting?.home
//                         ?.latest_discount_description
//                     }
//                   />
//                 </p>
//               </div>
//             </div>
//             <div className="flex">
//               <div className="w-full">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
//                   {discountedProducts
//                     ?.slice(
//                       0,
//                       storeCustomizationSetting?.home?.popular_product_limit
//                     )
//                     .map((product) => (
//                       <DiscountedCard
//                         key={product._id}
//                         product={product}
//                         currency={currency}
//                         attributes={attributes}
//                       />
//                     ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//     </div>
//   );
// };

// export default Home;



import { Suspense } from "react";
import Link from "next/link";

// internal imports
import Banner from "@components/banner/Banner";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import StickyCart from "@components/cart/StickyCart";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import CMSkeletonTwo from "@components/preloader/CMSkeleton";
import FeatureCategory from "@components/category/FeatureCategory";
import { getShowingStoreProducts } from "@services/ProductServices";
import { getShowingAttributes } from "@services/AttributeServices";
import {
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";
import DiscountedCard from "@components/product/DiscountedCard";
import AnimatedCategorySlider from "@components/carousel/AnimatedCategorySlider";

// ✅ HERO SECTION (video)
function Hero() {
  const cloudinaryVideoUrl =
    "https://res.cloudinary.com/dczicfhcv/video/upload/v1762323526/Violet_Purple_Designer_Fashion_Jewellery___AI_video_ad_crafted_by_Scintilla_Kreations_Pvt_Ltd_sz4csg.mp4";

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={cloudinaryVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to darken */}
        <div  className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-serif text-white">
              Precious
              <br />
              <span className="italic">Craft</span>
            </h1>

            <button className="bg-white text-blue-900 px-8 py-3 hover:bg-gray-100 transition-colors font-medium rounded-lg">
              EXPLORE NOW
            </button>
          </div>
        </div>
      </div>
       <div id="animated-slider"></div>
    </div>
  );
}


// ✅ MAIN HOME PAGE
const Home = async () => {
  const { attributes } = await getShowingAttributes();
  const { storeCustomizationSetting, error: storeCustomizationError } =
    await getStoreCustomizationSetting();
  const { popularProducts, discountedProducts, error } =
    await getShowingStoreProducts({
      category: "",
      title: "",
    });

  const { globalSetting } = await getGlobalSetting();
  const currency = globalSetting?.default_currency || "$";

  return (

    <div className="min-h-screen dark:bg-zinc-900">
      {/* ✅ Sticky Cart */}
      <StickyCart currency={currency} />

      {/* ✅ ✅ HERO video on top */}
      <Hero />
      

      {/* ✅ Animated Category Slider */}
      <AnimatedCategorySlider />
     

      {/* Floating Right-Side Category Bar */}
<div className="fixed top-2/4 right-4 z-50 flex flex-col space-y-2">
  {/* Gold */}
  <Link href="/search?category=gold-jewellery&_id=6901ca8e841765d2d7985f4d">
    <div className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded-lg shadow-lg cursor-pointer hover:bg-yellow-500 transition">
      Gold
    </div>
  </Link>

  {/* Silver */}
  <Link href="/search?category=silver-jewellery&_id=6901ca14841765d2d7985f08">
    <div className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg cursor-pointer hover:bg-gray-600 transition">
      Silver
    </div>
  </Link>

  {/* Brass */}
  <Link href="/search?category=brass-jewellery&_id=6901a6164976d20d78f6c17f">
    <div className="bg-yellow-800 text-white font-semibold px-4 py-2 rounded-lg shadow-lg cursor-pointer hover:bg-yellow-900 transition">
      Brass
    </div>
  </Link>
  
  <a
    href="#animated-slider"
    className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors font-medium">
    Explore Our Collections
  </a>

  {/* You can add more categories here */}
</div>

      

      {/* ✅ Original home content below */}
      <div className="bg-white dark:bg-zinc-900 ">
        <div className="mx-auto py-5 max-w-screen-xxl px-0 sm:px-1">
          <div className="flex w-full">
            {/* Home page main carousel */}
            <div className="w-full lg:w-2/3 xl:w-4/4 flex-shrink-0">
              <Suspense fallback={<p>Loading carousel...</p>}>
                <MainCarousel />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Featured Category Section */}
      {storeCustomizationSetting?.home?.featured_status && (
        <div className="bg-gray-100 dark:bg-zinc-800 lg:py-16 py-10">
          <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-semibold">
                  <CMSkeletonTwo
                    count={1}
                    height={30}
                    loading={false}
                    error={storeCustomizationError}
                    data={storeCustomizationSetting?.home?.feature_title}
                  />
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-6">
                  <CMSkeletonTwo
                    count={4}
                    height={10}
                    loading={false}
                    error={storeCustomizationError}
                    data={
                      storeCustomizationSetting?.home?.feature_description
                    }
                  />
                </p>
              </div>
            </div>

            <Suspense fallback={<p>Loading feature category...</p>}>
              <FeatureCategory />
            </Suspense>
          </div>
        </div>
      )}

      {/* ✅ Categories Section */}
      <div>
        <h1 className="text-2xl py-4 md:text-3xl font-bold text-center mb-6 text-gray-900">
          Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">

          {/* Category 1 */}
          <Link href="/search?category=gold-jewellery&_id=6901ca8e841765d2d7985f4d">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square w-full max-w-xs cursor-pointer">
              <img
                src="/Necklace Set.png"
                alt="Category 1"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute top-2 left-2 bg-yellow-400 text-white font-semibold px-3 py-1 rounded-full text-sm shadow-md">
                Gold
              </span>
            </div>
          </Link>

          {/* Category 2 */}
          <Link href="/search?category=silver-jewellery&_id=6901ca14841765d2d7985f08">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square w-full max-w-xs cursor-pointer">
              <img
                src="/silver.png"
                alt="Category 2"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute top-2 left-2 bg-gray-400 text-white font-semibold px-3 py-1 rounded-full text-sm shadow-md">
                Silver
              </span>
            </div>
          </Link>

          {/* Category 3 */}
          <Link href="/search?category=brass-jewellery&_id=6901a6164976d20d78f6c17f">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square w-full max-w-xs cursor-pointer">
              <img
                src="/Bangles.png"
                alt="Category 3"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute top-2 left-2 bg-yellow-800 text-white font-semibold px-3 py-1 rounded-full text-sm shadow-md">
                Brass
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* ✅ Popular Products */}
      <br /><br />
      <div className="flex py-5">
        <div className="w-full">
          {error ? (
            <CMSkeletonTwo
              count={20}
              height={20}
              error={error}
              loading={false}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
              {popularProducts
                ?.slice(
                  0,
                  storeCustomizationSetting?.home
                    ?.latest_discount_product_limit
                )
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    attributes={attributes}
                    currency={currency}
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      

      {/* ✅ Discounted Products */}
      {storeCustomizationSetting?.home?.discount_product_status &&
        discountedProducts?.length > 0 && (
          <div
            id="discount"
            className="bg-gray-50 dark:bg-zinc-800 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-semibold">
                  <CMSkeletonTwo
                    count={1}
                    height={30}
                    loading={false}
                    error={storeCustomizationError}
                    data={
                      storeCustomizationSetting?.home?.latest_discount_title
                    }
                  />
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  <CMSkeletonTwo
                    count={5}
                    height={20}
                    loading={false}
                    error={storeCustomizationError}
                    data={
                      storeCustomizationSetting?.home
                        ?.latest_discount_description
                    }
                  />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
              {discountedProducts
                ?.slice(
                  0,
                  storeCustomizationSetting?.home?.popular_product_limit
                )
                .map((product) => (
                  <DiscountedCard
                    key={product._id}
                    product={product}
                    currency={currency}
                    attributes={attributes}
                  />
                ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default Home;





// "use client";


// import React, { useState } from "react";
// import { sendEmail } from "../api/emailApi";

// const EmailForm = () => {
//   const [formData, setFormData] = useState({ to: "", subject: "", text: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await sendEmail(formData);
//       alert(res.message);
//       setFormData({ to: "", subject: "", text: "" });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="email-form" onSubmit={handleSubmit}>
//       <input
//         type="email"
//         name="to"
//         placeholder="Recipient Email"
//         value={formData.to}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="subject"
//         placeholder="Subject"
//         value={formData.subject}
//         onChange={handleChange}
//         required
//       />
//       <textarea
//         name="text"
//         placeholder="Message"
//         value={formData.text}
//         onChange={handleChange}
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Sending..." : "Send Email"}
//       </button>
//     </form>
//   );
// };

// export default EmailForm;
