import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Code, BookOpen, Lightbulb } from "lucide-react";

interface TechnicalSectionProps {
  onComplete: (data: {
    aptitude: number[];
    knowledge: number[];
    domain: number[];
  }) => void;
}

const questions = {
  aptitude: [
    {
      question: "A teacher wants to create a sequence of STEM challenges that increase in difficulty. If the first challenge takes 30 minutes and each subsequent challenge takes 25% longer, how long would the 4th challenge take?",
      options: ["45 minutes", "56.25 minutes", "60 minutes", "75 minutes"],
      correct: 1
    },
    {
      question: "Which pattern completes this sequence: 2, 6, 18, 54, ?",
      options: ["108", "162", "216", "270"],
      correct: 1
    },
    {
      question: "If a STEM program serves 150 students and you want to maintain a 1:12 teacher-to-student ratio, how many teachers do you need?",
      options: ["10", "12", "13", "15"],
      correct: 2
    }
  ],
  knowledge: [
    {
      question: "What is the primary goal of inquiry-based learning in STEM education?",
      options: [
        "To memorize scientific facts",
        "To encourage students to ask questions and investigate",
        "To complete worksheets efficiently", 
        "To prepare for standardized tests"
      ],
      correct: 1
    },
    {
      question: "Which pedagogical approach emphasizes real-world problem solving in STEM?",
      options: ["Direct instruction", "Project-based learning", "Lecture method", "Rote memorization"],
      correct: 1
    },
    {
      question: "What does 'scaffolding' mean in educational context?",
      options: [
        "Building physical structures for experiments",
        "Providing temporary support to help students reach learning goals",
        "Creating assessment rubrics",
        "Organizing classroom furniture"
      ],
      correct: 1
    }
  ],
  domain: [
    {
      question: "You're tasked with integrating engineering challenges into a middle school curriculum. What's your first step?",
      options: [
        "Purchase expensive equipment",
        "Assess current curriculum standards and learning objectives",
        "Start building robots immediately",
        "Schedule field trips to engineering firms"
      ],
      correct: 1
    },
    {
      question: "A teacher reports that students are struggling with a new STEM concept. How do you respond?",
      options: [
        "Tell them to practice more",
        "Remove the concept from curriculum",
        "Observe the class and provide targeted support strategies",
        "Assign additional homework"
      ],
      correct: 2
    },
    {
      question: "When evaluating a STEM program's effectiveness, what metric is most important?",
      options: [
        "Number of activities completed",
        "Student engagement and learning outcomes",
        "Amount of technology used",
        "Time spent on each subject"
      ],
      correct: 1
    }
  ]
};

export const TechnicalSection = ({ onComplete }: TechnicalSectionProps) => {
  const [responses, setResponses] = useState<{[key: string]: number}>({});
  const [currentCategory, setCurrentCategory] = useState(0);
  
  const categories = ['aptitude', 'knowledge', 'domain'];
  const categoryIcons = [Lightbulb, BookOpen, Code];
  const categoryTitles = [
    'General Aptitude',
    'Educational Knowledge', 
    'Domain Expertise'
  ];

  const handleResponse = (questionIndex: number, value: number) => {
    const key = `${categories[currentCategory]}_${questionIndex}`;
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    const categoryQuestions = questions[categories[currentCategory] as keyof typeof questions];
    return categoryQuestions.every((_, index) => 
      responses[`${categories[currentCategory]}_${index}`] !== undefined
    );
  };

  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(prev => prev + 1);
    } else {
      // Calculate scores based on correct answers
      const data = {
        aptitude: questions.aptitude.map((q, i) => {
          const userAnswer = responses[`aptitude_${i}`];
          return userAnswer === q.correct ? 5 : userAnswer !== undefined ? 2 : 0;
        }),
        knowledge: questions.knowledge.map((q, i) => {
          const userAnswer = responses[`knowledge_${i}`];
          return userAnswer === q.correct ? 5 : userAnswer !== undefined ? 2 : 0;
        }),
        domain: questions.domain.map((q, i) => {
          const userAnswer = responses[`domain_${i}`];
          return userAnswer === q.correct ? 5 : userAnswer !== undefined ? 2 : 0;
        })
      };
      onComplete(data);
    }
  };

  const Icon = categoryIcons[currentCategory];
  const currentQuestions = questions[categories[currentCategory] as keyof typeof questions];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">
          Technical & Aptitude Assessment
        </h3>
        <p className="text-muted-foreground">
          Section {currentCategory + 1} of {categories.length}: {categoryTitles[currentCategory]}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {categoryTitles[currentCategory]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQuestions.map((item, index) => (
            <div key={index} className="space-y-4">
              <p className="font-medium">{item.question}</p>
              <RadioGroup
                value={responses[`${categories[currentCategory]}_${index}`]?.toString()}
                onValueChange={(value) => handleResponse(index, parseInt(value))}
              >
                {item.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={optionIndex.toString()} 
                      id={`${currentCategory}_${index}_${optionIndex}`} 
                    />
                    <Label 
                      htmlFor={`${currentCategory}_${index}_${optionIndex}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-8"
        >
          {currentCategory === categories.length - 1 ? 'Complete Section' : 'Next Category'}
        </Button>
      </div>
    </div>
  );
};