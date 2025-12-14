export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/encryption";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email(),
    phone: z.string().min(9).max(15),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "At least one uppercase letter")
      .regex(/[a-z]/, "At least one lowercase letter")
      .regex(/[0-9]/, "At least one number"),
    confirmPassword: z.string(),
    country: z.string().nonempty(),
    firstName: z.string().min(1, "First name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });
    }
    const { email, phone, password, country, firstName } = parsed.data;

    if (await prisma.user.findUnique({ where: { email } })) {
      return NextResponse.json(
        { errors: { email: { _errors: ["User with this email already exists"] } } },
        { status: 400 }
      );
    }
    if (await prisma.user.findUnique({ where: { phone } })) {
      return NextResponse.json(
        { errors: { phone: { _errors: ["User with this phone already exists"] } } },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, phone, country, firstName, password: hashedPassword },
    });
    return NextResponse.json({ id: user.id });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", details: err },
      { status: 500 }
    );
  }
}
