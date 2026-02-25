"use server";

import { cookies } from "next/headers";

export const getOwnPets = async () => {
  const store = await cookies();
  const token = store.get("token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      next: {
        revalidate: 3600,
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
