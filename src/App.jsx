import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  purchaseProduct,
  sellProduct,
} from "./services/productService";
import ProductCard from "./Component/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
  });
  const [amounts, setAmounts] = useState({});

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data); // Update state with the fetched products
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle amount changes for purchase and sell
  const handleAmountChange = (id, value) => {
    setAmounts({ ...amounts, [id]: value });
  };

  // Add new product to the database
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.name || formData.quantity <= 0 || formData.price <= 0) {
      alert("Please fill in all the fields correctly.");
      return;
    }

    try {
      // Add product using the service
      const newProduct = await addProduct(formData);
      setProducts([...products, newProduct]); // Add the new product to the state
      setFormData({ name: "", quantity: 0, price: 0, description: "" }); // Clear the form after adding
    } catch (error) {
      console.error("Error adding product", error);
      alert("There was an issue adding the product.");
    }
  };

  // Handle product purchase
  const handlePurchase = async (id) => {
    const amount = parseInt(amounts[id]);
    if (!isNaN(amount) && amount > 0) {
      await purchaseProduct(id, amount);
      fetchProducts();
      setAmounts({ ...amounts, [id]: "" });
    }
  };

  // Handle product sale
  const handleSell = async (id) => {
    const amount = parseInt(amounts[id]);
    if (!isNaN(amount) && amount > 0) {
      await sellProduct(id, amount);
      fetchProducts();
      setAmounts({ ...amounts, [id]: "" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Inventory Management
      </h1>

      {/* Add Product Form */}
      <form
        className="bg-gray-100 p-4 rounded mb-8"
        onSubmit={handleAddProduct}
      >
        <h2 className="text-2xl mb-2">Add Product</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            amount={amounts[product._id] || ""}
            onAmountChange={handleAmountChange}
            onPurchase={handlePurchase}
            onSell={handleSell}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
