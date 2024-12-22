
import HeaderTitle from "@components/HeaderTitle";
import Link from "@node_modules/next/link";



export default async function Home() {
  return (

      
      <div className="w-full flex-center flex-col">
      <HeaderTitle />
      <h2 className="text-center mx-[20%] mt-8 text-xl text-black/50">
        Effortlessly organize, track, and manage your projects with our
        intuitive project management tool. Stay on top of tasks, collaborate
        seamlessly, and achieve your goals efficiently.
      </h2>

      <Link
        href="/login"
        className=" bg-gradient-to-t from-secondary-orange to-primary-orange py-2 px-10 text-white text-lg mt-16 rounded-full"
      >
        Sign In
      </Link>
    </div>
   
  );
}

