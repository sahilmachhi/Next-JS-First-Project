"use server";
import { supabase } from "@/Supabase/apiEntry";
import { error } from "console";
import { randomUUID } from "crypto";
import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 5000000;
export async function uploadItemForm(prevState: any, formData: FormData) {
  // const productData = {
  //   productName: formData.get("productName"),
  //   productDes: formData.get("productDes"),
  //   productPrice: formData.get("productPrice"),
  //   // productImage: formData.get("productPhoto"),
  //   type: formData.get("type"),
  //   isSpacial: formData.get("isSpacial"),
  // };

  const schema = z.object({
    productName: z.string().min(3),
    productDes: z.string().min(5),
    productPrice: z.number().min(1).positive(),
    type: z.string(),
    isSpacial: z.boolean(),
    productImage: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `max image size is 5MB`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  });

  const validFields = schema.safeParse({
    productName: formData.get("productName"),
    productDes: formData.get("productDes"),
    productPrice: formData.get("productPrice"),
    productImage: formData.get("productPhoto"),
    type: formData.get("type"),
    isSpacial: formData.get("isSpacial"),
  });

  if (!validFields.success) {
    console.log("error:", validFields.error);
    return {
      type: "error",
      errors: validFields.error?.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  console.log(validFields.data);

  // const { error: productUploadError } = await supabase.from("Products").insert({
  //   id: randomUUID,
  //   productName: productData.productName,
  //   productDes: productData.productDes,
  //   productPrice: productData.productPrice,
  //   type: productData.type,
  //   // isSpacial: productData.isSpacial,
  //   // productImage: productData.productImage,
  // });

  // console.log(productUploadError);
}
