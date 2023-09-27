"use client";

import DeleteProduct from "@/lib/DeleteProduct";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import Header from "../header/page";

const getProducts = async () => {
  try {
    let res = await fetch("http://localhost:3000/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    if (res.status) {
      res = await res.json();
      return res;
    } else {
      // Handle errors
      console.error("Failed to retrieve data.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default async function Page() {
  const products = await getProducts();

  return (
    <div>
      <Header />
      <h1 className="font-bold text-5xl mt-3 text-center">Add Products</h1>
      <table className="min-w-full table-auto mt-6">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-300">Product Name</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Product Price</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Product Color</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Product Company</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Product Category</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.result &&
            products?.result.map((product, i) => {
              return (
                <tr className="bg-gray-100 text-center" key={`product_${i}`}>
                  <td className="px-16 py-2 flex flex-row items-center">
                    <img src={"#"} alt="" />
                    <span className="text-center ml-2 font-semibold">
                      {product?.name || "Unknown"}
                    </span>
                  </td>
                  <td className="px-16 py-2">
                    <span>{product?.price || "Unknown"}</span>
                  </td>
                  <td className="px-16 py-2">
                    <span>{product?.color || "Unknown"}</span>
                  </td>
                  <td className="px-16 py-2">
                    <span>{product?.company || "Unknown"}</span>
                  </td>
                  <td className="px-16 py-2">
                    <span>{product?.category || "Unknown"}</span>
                  </td>
                  <td className="px-16 py-2 flex justify-around gap-5">
                    <button className="cursor-pointer">
                      <Link href={"products/" + product?._id}>
                        <BiEdit size={25} color={"rgb(34,197,94)"} />
                      </Link>
                    </button>
                    {/* <button className="cursor-pointer">
                    <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
                  </button> */}
                    <DeleteProduct id={product?._id} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
