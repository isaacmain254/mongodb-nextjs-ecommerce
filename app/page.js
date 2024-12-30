import Button from "@/components/Button";
import Item from "@/components/Item";
import Image from "next/image";
import OfficialMen from "@/public/images/officials-men-2.jpg";
import NikeSB from "@/public/images/nike-sb-3.jpg";
import Jordan11 from "@/public/images/jordan11-3.jpg";
import Link from "next/link";
import { getProducts } from "@/utils/fetchData";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <section className="w-full md:w-10/12 mx-auto  h-[85vh]">
        <div className="flex w-full mx-auto h-full items-center">
          <div className="w-full md:w-1/2 h-auto ml-0 lg:ml-9">
            <h1 className="font-semibold text-6xl py-6 font-serif opacity-80">
              Men Sneakers and shoes
            </h1>
            <p className="font-sans mb-9">
              Step into style and comfort with our premium collection of men’s
              shoes. From sleek formal wear to rugged casuals, find the perfect
              pair for every occasion. Explore exclusive deals and new arrivals,
              crafted to elevate your look. Shop now and redefine your stride.
            </p>
            <Button uri="/shop">SHOP NOW</Button>
          </div>
          <div className="hidden md:block w-1/2">
            <Image
              src="/images/black-boot.png"
              width={550}
              height={550}
              alt="men black boots outfit"
            />
          </div>
        </div>
      </section>

      {/* products array from the lib folder */}
      <section className="w-11/12 mx-auto my-9 h-auto bg-white py-3">
        <h3 className="text-center text-2xl font-sans my-6 ">NEW ARRIVALS</h3>
        <ul className="flex flex-wrap gap-12 justify-center mb-8 mt-3">
          {products.filter((product) => product.label === "new").length ? (
            products
              .filter((product) => product.label === "new")
              .slice(0, 4)
              .map((product) => (
                <li key={product._id}>
                  <Link href={`/product/${product.slug}`}>
                    <Item
                      rating={product.rating}
                      imageSrc={product.images[0]}
                      price={product.price}
                      title={product.title}
                      label={product.label}
                    />
                  </Link>
                </li>
              ))
          ) : (
            <div>There are no new products</div>
          )}
        </ul>
        <div className="flex justify-center">
          <Button uri="/shop">View All Products</Button>
        </div>
      </section>

      {/* featured products section */}
      <section className="w-11/12 mx-auto my-12 h-auto">
        <h3 className="text-center text-2xl font-sans my-6 ">
          FEATURED PRODUCTS
        </h3>
        <ul className="flex flex-wrap gap-12 justify-center mb-8 mt-3">
          {products.filter((product) => product.label === "featured").length ? (
            products
              .filter((product) => product.label === "featured")
              .slice(0, 4)
              .map((product) => (
                <li key={product._id}>
                  <Link href={`/product/${product.slug}`}>
                    <Item
                      rating={product.rating}
                      imageSrc={product.images[0]}
                      price={product.price}
                      title={product.title}
                      label={product.label}
                    />
                  </Link>
                </li>
              ))
          ) : (
            <div>There are no featured products</div>
          )}
        </ul>
        <div className="flex justify-center pb-3">
          <Button uri="/shop">View All Products</Button>
        </div>
      </section>

      {/* collection section */}
      <section className="w-full lg:w-11/12 mx-auto  h-auto my-12">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="w-full lg:w-1/2 h-72 hover:shadow-xl hover:shadow-sky-200 ">
            <div className="flex w-full h-full bg-sky-100">
              <div className="relative w-80">
                <Image
                  src={Jordan11}
                  fill={true}
                  alt="Desert boots"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center items-center">
                <p className="text-black text-6xl font-medium my-5">Sneakers</p>
                <Link
                  href="/shop"
                  className="text-xl text-black hover:text-gray-700 "
                >
                  View collections
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-72 hover:shadow-lg hover:shadow-red-100">
            <div className="flex w-full h-full bg-red-50">
              <div className="relative w-80">
                <Image
                  src={OfficialMen}
                  fill={true}
                  alt="Desert boots"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center items-center">
                <p className="text-black text-6xl font-medium my-5">
                  Official shoes
                </p>
                <Link
                  href="/shop"
                  className="text-xl text-black hover:text-gray-700"
                >
                  View collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* subscribe  to news letter */}
      <section className="w-11/12 mx-auto my-20 bg-white p-3">
        <div className="flex flex-col-reverse md:flex-row w-full gap-10">
          <div className="w-full md:w-2/3 flex flex-col gap-3">
            <h3 className="text-2xl">Nike SB </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A enim,
              accusantium asperiores corrupti assumenda nostrum voluptatibus
              voluptatum dolores quia, tenetur autem quis. Ut similique tenetur
              earum doloribus eos fugiat suscipit architecto, molestias amet
              labore natus eaque delectus expedita libero non praesentium
              tempore. Rem id corrupti laudantium necessitatibus voluptatibus
              voluptates natus ad perferendis? Suscipit ipsam labore voluptates
              expedita dolorum, temporibus harum.
            </p>
            <div>
              <Button uri="/shop">SHOP NOW</Button>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/3 relative">
            <Image
              src={NikeSB}
              fill={true}
              alt="Desert boots"
              className="object-cover "
            />
          </div>
        </div>
      </section>
    </>
  );
}

// Retrieve products from mongodb database
// async function getProducts() {
//   const data = await fetch("http://localhost:3000/api/products");
//   if (!data.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return data.json();
// }
