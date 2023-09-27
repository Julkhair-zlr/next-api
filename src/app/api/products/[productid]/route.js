import { connectionStr } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  try {
    const productId = content.params.productid;
    const filter = { _id: productId };
    const payload = await request.json();
    await mongoose.connect(connectionStr);
    const res = await Product.findOneAndUpdate(filter, payload);
    return NextResponse.json({ status: true, result: res });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: `data is not updated. ${error.message}`,
    });
  }
}

export async function GET(request, content) {
  try {
    const productId = content.params.productid;
    const record = { _id: productId };
    await mongoose.connect(connectionStr);
    const res = await Product.findById(record);
    return NextResponse.json({ status: true, result: res });
  } catch (error) {}
}

export async function DELETE(request, content) {
  try {
    const productId = content.params.productid;
    const productRecord = { _id: productId };
    await mongoose.connect(connectionStr);
    const deletedProduct = await Product.deleteOne(productRecord).exec();
    return NextResponse.json({ status: true, result: deletedProduct });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: `record is not deleted..${error.message}`,
    });
  }
}
