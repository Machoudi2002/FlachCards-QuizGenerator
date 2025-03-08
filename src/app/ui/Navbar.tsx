"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

const Navbar: React.FC = () => {
  const router = useRouter()


  return (
    <nav className="sm:px-12 px-4 flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      <h1 onClick={() => router.push('/')} className="cursor-pointer text-2xl font-bold tracking-wide text-white">QUIZ.AI</h1>
      <Button onClick={() => router.push('/quiz')} variant="outline" className="border-white text-black hover:bg-black hover:text-white">
          Saved Quizzes
      </Button>
    </nav>
  );
};

export default Navbar;
