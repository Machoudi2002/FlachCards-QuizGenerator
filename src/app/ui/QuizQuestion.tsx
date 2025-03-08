import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  questionIndex: number;
  selectedAnswer?: string;
  onAnswerSelect: (questionIndex: number, option: string) => void;
  submitted: boolean;
}

export default function QuizQuestion({
  question,
  options,
  correctAnswer,
  questionIndex,
  selectedAnswer,
  onAnswerSelect,
  submitted,
}: QuizQuestionProps) {
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {questionIndex + 1}. {question}
        </h2>
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={(value) => {
            if (!submitted) {
              onAnswerSelect(questionIndex, value);
            }
          }}
          className="space-y-3"
        >
          {options && options.map((option, optionIndex) => {
            const isOptionCorrect = option === correctAnswer;
            const isSelected = selectedAnswer === option;

            return (
              <Label
                key={optionIndex}
                className={cn(
                  "flex items-center p-4 rounded-lg border cursor-pointer transition-all",
                  submitted
                    ? isOptionCorrect
                      ? "border-green-500 bg-green-50"
                      : isSelected
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                    : isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-500"
                )}
              >
                <RadioGroupItem
                  value={option}
                  id={`question-${questionIndex}-option-${optionIndex}`}
                  disabled={submitted}
                  className="mr-3"
                />
                {option}
              </Label>
            );
          })}
        </RadioGroup>
        {submitted && (
          <p
            className={cn(
              "mt-4 text-sm font-semibold",
              isCorrect ? "text-green-600" : "text-red-600"
            )}
          >
            {isCorrect ? "Correct!" : `Correct Answer: ${correctAnswer}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
