// require("dotenv").config();
// const fs = require("fs");

// const products = require("../utils/products-old");

// const updateManyProducts = async () => {
//   try {
//     console.log("process running!");

//     console.log("products", products.length);
//     const result = products?.map((el) => {
//       const newObj = {
//         slug: el.slug,
//         sku: el.sku,
//         barcode: el.barcode,
//         productId: el.productId,

//         title: el.title,
//         description: el.description,
//         categories: el.categories,
//         category: el.category,
//         image: el.image,
//         stock: el.stock,
//         status: el.status,
//         isCombination: el.isCombination,
//         prices: {
//           discount: "0",
//           originalPrice: el.prices.originalPrice,
//           price: el.prices.price,
//         },
//         variants: el.variants,
//         tag: el.tag,
//       };
//       return newObj;
//     });

//     fs.writeFileSync("data.json", JSON.stringify(result));
//     console.log("data updated successfully!", result);
//     process.exit();
//   } catch (err) {
//     console.log("error", err);
//     process.exit(1);
//   }
// };

// updateManyProducts();


require("dotenv").config();
const fs = require("fs");

const products = require("../utils/products-old");

const updateManyProducts = async () => {
  try {
    console.log("process running!");
    console.log("products", products.length);

    const result = products?.map((el) => {
      const newObj = {
        slug: el.slug,
        sku: el.sku,
        barcode: el.barcode,
        productId: el.productId,

        title: el.title,
        description: el.description,
        categories: el.categories,
        category: el.category,
        image: el.image,
        stock: el.stock,
        status: el.status,
        isCombination: el.isCombination,
        prices: {
          discount: "0",
          originalPrice: el.prices.originalPrice,
          price: el.prices.price,
        },
        variants: el.variants,
        tag: el.tag,
        weight: el.weight || 0, // <-- add weight, default 0 if not present
      };
      return newObj;
    });

    fs.writeFileSync("data.json", JSON.stringify(result, null, 2));
    console.log("data updated successfully!", result);
    process.exit();
  } catch (err) {
    console.log("error", err);
    process.exit(1);
  }
};

updateManyProducts();
