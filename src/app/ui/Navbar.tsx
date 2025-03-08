import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; // Import the reusable Card component


export function Card(props: {title: string}) {
  return (
<div className="bg-white text-black p-4 rounded-lg shadow-lg mb-4 cursor-pointer hover:bg-black hover:text-white">
  <h3 className="text-lg font-semibold text-inherit transition-colors">
    {props.title}
  </h3>
</div>

  );
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [savedQuizzes, setSavedQuizzes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch saved quizzes keys from localStorage
    const saved = Object.keys(localStorage);
    setSavedQuizzes(saved);
  }, []);

  return (
    <nav className="sm:px-12 px-4 flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      <h1 className="text-2xl font-bold tracking-wide text-white">QUIZ.AI</h1>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="border-white text-black hover:bg-black hover:text-white">
            Saved Quizzes
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-4">
          <h2 className="text-xl font-semibold mb-4">Saved Quizzes</h2>
          {savedQuizzes.length > 0 ? (
            savedQuizzes.map((key) => (
              <Card key={key} title={key} />
            ))
          ) : (
            <p className="text-gray-600">No saved quizzes yet.</p>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
