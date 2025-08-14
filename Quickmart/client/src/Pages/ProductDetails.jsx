import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const { products, currency, addToCart, navigate } = useAppContext();
  const { id } = useParams();

  const [relatedProduct, setRelatedProduct] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category && item._id !== product._id
      );
      setRelatedProduct(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  return (
    product && (
      <div className="mt-12">
        <p>
          <Link to={"/"}>Home</Link> /<Link to={"/Products"}>Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-primary"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image) => (
                <div
                  key={image}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt="Thumbnail" />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={thumbnail} alt="Selected product" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    className="md:w-4 w-3.5"
                  />
                ))}
              <p className="text-base ml-2">(4)</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: {currency} {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency} {product.offerprice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc) => (
                <li key={desc}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-medium">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:grid-cols-4 mt-6 w-full">
            {relatedProduct
              .filter((item) => item.inStock)
              .map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mx-auto cursor-pointer px-12  my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
          >
            See more
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
