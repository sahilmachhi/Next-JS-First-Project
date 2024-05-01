import { supabase } from "@/Supabase/apiEntry";
import Image from "next/image";
export const revalidate = 3600;
export async function generateStaticParams() {
  const { data: postData, error } = await supabase.from("Products").select();

  return postData?.map((singlePostData) => {
    slug: singlePostData.id;
    // console.log("single post data id", singlePostData.id);
  });
}

async function page({ params: { slug } }) {
  const { data: postData, error } = await supabase
    .from("Products")
    .select()
    .eq("id", slug);

  return (
    <div className="h-[80vh] flex items-center justify-center flex-col gap-[10rem] p-16 md:flex-row">
      {postData?.map((pd: object) => {
        return (
          <>
            <div
              className=" h-full w-full relative flex-1"
              key={pd.id ? pd.id : null}
            >
              {pd.productImage ? (
                <Image
                  src={pd.productImage}
                  alt="product image"
                  fill
                  className="contain rounded-[1rem]"
                  quality={60}
                />
              ) : null}
            </div>
            <div className="flex-1 flex items-baseline ml-[2rem] justify-start text-start w-full flex-col gap-5">
              <h1 className="text-[3rem] font-bold font-sans">
                {pd.productName ? pd.productName : null}
              </h1>
              <p className="text-[2rem] font-sans">
                description:
                <br />
                {pd.productDes ? pd.productDes : null}
              </p>
              {pd.isSpacial && <p>product is special item</p>}
            </div>
          </>
        );
      })}
    </div>
  );
}

export default page;
