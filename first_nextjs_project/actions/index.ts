"use server";
import { supabase } from "@/Supabase/apiEntry";
import { error } from "console";
import { randomUUID } from "crypto";
import { type } from "os";
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
  // productDes: formData.get("productDes"),
  // productPrice: formData.get("productPrice"),
  // productImage: formData.get("productPhoto"),
  //   type: formData.get("type"),
  // };

  let checkbox = formData.get("isSpacial") === "on" ? true : false;

  let price = formData.get("productPrice");
  let productPrice = parseInt(price);

  console.log(typeof checkbox);

  const schema = z.object({
    productName: z.string().min(3),
    productDes: z.string().min(5),
    productPrice: z.number().min(1).positive(),
    type: z.string(),
    checkbox: z.boolean(),
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
    productPrice: productPrice,
    productImage: formData.get("productPhoto"),
    type: formData.get("type"),
    checkbox: checkbox,
  });

  if (!validFields.success) {
    console.log("error:", validFields.error);
    return {
      type: "error",
      errors: validFields.error?.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  } else {
    console.log(validFields.data);
    const { error: productUploadError } = await supabase
      .from("Products")
      .insert({
        id: randomUUID,
        productName: validFields.data.productName,
        productDes: validFields.data.productDes,
        productPrice: validFields.data.productPrice,
        type: validFields.data.type,
        isSpacial: validFields.data.checkbox,
      });
  }

  // console.log(validFields.data);

  // console.log(productUploadError);
}
