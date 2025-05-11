import React from "react";

const Bestproduct = () => {
  const products = [
    {
      id: 1,
      name: "Organic Beans",
      image: "https://www.shutterstock.com/image-photo/different-types-legumes-bowls-green-600nw-2129924219.jpg",
      description: "Freshly harvested organic beans, rich in nutrients.",
    },
    {
      id: 2,
      name: "Grains",
      image: "https://cdn.uc.assets.prezly.com/85c3d80d-7bf9-495c-8ff5-6015e5d581d7/Millets-Pintrest.jpg",
      description: "Pure Grains. Pure Energy.",
    },
    {
      id: 3,
      name: "splecial spices",
      image: "https://st2.depositphotos.com/2310373/5576/i/450/depositphotos_55762939-stock-photo-wooden-table-of-colorful-spices.jpg",
      description: "Top-quality spices with authentic flavor to enhance every meal.",
    },
    {
      id: 4,
      name: "Food oils",
      image: "https://t3.ftcdn.net/jpg/07/14/55/78/360_F_714557804_TbQn18C74bhCTUqBpV4dZ5tgHXFUVv9O.jpg",
      description: "Pure, high-quality food oils for healthy and delicious cooking.",
    },
    {
      id: 5,
      name: "Dry fruits ",
      image: "https://cdn.shopify.com/s/files/1/0144/6674/4377/files/TYPES_OF_NUTS_AND_SEEDS_AND_THEIR_HEALTH_BENEFITS_grande.jpeg?v=1555803575",
      description: "Rich, natural dry fruits to add flavor and nutrition to every recipe.",
    },
   
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
            Our Best Products
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Discover our top-selling and highest-rated items.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden "
            >
              <img
                className="w-full h-48 object-cover "
                src={product.image}
                alt={product.name}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <button className="mt-3 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
               Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestproduct;