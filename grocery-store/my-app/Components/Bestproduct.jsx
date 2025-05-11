import React from "react";

const Bestproduct = () => {
  const products = [
    {
      id: 1,
      name: "Organic Beans",
      image: "https://www.shutterstock.com/image-photo/different-types-legumes-bowls-green-600nw-2129924219.jpg",
      description: "Freshly harvested organic beans, rich in nutrients.",
      price: "$4.99",
      rating: 4,
    },
    {
      id: 2,
      name: "Grains",
      image: "https://cdn.uc.assets.prezly.com/85c3d80d-7bf9-495c-8ff5-6015e5d581d7/Millets-Pintrest.jpg",
      description: "Pure Grains. Pure Energy.",
      price: "$3.50",
      rating: 5,
    },
    {
      id: 3,
      name: "Special Spices",
      image: "https://st2.depositphotos.com/2310373/5576/i/450/depositphotos_55762939-stock-photo-wooden-table-of-colorful-spices.jpg",
      description: "Top-quality spices with authentic flavor to enhance every meal.",
      price: "$6.75",
      rating: 4,
    },
    {
      id: 4,
      name: "Food Oils",
      image: "https://t3.ftcdn.net/jpg/07/14/55/78/360_F_714557804_TbQn18C74bhCTUqBpV4dZ5tgHXFUVv9O.jpg",
      description: "Pure, high-quality food oils for healthy and delicious cooking.",
      price: "$7.25",
      rating: 3,
    },
    {
      id: 5,
      name: "Dry Fruits",
      image: "https://cdn.shopify.com/s/files/1/0144/6674/4377/files/TYPES_OF_NUTS_AND_SEEDS_AND_THEIR_HEALTH_BENEFITS_grande.jpeg?v=1555803575",
      description: "Rich, natural dry fruits to add flavor and nutrition to every recipe.",
      price: "$8.99",
      rating: 5,
    },
  ];

  const renderStars = (count) => {
    return "★".repeat(count) + "☆".repeat(5 - count);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Our Best Products
          </h2>
          <p className="mt-2 text-gray-600">
            Discover our top-selling and highest-rated items.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
            >
              <img
                className="w-full h-52 object-cover"
                src={product.image}
                alt={`Image of ${product.name}`}
              />
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2 mb-3">
                    <span className="text-green-600 font-bold text-lg">
                      {product.price}
                    </span>
                    <span className="text-yellow-500 text-sm">
                      {renderStars(product.rating)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                <button className="mt-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300">
                  Shop Now
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestproduct;
