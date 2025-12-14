export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = Number(session.user.id);

  try {
    const address = await prisma.adress.findFirst({
      where: { userId },
    });
    return NextResponse.json({ address });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Cannot fetch address" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = Number(session.user.id);

  let body: {
    country?: string;
    province?: string;
    city?: string;
    postalCode?: string;
    makeMain?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { country, province, city, postalCode } = body;
  if (!country || !province || !city || !postalCode) {
    return NextResponse.json({ error: "All address fields are required" }, { status: 400 });
  }

  try {
    const existing = await prisma.adress.findFirst({ where: { userId } });
    let address;
    if (existing) {
      address = await prisma.adress.update({
        where: { id: existing.id },
        data: { country, province, city, postalCode },
      });
    } else {
      address = await prisma.adress.create({
        data: { userId, country, province, city, postalCode },
      });
    }
    return NextResponse.json({ address }, { status: existing ? 200 : 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `"Cannot save address"${(error as Error).message}` }, { status: 500 });
  }
}
