import prisma from "@/lib/db";
import { createPost } from "../actions/actions";

const Posts = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <form action={createPost} className="bg-white flex flex-col text-black">
        <input type="text" name="title" className="border" />
        <input type="text" name="content" className="border" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Posts;
