
require("dotenv").config();
const { connectDB } = require("./config/db");
const Category = require("./models/Category");

const testDB = async () => {
    try {
        await connectDB();
        const count = await Category.countDocuments();
        console.log("Total Categories:", count);

        if (count > 0) {
            const roots = await Category.find({ parentId: { $exists: false } });
            console.log("Root Categories (No parentId):", roots.map(c => c.name.en));

            const roots2 = await Category.find({ parentId: null });
            console.log("Root Categories (parentId null):", roots2.map(c => c.name.en)); // Should be 0 based on my seed

            const womens = await Category.findOne({ "name.en": "Womens" });
            if (womens) {
                const children = await Category.find({ parentId: womens._id });
                console.log("Children of Womens:", children.length);
            } else {
                console.log("Womens category not found!");
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("DB Error:", error);
        process.exit(1);
    }
};

testDB();
