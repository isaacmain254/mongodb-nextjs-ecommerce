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
    required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: ["electonics", "Accessories", "Fashion"],
      message: "Please select the correct category",
    },
  },
  images: [String],
  seller: {
    type: String,
  },
  stock: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
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
const Brand =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Brand;
