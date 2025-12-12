// import dayjs from "dayjs";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// //internal import
// import OrderTable from "@components/order/OrderTable";
// import useUtilsFunction from "@hooks/useUtilsFunction";

// const Invoice = ({ data, printRef, globalSetting }) => {
//    console.log("invoice data", data);
//   const currency = globalSetting?.default_currency || "$";

//   const { getNumberTwo } = useUtilsFunction();

//   return (
//     <div ref={printRef}>
//       <div className="bg-indigo-50 p-8 rounded-t-xl">
//         <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
//           <div>
//             <h1 className="font-bold text-2xl uppercase">Invoice</h1>
//             <h6 className="text-gray-700">
//               Status :{" "}
//               {data?.status === "Delivered" && (
//                 <span className="text-purple-500">{data?.status}</span>
//               )}
//               {data?.status === "POS-Completed" && (
//                 <span className="text-purple-500">{data?.status}</span>
//               )}
//               {data?.status === "Pending" && (
//                 <span className="text-orange-500">{data?.status}</span>
//               )}
//               {data?.status === "Cancel" && (
//                 <span className="text-red-500">{data?.status}</span>
//               )}
//               {data?.status === "Processing" && (
//                 <span className="text-indigo-500">{data?.status}</span>
//               )}
//               {data?.status === "Deleted" && (
//                 <span className="text-red-700">{data?.status}</span>
//               )}
//             </h6>
//           </div>
//           <div className="lg:text-right text-left">
//             <h2 className="text-lg font-semibold mt-4 lg:mt-0 md:mt-0">
//               <Link href="/">
//                 <Image
//                   width={10}
//                   height={10}
//                   src="/logo/logo-color.svg"
//                   alt="logo"
//                 />
//               </Link>
//             </h2>
//             <p className="text-sm text-gray-500">
//               {globalSetting?.address ||
//                 "Cecilia Chapman, 561-4535 Nulla LA, <br /> United States 96522"}
//             </p>
//           </div>
//         </div>
//         <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between pt-4">
//           <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
//             <span className="font-bold text-sm uppercase text-gray-600 block">
//               Date
//             </span>
//             <span className="text-sm text-gray-500 block">
//               {data?.createdAt !== undefined && (
//                 <span>{dayjs(data?.createdAt).format("MMMM D, YYYY")}</span>
//               )}
//             </span>
//           </div>
//           <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
//             <span className="font-bold text-sm uppercase text-gray-600 block">
//               Invoice No.
//             </span>
//             <span className="text-sm text-gray-500 block">
//               #{data?.invoice}
//             </span>
//           </div>
//           <div className="flex flex-col lg:text-right text-left">
//             <span className="font-bold text-sm uppercase text-gray-600 block">
//               Invoice To.
//             </span>
//             <span className="text-sm text-gray-500 block">
//               {data?.user_info?.name} <br />
//               {data?.user_info?.email}{" "}
//               <span className="ml-2">{data?.user_info?.contact}</span>
//               <br />
//               {data?.user_info?.address}
//               <br />
//               {data?.city} {data?.country} {data?.zipCode}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="overflow-hidden lg:overflow-visible px-8 my-10">
//         <div className="-my-2 overflow-x-auto">
//           <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr className="text-xs bg-gray-100">
//                 <th
//                   scope="col"
//                   className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
//                 >
//                   Sr.
//                 </th>
//                 <th
//                   scope="col"
//                   className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
//                 >
//                   Product Name
//                 </th>
//                 <th
//                   scope="col"
//                   className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
//                 >
//                   Quantity
//                 </th>
//                 <th
//                   scope="col"
//                   className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
//                 >
//                   Item Price
//                 </th>

//                 <th
//                   scope="col"
//                   className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right"
//                 >
//                   Amount
//                 </th>
//               </tr>
//             </thead>
//             <OrderTable data={data} currency={currency} />
//           </table>
//         </div>
//       </div>


//       <tbody>
//   {data.cart.map((item, index) => (
//     <tr key={index}>
//       <td>{index + 1}</td>
//       <td>{item.name || item.product_name}</td> {/* Product Name */}
//       <td>{item.quantity}</td>
//       <td>{currency}{item.price}</td>
//       <td>{currency}{item.price * item.quantity}</td>
//     </tr>
//   ))}
// </tbody>


