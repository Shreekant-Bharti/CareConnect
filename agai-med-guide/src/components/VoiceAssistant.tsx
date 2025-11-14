import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';

interface VoiceAssistantProps {
  language: 'en' | 'hi';
}

const VoiceAssistant = ({ language }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const simulatedResponses = {
    en: [
      "I've noted that. Please take your medication with water.",
      "Remember to take this medicine after food for best results.",
      "Your next medication is due in 2 hours. I'll remind you.",
      "Would you like me to call your family member to assist you?",
      "I've recorded this. Make sure to rest after taking your medicine.",
    ],
    hi: [
      "मैंने नोट कर लिया है। कृपया अपनी दवा पानी के साथ लें।",
      "बेहतर परिणाम के लिए इस दवा को खाने के बाद लेना याद रखें।",
      "आपकी अगली दवा 2 घंटे में है। मैं आपको याद दिलाऊंगा।",
      "क्या आप चाहेंगे कि मैं आपके परिवार के सदस्य को फोन करूं?",
      "मैंने रिकॉर्ड कर लिया है। दवा लेने के बाद आराम करना सुनिश्चित करें।",
    ],
  };

  const simulatedTranscripts = {
    en: [
      "I need help with my morning medication",
      "When should I take my blood pressure medicine?",
      "I forgot to take my afternoon dose",
      "Can you remind me about my medication schedule?",
      "I'm feeling dizzy after taking the medicine",
    ],
    hi: [
      "मुझे अपनी सुबह की दवा में मदद चाहिए",
      "मुझे अपनी ब्लड प्रेशर की दवा कब लेनी चाहिए?",
      "मैं अपनी दोपहर की खुराक लेना भूल गया",
      "क्या आप मुझे मेरे दवा के शेड्यूल के बारे में याद दिला सकते हैं?",
      "दवा लेने के बाद मुझे चक्कर आ रहा है",
    ],
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      setIsSpeaking(true);

      // Simulate processing
      setTimeout(() => {
        const randomTranscript = simulatedTranscripts[language][
          Math.floor(Math.random() * simulatedTranscripts[language].length)
        ];
        setTranscript(randomTranscript);

        // Simulate AI response
        setTimeout(() => {
          const randomResponse = simulatedResponses[language][
            Math.floor(Math.random() * simulatedResponses[language].length)
          ];
          setResponse(randomResponse);
          setIsSpeaking(false);
        }, 1500);
      }, 1000);
    } else {
      // Start listening
      setIsListening(true);
      setTranscript('');
      setResponse('');
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Volume2 className="w-6 h-6 text-primary" />
          </div>
          <span>{language === 'en' ? 'AI Voice Assistant' : 'AI वॉयस असिस्टेंट'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-8">
          <Button
            onClick={handleVoiceToggle}
            size="lg"
            className={`w-32 h-32 rounded-full transition-all ${
              isListening
                ? 'bg-destructive hover:bg-destructive/90 animate-pulse'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isListening ? (
              <MicOff className="w-16 h-16" />
            ) : isSpeaking ? (
              <Loader2 className="w-16 h-16 animate-spin" />
            ) : (
              <Mic className="w-16 h-16" />
            )}
          </Button>
          <p className="mt-4 text-lg font-medium">
            {isListening
              ? language === 'en'
                ? 'Listening...'
                : 'सुन रहा हूं...'
              : isSpeaking
              ? language === 'en'
                ? 'Processing...'
                : 'प्रोसेस हो रहा है...'
              : language === 'en'
              ? 'Tap to speak'
              : 'बोलने के लिए टैप करें'}
          </p>
        </div>

        {transcript && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold mb-1 text-muted-foreground">
              {language === 'en' ? 'You said:' : 'आपने कहा:'}
            </p>
            <p className="text-base">{transcript}</p>
          </div>
        )}

        {response && (
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm font-semibold mb-1 text-primary">
              {language === 'en' ? 'AI Assistant:' : 'AI असिस्टेंट:'}
            </p>
            <p className="text-base">{response}</p>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground text-center">
            {language === 'en'
              ? '🎯 Demo: Simulated Agora Conversational AI'
              : '🎯 डेमो: सिम्युलेटेड एगोरा कन्वर्सेशनल AI'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
