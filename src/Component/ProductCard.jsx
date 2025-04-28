function ProductCard({ product, amount, onAmountChange, onPurchase, onSell }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="mb-1">Quantity: {product.quantity}</p>
      <p className="mb-1">Price: ₹{product.price}</p>
      <p className="mb-2">{product.description}</p>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => onAmountChange(product._id, e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={() => onPurchase(product._id)}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
        >
          Purchase
        </button>
        <button
          onClick={() => onSell(product._id)}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full"
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
