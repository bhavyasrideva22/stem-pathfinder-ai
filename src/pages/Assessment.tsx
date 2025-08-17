import { useState } from "react";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { PsychometricSection } from "@/components/assessment/PsychometricSection";
import { TechnicalSection } from "@/components/assessment/TechnicalSection";
import { WiscarSection } from "@/components/assessment/WiscarSection";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import { ProgressBar } from "@/components/assessment/ProgressBar";

export interface AssessmentData {
  psychometric: {
    interest: number[];
    personality: number[];
    cognitive: number[];
    motivation: number[];
  };
  technical: {
    aptitude: number[];
    knowledge: number[];
    domain: number[];
  };
  wiscar: {
    will: number[];
    interest: number[];
    skill: number[];
    cognitive: number[];
    abilityToLearn: number[];
    realWorldAlignment: number[];
  };
}

const Assessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: {
      interest: [],
      personality: [],
      cognitive: [],
      motivation: []
    },
    technical: {
      aptitude: [],
      knowledge: [],
      domain: []
    },
    wiscar: {
      will: [],
      interest: [],
      skill: [],
      cognitive: [],
      abilityToLearn: [],
      realWorldAlignment: []
    }
  });

  const sections = [
    "Introduction",
    "Psychometric Evaluation", 
    "Technical Aptitude",
    "WISCAR Analysis",
    "Results"
  ];

  const handleNext = () => {
    setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
  };

  const handleSectionComplete = (sectionData: any) => {
    setAssessmentData(prev => ({ ...prev, ...sectionData }));
    handleNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            STEM Education Coordinator Assessment
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Discover if this career path aligns with your interests and abilities
          </p>
          
          <ProgressBar 
            currentStep={currentSection} 
            totalSteps={sections.length}
            sections={sections}
          />
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8">
          {currentSection === 0 && (
            <AssessmentIntro onStart={handleNext} />
          )}
          
          {currentSection === 1 && (
            <PsychometricSection 
              onComplete={(data) => handleSectionComplete({ psychometric: data })}
            />
          )}
          
          {currentSection === 2 && (
            <TechnicalSection 
              onComplete={(data) => handleSectionComplete({ technical: data })}
            />
          )}
          
          {currentSection === 3 && (
            <WiscarSection 
              onComplete={(data) => handleSectionComplete({ wiscar: data })}
            />
          )}
          
          {currentSection === 4 && (
            <AssessmentResults data={assessmentData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;