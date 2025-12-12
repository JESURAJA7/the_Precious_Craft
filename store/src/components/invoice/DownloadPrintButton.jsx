// "use client";

// import { useRef, useState, useEffect } from "react";
// import { useReactToPrint } from "react-to-print";
// import dynamic from "next/dynamic";
// import { Download, Printer } from "lucide-react";
// import { PDFDownloadLink } from "@react-pdf/renderer";

// // internal imports
// import Invoice from "@components/invoice/Invoice";
// import { Button } from "@components/ui/button";
// import { useSetting } from "@context/SettingContext";
// import useUtilsFunction from "@hooks/useUtilsFunction";
// import InvoicePDF from "@components/invoice/InvoiceForDownload";

// const DownloadPrintButton = ({ data }) => {
//   const { globalSetting, storeCustomization } = useSetting();
//   const targetRef = useRef(null);
//   const { showingTranslateValue } = useUtilsFunction();
//   const dashboard = storeCustomization?.dashboard;

//   const handlePrintInvoice = useReactToPrint({
//     contentRef: targetRef,
//     documentTitle: `Invoice-${data?.invoice}`,
//   });

//   // Flag to only render PDFDownloadLink after client mount
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // console.log("globalSetting", globalSetting, "data", data);

//   return (
//     <>
//       <div className="bg-purple-100 rounded-md mb-5 px-4 py-3">
//         <label>
//           {showingTranslateValue(dashboard?.invoice_message_first)}{" "}
//           <span className="font-bold text-purple-600">
//             {data?.user_info?.name},
//           </span>{" "}
//           {showingTranslateValue(dashboard?.invoice_message_last)}
//         </label>
//       </div>

//       <Invoice data={data} printRef={targetRef} globalSetting={globalSetting} />

//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="bg-white p-8 rounded-b-xl">
//           <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between invoice-btn">
//             {isClient && (
//               <PDFDownloadLink
//                 document={
//                   <InvoicePDF data={data} globalSetting={globalSetting} />
//                 }
//                 fileName={`Invoice-${data.invoice}.pdf`}
//               >
//                 {({ loading }) => (
//                   <Button variant="create">
//                     {loading ? "Generating..." : "Download PDF"}{" "}
//                     <Download className="ml-2" />
//                   </Button>
//                 )}
//               </PDFDownloadLink>
//             )}

//             <Button onClick={handlePrintInvoice} variant="import">
//               {showingTranslateValue(dashboard?.print_button)}{" "}
//               <span className="ml-2">
//                 <Printer />
//               </span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // export default dynamic(() => Promise.resolve(DownloadPrintButton), {
// //   ssr: false,
// // });
// export default DownloadPrintButton;

// import axios from "axios";

// const sendInvoiceEmail = async () => {
//   try {
//     const invoiceData = {
//       invoice: "INV001",
//       user_info: {
//         name: "John Doe",
//         email: "johndoe@example.com",
//         address: "123 Street",
//         contact: "9999999999"
//       },
//       cart: [
//         { name: "Gold Ring", quantity: 1, price: 5000, hsn: 7113 }
//       ],
//       total: 5000,
//       createdAt: new Date()
//     };

//     const response = await axios.post("/api/v1/invoice/email", invoiceData);

//     console.log(response.data.message); // "Invoice emailed successfully!"
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Example: Button to send email
// <button onClick={sendInvoiceEmail}>Send Invoice</button>


"use client";

import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Download, Printer, Mail } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";

// internal imports
import Invoice from "@components/invoice/Invoice";
import { Button } from "@components/ui/button";
import { useSetting } from "@context/SettingContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import InvoicePDF from "@components/invoice/InvoiceForDownload";

const DownloadPrintButton = ({ data }) => {
  const { globalSetting, storeCustomization } = useSetting();
  const targetRef = useRef(null);
  const { showingTranslateValue } = useUtilsFunction();
  const dashboard = storeCustomization?.dashboard;

  const handlePrintInvoice = useReactToPrint({
    contentRef: targetRef,
    documentTitle: `Invoice-${data?.invoice}`,
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // ⭐ New: Send Invoice Email
  const sendInvoiceEmail = async () => {
    try {
      // Convert Invoice JSX → HTML string
      const invoiceHtml = ReactDOMServer.renderToString(
        <Invoice data={data} globalSetting={globalSetting} />
      );

      const payload = {
        to: data?.user_info?.email,
        subject: `Invoice #${data?.invoice}`,
        html: invoiceHtml,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/email/send`,
        payload
      );

      alert("Invoice emailed successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send invoice email");
    }
  };

  return (
    <>
      <div className="bg-purple-100 rounded-md mb-5 px-4 py-3">
        <label>
          {showingTranslateValue(dashboard?.invoice_message_first)}{" "}
          <span className="font-bold text-purple-600">
            {data?.user_info?.name},
          </span>{" "}
          {showingTranslateValue(dashboard?.invoice_message_last)}
        </label>
      </div>

      <Invoice data={data} printRef={targetRef} globalSetting={globalSetting} />

      <div className="bg-white rounded-lg shadow-sm">
        <div className="bg-white p-8 rounded-b-xl">
          <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-4 justify-between invoice-btn">

            {/* Download PDF */}
            {isClient && (
              <PDFDownloadLink
                document={
                  <InvoicePDF data={data} globalSetting={globalSetting} />
                }
                fileName={`Invoice-${data.invoice}.pdf`}
              >
                {({ loading }) => (
                  <Button variant="create">
                    {loading ? "Generating..." : "Download PDF"}
                    <Download className="ml-2" />
                  </Button>
                )}
              </PDFDownloadLink>
            )}

            {/* Print Invoice */}
            <Button onClick={handlePrintInvoice} variant="import">
              {showingTranslateValue(dashboard?.print_button)}
              <Printer className="ml-2" />
            </Button>

            {/* ⭐ NEW — Send Invoice Email */}
            <Button onClick={sendInvoiceEmail} variant="default">
              Send Email
              <Mail className="ml-2" />
            </Button>

          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPrintButton;
