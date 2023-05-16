// NOT USED AT THE MOMENT

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event: any) => {
  const supabase = serverSupabaseClient(event);

  // console.log("event", event);
  const query = getQuery(event);
  console.log("query", query);
  const searchTerm = query.searchTerm?.toString();
  const page = query.page?.toString() ?? "";
  const itemsPerPage = parseInt(query.itemsPerPage?.toString() ?? "");
  const sort = query.sort?.toString();

  console.log("searchTerm", searchTerm);
  console.log("page", page);
  console.log("itemsPerPage", itemsPerPage);
  console.log("sort", sort);

  // const startIndex = (parseInt(page) - 1) * itemsPerPage;
  // const endIndex = parseInt(page) * itemsPerPage;

  // // Query
  // const { data, count, error } = await supabase
  //   .from("jobs")
  //   .select(
  //     `
  //   *
  // `
  //   )
  //   .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
  //   .order("created_at", { ascending: false })
  //   .range(startIndex, endIndex);
  // console.log(data);
  // // .select('*', { count: 'exact' })
  // // .leftOuterJoin('companies', 'jobs.company_id', 'companies.id')

  // return data;

  console.log("searchTerm", searchTerm);
  console.log("page", page);
  console.log("itemsPerPage", itemsPerPage);
  console.log("sort", sort);

  const startIndex = (Number(page) - 1) * itemsPerPage;
  const endIndex = Number(page) * itemsPerPage - 1; // -1 because Supabase range is inclusive

  // Query
  // const { data, count, error } = await supabase.from("jobs").select("*");
  // const { data, count, error } = await supabase
  //   .from("jobs")
  //   .select("*")
  //   .ilike("name", `%${searchTerm}%`)
  //   //   .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
  //   // .or("description", `%${searchTerm}%`)
  //   .order("created_at", { ascending: sort === "asc" })
  //   .range(startIndex, endIndex);

  // if (error) {
  //   console.error("Error fetching jobs:", error);
  //   throw error; // or return an error response
  // }

  // console.log(data);

  return [];
});
