import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Heart, Users, Zap } from "lucide-react";

interface PsychometricSectionProps {
  onComplete: (data: {
    interest: number[];
    personality: number[];
    cognitive: number[];
    motivation: number[];
  }) => void;
}

const questions = {
  interest: [
    "How excited are you about leading STEM outreach programs?",
    "Rate your enthusiasm for designing educational curricula",
    "How interested are you in staying current with educational technology?",
    "How much do you enjoy mentoring and developing educators?"
  ],
  personality: [
    "I prefer structured, organized work environments",
    "I enjoy collaborating with diverse teams and stakeholders",
    "I am comfortable taking initiative and leading projects",
    "I adapt well to changing educational policies and requirements"
  ],
  cognitive: [
    "I prefer analytical, data-driven approaches to problem-solving",
    "I enjoy creative, open-ended educational design challenges",
    "I work best with clear objectives and measurable outcomes",
    "I thrive in environments that require strategic thinking"
  ],
  motivation: [
    "Making a positive impact on student learning motivates me",
    "I am driven by opportunities for professional growth",
    "Recognition and achievement are important motivators for me",
    "I am motivated by intellectual challenges and continuous learning"
  ]
};

export const PsychometricSection = ({ onComplete }: PsychometricSectionProps) => {
  const [responses, setResponses] = useState<{[key: string]: number}>({});
  const [currentCategory, setCurrentCategory] = useState(0);
  
  const categories = ['interest', 'personality', 'cognitive', 'motivation'];
  const categoryIcons = [Heart, Users, Brain, Zap];
  const categoryTitles = [
    'Interest & Passion',
    'Personality Alignment', 
    'Cognitive Style',
    'Motivation Drivers'
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
      // Organize responses by category
      const data = {
        interest: questions.interest.map((_, i) => responses[`interest_${i}`] || 0),
        personality: questions.personality.map((_, i) => responses[`personality_${i}`] || 0),
        cognitive: questions.cognitive.map((_, i) => responses[`cognitive_${i}`] || 0),
        motivation: questions.motivation.map((_, i) => responses[`motivation_${i}`] || 0)
      };
      onComplete(data);
    }
  };

  const Icon = categoryIcons[currentCategory];
  const currentQuestions = questions[categories[currentCategory] as keyof typeof questions];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">
          Psychometric Evaluation
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
          {currentQuestions.map((question, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium">{question}</p>
              <RadioGroup
                value={responses[`${categories[currentCategory]}_${index}`]?.toString()}
                onValueChange={(value) => handleResponse(index, parseInt(value))}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Strongly Disagree</span>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value.toString()} id={`${currentCategory}_${index}_${value}`} />
                        <Label htmlFor={`${currentCategory}_${index}_${value}`} className="text-sm">
                          {value}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Strongly Agree</span>
                </div>
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