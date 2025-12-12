// import ReactTagInput from "@pathofdev/react-tag-input";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Multiselect from "multiselect-react-dropdown";
// import React from "react";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import { MultiSelect } from "react-multi-select-component";
// import { Modal } from "react-responsive-modal";
// import "react-responsive-modal/styles.css";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { FiX } from "react-icons/fi";

// //internal import

// import Title from "@/components/form/others/Title";
// import Error from "@/components/form/others/Error";
// import InputArea from "@/components/form/input/InputArea";
// import useUtilsFunction from "@/hooks/useUtilsFunction";
// import LabelArea from "@/components/form/selectOption/LabelArea";
// import DrawerButton from "@/components/form/button/DrawerButton";
// import InputValue from "@/components/form/input/InputValue";
// import useProductSubmit from "@/hooks/useProductSubmit";
// import ActiveButton from "@/components/form/button/ActiveButton";
// import InputValueFive from "@/components/form/input/InputValueFive";
// import Uploader from "@/components/image-uploader/Uploader";
// import ParentCategory from "@/components/category/ParentCategory";
// import UploaderThree from "@/components/image-uploader/UploaderThree";
// import AttributeOptionTwo from "@/components/attribute/AttributeOptionTwo";
// import AttributeListTable from "@/components/attribute/AttributeListTable";
// import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";

// //internal import

// const ProductDrawer = ({ id }) => {
//   const { t } = useTranslation();

//   const {
//     tag,
//     setTag,
//     values,
//     language,
//     register,
//     onSubmit,
//     errors,
//     slug,
//     openModal,
//     attribue,
//     setValues,
//     variants,
//     imageUrl,
//     setImageUrl,
//     handleSubmit,
//     isCombination,
//     variantTitle,
//     attributes,
//     attTitle,
//     handleAddAtt,
//     // productId,
//     onCloseModal,
//     isBulkUpdate,
//     globalSetting,
//     isSubmitting,
//     tapValue,
//     setTapValue,
//     resetRefTwo,
//     handleSkuBarcode,
//     handleProductTap,
//     selectedCategory,
//     setSelectedCategory,
//     setDefaultCategory,
//     defaultCategory,
//     handleProductSlug,
//     handleSelectLanguage,
//     handleIsCombination,
//     handleEditVariant,
//     handleRemoveVariant,
//     handleClearVariant,
//     handleQuantityPrice,
//     handleSelectImage,
//     handleSelectInlineImage,
//     handleGenerateCombination
//   } = useProductSubmit(id);

//   const { currency, showingTranslateValue } = useUtilsFunction();

//   return (
//     <>
//       <Modal
//         open={openModal}
//         onClose={onCloseModal}
//         center
//         closeIcon={
//           <div className="absolute top-0 right-0 text-red-500  active:outline-none text-xl border-0">
//             <FiX className="text-3xl" />
//           </div>
//         }
//       >
//         <div className="cursor-pointer">
//           <UploaderThree
//             imageUrl={imageUrl}
//             setImageUrl={setImageUrl}
//             handleSelectImage={handleSelectImage}
//           />
//         </div>
//       </Modal>

//       <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
//         {id ? (
//           <Title
//             register={register}
//             language={language}
//             handleSelectLanguage={handleSelectLanguage}
//             title={t("UpdateProduct")}
//             description={t("UpdateProductDescription")}
//           />
//         ) : (
//           <Title
//             register={register}
//             language={language}
//             handleSelectLanguage={handleSelectLanguage}
//             title={t("DrawerAddProduct")}
//             description={t("AddProductDescription")}
//           />
//         )}
//       </div>

