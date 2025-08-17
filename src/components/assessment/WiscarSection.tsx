import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Target, Compass, Wrench, Brain, TrendingUp, Globe } from "lucide-react";

interface WiscarSectionProps {
  onComplete: (data: {
    will: number[];
    interest: number[];
    skill: number[];
    cognitive: number[];
    abilityToLearn: number[];
    realWorldAlignment: number[];
  }) => void;
}

const questions = {
  will: [
    "I'm committed to improving STEM education even with limited resources",
    "I persist through challenges when implementing new educational programs",
    "I maintain motivation during long-term curriculum development projects",
    "I'm willing to work extra hours to ensure student success"
  ],
  interest: [
    "I regularly read about trends in education and technology",
    "I enjoy attending STEM education conferences and workshops", 
    "I find educational research and pedagogy fascinating",
    "I'm excited about emerging technologies in education"
  ],
  skill: [
    "Rate your comfort level designing STEM lesson plans",
    "How confident are you in managing educational stakeholders?",
    "Assess your ability to evaluate program effectiveness",
    "Rate your skills in educational technology integration"
  ],
  cognitive: [
    "I excel at breaking down complex problems into manageable steps",
    "I can quickly adapt my approach when strategies aren't working",
    "I effectively synthesize information from multiple sources",
    "I think strategically about long-term educational outcomes"
  ],
  abilityToLearn: [
    "I actively seek feedback to improve my performance",
    "I change my approach when something doesn't work",
    "I enjoy learning new educational methodologies",
    "I'm comfortable with uncertainty while learning new skills"
  ],
  realWorldAlignment: [
    "How comfortable are you managing diverse stakeholders in a school district?",
    "Rate your comfort with budget planning and resource allocation",
    "How well can you balance educational ideals with practical constraints?",
    "Assess your ability to navigate educational policy and compliance"
  ]
};

export const WiscarSection = ({ onComplete }: WiscarSectionProps) => {
  const [responses, setResponses] = useState<{[key: string]: number}>({});
  const [currentCategory, setCurrentCategory] = useState(0);
  
  const categories = ['will', 'interest', 'skill', 'cognitive', 'abilityToLearn', 'realWorldAlignment'];
  const categoryIcons = [Target, Compass, Wrench, Brain, TrendingUp, Globe];
  const categoryTitles = [
    'Will & Motivation',
    'Interest & Curiosity',
    'Current Skills',
    'Cognitive Readiness',
    'Ability to Learn',
    'Real-World Alignment'
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
        will: questions.will.map((_, i) => responses[`will_${i}`] || 0),
        interest: questions.interest.map((_, i) => responses[`interest_${i}`] || 0),
        skill: questions.skill.map((_, i) => responses[`skill_${i}`] || 0),
        cognitive: questions.cognitive.map((_, i) => responses[`cognitive_${i}`] || 0),
        abilityToLearn: questions.abilityToLearn.map((_, i) => responses[`abilityToLearn_${i}`] || 0),
        realWorldAlignment: questions.realWorldAlignment.map((_, i) => responses[`realWorldAlignment_${i}`] || 0)
      };
      onComplete(data);
    }
  };

  const Icon = categoryIcons[currentCategory];
  const currentQuestions = questions[categories[currentCategory] as keyof typeof questions];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">
          WISCAR Framework Analysis
        </h3>
        <p className="text-muted-foreground">
          Section {currentCategory + 1} of {categories.length}: {categoryTitles[currentCategory]}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon className="w-5 h-5" />
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
                  <span className="text-sm text-muted-foreground">Low</span>
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
                  <span className="text-sm text-muted-foreground">High</span>
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
          {currentCategory === categories.length - 1 ? 'Complete Assessment' : 'Next Category'}
        </Button>
      </div>
    </div>
  );
};