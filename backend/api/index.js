require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const path = require("path");
// const http = require("http");
// const { Server } = require("socket.io");

const { connectDB } = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const reviewRoutes = require("../routes/reviewRoutes");
const customerRoutes = require("../routes/customerRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const attributeRoutes = require("../routes/attributeRoutes");
const settingRoutes = require("../routes/settingRoutes");
const currencyRoutes = require("../routes/currencyRoutes");
const languageRoutes = require("../routes/languageRoutes");
const notificationRoutes = require("../routes/notificationRoutes");
const pricingEngineRoutes = require("../routes/pricingEngine");
const { isAuth, isAdmin } = require("../config/auth");
// import email_invoiceRoutes from "./routes/email_invoiceRoutes.js";



const dotenv = require("dotenv");

dotenv.config();





// const {
//   getGlobalSetting,
//   getStoreCustomizationSetting,
// } = require("../lib/notification/setting");

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.options("*", cors()); // include before other routes
app.use(cors());

//root route
app.get("/api", (req, res) => {
  res.send("App works properly!");
});

//this for route will need for store front, also for admin dashboard
app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/reviews/", isAuth, reviewRoutes);
app.use("/api/v1/category/", categoryRoutes);
app.use("/api/v1/coupon/", couponRoutes);
app.use("/api/v1/customer/", customerRoutes);
app.use("/api/v1/order/", isAuth, customerOrderRoutes);
app.use("/api/v1/attributes/", attributeRoutes);
app.use("/api/v1/setting/", settingRoutes);
app.use("/api/v1/currency/", isAuth, currencyRoutes);
app.use("/api/v1/language/", languageRoutes);
app.use("/api/v1/notification/", isAuth, notificationRoutes);
app.use("/api/v1/pricing/", isAuth, pricingEngineRoutes);


//if you not use admin dashboard then these two route will not needed.
app.use("/api/v1/admin/", adminRoutes);
app.use("/api/v1/orders/", isAuth, orderRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

// Serve static files from the "dist" directory
app.use("/static", express.static("public"));

// Serve the index.html file for all routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//health check
app.get("/api/health", (req, res) => {
  res.send("App works properly!");
});

const PORT = process.env.PORT || 5000;

// const server = http.createServer(app);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// set up socket
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:4100",
//       "https://admin-kachabazar.vercel.app",
//       "https://dashtar-admin.vercel.app",
//       "https://kachabazar-store.vercel.app",
//       "https://kachabazar-admin.netlify.app",
//       "https://dashtar-admin.netlify.app",
//       "https://kachabazar-store-nine.vercel.app",
//     ], //add your origin here instead of this
//     methods: ["PUT", "GET", "POST", "DELETE", "PATCH", "OPTIONS"],
//     credentials: false,
//     transports: ["websocket"],
//   },
// });

// io.on("connection", (socket) => {
//   // console.log(`Socket ${socket.id} connected!`);

//   socket.on("notification", async (data) => {
//     console.log("data", data);
//     try {
//       let updatedData = data;

//       if (data?.option === "storeCustomizationSetting") {
//         const storeCustomizationSetting = await getStoreCustomizationSetting(
//           data
//         );
//         updatedData = {
//           ...data,
//           storeCustomizationSetting: storeCustomizationSetting,
//         };
//       }
//       if (data?.option === "globalSetting") {
//         const globalSetting = await getGlobalSetting(data);
//         updatedData = {
//           ...data,
//           globalSetting: globalSetting,
//         };
//       }
//       io.emit("notification", updatedData);
//     } catch (error) {
//       console.error("Error handling notification:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`Socket ${socket.id} disconnected!`);
//   });
// });
// server.listen(PORT, () => console.log(`server running on port ${PORT}`));


// const invoiceRoutes = require("../routes/invoiceRoutes");
// app.use("/api/v1/invoiceRoutes", invoiceRoutes);


const emailRoutes = require("../routes/emailRoutes");

const errorHandler = require("../middlewares/errorMiddleware");

app.use("/api/v1/email", emailRoutes);

