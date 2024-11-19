'use client'
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateAccount() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-blue from-blue-500 to-teal-500 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg overflow-hidden">
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList className="flex justify-center bg-gray-100 rounded-t-lg">
            <TabsTrigger
              value="sign-in"
              className="flex-1 text-gray-800 py-3 font-semibold hover:bg-gray-200 rounded-t-lg transition duration-200"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="sign-up"
              className="flex-1 text-gray-800 py-3 font-semibold hover:bg-gray-200 rounded-t-lg transition duration-200"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <div className="p-6">
            <TabsContent value="sign-in">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Welcome Back!</h2>
              <SignIn />
            </TabsContent>
            <TabsContent value="sign-up">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h2>
              <SignUp />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
