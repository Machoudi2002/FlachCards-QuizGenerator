"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card"; // Import the Card component from shadcn
import Navbar from "../ui/Navbar";
import { useRouter } from 'next/navigation'

const QuizPage: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const router = useRouter()

  useEffect(() => {
    const savedKeys = Object.keys(localStorage);
    setKeys(savedKeys);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <h1 className="text-3xl font-semibold text-center text-gray-800 m-8">Saved Quizzes</h1>
      <div className="flex mx-6 flex-col items-center justify-center sm:mx-8">
        {keys.length > 0 ? (
          keys.map((key) => (
            <Card onClick={() => router.push(`/quiz/${key.replace(/\s/g, '-')}`)} key={key} className="cursor-pointer shadow-lg border border-gray-300 py-4 px-8 rounded-lg hover:shadow-xl transition-all">
              <h2 className="text-xl font-medium text-gray-700">{key}</h2>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No saved quizzes yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
