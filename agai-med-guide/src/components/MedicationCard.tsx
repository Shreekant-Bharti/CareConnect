import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Pill, CheckCircle2, XCircle } from 'lucide-react';

export interface Medication {
  id: string;
  name: string;
  nameHi: string;
  dosage: string;
  time: string;
  instructions: string;
  instructionsHi: string;
  status: 'pending' | 'taken' | 'missed';
}

interface MedicationCardProps {
  medication: Medication;
  language: 'en' | 'hi';
  onStatusChange: (id: string, status: 'taken' | 'missed' | 'pending') => void;
}

const MedicationCard = ({ medication, language, onStatusChange }: MedicationCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = (status: 'taken' | 'missed') => {
    setIsUpdating(true);
    setTimeout(() => {
      onStatusChange(medication.id, status);
      setIsUpdating(false);
    }, 300);
  };

  const getStatusColor = () => {
    switch (medication.status) {
      case 'taken':
        return 'border-success bg-success/5';
      case 'missed':
        return 'border-destructive bg-destructive/5';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <Card className={`${getStatusColor()} transition-all duration-300 ${isUpdating ? 'scale-95 opacity-70' : 'scale-100'}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Pill className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-xl">
                {language === 'en' ? medication.name : medication.nameHi}
              </h3>
              <p className="text-muted-foreground text-base">{medication.dosage}</p>
            </div>
          </div>
          {medication.status !== 'pending' && (
            <div className="flex items-center gap-2">
              {medication.status === 'taken' ? (
                <CheckCircle2 className="w-7 h-7 text-success" />
              ) : (
                <XCircle className="w-7 h-7 text-destructive" />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <Clock className="w-5 h-5" />
          <span className="text-base font-medium">{medication.time}</span>
        </div>

        <p className="text-base mb-4 text-foreground/80">
          {language === 'en' ? medication.instructions : medication.instructionsHi}
        </p>

        {medication.status === 'pending' && (
          <div className="flex gap-3">
            <Button
              onClick={() => handleStatusChange('taken')}
              className="flex-1 h-12 text-base bg-success hover:bg-success/90"
              disabled={isUpdating}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Mark Taken' : 'लिया हुआ'}
            </Button>
            <Button
              onClick={() => handleStatusChange('missed')}
              variant="outline"
              className="flex-1 h-12 text-base border-destructive text-destructive hover:bg-destructive/10"
              disabled={isUpdating}
            >
              <XCircle className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Mark Missed' : 'छूट गया'}
            </Button>
          </div>
        )}

        {medication.status !== 'pending' && (
          <Button
            onClick={() => onStatusChange(medication.id, 'pending')}
            variant="outline"
            className="w-full h-12 text-base"
          >
            {language === 'en' ? 'Reset Status' : 'स्टेटस रीसेट करें'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicationCard;