//       <div className="flex items-center justify-between h-12 px-4 flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
//         <ul className="flex items-center">
//           <li className="mr-2">
//             <ActiveButton
//               tapValue={tapValue}
//               activeValue="Basic Info"
//               handleProductTap={handleProductTap}
//             />
//           </li>
//           {isCombination && (
//             <li className="mr-2">
//               <ActiveButton
//                 tapValue={tapValue}
//                 activeValue="Combination"
//                 handleProductTap={handleProductTap}
//               />
//             </li>
//           )}
//         </ul>
//         <div className="flex items-center">
//           <SwitchToggleForCombination
//             product
//             handleProcess={handleIsCombination}
//             processOption={isCombination}
//           />
//         </div>
//       </div>

//       <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
//         <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
//           {tapValue === "Basic Info" && (
//             <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
//               {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("ProductID")} />
//                 <div className="col-span-8 sm:col-span-4">{productId}</div>
//               </div> */}
//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("ProductTitleName")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <Input
//                     {...register(`title`, {
//                       required: "TItle is required!",
//                     })}
//                     name="title"
//                     type="text"
//                     placeholder={t("ProductTitleName")}
//                     onBlur={(e) => handleProductSlug(e.target.value)}
//                   />
//                   <Error errorName={errors.title} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("ProductDescription")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <Textarea
//                     className="border text-sm  block w-full bg-gray-100 border-gray-200   dark:bg-gray-800 dark:text-gray-100 dark:border-gray-500 dark:placeholder:text-gray-400 dark:focus:ring-0 dark:focus:border-blue-400"
//                     {...register("description", {
//                       required: false,
//                     })}
//                     name="description"
//                     placeholder={t("ProductDescription")}
//                     rows="4"
//                     spellCheck="false"
//                   />
//                   <Error errorName={errors.description} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("ProductImage")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <Uploader
//                     product
//                     folder="product"
//                     imageUrl={imageUrl}
//                     setImageUrl={setImageUrl}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("ProductSKU")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <InputArea
//                     register={register}
//                     label={t("ProductSKU")}
//                     name="sku"
//                     type="text"
//                     placeholder={t("ProductSKU")}
//                   />
//                   <Error errorName={errors.sku} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("ProductBarcode")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <InputArea
//                     register={register}
//                     label={t("ProductBarcode")}
//                     name="barcode"
//                     type="text"
//                     placeholder={t("ProductBarcode")}
//                   />
//                   <Error errorName={errors.barcode} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("Category")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <ParentCategory
//                     lang={language}
//                     selectedCategory={selectedCategory}
//                     setSelectedCategory={setSelectedCategory}
//                     setDefaultCategory={setDefaultCategory}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("DefaultCategory")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <Multiselect
//                     displayValue="name"
//                     isObject={true}
//                     singleSelect={true}
//                     ref={resetRefTwo}
//                     hidePlaceholder={true}
//                     onKeyPressFn={function noRefCheck() {}}
//                     onRemove={function noRefCheck() {}}
//                     onSearch={function noRefCheck() {}}
//                     onSelect={(v) => setDefaultCategory(v)}
//                     selectedValues={defaultCategory}
//                     options={selectedCategory}
//                     placeholder={"Default Category"}
//                   ></Multiselect>
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label="Product Price" />
//                 <div className="col-span-8 sm:col-span-4">
//                   <InputValue
//                     disabled={isCombination}
//                     register={register}
//                     maxValue={200000}
//                     minValue={0}
//                     label="Original Price"
//                     name="originalPrice"
//                     type="number"
//                     placeholder="OriginalPrice"
//                     defaultValue={0.0}
//                     required={true}
//                     product
//                     currency={currency}
//                   />
//                   <Error errorName={errors.originalPrice} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("SalePrice")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <InputValue
//                     disabled={isCombination}
//                     product
//                     register={register}
//                     minValue={0}
//                     defaultValue={0.0}
//                     required={true}
//                     label="Sale price"
//                     name="price"
//                     type="number"
//                     placeholder="Sale price"
//                     currency={currency}
//                   />
//                   <Error errorName={errors.price} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
//                 <LabelArea label={t("ProductQuantity")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <InputValueFive
//                     required={true}
//                     disabled={isCombination}
//                     register={register}
//                     minValue={0}
//                     defaultValue={0}
//                     label="Quantity"
//                     name="stock"
//                     type="number"
//                     placeholder={t("ProductQuantity")}
//                   />
//                   <Error errorName={errors.stock} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("ProductSlug")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <Input
//                     {...register(`slug`, {
//                       required: "slug is required!",
//                     })}
//                     className=" mr-2 p-2"
//                     name="slug"
//                     type="text"
//                     defaultValue={slug}
//                     placeholder={t("ProductSlug")}
//                     onBlur={(e) => handleProductSlug(e.target.value)}
//                   />
//                   <Error errorName={errors.slug} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                 <LabelArea label={t("ProductTag")} />
//                 <div className="col-span-8 sm:col-span-4">
//                   <ReactTagInput
//                     placeholder={t("ProductTagPlaseholder")}
//                     tags={tag}
//                     onChange={(newTags) => setTag(newTags)}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {tapValue === "Combination" &&
//             isCombination &&
//             (attribue.length < 1 ? (
//               <div
//                 className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4"
//                 role="alert"
//               >
//                 <div className="flex">
//                   <div className="py-1">
//                     <svg
//                       className="fill-current h-6 w-6 text-teal-500 mr-4"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm">
//                       {t("AddCombinationsDiscription")}{" "}
//                       <Link to="/attributes" className="font-bold">
//                         {t("AttributesFeatures")}
//                       </Link>
//                       {t("AddCombinationsDiscriptionTwo")}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-6">
//                 {/* <h4 className="mb-4 font-semibold text-lg">Variants</h4> */}
//                 <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3">
//                   <MultiSelect
//                     options={attTitle}
//                     value={attributes}
//                     onChange={(v) => handleAddAtt(v)}
//                     labelledBy="Select"
//                   />

