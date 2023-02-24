import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: Schema.Types.Number,
  },
  slug: {
    type: Schema.Types.String,
  },
  name: {
    type: Schema.Types.String,
  },
  image: {
    mobile: {
      type: Schema.Types.String,
    },
    tablet: {
      type: Schema.Types.String,
    },
    desktop: {
      type: Schema.Types.String,
    },
  },
  category: {
    type: Schema.Types.String,
  },
  categoryImage: {
    mobile: {
      type: Schema.Types.String,
    },
    tablet: {
      type: Schema.Types.String,
    },
    desktop: {
      type: Schema.Types.String,
    },
  },
  new: {
    type: Schema.Types.Boolean,
  },
  price: {
    type: Schema.Types.Number,
  },
  description: {
    type: Schema.Types.String,
  },
  features: {
    type: Schema.Types.String,
  },
  includes: [
    {
      quantity: {
        type: Schema.Types.Number,
      },
      item: {
        type: Schema.Types.String,
      },
    },
  ],
  gallery: {
    first: {
      mobile: Schema.Types.String,
      tablet: Schema.Types.String,
      desktop: Schema.Types.String,
    },
    second: {
      mobile: Schema.Types.String,
      tablet: Schema.Types.String,
      desktop: Schema.Types.String,
    },
    third: {
      mobile: Schema.Types.String,
      tablet: Schema.Types.String,
      desktop: Schema.Types.String,
    },
  },
  others: [
    {
      slug: {
        type: Schema.Types.String,
      },
      name: {
        type: Schema.Types.String,
      },
      image: {
        mobile: Schema.Types.String,
        tablet: Schema.Types.String,
        desktop: Schema.Types.String,
      },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
