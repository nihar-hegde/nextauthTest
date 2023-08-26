import { connectToDb } from "@/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/model/User";

connectToDb();


export async function POST(request:NextRequest){
    

    try {
        const body = await request.json();
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);
    const user = await User.findOne({email:output.email});

        if(user){
            const checkPassword = bcrypt.compareSync(output.password!,user.password);
            if(checkPassword){
                return NextResponse.json({status:200,message:"user logged in"},{status:200})
            }
            return NextResponse.json({status:400,message:"Please check your credentials"},{status:200})

        }

    return NextResponse.json({
        status:400,
        errors:{
            email:"No account found with this email"
        }
    },{status:200});
        
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
              { status: 400, errors: error.messages },
              { status: 200 }
            );
          }
    }
}