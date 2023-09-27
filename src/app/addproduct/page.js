"use client";

import { useState } from "react";
import "../style.css";
import Header from "@/app/header/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    color: "",
    company: "",
    category: "",
  });
  const router = useRouter()
  const handleChange = (e) => {
    setProduct((pro) => ({
      ...pro,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async () => {
    // if (Object.keys(product).length === 0) return "Don't have a prodect data";
    const isProductEmpty = Object.values(product).some((value) => value === "");
    if (isProductEmpty) {
      console.error("Please fill in all the product details.");
      return;
    }
    // if (Object.keys(product).length > 0) {
    try {
      let res = await fetch(`http://localhost:3000/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      res = await res.json();
      if (res.status) {
        const notify = () => {
          toast("Data Added Successfully....");
        };
        notify();
        setProduct({
          name: "",
          price: "",
          color: "",
          company: "",
          category: "",
        });
        router.push('/products')
        console.log("Product added successfully.");
      } else {
        console.error("Failed to add product.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // };
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-5 justify-between ">
        <h1 className="font-bold text-5xl mt-3">Add Products</h1>
        <div className="border-2 border-gray-400 w-2/6 rounded-md p-5 shadow-2xl">
          <div>
            Name ::&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <input
              name="name"
              type="text"
              value={product.name}
              placeholder="Enter yor Product Name..."
              className="input"
              onChange={handleChange}
            />
          </div>
          <div>
            Price :: &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <input
              name="price"
              type="text"
              value={product.price}
              placeholder="Enter yor Product Price..."
              className="input"
              onChange={handleChange}
            />
          </div>
          <div>
            Color :: &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <input
              name="color"
              type="text"
              value={product.color}
              placeholder="Enter yor Product Color..."
              className="input"
              onChange={handleChange}
            />
          </div>
          <div>
            Company :: &nbsp; &nbsp;
            <input
              type="text"
              name="company"
              value={product.company}
              placeholder="Enter yor Product Company Name..."
              className="input"
              onChange={handleChange}
            />
          </div>
          <div>
            Category :: &nbsp; &nbsp;
            <input
              name="category"
              type="text"
              value={product.category}
              placeholder="Enter yor Product Category..."
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3">
            <button
              className="btn w-3/6 border-2 px-4 py-2 border-blue-500 rounded-lg hover:bg-green-600 hover:text-white font-bold"
              onClick={handleClick}
            >
              Add Product
            </button>
            <button
              className="btn w-3/6 border-2 px-4 py-2 border-blue-500 rounded-lg hover:bg-red-500 hover:text-white font-bold"
              onClick={() => {
                setProduct({
                  name: "",
                  price: "",
                  color: "",
                  company: "",
                  category: "",
                });
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
