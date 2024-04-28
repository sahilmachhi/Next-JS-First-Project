import { supabase } from "@/Supabase/apiEntry";
import Image from "next/image";
import Link from "next/link";
export const revalidate = 0;
export default async function Home() {
  const { data, error } = await supabase.from("Products").select();

  const { data: spacialData, error: spacialDataError } = await supabase
    .from("Products")
    .select()
    .eq("isSpacial", true);
  return (
    <>
      <div className="flex flex-col gap-36 my-10">
        <div className="flex justify-center items-center flex-col gap-[4rem]">
          <h1 className="text-3xl font-bold">spacial data</h1>
          <div className="flex-row flex gap-[4rem] self-start w-full ">
            {spacialData?.map((pd) => {
              return (
                <>
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Image
                      className="rounded-t-lg"
                      src={pd.productImage}
                      alt="product image"
                      width="240"
                      height="240"
                    />

                    <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pd.productName}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {pd.productDes}
                      </p>
                      <Link
                        href={`/Product/${pd.id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        price is {pd.productPrice} INR
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-[4rem]">
          <h1 className="text-3xl font-bold">normal item</h1>

          <div className="flex-row flex gap-[4rem] self-start w-full">
            {data?.map((pd) => {
              return (
                <>
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Image
                      className="rounded-t-lg"
                      src={pd.productImage}
                      alt="product image"
                      width="240"
                      height="240"
                    />

                    <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pd.productName}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {pd.productDes}
                      </p>
                      <Link
                        href={`/Product/${pd.id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        price is {pd.productPrice} INR
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          ariaHidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
