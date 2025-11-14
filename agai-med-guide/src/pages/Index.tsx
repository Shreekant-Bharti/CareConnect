import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import MedicationCard, { Medication } from '@/components/MedicationCard';
import VoiceAssistant from '@/components/VoiceAssistant';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Aspirin',
      nameHi: 'एस्पिरिन',
      dosage: '75mg',
      time: '8:00 AM',
      instructions: 'Take with water after breakfast',
      instructionsHi: 'नाश्ते के बाद पानी के साथ लें',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Metformin',
      nameHi: 'मेटफोर्मिन',
      dosage: '500mg',
      time: '1:00 PM',
      instructions: 'Take before lunch to control blood sugar',
      instructionsHi: 'ब्लड शुगर नियंत्रित करने के लिए दोपहर के भोजन से पहले लें',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Lisinopril',
      nameHi: 'लिसिनोप्रिल',
      dosage: '10mg',
      time: '8:00 PM',
      instructions: 'Take for blood pressure management',
      instructionsHi: 'रक्तचाप प्रबंधन के लिए लें',
      status: 'pending',
    },
  ]);

  const handleStatusChange = (id: string, status: 'taken' | 'missed' | 'pending') => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, status } : med))
    );
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const getPendingCount = () => medications.filter((m) => m.status === 'pending').length;
  const getTakenCount = () => medications.filter((m) => m.status === 'taken').length;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {language === 'en' ? 'CareConnect' : 'केयरकनेक्ट'}
              </h1>
              <p className="text-muted-foreground text-base mt-1">
                {language === 'en'
                  ? 'Your AI Medication Companion'
                  : 'आपका AI दवा साथी'}
              </p>
            </div>
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="lg"
              className="h-12 px-6"
            >
              <Languages className="w-5 h-5 mr-2" />
              {language === 'en' ? 'हिंग्लिश' : 'English'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-card rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'en' ? "Today's Overview" : 'आज का अवलोकन'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-lg font-semibold text-primary">
                {medications.length}
              </p>
              <p className="text-base text-muted-foreground">
                {language === 'en' ? 'Total Medications' : 'कुल दवाएं'}
              </p>
            </div>
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <p className="text-lg font-semibold text-success">
                {getTakenCount()}
              </p>
              <p className="text-base text-muted-foreground">
                {language === 'en' ? 'Taken Today' : 'आज लिया'}
              </p>
            </div>
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <p className="text-lg font-semibold text-warning">
                {getPendingCount()}
              </p>
              <p className="text-base text-muted-foreground">
                {language === 'en' ? 'Pending' : 'बाकी'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'en' ? 'Medication Schedule' : 'दवा समय सारणी'}
            </h2>
            <div className="space-y-4">
              {medications.map((medication) => (
                <MedicationCard
                  key={medication.id}
                  medication={medication}
                  language={language}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'en' ? 'Voice Assistant' : 'वॉयस असिस्टेंट'}
            </h2>
            <VoiceAssistant language={language} />
          </div>
        </div>
      </main>

      <footer className="mt-16 py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            {language === 'en'
              ? '💊 CareConnect - Making medication management simple and accessible'
              : '💊 केयरकनेक्ट - दवा प्रबंधन को सरल और सुलभ बनाना'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