//                   {attributes?.map((attribute, i) => (
//                     <div key={attribute._id}>
//                       <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200 px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200">
//                         {"Select"}
//                         {showingTranslateValue(attribute?.title)}
//                       </div>

//                       <AttributeOptionTwo
//                         id={i + 1}
//                         values={values}
//                         lang={language}
//                         attributes={attribute}
//                         setValues={setValues}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex justify-end mb-6">
//                   {attributes?.length > 0 && (
//                     <Button
//                       onClick={handleGenerateCombination}
//                       type="button"
//                       className="mx-2"
//                     >
//                       <span className="text-xs">{t("GenerateVariants")}</span>
//                     </Button>
//                   )}

//                   {variantTitle.length > 0 && (
//                     <Button onClick={handleClearVariant} className="mx-2">
//                       <span className="text-xs">{t("ClearVariants")}</span>
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             ))}

//           {isCombination ? (
//             <DrawerButton
//               id={id}
//               save
//               title="Product"
//               isSubmitting={isSubmitting}
//               handleProductTap={handleProductTap}
//             />
//           ) : (
//             <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
//           )}

//           {tapValue === "Combination" && (
//             <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
//           )}
//         </form>

//         {tapValue === "Combination" &&
//           isCombination &&
//           variantTitle.length > 0 && (
//             <div className="px-6 overflow-x-auto">
//               {/* {variants?.length >= 0 && ( */}
//               {isCombination && (
//                 <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>{t("Image")}</TableHead>
//                         <TableHead>{t("Combination")}</TableHead>
//                         <TableHead>{t("Sku")}</TableHead>
//                         <TableHead>{t("Barcode")}</TableHead>
//                         <TableHead>{t("Price")}</TableHead>
//                         <TableHead>{t("SalePrice")}</TableHead>
//                         <TableHead>{t("QuantityTbl")}</TableHead>
//                         <TableHead className="text-right">
//                           {t("Action")}
//                         </TableHead>
//                       </TableRow>
//                     </TableHeader>