//       <div className="border-t border-b border-gray-100 p-10 bg-purple-50">
//         <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between pt-4">
//           <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
//             <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">
//               Payment Method
//             </span>
//             <span className="text-sm text-gray-500 font-semibold block">
//               {data?.paymentMethod}
//             </span>
//           </div>
//           <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
//             <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">
//               Shipping Cost
//             </span>
//             <span className="text-sm text-gray-500 font-semibold block">
//               {currency}
//               {getNumberTwo(data?.shippingCost)}
//             </span>
//           </div>
//           <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
//             <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">
//               Discount
//             </span>
//             <span className="text-sm text-gray-500 font-semibold block">
//               {currency}
//               {getNumberTwo(data?.discount)}
//             </span>
//           </div>
//           <div className="flex flex-col sm:flex-wrap">
//             <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">
//               Total Amount
//             </span>
//             <span className="text-2xl font-bold text-red-500 block">
//               {currency}
//               {getNumberTwo(data?.total)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoice;






import dayjs from "dayjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";


const Invoice = ({ data, printRef, globalSetting ,invoicepdf }) => {
  const currency = globalSetting?.default_currency || "₹";
  const format = (num) => Number(num || 0).toFixed(2);
  console.log("invoice data:", data)




// --- Tax Calculations ---
const getTaxRateByHSN = (hsn) => {
  switch (hsn) {
    case 7113:
    case 7114:
      return 3; // 3%
    case 7117:
      return 12; // 12%
    default:
      return 3; // default GST %
  }
};

const isInterstate = data?.isInterstate || false;

// Calculate totals
const totals = data?.cart?.reduce(
  (acc, item) => {
    const taxable = item?.price * item?.quantity;
    const taxRate = getTaxRateByHSN(item?.hsn);

    if (isInterstate) {
      // IGST applies for interstate sales
      acc.igst += (taxable * taxRate) / 100;
    } else {
      // CGST + SGST apply for intrastate sales
      const halfTax = (taxable * taxRate) / 200;
      acc.cgst += halfTax;
      acc.sgst += halfTax;
    }

    return acc;
  },
  { cgst: 0, sgst: 0, igst: 0 }
);



  return (
    <div
      ref={printRef}
      className="max-w-4xl mx-auto bg-white text-gray-800 font-sans border border-gray-300 p-8 rounded-md"
    >
      {/* Header className="flex justify-between items-start border-b-2 border-gray-300 pb-3" */}
      <div >
        <div >
          <div className="w-full text-center border-b border-black pb-1 mb-2">
            <h1 className="text-2xl font-bold uppercase text-gray-800">
              TAX INVOICE
            </h1>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-600 italic">
                Original / Duplicate Bill
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between items-start">
            {/* Text Section */}
            <div>
              <h2 className="text-lg font-semibold">PRECIOUS CRAFT</h2>
              <p className="text-sm leading-tight">
                D.No: 2/1024, Ground Floor, Bommandapalli Main Road,
                <br />
                Bommandapalli, Hosur, TN - 635109
                <br />
                Mob: 9659407123
                <br />
                Email: preciouscraft2024@gmail.com
              </p>
            </div>

            {/* Logo Section */}
            <div className="relative" style={{ width: "200px", height: "110px" }}>
              <Image
                src="/logo/logo-color.svg"
                alt="Company Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-600 my-2" />


      {/* Bill To / Ship To */}
      <h3 className="font-semibold uppercase mb-1">Bill To</h3>
      <hr className="border-t border-gray-600 my-2" />
      <div className="flex mt-2 items-start justify-center space-x-8">

        <div className="text-sm text-left w-1/3">

          <p>
            {data?.user_info?.name || "APPLE FASHION JEWELLERY"} <br />
            {data?.user_info?.address ||
              "No.7, J P KOVIL STREET, OLD WASHERMENPET, CHENNAI - 600021"}{" "}
            <br />
            Mob: {data?.user_info?.contact || "9094275505"} <br />
            GSTIN: {data?.user_info?.gstin || "33HNXPM7270M1ZY"}
          </p>

        </div>
        <div className="w-px h-30 bg-gray-600"></div>


        {/* Invoice Info */}
        <div className="flex flex-col justify-start text-sm pl-4 w-1/3">
          <ol className="list-decimal space-y-2">
            <ul>
              <span className="font-semibold">Invoice No:</span>{" "}
              {data?.invoice || "INV001"}
            </ul>
            <ul>
              <span className="font-semibold">Invoice Date:</span>{" "}
              {dayjs(data?.createdAt).format("DD-MM-YYYY")}
            </ul>
            <ul>
              <span className="font-semibold">Payment Mode:</span>{" "}
              {data?.paymentMethod || "Cash"}
            </ul>
            <ul>
              <span className="font-semibold">Payment Term:</span>{" "}
              {data?.paymentTerm || "Term"}
            </ul>
          </ol>
        </div>

        {/* Optional empty space */}
        <div className="w-1/3"></div>
      </div>


      <hr className="border-t border-gray-600 my-2" />
      {/* Shipment To content */}
      <h3 className="font-semibold uppercase mb-1">Shipment To</h3>
      <hr className="border-t border-gray-600 my-2" />
      <div className="flex items-start mt-2">
        <hr className="border-t border-gray-600 my-2" />
        <div className="text-sm text-left relative pr-4">
          <p>
            {data?.user_info?.name || "APPLE FASHION JEWELLERY"} <br />
            {data?.user_info?.address ||
              "No.7, J P KOVIL STREET, OLD WASHERMENPET, CHENNAI - 600021"}{" "}
            <br />
            Mob: {data?.user_info?.contact || "9094275505"} <br />
            GSTIN: {data?.user_info?.gstin || "33HNXPM7270M1ZY"}
          </p>
        </div>
        <div className="w-px h-30 bg-gray-600"></div>

      </div>
      <hr className="border-t border-gray-600 my-4" />





      {/* Product Table */}
      <div className="mt-2">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-center">S.No</th>
              <th className="border border-gray-300 px-2 py-1 text-center">PARTICULAR</th>
              <th className="border border-gray-300 px-2 py-1 text-center">HSN</th>
              <th className="border border-gray-300 px-2 py-1 text-center">QTY / WT</th>
              <th className="border border-gray-300 px-2 py-1 text-center">RATE</th>
              <th className="border border-gray-300 px-2 py-1 text-center">TAXABLE</th>
              <th className="border border-gray-300 px-2 py-1 text-center">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data?.cart?.map((item, i) => {
              const taxable = item?.price * item?.quantity;
              const totalAmount = taxable + (item?.tax || 3);
              const getTaxRateByHSN = (hsn) => {
  switch (hsn) {
    case 3: return 7113;   // Gold Jewellery
    case 3: return 7114;   // Silver Jewellery
    default: return 7113;     // Unknown HSN
  }
};
const hsn = getTaxRateByHSN(item?.hsn);


              return (
                <tr key={i}>
                  <td className="border border-gray-300 px-2 py-1 text-center">{i + 1}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{item?.name || item?.product_name || item?.title || "Item Name"}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{hsn || "-"}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{item?.quantity}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{currency}{format(item?.price)}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{currency}{format(taxable)}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{currency}{format(totalAmount)}</td>
                </tr>
              );
            })}

            {/* Total Row for Each Column */}
            <tr className="font-bold bg-gray-100">
              <td className="border border-gray-300 px-2 py-1 text-center">Total</td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1"></td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                {data?.cart?.reduce((sum, item) => sum + (item?.quantity || 0), 0)}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                {currency}{format(data?.cart?.reduce((sum, item) => sum + (item?.price || 0), 0))}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                {currency}{format(data?.cart?.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0))}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                {currency}{format(data?.cart?.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0) + (item?.tax || 0)), 0))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>



      {/* Totals Section */}
      <div className="mt-2 border-t border-gray-300 pt-4 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bank Details */}
          <div>
            <h4 className="font-semibold mb-2">Bank Details for Payment</h4>
            <p>
              Name: Precious Craft <br />
              Bank: HDFC Bank <br />
              Branch: Hosur II <br />
              A/C No: 50200093465206 <br />
              IFSC: HDFC0004123 <br />
              PAN: BEIPS2385P <br />
              GST No: 33BEIPS2385P1ZS
            </p>
          </div>


          {/* Amount Table with separated lines */}
          <div className="sm:text-right">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                
                <tr className="border-b border-gray-300">
                  <td className="px-1 py-1 border-r border-gray-300 text-left">Sub Total</td>
                  <td className="px-1 py-1 text-right">
                    {currency + format(data?.subtotal || data?.total)}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-1 py-1 border-r border-gray-300 text-left">Taxable</td>
                  <td className="px-1 py-1 text-right">
                    {currency + format(data?.subtotal || data?.total)}
                  </td>
                </tr>
                
              {/* CGST Amount Row */}
<tr className="border-b border-gray-300">
  <td className="px-1 py-1 border-r border-gray-300 text-left">CGST Amt</td>
  <td className="px-1 py-1 text-right" colSpan={data?.cart?.length || 1}>
    {currency + format(totals.cgst)}
  </td>
</tr>

{/* SGST Amount Row */}
<tr className="border-b border-gray-300">
  <td className="px-1 py-1 border-r border-gray-300 text-left">SGST Amt</td>
  <td className="px-1 py-1 text-right" colSpan={data?.cart?.length || 1}>
    {currency + format(totals.sgst)}
  </td>
</tr>

{/* IGST Amount Row */}
<tr className="border-b border-gray-300">
  <td className="px-1 py-1 border-r border-gray-300 text-left">IGST Amt</td>
  <td className="px-1 py-1 text-right" colSpan={data?.cart?.length || 1}>
    {currency + format(totals.igst)}
  </td>
</tr>


                {/* New: Packing & Cargo */}
                <tr className="border-b border-gray-300">
                  <td className="px-1 py-1 border-r border-gray-300 text-left">Packing & Cargo</td>
                  <td className="px-1 py-1 text-right">
                    {currency + format(data?.packing || 0)}
                  </td>
                </tr>

                {/* New: Rounded */}
                <tr className="border-b border-gray-300">
                  <td className="px-1 py-1 border-r border-gray-300 text-left">Rounded</td>
                  <td className="px-1 py-1 text-right">
                    {currency + format(data?.rounded || 0)}
                  </td>
                </tr>

                <tr className="font-bold">
                  <td className="px-1 py-1 border-t border-gray-400 border-r border-gray-300 text-left">
                    Total Amount
                  </td>
                  <td className="px-1 py-1 border-t border-gray-400 text-right">
                    {currency + format(data?.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      <div className="mt-4">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-center">HSN CODE</th>
              <th className="border border-gray-300 px-2 py-1 text-center">TAX RATE</th>
              <th className="border border-gray-300 px-2 py-1 text-center">TAXABLE</th>
              <th className="border border-gray-300 px-2 py-1 text-center">IGST</th>
              <th className="border border-gray-300 px-2 py-1 text-center">CGST</th>
              <th className="border border-gray-300 px-2 py-1 text-center">SGST</th>
            </tr>
          </thead>

          <tbody>
            {data?.cart?.map((item, i) => {
              // Taxable value
              const taxable = item?.price * item?.quantity;

              // Tax Rate (%)
              const taxRate = item?.taxRate || 3;

              // IGST, CGST, SGST Calculation
              // Use IGST if interstate, otherwise CGST + SGST
              const isInterstate = data?.isInterstate || false; // set true/false based on buyer vs seller state

              const igst = isInterstate ? (taxable * taxRate) / 100 : 0;
              const cgst = !isInterstate ? (taxable * taxRate) / 200 : 0; // half of total GST
              const sgst = !isInterstate ? (taxable * taxRate) / 200 : 0;
              const getTaxRateByHSN = (hsn) => {
  switch (hsn) {
    case 7113: return 3;   
    case 7114: return 3;   
    case 7117: return 12;
    case 7107: return 10;  
    default: return 7117;     // Unknown HSN
  }
};
const hsn = getTaxRateByHSN(item?.hsn);

              return (
                <tr key={i}>
                  <td className="border border-gray-300 px-2 py-1 text-center">{hsn || "-"}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{taxRate}%</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {currency}{format(taxable)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {currency}{format(igst)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {currency}{format(cgst)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {currency}{format(sgst)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>



      <div className="mt-2 border-t border-gray-600 pt-4 text-xs text-gray-700 leading-relaxed">
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm font-semibold">
              Invoice Total in Words: _______________________
            </p>
          </div>
          <div className="text-right">
            <div >
              location & website
            </div>
          </div>
        </div>
      </div>



      {/* Declaration and Terms */}
      <div className="mt-2 border-t border-gray-600 pt-4 text-xs text-gray-700 leading-relaxed">
        <div className="flex justify-between">
          <div className="w-1/2">
            <h4 className="font-semibold uppercase mb-2">Declaration</h4>
            <p>
              1. Subject to Hosur Jurisdiction. <br />
              2. Terms & Conditions are subject to our Trade Policy. <br />
              3. In case of delayed payment, 1.5% interest will be charged per month. <br />
              4. Our risk & responsibility ceases after delivery of goods.
            </p>
          </div>

          <div className="w-1/2 text-right">
            <p className="font-semibold">For PRECIOUS CRAFT</p>
            <br></br>
            <br></br>
            <br></br>
            <p className="font-semibold">
              Authorised Signatory
            </p>
          </div>
        </div>
        <hr className="border-t border-gray-600 my-4" />
        <p className="text-center mt-4 text-sm font-semibold">
          Thank You for Business with Us!
        </p>
      </div>
    </div>
  );
};

export default Invoice;
