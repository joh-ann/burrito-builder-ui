import { useState } from "react";

function OrderForm({ handleOrders }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "") {
      setError("Please enter a name");
      return;
    }

    if (ingredients.length === 0) {
      setError("Select at least one ingredient");
      return;
    }

    fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, ingredients: ingredients })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        console.error("Failed to submit")
        setError("Failed to submit order")
      }
    })
    .then((newOrder) => {
      handleOrders(newOrder)
      clearInputs()
    })
    .catch((error) => {
      console.error("Error submitting order:", error)
      setError("Error submitting order")
    })
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
    setError(null);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const handleIngredientClick = (e, ingredient) => {
    e.preventDefault();
    const updatedIngredients = ingredients.includes(ingredient)
      ? ingredients.filter((item) => item !== ingredient)
      : [...ingredients, ingredient]

    setIngredients(updatedIngredients)
    setError(null)
  }

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => handleIngredientClick(e, ingredient)}
        className={ingredients.includes(ingredient) ? "selected" : ""}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      {error && <p className="form-error">{error}</p>}

      <button className="submit-order-btn" type="button" onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
