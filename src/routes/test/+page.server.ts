import { supabase } from "$lib/clients/supabaseClient";



export async function load() {


    // console.log("superbase client", supabase)
  const { data } = await supabase.from("products").select();
  // console.log("data", data)
  return {
    products: data ?? [],
  };
}