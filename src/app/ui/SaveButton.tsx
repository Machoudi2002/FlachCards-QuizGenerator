import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SaveButton({ quizData }: any) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    const quizToSave = {
      quizData: quizData.quiz,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(quizData.quizName, JSON.stringify(quizToSave));
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleSave}
      variant={isSaved ? "secondary" : "default"}
    >
      {isSaved ? "Saved!" : "Save Quiz"}
    </Button>
  );
}
