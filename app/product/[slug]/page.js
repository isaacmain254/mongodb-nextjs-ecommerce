import { Rating } from "@mui/material";
import ProductGallery from "@/components/ProductGallery";
import { getProductBySlug } from "@/utils/fetchData";
import ProductActions from "../../../components/ProductAction";

export default async function Product({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <div className="flex ">Product not found</div>;
  }

  return (
    <>
      <section className="w-full lg:w-10/12 mx-auto">
        <p className="flex w-full h-full justify-center items-center"></p>
        <div className="w-full h-full flex flex-col md:flex-row gap-10">
          <div className="w-full h-full md:w-1/2 md:h-[500px]">
            <ProductGallery product={product} />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-xl font-sans font-medium">
              category: {product.category}{" "}
            </p>
            <h1 className="text-black text-4xl opacity-80 font-semibold font-sans ">
              {product.name}
            </h1>
            <div className="flex justify-between items-center">
              <p className="my-3 font-serif text-3xl font-light">
                ${product.price}
              </p>
              <Rating
                value={product.rating}
                name="item-rating"
                defaultValue={2.5}
                precision={0.5}
              />
            </div>
            <p className="py-5">{product.description}</p>
            <ProductActions product={product} />
          </div>
        </div>
      </section>
    </>
  );
}
