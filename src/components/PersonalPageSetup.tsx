import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalPageSetupProps {
  onSetup: (firstName: string, lastInitial: string, birthday: string) => void;
}

export const PersonalPageSetup = ({ onSetup }: PersonalPageSetupProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastInitial && month && day) {
      const birthday = `${month.padStart(2, '0')}${day.padStart(2, '0')}`;
      onSetup(firstName, lastInitial, birthday);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Your Personal Clock</CardTitle>
          <CardDescription>
            Get your unique URL: bdayclock.com/{firstName.toLowerCase()}{lastInitial.toLowerCase()}{month.padStart(2, '0')}{day.padStart(2, '0')}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastInitial">Last Initial</Label>
              <Input
                id="lastInitial"
                value={lastInitial}
                onChange={(e) => setLastInitial(e.target.value.slice(0, 1))}
                maxLength={1}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">Birth Month</Label>
                <Input
                  id="month"
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="day">Birth Day</Label>
                <Input
                  id="day"
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Create My Personal Clock
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};