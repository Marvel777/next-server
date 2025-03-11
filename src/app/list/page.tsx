// import { dehydrate, QueryClient } from "@tanstack/react-query";
// import Home from "../page";

// export default async function Page() {
//     const queryClient = new QueryClient();

//     await queryClient.prefetchQuery({
//         queryKey: ["users"],
// /*************  ✨ Codeium Command ⭐  *************/
// /******  4e6d2ce4-c8c0-4ee0-ae59-c4b2292118cf  *******/
//         queryFn: async () => {
//             const res = await fetch("https://jsonplaceholder.typicode.com/users");
//             return res.json();
//         },
//     });

//     return (
//         <Hydrate state={ dehydrate(queryClient) }>
//             <Home />
//         </Hydrate>
//     );
// }
