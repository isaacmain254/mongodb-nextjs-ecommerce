import mongoose from "mongoose";
// const { Schema } = mongoose;

// product schema correspond to collection in the database
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: [
        "Sneakers",
        "Boots",
        "Official",
        "Loafers",
        "Scandals",
        "Casual",
      ],
      message: "Please select the correct category",
    },
  },
  images: [String],
  stock: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    enum: {
      values: ["new", "hot", "featured"],
      message: "Please select the correct label",
    },
  },
  size: {
    type: Number,
    required: [true, "Please enter product size"],
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

// convert string to slug
const stringToSlug = (str) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\W_]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// pre-save middleware
ProductSchema.pre("save", function (next) {
  // generate slug based on name
  const slug = stringToSlug(this.name);
  // set the generated slug
  this.slug = slug;
  next();
});

// Return Product model if it exist else create a new Product  model
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
