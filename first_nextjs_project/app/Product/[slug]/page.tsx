import { supabase } from "@/Supabase/apiEntry";

export async function generateStaticParams() {
  const { data: postData, error } = await supabase.from("Products").select();

  return postData?.map((singlePostData) => {
    slug: singlePostData.id;
    // console.log("single post data id", singlePostData.id);
  });
}

async function page({ params: { slug } }) {
  console.log(slug);
  const { data: postData, error } = await supabase
    .from("Products")
    .select()
    .eq("id", slug);
  console.log(postData);
  return <div className="h-[80vh]"></div>;
}

export default page;
