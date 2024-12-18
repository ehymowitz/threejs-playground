import prisma from "@/lib/db";

const Posts = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
