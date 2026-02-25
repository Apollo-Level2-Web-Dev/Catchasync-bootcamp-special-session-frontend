/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const createBooking = async (bookingData: any) => {
  try {
    const store = await cookies();
    const token = store.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/booking/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(bookingData),
    });
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
