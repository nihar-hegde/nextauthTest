import { connectToDb } from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import {registerSchema} from '@/validator/authSchema'
import vine,{errors} from '@vinejs/vine'

connectToDb();

export async function POST(request:NextRequest){
    try {
        const body = await request.json();
        const validator = vine.compile(registerSchema);
        const output = await validator.validate(body);
        return NextResponse.json(output,{status:200})
    } catch (error) {
        if(error instanceof errors.E_VALIDATION_ERROR){
               return NextResponse.json(error.messages,{status:400})
        }
    }
}