"use client";

import { useEffect, useState } from "react";
import "../../style.css";
import Header from "@/app/header/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
export default function Page({ params }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    color: "",
    company: "",
    category: "",
  });
  useEffect(() => {
    getProductDetails();
  }, []);
  const router = useRouter();
  const handleChange = (e) => {
    setProduct((pro) => ({
      ...pro,
      [e.target.name]: e.target.value,
    }));
  };
  const getProductDetails = async () => {
    try {
      let productId = params.editproduct;
      let productData = await fetch(
        "http://localhost:3000/api/products/" + productId
      );
      productData = await productData.json();
      if (productData.status) {
        setProduct({
          name: productData.result.name,
          price: productData.result.price,
          color: productData.result.color,
          company: productData.result.company,
          category: productData.result.category,
        });
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleClick = async () => {
    try {
      let productId = params.editproduct;
      let res = await fetch("http://localhost:3000/api/products/" + productId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      res = await res.json();
      if (res.status) {
        const notify = () => {
          toast("Data Updated Successfully....");
        };
        notify();
        setProduct({
          name: "",
          price: "",
          color: "",
          company: "",
          category: "",
        });
        router.push("/products");
        console.log("Product Updated successfully.");
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
      <div className="flex flex-col items-center gap-5 justify-between">
        <h1 className="font-bold text-5xl mt-6">Update Products</h1>
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
              Update Product
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
