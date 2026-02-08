import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function zodToDetails(error: ZodError) {
    const details: Record<string, string> = {};

    error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        details[path] = issue.message;
    });

    return details;
}

export function ZodErrorResponse(error: ZodError) {
    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                success: false,
                message: "Validation failed",
                details: zodToDetails(error),
            },
            { status: 400 }
        );
    }
}

export function InternalServerErrorResponse(error: unknown) {
    return NextResponse.json(
        {
            success: false,
            message: "Internal server error",
        },
        { status: 500 }
    );
}