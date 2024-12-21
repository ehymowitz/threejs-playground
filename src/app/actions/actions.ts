"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createPost = async (formData: FormData) => {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
      author: {
        connect: { email: formData.get("email") as string },
      },
    },
  });

  revalidatePath("/posts");
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
  revalidatePath("/posts");
};

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
  revalidatePath("/posts");
};
