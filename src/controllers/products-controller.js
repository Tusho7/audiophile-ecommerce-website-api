import Product from "../models/products.js";

export const getAllProducts = async (req, res) => {
  const data = await Product.find();
  const newData = data.map((document) => {
    return {
      id: document.id,
      slug: document.slug,
      name: document.name,
      image: document.image,
      category: document.category,
      categoryImage: document.categoryImage,
      new: document.new,
      price: document.price,
      description: document.description,
      features: document.features,
      includes: document.includes.map((include) => {
        return {
          id: include.id,
          quantity: include.quantity,
          item: include.item,
        };
      }),
      gallery: document.gallery,
      others: document.others.map((other) => {
        return {
          id: other.id,
          slug: other.slug,
          name: other.name,
          image: other.image,
        };
      }),
    };
  });
  return res.json(newData);
};
