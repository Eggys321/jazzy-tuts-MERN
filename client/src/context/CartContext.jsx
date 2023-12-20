import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const cartItemsFromLocalStorage =
  JSON.parse(localStorage.getItem("cart")) || [];

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState(cartItemsFromLocalStorage);
  // let quantity = 1
  let handleAddToCart = (product) => {
    const productSelected = cart.find(
      (singleCart) => singleCart._id === product._id
    );
    if (productSelected) {
      setCart(
        cart.map((oneItem) =>
          oneItem._id === product._id
            ? {
                ...productSelected,
                quantity: productSelected.quantity + 1,
              }
            : oneItem
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // function below is for handleIncrease for d cart section
  function handleIncrease(product) {
    const productSelected = cart.find(
      (singleCartItem) => singleCartItem._id === product._id
    )
    if (productSelected) {
      setCart(
        cart.map((oneItem) =>
          oneItem._id === product._id
            ? { ...productSelected, quantity: productSelected.quantity + 1 }
            : oneItem
        )
      )
    }
  }
// function below is for handleDecrease for d cart section
function handleDecrease(product) {
    const productSelected = cart.find(
      (singleCartItem) => singleCartItem._id === product._id
    )
    if (productSelected.quantity === 1) {
      setCart(
        cart.map((dd) =>
          dd._id === product._id
            ? { ...productSelected, quantity: productSelected.quantity = 1 }
            : dd
        )
      )
    } else {
      setCart(
        cart.map((dd) =>
          dd._id === product._id
            ? { ...productSelected, quantity: productSelected.quantity - 1 }
            : dd
        )
      )
    }
  }
  // funtion to delete item
  function removeItem (id){
    let remove = cart.filter((cartItx)=> cartItx._id !== id );
    setCart(remove)
  }
   // reduce ftn for d cart section
   const totalPrice = cart.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  )
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem('totalPrice',JSON.stringify(totalPrice))
  }, [cart]);

  return <CartContext.Provider value={{
    handleAddToCart,
    cart,
    setCart,
    handleIncrease,
    handleDecrease,
    totalPrice,
    removeItem
    }}>
        {children}

  </CartContext.Provider>;
};

export default CartContext;