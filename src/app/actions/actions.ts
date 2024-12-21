"use server";

import prisma from "@/lib/db";

export const createPost = async (formData: FormData) => {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });
};

export const editPost = async (formData: FormData, id: string) => {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });
};

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};
