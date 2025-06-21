
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  return (
    <Button
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary hover:bg-green-700 shadow-lg z-50"
      onClick={onClick}
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  );
};

export default FloatingChatButton;
