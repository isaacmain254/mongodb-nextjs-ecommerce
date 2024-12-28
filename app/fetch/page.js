// import dbConnect from "@/lib/mongoose/dbConnect";
// import Brand from "@/models/product";
// import { DatasetLinked } from "@mui/icons-material";
// import React from "react";

async function Fetch() {
  // const datas = await getItems();
  // console.log(datas);

  return (
    <section className="w-10/12  mt-20 mx-auto">
      <div>
        <h1>Hello world</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio alias
          inventore soluta ad? Unde commodi perspiciatis, deserunt tenetur
          pariatur aperiam voluptas. Omnis et architecto saepe labore modi
          voluptatem officia, sunt quas recusandae dicta consequatur esse
          facilis dolorem. Eaque saepe magni tempora impedit aut voluptatem
          omnis, quod, recusandae at hic tenetur, laborum delectus esse quasi
          deleniti repellat temporibus vitae facere nobis?
        </p>
      </div>
      <ul>
        {/* {datas.map((data) => (
          <li>{data.name}</li>
        ))} */}
      </ul>
    </section>
  );
}

// export default Fetch;

// async function getItems() {
//   await dbConnect();
//   const dataItems = await Brand.find();
//   return dataItems;
// }
