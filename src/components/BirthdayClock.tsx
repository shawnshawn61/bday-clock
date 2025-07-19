import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BirthdayForm } from './BirthdayForm';
import { QuickBirthdayEntry } from './QuickBirthdayEntry';
import { BirthdayDisplay } from './BirthdayDisplay';
import { useBirthdayStorage } from '@/hooks/useBirthdayStorage';
import { celebrityBirthdays } from '@/data/celebrities';

export interface Birthday {
  id: string;
  name: string;
  date: string; // MM-DD format
  photo?: string;
}

export const BirthdayClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [celebrityMode, setCelebrityMode] = useState(false);
  const [useQuickEntry, setUseQuickEntry] = useState(false);
  const { birthdays, addBirthday, removeBirthday } = useBirthdayStorage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format current time as 12-hour format
  const currentTimeString = format(currentTime, 'h:mm a');
  const [hours, minutes] = format(currentTime, 'hh:mm').split(':').map(Number);
  
  // Convert time to date format (Hours:Minutes -> MM/DD)
  // Hours become Month, Minutes become Day
  const timeAsDate = `${hours.toString().padStart(2, '0')}-${minutes.toString().padStart(2, '0')}`;
  
  // Calculate valid date combinations (exclude impossible dates like 01/32, 02/30, etc.)
  const getValidDateCount = () => {
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Including leap year Feb
    return daysInMonth.reduce((total, days) => total + days, 0); // 366 total
  };
  
  // Check if current time represents a valid date
  const isValidDate = (month: number, day: number) => {
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
  };
  
  const currentTimeIsValidDate = isValidDate(hours, minutes);
  
  // Get the appropriate birthday list based on mode
  const activeBirthdays = celebrityMode ? celebrityBirthdays : birthdays;
  
  // Find birthdays that match current time
  const matchingBirthdays = activeBirthdays.filter(birthday => {
    const [month, day] = birthday.date.split('-');
    const birthdayTimeFormat = `${month}-${day}`;
    return birthdayTimeFormat === timeAsDate;
  });
  
  // Calculate countdown
  const totalValidDates = getValidDateCount();
  const filledDates = new Set(activeBirthdays.map(b => b.date)).size;
  const remainingDates = totalValidDates - filledDates;

  return (
    <div className="min-h-screen bg-gradient-clock p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">
            Bday O'clock
          </h1>
          <p className="text-muted-foreground text-lg">
            See friends the minute the time mirrors their bday month and day.
          </p>
        </div>


        {/* Digital Clock */}
        <Card className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-photo-frame">
          {/* Clock and Photo Unit */}
          <div className="flex items-center justify-center gap-8 mb-6">
            {/* Large Time Display */}
            <div className="text-center">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-8xl font-mono font-bold text-celebration animate-clock-pulse leading-none">
                  {format(currentTime, 'h:mm')}
                </span>
                <span className="text-xl md:text-2xl font-mono text-muted-foreground self-end mb-1 md:mb-2">
                  {format(currentTime, 'a')}
                </span>
              </div>
            </div>
            
            {/* Portrait Photo - Always present for consistent layout */}
            <div className="flex-shrink-0">
              <div className="w-32 md:w-48 aspect-[3/4] rounded-xl overflow-hidden border-4 border-photo-frame shadow-lg">
                {currentTimeIsValidDate && matchingBirthdays.length > 0 ? (
                  matchingBirthdays[0].photo ? (
                    <img
                      src={matchingBirthdays[0].photo}
                      alt={matchingBirthdays[0].name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-celebration to-celebration/70 flex items-center justify-center text-4xl md:text-6xl text-white font-bold">
                      {matchingBirthdays[0].name.charAt(0).toUpperCase()}
                    </div>
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                    <div className="text-center text-muted-foreground/50">
                      <div className="text-3xl md:text-5xl mb-2">🎂</div>
                      <button 
                        onClick={() => {
                          const formSection = document.querySelector('[data-form-section]');
                          formSection?.scrollIntoView({ behavior: 'smooth' });
                          setTimeout(() => {
                            const nameInput = document.querySelector('input[placeholder*="name"], input[name="name"]') as HTMLInputElement;
                            nameInput?.focus();
                          }, 300);
                        }}
                        className="text-xs md:text-sm font-medium text-primary hover:text-primary/80 transition-colors underline"
                      >
                        Add Friend
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Birthday info below photo - only when there's a match */}
              {currentTimeIsValidDate && matchingBirthdays.length > 0 && (
                <div className="text-center mt-3">
                  <div className="text-lg font-semibold text-foreground">
                    {matchingBirthdays[0].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    🎉 It's {matchingBirthdays[0].name.split(' ')[0]} o'clock! 🎂
                  </div>
                </div>
              )}
            </div>
          </div>

        </Card>

        {/* TBD Display - Only show when no birthdays match */}
        {currentTimeIsValidDate && matchingBirthdays.length === 0 && (
          <Card className="p-8 bg-card/60 backdrop-blur-sm border-dashed border-2 border-muted-foreground/30">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-muted/50 flex items-center justify-center text-4xl border-2 border-dashed border-muted-foreground/30">
                ❓
              </div>
              <h3 className="text-xl font-semibold text-muted-foreground">
                {hours.toString().padStart(2, '0')}/{minutes.toString().padStart(2, '0')} - TBD
              </h3>
              <p className="text-muted-foreground text-sm">
                No birthday assigned to this time yet
              </p>
              <div className="text-xs text-muted-foreground">
                Add someone's birthday for {hours.toString().padStart(2, '0')}/{minutes.toString().padStart(2, '0')} below
              </div>
            </div>
          </Card>
        )}

        {/* Additional Birthday Celebration Display - Show when multiple birthdays */}
        {currentTimeIsValidDate && matchingBirthdays.length > 1 && (
          <BirthdayDisplay birthdays={matchingBirthdays.slice(1)} />
        )}


        {/* Birthday Form - Only show in personal mode */}
        {!celebrityMode && (
          <div className="space-y-4" data-form-section>
            {/* Entry Mode Toggle */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-lg">
                <button
                  onClick={() => setUseQuickEntry(true)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    useQuickEntry 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  ⚡ Quick Entry
                </button>
                <button
                  onClick={() => setUseQuickEntry(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    !useQuickEntry 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  📝 Detailed Form
                </button>
              </div>
            </div>
            
            {/* Show appropriate form */}
            {useQuickEntry ? (
              <QuickBirthdayEntry onAddBirthday={addBirthday} />
            ) : (
              <BirthdayForm onAddBirthday={addBirthday} />
            )}
          </div>
        )}

        {/* All Birthdays List */}
        {activeBirthdays.length > 0 && (
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-photo-frame">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              {celebrityMode ? 'Celebrity Birthdays' : 'All Birthdays'} ({activeBirthdays.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeBirthdays.map((birthday) => (
                <div
                  key={birthday.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  {birthday.photo ? (
                    <img
                      src={birthday.photo}
                      alt={birthday.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-photo-frame"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                      {birthday.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{birthday.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {birthday.date.replace('-', '/')} (time: {birthday.date.split('-')[0]}:{birthday.date.split('-')[1]})
                    </div>
                  </div>
                  {!celebrityMode && (
                    <button
                      onClick={() => removeBirthday(birthday.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      title="Remove birthday"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card className="p-6 bg-card/60 backdrop-blur-sm border-photo-frame">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            How it works:
          </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>• Every birthday maps to a time. (Feb 2 = 2:02, etc.)</p>
              <p>•  When the clock hits their day, their photo pops up.</p>
              <p>•  Twice a day. Every day.</p>
              <p>•  Add friends, family—even celebs.</p>
              <p>Fill the clock with faces you love.</p>
              <p>•  Bonus: You'll know every birthday by heart. In no time.</p>
          </div>
        </Card>

        {/* Celebrity Mode Toggle */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-photo-frame">
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="celebrity-mode" className="text-lg font-medium text-foreground">
              {celebrityMode ? '⭐ Celebrity Mode' : '👥 Personal Mode'}
            </Label>
            <Switch
              id="celebrity-mode"
              checked={celebrityMode}
              onCheckedChange={setCelebrityMode}
              className="data-[state=checked]:bg-celebration"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {celebrityMode 
              ? 'Showing famous celebrities when time matches their birth dates'
              : 'Showing your personal contacts and their birthdays'
            }
          </p>
        </Card>
      </div>
    </div>
  );
};