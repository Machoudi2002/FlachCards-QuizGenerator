"use client";
import Navbar from "@/app/ui/Navbar";
import QuizQuestion from "@/app/ui/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  questionIndex: number;
  selectedAnswer?: string;
  onAnswerSelect: (questionIndex: number, option: string) => void;
  submitted: boolean;
}

const Page: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const [quizKey, setQuizKey] = useState<string>("");
  const [quiz, setQuiz] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      const { slug } = resolvedParams;
      setQuizKey(decodeURIComponent(slug.split("-").join(" ")));
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (quizKey) {
      const keyContent = localStorage.getItem(quizKey);
      if (keyContent) {
        const parsedContent = JSON.parse(keyContent);
        setQuiz(parsedContent.quizData);
      }
    }
  }, [quizKey]);

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6 bg-white">
        <h1 className="mt-8 text-3xl font-bold text-gray-800 mb-4">{quizKey}</h1>
        {quiz && (
          <Card className="mt-8 w-full max-w-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Quiz</h2>
              <div className="space-y-4">
                {quiz.map((q: any, index: number) => (
                  <QuizQuestion 
                    key={index}
                    question={q.question} 
                    options={q.options} 
                    correctAnswer={q.correct_answer} 
                    questionIndex={index} 
                    selectedAnswer={selectedAnswers[index]}
                    onAnswerSelect={handleAnswerSelect}
                    submitted={submitted}
                  />
                ))}
              </div>
              <div className='flex justify-between align-center mx-8'>
                <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700">
                  Submit Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Page;