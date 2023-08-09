import prisma from "../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  try {
    const category = await prisma.report.findMany({
      include: {
        category: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    NextResponse.json(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { label, link, category } = body;
  try {
    if (!link || !category) {
      return NextResponse.json(
        { error: "Please fill in all the fields" },
        { status: 400 }
      );
    }

    const urlExist = await prisma.report.findFirst({
      where: {
        url: link,
      },
    });
    if (urlExist) {
      return NextResponse.json(
        { error: "This report already exist" },
        { status: 400 }
      );
    }
    const result = await prisma.report.create({
      data: {
        label:label,
        url: link,
        category: {
          connect: { name: category }, 
        },
      },
    });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
