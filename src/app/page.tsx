import SignOut from "@/components/SignOut";
import { authOptions } from "@/helpers/nextAuthOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="text-4xl p-4 rounded-md bg-purple-400 font-bold mb-6">
          Hello world from home page
        </h1>
        <p>{JSON.stringify(session)}</p>
        <SignOut />
      </div>
    </div>
  );
}
