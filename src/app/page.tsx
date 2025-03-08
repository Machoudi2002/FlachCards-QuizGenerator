'use client';

import { useState } from 'react';
import Navbar from './ui/Navbar';
import FileUpload from './ui/FileUpload';
import Footer from './ui/Footer';
import QuizQuestion from './ui/QuizQuestion';
import SaveButton from './ui/SaveButton';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleGenerateQuiz = async () => {
    if (!file) {
      alert('Please upload a PDF file first.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/generate_quiz', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz.');
      }

      const quizData = await response.json();
      setQuiz(quizData);
      setSubmitted(false);
    } catch (error) {
      console.error(error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <header className="my-12 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">PDF Quiz Generator</h1>
          <p className="text-lg text-gray-600">Upload a PDF, and we'll create a quiz for you in seconds!</p>
        </header>

        <FileUpload file={file} onFileChange={handleFileChange} />

        <Button onClick={handleGenerateQuiz} disabled={isLoading} className="mt-6">
          {isLoading ? <Loader2 className="animate-spin m-2" /> : "Generate Quiz"}
        </Button>

        {quiz && (
          <Card className="mt-8 w-full max-w-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Quiz</h2>
              <div className="space-y-4">
                {quiz.quiz.map((q: any, index: number) => (
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
                <SaveButton quizData={quiz} />
              </div>
            </CardContent>
          </Card>
        )}

        <Footer />
      </div>
    </div>
  );
}
