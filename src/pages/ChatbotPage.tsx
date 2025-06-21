
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageCircle } from 'lucide-react';

interface ChatbotPageProps {
  onBack: () => void;
}

const ChatbotPage = ({ onBack }: ChatbotPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="sticky top-0 bg-white shadow-sm border-b z-40">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Nimma AI Geleya</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-12">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Nimma AI Geleya
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-lg">
              Your AI farming assistant is coming soon!
            </p>
            <p className="text-gray-500 text-sm">
              Get ready for personalized farming advice, crop recommendations, and market insights powered by AI.
            </p>
            <div className="pt-4">
              <div className="animate-pulse flex space-x-1 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotPage;
