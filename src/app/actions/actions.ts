"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const handleErrors = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new Error("Value already exists");
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export const createPost = async (formData: FormData) => {
  try {
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
  } catch (error) {
    handleErrors(error);
  }

  revalidatePath("/posts");
};

export const editPost = async (formData: FormData, id: string) => {
  try {
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
  } catch (error) {
    handleErrors(error);
  }

  revalidatePath("/posts");
};

export const deletePost = async (id: string) => {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    handleErrors(error);
  }

  revalidatePath("/posts");
};
