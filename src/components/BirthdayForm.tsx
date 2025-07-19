import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Birthday } from './BirthdayClock';

interface BirthdayFormProps {
  onAddBirthday: (birthday: Omit<Birthday, 'id'>) => void;
}

export const BirthdayForm = ({ onAddBirthday }: BirthdayFormProps) => {
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [photo, setPhoto] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !month || !day) {
      toast({
        title: "Missing Information",
        description: "Please fill in name, month, and day",
        variant: "destructive",
      });
      return;
    }

    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    if (monthNum < 1 || monthNum > 12) {
      toast({
        title: "Invalid Month",
        description: "Month must be between 1 and 12",
        variant: "destructive",
      });
      return;
    }

    if (dayNum < 1 || dayNum > 31) {
      toast({
        title: "Invalid Day",
        description: "Day must be between 1 and 31",
        variant: "destructive",
      });
      return;
    }

    const formattedDate = `${monthNum.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
    
    onAddBirthday({
      name: name.trim(),
      date: formattedDate,
      photo: photo.trim() || undefined,
    });

    // Reset form
    setName('');
    setMonth('');
    setDay('');
    setPhoto('');

    toast({
      title: "Birthday Added!",
      description: `${name}'s birthday on ${monthNum}/${dayNum} has been added`,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-photo-frame">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        Add Birthday
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter person's name"
              className="bg-input border-border text-foreground"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="month" className="text-foreground">Month</Label>
              <Input
                id="month"
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="MM"
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="day" className="text-foreground">Day</Label>
              <Input
                id="day"
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="DD"
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo" className="text-foreground">Photo (optional)</Label>
          <div className="space-y-2">
            <Input
              id="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Enter photo URL or upload file below"
              className="bg-input border-border text-foreground"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="bg-input border-border text-foreground file:bg-secondary file:text-secondary-foreground file:border-0 file:rounded-md file:px-3 file:py-1"
            />
          </div>
          {photo && (
            <div className="mt-2">
              <img
                src={photo}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-photo-frame"
              />
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-celebration text-celebration-foreground hover:bg-celebration/90 transition-all"
        >
          Add Birthday
        </Button>
      </form>
    </Card>
  );
};