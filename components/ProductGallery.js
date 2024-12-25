import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ product }) {
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <>
      {/* Main Image Display */}
      <div className="h-full w-full bg-white">
        <Image
          src={currentImage}
          width={500}
          height={500}
          alt="my shoe"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Thumbnail List */}
      <div className="h-1/6 flex justify-center pt-4">
        <ul className="flex gap-4">
          {product.images.map((image, index) => (
            <li key={index}>
              <Image
                src={image}
                width={64}
                height={64}
                alt="thumbnail"
                onClick={() => handleImageClick(image)}
                className="w-fit h-full object-cover aspect-square bg-white cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
