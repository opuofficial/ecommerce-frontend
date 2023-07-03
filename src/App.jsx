import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ProductsContextProvider from "./context/productsContextProvider";
import CartContextProvider from "./context/cartContextProvider";
import Navbar from "./components/navbar";
import Cart from "./pages/cart";
import NotFound from "./pages/notFound";
import ProductDetails from "./pages/productDetails";
import Footer from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <ProductsContextProvider>
        <CartContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartContextProvider>
      </ProductsContextProvider>
    </BrowserRouter>
  );
}

export default App;
