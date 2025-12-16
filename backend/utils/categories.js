const categories = [
  // ================= WOMENS =================
  {
    _id: "100000000000000000000001",
    status: "show",
    name: { en: "Womens" },
    description: { en: "Women's Jewelry" },
    icon: "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
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
  { _id: "100000000000000000000103", parentId: "100000000000000000000101", parentName: "Earrings", status: "show", name: { en: "Drops" } },
  { _id: "100000000000000000000104", parentId: "100000000000000000000101", parentName: "Earrings", status: "show", name: { en: "Bali" } },
  { _id: "100000000000000000000105", parentId: "100000000000000000000101", parentName: "Earrings", status: "show", name: { en: "Jumka" } },
  { _id: "100000000000000000000106", parentId: "100000000000000000000101", parentName: "Earrings", status: "show", name: { en: "Fashion" } },

  // --- Rings (Womens) ---
  {
    _id: "100000000000000000000201",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Rings" },
    description: { en: "Rings" },
  },
  // Rings Sub
  { _id: "100000000000000000000202", parentId: "100000000000000000000201", parentName: "Rings", status: "show", name: { en: "Band Rings" } },
  { _id: "100000000000000000000203", parentId: "100000000000000000000201", parentName: "Rings", status: "show", name: { en: "Plain Ring" } },
  { _id: "100000000000000000000204", parentId: "100000000000000000000201", parentName: "Rings", status: "show", name: { en: "Stone Ring" } },
  { _id: "100000000000000000000205", parentId: "100000000000000000000201", parentName: "Rings", status: "show", name: { en: "Fashion" } },

  // --- Pendant (Womens) ---
  {
    _id: "100000000000000000000301",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Pendant" }, // Corrected spelling
    description: { en: "Pendants" },
  },
  // Pendant Sub
  { _id: "100000000000000000000302", parentId: "100000000000000000000301", parentName: "Pendant", status: "show", name: { en: "Plain" } },
  { _id: "100000000000000000000303", parentId: "100000000000000000000301", parentName: "Pendant", status: "show", name: { en: "Stone" } },
  { _id: "100000000000000000000304", parentId: "100000000000000000000301", parentName: "Pendant", status: "show", name: { en: "God" } },
  { _id: "100000000000000000000305", parentId: "100000000000000000000301", parentName: "Pendant", status: "show", name: { en: "Traditional" } },
  { _id: "100000000000000000000306", parentId: "100000000000000000000301", parentName: "Pendant", status: "show", name: { en: "Fashion" } }, // Corrected Fahion

  // --- Pendant Set (Womens) ---
  {
    _id: "100000000000000000000401",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Pendant Set" },
    description: { en: "Pendant Sets" },
  },
  // Pendant Set Sub
  { _id: "100000000000000000000402", parentId: "100000000000000000000401", parentName: "Pendant Set", status: "show", name: { en: "Plain" } },
  { _id: "100000000000000000000403", parentId: "100000000000000000000401", parentName: "Pendant Set", status: "show", name: { en: "Stone" } },

  // --- Chain (Womens) ---
  {
    _id: "100000000000000000000501",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Chain" },
    description: { en: "Chains" },
  },
  // Chain Sub
  { _id: "100000000000000000000502", parentId: "100000000000000000000501", parentName: "Chain", status: "show", name: { en: "18\"" } },
  { _id: "100000000000000000000503", parentId: "100000000000000000000501", parentName: "Chain", status: "show", name: { en: "20\"" } },
  { _id: "100000000000000000000504", parentId: "100000000000000000000501", parentName: "Chain", status: "show", name: { en: "24\"" } },
  { _id: "100000000000000000000505", parentId: "100000000000000000000501", parentName: "Chain", status: "show", name: { en: "30\"" } },

  // --- Bracelet (Womens) ---
  {
    _id: "100000000000000000000601",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Bracelet" },
    description: { en: "Bracelets" },
  },
  // Bracelet Sub
  { _id: "100000000000000000000602", parentId: "100000000000000000000601", parentName: "Bracelet", status: "show", name: { en: "Chain" } },
  { _id: "100000000000000000000603", parentId: "100000000000000000000601", parentName: "Bracelet", status: "show", name: { en: "Stone" } },
  { _id: "100000000000000000000604", parentId: "100000000000000000000601", parentName: "Bracelet", status: "show", name: { en: "Fashion" } },

  // --- Bangle (Womens) ---
  {
    _id: "100000000000000000000701",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Bangle" },
    description: { en: "Bangles" },
  },
  // Bangle Sub
  { _id: "100000000000000000000702", parentId: "100000000000000000000701", parentName: "Bangle", status: "show", name: { en: "Oval" } },
  { _id: "100000000000000000000703", parentId: "100000000000000000000701", parentName: "Bangle", status: "show", name: { en: "Plain" } },
  { _id: "100000000000000000000704", parentId: "100000000000000000000701", parentName: "Bangle", status: "show", name: { en: "Stone" } },
  { _id: "100000000000000000000705", parentId: "100000000000000000000701", parentName: "Bangle", status: "show", name: { en: "Screw" } },

  // --- Anklet (Womens) ---
  {
    _id: "100000000000000000000801",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Anklet" },
    description: { en: "Anklets" },
  },
  // Anklet Sub
  { _id: "100000000000000000000802", parentId: "100000000000000000000801", parentName: "Anklet", status: "show", name: { en: "Chain" } },
  { _id: "100000000000000000000803", parentId: "100000000000000000000801", parentName: "Anklet", status: "show", name: { en: "Stone" } },
  { _id: "100000000000000000000804", parentId: "100000000000000000000801", parentName: "Anklet", status: "show", name: { en: "Fashion" } },

  // --- Brouch (Womens) ---
  {
    _id: "100000000000000000000901",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Brooch" }, // Corrected Brouch
    description: { en: "Brooches" },
  },
  // Brooch Sub
  { _id: "100000000000000000000902", parentId: "100000000000000000000901", parentName: "Brooch", status: "show", name: { en: "Ball" } },
  { _id: "100000000000000000000903", parentId: "100000000000000000000901", parentName: "Brooch", status: "show", name: { en: "Stone" } },
  { _id: "100000000000000000000904", parentId: "100000000000000000000901", parentName: "Brooch", status: "show", name: { en: "Fashion" } },

  // --- Necklace (Womens) ---
  {
    _id: "100000000000000000001001",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Necklace" },
    description: { en: "Necklaces" },
  },
  // Necklace Sub
  { _id: "100000000000000000001002", parentId: "100000000000000000001001", parentName: "Necklace", status: "show", name: { en: "Half Necklace" } },
  { _id: "100000000000000000001003", parentId: "100000000000000000001001", parentName: "Necklace", status: "show", name: { en: "Necklace" } },
  { _id: "100000000000000000001004", parentId: "100000000000000000001001", parentName: "Necklace", status: "show", name: { en: "Long Necklace" } },
  { _id: "100000000000000000001005", parentId: "100000000000000000001001", parentName: "Necklace", status: "show", name: { en: "Choker" } }, // Corrected Chocker

  // --- Accessories & Parts (Womens) ---
  {
    _id: "100000000000000000001101",
    parentId: "100000000000000000000001",
    parentName: "Womens",
    status: "show",
    name: { en: "Accessories & Parts" },
    description: { en: "Accessories & Parts" },
  },

  // ================= MENS =================
  {
    _id: "200000000000000000000001",
    status: "show",
    name: { en: "Mens" },
    description: { en: "Men's Jewelry" },
    icon: "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
  },
  // --- Rings (Mens) ---
  {
    _id: "200000000000000000000101",
    parentId: "200000000000000000000001",
    parentName: "Mens",
    status: "show",
    name: { en: "Rings" },
    description: { en: "Rings" },
  },
  { _id: "200000000000000000000102", parentId: "200000000000000000000101", parentName: "Rings", status: "show", name: { en: "Band" } },
  { _id: "200000000000000000000103", parentId: "200000000000000000000101", parentName: "Rings", status: "show", name: { en: "Couple" } },
  { _id: "200000000000000000000104", parentId: "200000000000000000000101", parentName: "Rings", status: "show", name: { en: "Stone" } },
  { _id: "200000000000000000000105", parentId: "200000000000000000000101", parentName: "Rings", status: "show", name: { en: "God" } },
  { _id: "200000000000000000000106", parentId: "200000000000000000000101", parentName: "Rings", status: "show", name: { en: "Fashion" } },

  // --- Pendant (Mens) ---
  {
    _id: "200000000000000000000201",
    parentId: "200000000000000000000001",
    parentName: "Mens",
    status: "show",
    name: { en: "Pendant" },
    description: { en: "Pendants" },
  },
  { _id: "200000000000000000000202", parentId: "200000000000000000000201", parentName: "Pendant", status: "show", name: { en: "Plain" } },
  { _id: "200000000000000000000203", parentId: "200000000000000000000201", parentName: "Pendant", status: "show", name: { en: "Stone" } },
  { _id: "200000000000000000000204", parentId: "200000000000000000000201", parentName: "Pendant", status: "show", name: { en: "God" } },
  { _id: "200000000000000000000205", parentId: "200000000000000000000201", parentName: "Pendant", status: "show", name: { en: "Fashion" } },

  // --- Chain (Mens) ---
  {
    _id: "200000000000000000000301",
    parentId: "200000000000000000000001",
    parentName: "Mens",
    status: "show",
    name: { en: "Chain" },
    description: { en: "Chains" },
  },
  { _id: "200000000000000000000302", parentId: "200000000000000000000301", parentName: "Chain", status: "show", name: { en: "20\"" } },
  { _id: "200000000000000000000303", parentId: "200000000000000000000301", parentName: "Chain", status: "show", name: { en: "22\"" } },
  { _id: "200000000000000000000304", parentId: "200000000000000000000301", parentName: "Chain", status: "show", name: { en: "24\"" } },

  // --- Bracelet (Mens) ---
  {
    _id: "200000000000000000000401",
    parentId: "200000000000000000000001",
    parentName: "Mens",
    status: "show",
    name: { en: "Bracelet" },
    description: { en: "Bracelets" },
  },
  { _id: "200000000000000000000402", parentId: "200000000000000000000401", parentName: "Bracelet", status: "show", name: { en: "Plain" } },
  { _id: "200000000000000000000403", parentId: "200000000000000000000401", parentName: "Bracelet", status: "show", name: { en: "Stone" } },
  { _id: "200000000000000000000404", parentId: "200000000000000000000401", parentName: "Bracelet", status: "show", name: { en: "Fashion" } },


  // ================= KIDS =================
  {
    _id: "300000000000000000000001",
    status: "show",
    name: { en: "Kids" },
    description: { en: "Kid's Jewelry" },
    icon: "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
  },
  // --- Tops (Kids) ---
  {
    _id: "300000000000000000000101",
    parentId: "300000000000000000000001",
    parentName: "Kids",
    status: "show",
    name: { en: "Tops" },
    description: { en: "Tops" },
  },
  // --- Pendant Set (Kids) ---
  {
    _id: "300000000000000000000201",
    parentId: "300000000000000000000001",
    parentName: "Kids",
    status: "show",
    name: { en: "Pendant Set" },
    description: { en: "Pendant Sets" },
  },
  // --- Bangle (Kids) ---
  {
    _id: "300000000000000000000301",
    parentId: "300000000000000000000001",
    parentName: "Kids",
    status: "show",
    name: { en: "Bangle" },
    description: { en: "Bangles" },
  },
];

module.exports = categories;
