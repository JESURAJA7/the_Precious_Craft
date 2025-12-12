// import axios from "axios";

// export const sendEmail = async (emailData) => {
//   try {
//     const response = await axios.post("http://localhost:5055/api/v1/email/send", emailData);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error;
//   }
// };




import axios from "axios";

export const sendInvoiceEmail = async (payload) => {
  try {
    const res = await axios.post("http://localhost:5055/api/v1/email/send",
      payload
    );
    return res.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