//                     <AttributeListTable
//                       lang={language}
//                       variants={variants}
//                       setTapValue={setTapValue}
//                       variantTitle={variantTitle}
//                       isBulkUpdate={isBulkUpdate}
//                       handleSkuBarcode={handleSkuBarcode}
//                       handleEditVariant={handleEditVariant}
//                       handleRemoveVariant={handleRemoveVariant}
//                       handleQuantityPrice={handleQuantityPrice}
//                       handleSelectInlineImage={handleSelectInlineImage}
//                     />
//                   </Table>
//                 </TableContainer>
//               )}
//             </div>
//           )}
//       </Scrollbars>
//     </>
//   );
// };

// export default React.memo(ProductDrawer);





import ReactTagInput from "@pathofdev/react-tag-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Multiselect from "multiselect-react-dropdown";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";

// internal imports
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import LabelArea from "@/components/form/selectOption/LabelArea";
import DrawerButton from "@/components/form/button/DrawerButton";
import InputValue from "@/components/form/input/InputValue";
import InputValueFive from "@/components/form/input/InputValueFive";
import Uploader from "@/components/image-uploader/Uploader";
import UploaderThree from "@/components/image-uploader/UploaderThree";
import ParentCategory from "@/components/category/ParentCategory";
import AttributeOptionTwo from "@/components/attribute/AttributeOptionTwo";
import AttributeListTable from "@/components/attribute/AttributeListTable";
import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";
import useProductSubmit from "@/hooks/useProductSubmit";
import ActiveButton from "@/components/form/button/ActiveButton";
import PricingServices from "@/services/PricingServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const ProductDrawer = ({ id }) => {
  const { t } = useTranslation();

  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    openModal,
    attribue,
    setValues,
    variants,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
    watch,
    setValue,
  } = useProductSubmit(id);

  const { currency, showingTranslateValue } = useUtilsFunction();

  // Jewellery Pricing Logic
  const [latestRates, setLatestRates] = React.useState(null);

  // Fetch rates on mount
  React.useEffect(() => {
    PricingServices.getRates()
      .then((res) => {
        // console.log("PricingServices.getRates response:", res);
        if (res?.latest) {
          setLatestRates(res.latest);
        } else if (res?.data?.latest) {
          // Handle case where response might be wrapped in data
          setLatestRates(res.data.latest);
        } else {
          console.warn("PricingServices: structure unexpected", res);
        }
      })
      .catch((err) => console.error("Failed to fetch rates", err));
  }, []);

  // Watch fields for calculation
  const [
    metalType,
    netWeight,
    metalRate,
    wastagePercentage,
    makingChargeType,
    makingChargeValue,
    marginPercentage,
    taxPercentage,
  ] = watch([
    "metalType",
    "netWeight",
    "metalRate",
    "wastagePercentage",
    "makingChargeType",
    "makingChargeValue",
    "marginPercentage",
    "taxPercentage",
  ]);

  // Handle "Use Latest Rate" click
  const handleUseLatestRate = (e) => {
    e.preventDefault();
    const type = watch("metalType");
    if (!type || !latestRates) return notifyError("Select a metal type first or no rates available.");

    let rate = 0;
    const lowerType = type.toLowerCase();

    // console.log("Fetching rate for:", lowerType, "Available rates:", latestRates);

    if (lowerType === "gold") rate = latestRates.gold;
    else if (lowerType === "silver") rate = latestRates.silver;
    else if (lowerType === "brass") rate = latestRates.brass;

    if (rate) {
      setValue("metalRate", rate);
      notifySuccess(`Updated rate for ${type}: ${rate}`);
    } else {
      notifyError(`No rate found for ${type}`);
    }
  };

  // Calculation Effect
  React.useEffect(() => {
    // Only calculate if we have basic required values
    if (!netWeight || !metalRate) return;

    // console.log("Calculating price with:", { netWeight, metalRate, wastagePercentage, makingChargeValue, marginPercentage, taxPercentage });

    const weightVal = parseFloat(netWeight) || 0;
    const rateVal = parseFloat(metalRate) || 0;
    const wastageVal = parseFloat(wastagePercentage) || 0;
    const makingVal = parseFloat(makingChargeValue) || 0;
    const marginVal = parseFloat(marginPercentage) || 0;
    const taxVal = parseFloat(taxPercentage) || 0;

    // 1. metal_value = weight * metal_rate
    const metalValue = weightVal * rateVal;

    // 2. wastage_amount = metal_value * (wastage%/100)
    const wastageAmount = metalValue * (wastageVal / 100);

    // 3. metal_with_wastage = metal_value + wastage_amount
    const metalWithWastage = metalValue + wastageAmount;

    // 4. making_charges (flat or percent)
    let makingChargesAmount = 0;
    if (makingChargeType === "percentage") {
      makingChargesAmount = metalWithWastage * (makingVal / 100);
    } else {
      makingChargesAmount = makingVal;
    }

    // 5. pre_tax_price = metal_with_wastage + making_charges
    const preTaxPrice = metalWithWastage + makingChargesAmount;

    // 6. margin_amount = pre_tax_price * (margin%/100)
    const marginAmount = preTaxPrice * (marginVal / 100);

    // 7. price_before_tax = pre_tax_price + margin_amount
    const priceBeforeTax = preTaxPrice + marginAmount;

    // 8. final_price = price_before_tax + tax
    const taxAmount = priceBeforeTax * (taxVal / 100);
    const finalPrice = priceBeforeTax + taxAmount;

    // console.log("Calculated Final Price:", finalPrice);

    const finalRounded = Math.round(finalPrice);

    setValue("price", finalRounded);
    setValue("originalPrice", finalRounded);

  }, [
    netWeight,
    metalRate,
    wastagePercentage,
    makingChargeType,
    makingChargeValue,
    marginPercentage,
    taxPercentage,
    setValue,
  ]);


  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500 active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            language={language}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateProduct")}
            description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}
            language={language}
            handleSelectLanguage={handleSelectLanguage}
            title={t("DrawerAddProduct")}
            description={t("AddProductDescription")}
          />
        )}
      </div>

      <div className="flex items-center justify-between h-12 px-4 flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        <ul className="flex items-center">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Basic Info"
              handleProductTap={handleProductTap}
            />
          </li>
          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProductTap={handleProductTap}
              />
            </li>
          )}
        </ul>
        <div className="flex items-center">
          <SwitchToggleForCombination
            product
            handleProcess={handleIsCombination}
            processOption={isCombination}
          />
        </div>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">

              {/* Product Title */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTitleName")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title`, { required: "Title is required!" })}
                    name="title"
                    type="text"
                    placeholder={t("ProductTitleName")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.title} />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductDescription")} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm block w-full bg-gray-100 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-500 dark:placeholder:text-gray-400 dark:focus:ring-0 dark:focus:border-blue-400"
                    {...register("description")}
                    name="description"
                    placeholder={t("ProductDescription")}
                    rows="4"
                    spellCheck="false"
                  />
                  <Error errorName={errors.description} />
                </div>
              </div>

              {/* Product Image */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage")} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    folder="product"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
              </div>

              {/* SKU */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSKU")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductSKU")}
                    name="sku"
                    type="text"
                    placeholder={t("ProductSKU")}
                  />
                  <Error errorName={errors.sku} />
                </div>
              </div>

              {/* Barcode */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductBarcode")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("ProductBarcode")}
                    name="barcode"
                    type="text"
                    placeholder={t("ProductBarcode")}
                  />
                  <Error errorName={errors.barcode} />
                </div>
              </div>

              {/* Category */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Category")} />
                <div className="col-span-8 sm:col-span-4">
                  <ParentCategory
                    lang={language}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setDefaultCategory={setDefaultCategory}
                  />
                </div>
              </div>

              {/* Default Category */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("DefaultCategory")} />
                <div className="col-span-8 sm:col-span-4">
                  <Multiselect
                    displayValue="name"
                    isObject={true}
                    singleSelect={true}
                    ref={resetRefTwo}
                    hidePlaceholder={true}
                    onSelect={(v) => setDefaultCategory(v)}
                    selectedValues={defaultCategory}
                    options={selectedCategory}
                    placeholder={"Default Category"}
                  ></Multiselect>
                </div>
              </div>

              {/* ======================= JEWELLERY PRICING ENGINE ======================= */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6 bg-gray-50 dark:bg-gray-900/50">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 block">
                  💎 Jewellery Pricing Calculator
                </h4>

                {/* Metal Type & Purity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <LabelArea label="Metal Type" />
                    <select
                      {...register("metalType")}
                      className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-[#f15929]/50 border-1 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700"
                    >
                      <option value="">Select Metal</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Brass">Brass</option>
                    </select>
                  </div>
                  <div>
                    <LabelArea label="Purity (e.g. 22K, 92.5)" />
                    <InputArea
                      register={register}
                      label="Purity"
                      name="metalPurity"
                      type="text"
                      placeholder="e.g. 22K"
                    />
                  </div>
                </div>

                {/* Weight & Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <LabelArea label="Net Weight (grams)" />
                    <InputArea
                      register={register}
                      label="Weight (g)"
                      name="netWeight"
                      type="number"
                      step="0.001"
                      placeholder="0.000"
                    />
                  </div>
                  <div>
                    <LabelArea label="Metal Rate (per gram)" />
                    <div className="flex gap-2">
                      <div className="flex-grow">
                        <InputArea
                          register={register}
                          label="Rate"
                          name="metalRate"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                      <Button
                        onClick={handleUseLatestRate}
                        className="h-10 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                        type="button"
                      >
                        Fetch Latest
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Wastage & Making Charges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <LabelArea label="Wastage (%)" />
                    <InputArea
                      register={register}
                      label="Wastage %"
                      name="wastagePercentage"
                      type="number"
                      step="0.01"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <LabelArea label="Making Charge Type" />
                    <select
                      {...register("makingChargeType")}
                      className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-[#f15929]/50 border-1 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700"
                    >
                      <option value="flat">Flat Amount</option>
                      <option value="percentage">Percentage</option>
                    </select>
                  </div>

                  <div>
                    <LabelArea label="Making Charge Value" />
                    <InputArea
                      register={register}
                      label="Value"
                      name="makingChargeValue"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Margin & Tax */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <LabelArea label="Margin (%)" />
                    <InputArea
                      register={register}
                      label="Margin %"
                      name="marginPercentage"
                      type="number"
                      step="0.01"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <LabelArea label="Tax (%)" />
                    <InputArea
                      register={register}
                      label="Tax %"
                      name="taxPercentage"
                      type="number"
                      step="0.01"
                      placeholder="e.g. 3"
                    />
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500 italic">
                  * Final Price will be automatically calculated and set to Product Price below.
                </div>
              </div>
              {/* ==================================================================== */}

              {/* Price */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Product Price" />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    disabled={isCombination}
                    register={register}
                    minValue={0}
                    label="Original Price"
                    name="originalPrice"
                    type="number"
                    placeholder="OriginalPrice"
                    defaultValue={0.0}
                    required={true}
                    product
                    currency={currency}
                  />
                  <Error errorName={errors.originalPrice} />
                </div>
              </div>

              {/* Sale Price */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("SalePrice")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    disabled={isCombination}
                    product
                    register={register}
                    minValue={0}
                    defaultValue={0.0}
                    required={true}
                    label="Sale price"
                    name="price"
                    type="number"
                    placeholder="Sale price"
                    currency={currency}
                  />
                  <Error errorName={errors.price} />
                </div>
              </div>

              {/* Quantity */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                <LabelArea label={t("ProductQuantity")} />
                <div className="col-span-8 sm:col-span-4">
                  <InputValueFive
                    required={true}
                    disabled={isCombination}
                    register={register}
                    minValue={0}
                    defaultValue={0}
                    label="Quantity"
                    name="stock"
                    type="number"
                    placeholder={t("ProductQuantity")}
                  />
                  <Error errorName={errors.stock} />
                </div>
              </div>



              {/* Slug */}
              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductSlug")} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`slug`, { required: "slug is required!" })}
                    className="mr-2 p-2"
                    name="slug"
                    type="text"
                    defaultValue={slug}
                    placeholder={t("ProductSlug")}
                    onBlur={(e) => handleProductSlug(e.target.value)}
                  />
                  <Error errorName={errors.slug} />
                </div>
              </div> */}

              {/* Tags */}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductTag")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("ProductTagPlaseholder")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div>

            </div>
          )}

          {/* Combination Tab */}
          {tapValue === "Combination" &&
            isCombination &&
            (attribue.length < 1 ? (
              <div
                className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">
                      {t("AddCombinationsDiscription")}{" "}
                      <Link to="/attributes" className="font-bold">
                        {t("AttributesFeatures")}
                      </Link>
                      {t("AddCombinationsDiscriptionTwo")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3">
                  <MultiSelect
                    options={attTitle}
                    value={attributes}
                    onChange={(v) => handleAddAtt(v)}
                    labelledBy="Select"
                  />

                  {attributes?.map((attribute, i) => (
                    <div key={attribute._id}>
                      <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200 px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200">
                        {"Select"}
                        {showingTranslateValue(attribute?.title)}
                      </div>

                      <AttributeOptionTwo
                        id={i + 1}
                        values={values}
                        lang={language}
                        attributes={attribute}
                        setValues={setValues}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mb-6">
                  {attributes?.length > 0 && (
                    <Button
                      onClick={handleGenerateCombination}
                      type="button"
                      className="mx-2"
                    >
                      <span className="text-xs">{t("GenerateVariants")}</span>
                    </Button>
                  )}

                  {variantTitle.length > 0 && (
                    <Button onClick={handleClearVariant} className="mx-2">
                      <span className="text-xs">{t("ClearVariants")}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}

          {isCombination ? (
            <DrawerButton
              id={id}
              save
              title="Product"
              isSubmitting={isSubmitting}
              handleProductTap={handleProductTap}
            />
          ) : (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}

          {tapValue === "Combination" && (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}
        </form>

        {tapValue === "Combination" &&
          isCombination &&
          variantTitle.length > 0 && (
            <div className="px-6 overflow-x-auto">
              {isCombination && (
                <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("Image")}</TableHead>
                        <TableHead>{t("Combination")}</TableHead>
                        <TableHead>{t("Sku")}</TableHead>
                        <TableHead>{t("Barcode")}</TableHead>
                        <TableHead>{t("Price")}</TableHead>
                        <TableHead>{t("SalePrice")}</TableHead>
                        <TableHead>{t("QuantityTbl")}</TableHead>
                        <TableHead className="text-right">{t("Action")}</TableHead>
                      </TableRow>
                    </TableHeader>

                    <AttributeListTable
                      lang={language}
                      variants={variants}
                      setTapValue={setTapValue}
                      variantTitle={variantTitle}
                      isBulkUpdate={isBulkUpdate}
                      handleSkuBarcode={handleSkuBarcode}
                      handleEditVariant={handleEditVariant}
                      handleRemoveVariant={handleRemoveVariant}
                      handleQuantityPrice={handleQuantityPrice}
                      handleSelectInlineImage={handleSelectInlineImage}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
