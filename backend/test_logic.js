
const categories = [
    // ================= WOMENS =================
    {
        _id: "100000000000000000000001",
        status: "show",
        name: { en: "Womens" },
        description: { en: "Women's Jewelry" },
        icon: "...",
    },
    // --- Earrings (Womens) ---
    {
        _id: "100000000000000000000101",
        parentId: "100000000000000000000001",
        parentName: "Womens",
        status: "show",
        name: { en: "Earrings" },
        description: { en: "Earrings" },
    },
    // Earrings Sub
    { _id: "100000000000000000000102", parentId: "100000000000000000000101", parentName: "Earrings", status: "show", name: { en: "Stud" } },
];

const readyToParentAndChildrenCategory = (categories, parentId = null) => {
    const categoryList = [];
    let Categories;
    if (parentId == null) {
        Categories = categories.filter((cat) => !cat.parentId);
    } else {
        const parentIdString = String(parentId);
        Categories = categories.filter((cat) => String(cat.parentId) === parentIdString);
    }

    for (let cate of Categories) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            children: readyToParentAndChildrenCategory(categories, cate._id),
        });
    }

    return categoryList;
};

const tree = readyToParentAndChildrenCategory(categories);
console.log(JSON.stringify(tree, null, 2));

if (tree.length === 0) {
    console.error("Tree is empty!");
    process.exit(1);
}

if (tree[0].children.length === 0) {
    console.error("Womens has no children!");
    process.exit(1);
}

console.log("Success!");
