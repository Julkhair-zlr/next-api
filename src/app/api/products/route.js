import { connectionStr } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Getting data from mongoDB
// export async function GET() {
//   try {
//     await mongoose.connect(connectionStr);
//     const data = await Product.find();
//     return NextResponse.json({ status: true, result: data });
//   } catch (error) {
//     return NextResponse.json({ status: false, message: error.message });
//   }
// }

// export async function POST() {
//   try {
//     await mongoose.connect(connectionStr);
//     // static data
//     const product = Product({
//       name: "Note 10",
//       price: "30000",
//       company: "Samsung",
//       color: "red",
//       category: "mobile",
//     });
//     const res = await product.save();
//     return NextResponse.json({ status: true, result: res });
//   } catch (error) {
//     return NextResponse.json({ status: false, message: error.message });
//   }
// }
export async function POST(request) {
  const payload = await request.json();
  try {
    await mongoose.connect(connectionStr);
    // data recived from postman
    const product = Product(payload);
    const res = await product.save();
    return NextResponse.json({ status: true, result: res });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message });
  }
}

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const res = await Product.find();
    return NextResponse.json({ status: true, result: res });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message });
  }
}
