'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import  {auth, createUserWithEmailAndPassword} from '@/firebase/FirebaseConfig.js'
import { toast } from "react-toastify";

export default function SignUp() {
  const routes = useRouter();
  const navigate = () => {
    routes.push("/auth/sign-in");
  };

  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    const {email, password} = data;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("user: " , user);
      toast.success("Signed Up Successfully")
      reset()
      navigate()
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: " ,errorMessage);
      toast.error(
         errorMessage)

      
      // ..
    });
    console.log("signUp===>",data);
  
  }

  return (
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
<Image
    alt="Rani Collection"
    height={100}
    width={200}
    src="/assets/imgs/logo1.png"
    className="mx-auto h-32 w-[200px]"
  />
  

 
</div>

<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
  <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
        Name
      </label>
      <div className="mt-2">
      <input type="text"className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm/6" placeholder="Your Name" {...register("name", { required: true })} />
           {errors.name && <span>This field is required</span>}
       
      </div>
    </div>
    <div>
      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
        Email address
      </label>
      <div className="mt-2">
      <input type="text"className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm/6" placeholder="Your Email" {...register("email", { required: true })} />
           {errors.email && <span>This field is required</span>}
       
      </div>
    </div>


    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
          Password
        </label>
       
      </div>
      <div className="mt-2">
      <input type="password"className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm/6" placeholder="Your Password" {...register("password", { required: true })} />
           {errors.password && <span>This field is required</span>}
       
      </div>
    </div>

    <div>
      <button
        type="submit"
        
        className="flex w-full justify-center rounded-md bg-primary-blue px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-secondary-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      >
        Sign Up
      </button>
    </div>
  </form>

  <p className="mt-10 text-center text-sm/6 text-gray-500 ">
    Dont Have an Account:
    <Link href='/auth/sign-up'  className="pl-2 font-semibold text-primary-blue hover:text-secondary-blue">
    Sign Up now.
    </Link>
  </p>
</div>
</div>
  );
}