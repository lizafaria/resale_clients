import { useQuery } from "@tanstack/react-query";
import React from "react";

const Blogs = () => {
  const url = `https://bike-mart-server-rouge.vercel.app/blogs`;
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();

      return data;
    },
  });

  console.log(blogs);
  return (
    <div className="grid gap-4 mx-4 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
      {blogs.map((blog) => (
        <>
          <div class="max-w-2xl my-5 px-8 py-4 rounded-lg shadow-m border ring-2">
            <div class="mt-2">
              <h2
                href="#"
                class="text-4xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
                tabindex="0"
                role="link"
              >
                {blog.ques}
              </h2>
              <p class="mt-2 text-gray-600 dark:text-gray-300">{blog.ans}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Blogs;
