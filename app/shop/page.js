import { Suspense } from "react";
import Link from "next/link";
import Item from "@/components/Item";
import ProductsFilter from "@/components/productsFilter";
import { getProducts } from "@/utils/fetchData";

// Server Component
async function Shop({ searchParams }) {
  const search = (await searchParams).search;
  const size = (await searchParams).size;
  const price = (await searchParams).price;

  // convert size from searchparams to number
  const sizeNumber = Number(size);

  // Server-side data fetching
  let products = await getProducts();

  // Server-side filtering
  if (search) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (size) {
    products = products.filter((product) => product.size === sizeNumber);
  }

  if (price) {
    const [min, max] = price.split("-").map(Number);
    if (max) {
      products = products.filter(
        (product) => product.price >= min && product.price < max
      );
    } else if (price === "50") {
      products = products.filter((product) => product.price >= 50);
    }
  }

  return (
    <div className="flex gap-3 w-full md:w-11/12 mx-auto mb-5">
      <div className="hidden lg:block w-52 h-fit bg-white py-5 px-2">
        <ProductsFilter shoeSize={sizeNumber} />
      </div>
      <div className="flex-1">
        {products.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {products.map((product) => (
              <li key={product._id}>
                <Link href={`/product/${product.slug}`}>
                  <Item
                    rating={product.rating}
                    imageSrc={product.images[0]}
                    price={product.price}
                    title={product.name}
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-2xl text-center">No match found</div>
        )}
      </div>
    </div>
  );
}

// Page Component
export default function ShopPage({ searchParams }) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex justify-center items-center">
          Loading...
        </div>
      }
    >
      <Shop searchParams={searchParams} />
    </Suspense>
  );
}
