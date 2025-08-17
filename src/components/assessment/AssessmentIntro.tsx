import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, TrendingUp, Users } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4">
          Should I Become a STEM Education Coordinator?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This comprehensive assessment evaluates your fit for a career in STEM education coordination 
          through psychological compatibility, technical understanding, and career alignment analysis.
        </p>
      </div>

      <Card className="border-primary/20 bg-gradient-to-r from-card to-muted/50">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            What Is a STEM Education Coordinator?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            A STEM Education Coordinator designs, implements, and evaluates science, technology, 
            engineering, and mathematics education programs for schools, universities, nonprofits, 
            or government institutions. They bridge the gap between educational theory and practical 
            STEM implementation.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-secondary/20">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Career Outcomes
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• STEM Program Manager</li>
              <li>• Education Coordinator (K-12 / Higher Ed)</li>
              <li>• Curriculum Designer (STEM Focus)</li>
              <li>• EdTech Implementation Specialist</li>
              <li>• Instructional Leader (STEM Integration)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Key Success Traits
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Analytical & strategic thinking</li>
              <li>• Passion for education and STEM</li>
              <li>• Organizational leadership capabilities</li>
              <li>• Adaptability and collaboration</li>
              <li>• Communication and stakeholder management</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
        <h4 className="font-semibold mb-2">Assessment Overview</h4>
        <p className="text-sm text-muted-foreground mb-4">
          This 20-30 minute assessment includes psychometric evaluation, technical aptitude testing, 
          and WISCAR framework analysis to provide personalized career guidance.
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>⏱️ 20-30 minutes</span>
          <span>📊 4 evaluation sections</span>
          <span>🎯 Personalized results</span>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white px-8 py-3 text-lg font-semibold shadow-lg"
        >
          Start Assessment
        </Button>
      </div>
    </div>
  );
};