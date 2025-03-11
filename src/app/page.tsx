"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost, updatePost } from "./api/api";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";


interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostFormInputs {
  title: string;
  body: string;
}

const deletePost = async (postId: number | string) => {
  try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    console.log("Successfully deleted")
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export default function PostsPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostFormInputs>()
  const queryClient = useQueryClient();

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  })

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("%c✔ Done", "color: green; font-weight: bold;");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });




  if (isLoading) {
    return <div>loading...</div>
  }
  if (isError) return <p>Error: { (errors as Error).message }</p>;


  return (
    <div>
      { posts.map((post: Post) => (
        <div key={ post.id } className="border-2 mx-4 my-3 space-x-4 space-y-3">
          <h2 className="text-red-500">{ post.title }</h2>
          <h2>{ post.body }</h2>
          <button
            onClick={ () => mutation.mutate(post.id) }
          >
            delete
          </button>
        </div>
      )) }
    </div>
  );
}
