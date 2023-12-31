import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import {connectToDb} from '@/database/mongo.config'
import { User } from "@/model/User";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  pages:{
    signIn:"/login"
  },
  callbacks:{
    async signIn({user,account,profile,email,credentials}){
      try {
        connectToDb();
      const findUser = await User.findOne({email:user.email});
      if(findUser){
        return true;
      }
      await User.create({name:user.name,email:user.email});
      return true;
      } catch (error) {
       console.log("Sign in error") 
       return false;
      }
    }
  },
  providers: [
    CredentialsProvider({
      name: "Next Auth",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        connectToDb();
        const user = await User.findOne({email:credentials?.email})

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
};
