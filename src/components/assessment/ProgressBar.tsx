import { CheckCircle } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  sections: string[];
}

export const ProgressBar = ({ currentStep, totalSteps, sections }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${index <= currentStep 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
              }
            `}>
              {index < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className={`
              text-xs mt-2 text-center font-medium
              ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}
            `}>
              {section}
            </span>
          </div>
        ))}
      </div>
      
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};