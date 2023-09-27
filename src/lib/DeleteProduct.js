"use client";

import { BiTrashAlt } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteProduct({ id }) {
  const deleteRecord = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/products/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      if (res.status) {
        const notify = () => {
          toast("Data Deleted Successfully....");
        };
        notify();
        setTimeout(() => {
          window.location = "/products";
        }, 1000);
      } else {
        console.log("record not selected...");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <button onClick={deleteRecord}>
      <ToastContainer />
      <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
    </button>
  );
}
