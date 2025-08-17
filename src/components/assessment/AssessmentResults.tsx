import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Users, 
  Lightbulb,
  Download
} from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface AssessmentResultsProps {
  data: AssessmentData;
}

export const AssessmentResults = ({ data }: AssessmentResultsProps) => {
  // Calculate scores
  const calculateScore = (scores: number[]) => {
    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round((avg / 5) * 100);
  };

  const psychometricScore = Math.round([
    calculateScore(data.psychometric.interest),
    calculateScore(data.psychometric.personality),
    calculateScore(data.psychometric.cognitive),
    calculateScore(data.psychometric.motivation)
  ].reduce((sum, score) => sum + score, 0) / 4);

  const technicalScore = Math.round([
    calculateScore(data.technical.aptitude),
    calculateScore(data.technical.knowledge), 
    calculateScore(data.technical.domain)
  ].reduce((sum, score) => sum + score, 0) / 3);

  const wiscarScores = {
    will: calculateScore(data.wiscar.will),
    interest: calculateScore(data.wiscar.interest),
    skill: calculateScore(data.wiscar.skill),
    cognitive: calculateScore(data.wiscar.cognitive),
    abilityToLearn: calculateScore(data.wiscar.abilityToLearn),
    realWorldAlignment: calculateScore(data.wiscar.realWorldAlignment)
  };

  const overallScore = Math.round((psychometricScore + technicalScore + 
    Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3);

  // Determine recommendation
  const getRecommendation = () => {
    if (overallScore >= 75) return { status: "yes", icon: CheckCircle, color: "success" };
    if (overallScore >= 55) return { status: "maybe", icon: AlertCircle, color: "warning" };
    return { status: "no", icon: XCircle, color: "destructive" };
  };

  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;

  const getNextSteps = () => {
    if (recommendation.status === "yes") {
      return [
        "Enroll in a STEM Education Coordinator certification program",
        "Seek mentorship from current STEM education professionals",
        "Volunteer with local STEM education initiatives",
        "Develop a portfolio of curriculum design projects"
      ];
    } else if (recommendation.status === "maybe") {
      return [
        "Take foundational courses in educational psychology",
        "Gain hands-on experience with STEM teaching methods",
        "Develop stronger technical knowledge in specific STEM areas",
        "Practice stakeholder management and communication skills"
      ];
    } else {
      return [
        "Consider adjacent roles like Instructional Designer",
        "Explore Curriculum Developer positions in your area of expertise",
        "Look into Academic Advisor or Student Success Coordinator roles",
        "Consider specialized training in educational technology"
      ];
    }
  };

  const getAlternativeRoles = () => {
    return [
      "Instructional Designer",
      "Curriculum Developer (Subject-Specific)",
      "Educational Technology Specialist",
      "Academic Program Coordinator",
      "Learning Experience Designer"
    ];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
          recommendation.color === 'success' ? 'bg-success' :
          recommendation.color === 'warning' ? 'bg-warning' : 'bg-destructive'
        }`}>
          <RecommendationIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Assessment Results</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl font-bold">Overall Score: {overallScore}%</span>
          <Badge variant={recommendation.color === 'success' ? 'default' : 
                         recommendation.color === 'warning' ? 'secondary' : 'destructive'}>
            {recommendation.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Overall Recommendation */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Career Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-lg font-semibold">
              {recommendation.status === "yes" && "Yes - Strong Fit for STEM Education Coordinator"}
              {recommendation.status === "maybe" && "Maybe - Potential with Development"}
              {recommendation.status === "no" && "Consider Alternative Paths"}
            </div>
            <p className="text-muted-foreground">
              {recommendation.status === "yes" && 
                "You demonstrate strong alignment with the requirements and characteristics needed for success as a STEM Education Coordinator. Your psychological profile, technical aptitude, and readiness indicators suggest this career path would be fulfilling and achievable."}
              {recommendation.status === "maybe" && 
                "You show moderate alignment with STEM Education Coordinator requirements. With focused development in key areas, this could become a viable career path. Consider the improvement recommendations below."}
              {recommendation.status === "no" && 
                "While you have valuable skills, your profile suggests better alignment with alternative educational roles. Consider the suggested career paths that might be a better fit for your strengths and interests."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Overall Score</span>
                <span className="font-semibold">{psychometricScore}%</span>
              </div>
              <Progress value={psychometricScore} className="h-2" />
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Interest Level: {calculateScore(data.psychometric.interest)}%</div>
                <div>Personality Alignment: {calculateScore(data.psychometric.personality)}%</div>
                <div>Cognitive Style: {calculateScore(data.psychometric.cognitive)}%</div>
                <div>Motivation: {calculateScore(data.psychometric.motivation)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Overall Score</span>
                <span className="font-semibold">{technicalScore}%</span>
              </div>
              <Progress value={technicalScore} className="h-2" />
              <div className="text-sm text-muted-foreground space-y-1">
                <div>General Aptitude: {calculateScore(data.technical.aptitude)}%</div>
                <div>Educational Knowledge: {calculateScore(data.technical.knowledge)}%</div>
                <div>Domain Expertise: {calculateScore(data.technical.domain)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            WISCAR Framework Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(wiscarScores).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                <Progress value={value} className="h-2" />
                <div className="text-xs text-muted-foreground">{value}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {getNextSteps().map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Alternative Paths */}
      <Card>
        <CardHeader>
          <CardTitle>Alternative Career Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {getAlternativeRoles().map((role) => (
              <Badge key={role} variant="outline">{role}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => window.print()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Save Results
        </Button>
        <Button onClick={() => window.location.reload()}>
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
};