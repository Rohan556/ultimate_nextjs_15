import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// Get users/api/:id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) throw new NotFoundError("UserId not found");

    try {
      await dbConnect();

      const user = await User.findById(id);

      if (!user) throw new NotFoundError("User not found");

      return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
      return handleError(error, "api") as APIErrorResponse;
    }
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Delete users/api/:id
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("UserId not found");

  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);

    if (!user) throw new NotFoundError("User not found");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Update users/api/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) throw new NotFoundError("UserId not found");

  try {
    await dbConnect();

    const body = await request.json();

    const validatedData = UserSchema.partial().safeParse(body);

    const user = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) throw new NotFoundError("User not found");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
