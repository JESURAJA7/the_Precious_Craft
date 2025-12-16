require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");

const verifyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        // 1. Find Women Category
        const categories = await Category.find({
            $or: [
                { "name.en": { $regex: "Women", $options: "i" } },
                { slug: { $regex: "women", $options: "i" } }
            ]
        });

        console.log(`Found ${categories.length} categories matching 'Women'`);
        categories.forEach(c => console.log(`Category: ${c.name.en} (Slug: ${c.slug}) ID: ${c._id}`));

        if (categories.length === 0) {
            console.log("No 'Women' category found.");
            process.exit(0);
        }

        const categoryId = categories[0]._id;
        console.log(`Women Category ID: ${categoryId}`);

        // 2. Find Child Categories
        const children = await Category.find({ parentId: categoryId });
        console.log(`Found ${children.length} child categories:`, children.map(c => `${c.name.en} (${c._id})`));

        const allCategoryIds = [categoryId, ...children.map(c => c._id)];

        // 3. What categories DO have products?
        const totalProducts = await Product.countDocuments({});
        console.log(`Total Products in DB: ${totalProducts}`);

        const sampleProducts = await Product.find({})
            .select("title category categories tag")
            .populate("category", "name")
            .populate("categories", "name")
            .limit(10);

        console.log("Sample Products & Categories:");
        sampleProducts.forEach(p => {
            const catName = p.category ? p.category.name?.en : "N/A";
            // const catListNames = p.categories ? p.categories.map(c => c.name?.en).join(", ") : "";
            console.log(`- ${p.title?.en}: Cat='${catName}', Tags='${p.tag}'`);
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
};

verifyData();
