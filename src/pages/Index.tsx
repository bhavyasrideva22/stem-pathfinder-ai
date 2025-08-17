import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Target, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Brain,
  BookOpen,
  Lightbulb
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            STEM Education Coordinator
          </h1>
          <h2 className="text-3xl font-semibold mb-4 text-foreground">
            Career Assessment Tool
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover if a career as a STEM Education Coordinator aligns with your interests, 
            abilities, and professional goals through our comprehensive assessment platform.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Psychometric Analysis</h3>
              <p className="text-muted-foreground">
                Evaluate personality traits, interests, and cognitive style alignment with STEM education roles.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-secondary/20 hover:border-secondary/40 transition-colors">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Technical Aptitude</h3>
              <p className="text-muted-foreground">
                Assess your technical knowledge, educational understanding, and domain-specific expertise.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WISCAR Framework</h3>
              <p className="text-muted-foreground">
                Comprehensive evaluation of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Overview */}
        <Card className="mb-12 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              What You'll Discover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-3">Career Fit Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Psychological compatibility assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Technical readiness evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Career path alignment analysis</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-3">Personalized Guidance</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Detailed score breakdown and insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Recommended next steps and resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Alternative career suggestions</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Details */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">Duration</span>
            </div>
            <p className="text-muted-foreground">20-30 minutes</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-secondary" />
              <span className="font-semibold">Sections</span>
            </div>
            <p className="text-muted-foreground">4 evaluation areas</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="font-semibold">Results</span>
            </div>
            <p className="text-muted-foreground">Instant feedback</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold">Guidance</span>
            </div>
            <p className="text-muted-foreground">Personalized recommendations</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Explore Your Career Potential?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the comprehensive assessment to discover if STEM Education Coordinator 
            is the right career path for you. Get detailed insights and personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/assessment')}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-transform"
            >
              Start Assessment
            </Button>
            <Badge variant="outline" className="text-sm">
              Free • No Registration Required
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
