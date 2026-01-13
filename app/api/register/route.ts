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
      .regex(/[A-Z]/, "Co najmniej jedna wielka litera")
      .regex(/[a-z]/, "Co najmniej jedna mała litera")
      .regex(/[0-9]/, "Co najmniej jedna cyfra"),
    confirmPassword: z.string(),
    country: z.string().nonempty(),
    firstName: z.string().min(1, "Imię jest wymagane"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są takie same",
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
        { errors: { email: { _errors: ["Użytkownik z takim e-mailem już istnieje"] } } },
        { status: 400 }
      );
    }
    if (await prisma.user.findUnique({ where: { phone } })) {
      return NextResponse.json(
        { errors: { phone: { _errors: ["Użytkownik z takim numerem telefonu już istnieje"] } } },
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
      { message: "Błąd serwera", details: err },
      { status: 500 }
    );
  }
}
