// import logo from "@/app/logo.png";
import Link from "next/link";
export default function Header() {
  return (
    <div className="h-16 bg-black shadow text-white">
      <header>
        <nav className="flex items-center justify-between p-4">
          <div>
            {/* <img src={logo} alt="logo" /> */}
            <h1 className="text-2xl">My sample Project</h1>
          </div>
          <div className="flex items-center justify-between gap-5">
            <Link href={"/"} className="text-xl">Home</Link>
            <Link href={"/addproduct"} className="text-xl">ADD Product</Link>
            <Link href={"/products"} className="text-xl">All Products</Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
