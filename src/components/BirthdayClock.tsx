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
  const [useQuickEntry, setUseQuickEntry] = useState(true);
  const { birthdays, addBirthday, removeBirthday } = useBirthdayStorage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format current time as 12-hour format
  const currentTimeString = format(currentTime, 'h:mm a');
  const [hours, minutes] = format(currentTime, 'HH:mm').split(':').map(Number);
  
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
            Birthday Clock
          </h1>
          <p className="text-muted-foreground text-lg">
            See your loved ones when time aligns with their special day
          </p>
        </div>

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

        {/* Digital Clock */}
        <Card className="p-8 md:p-12 text-center bg-card/80 backdrop-blur-sm border-photo-frame">
          <div className="space-y-4">
            <div className="text-6xl md:text-8xl font-mono font-bold text-celebration animate-clock-pulse">
              {currentTimeString}
            </div>
            <div className="text-lg text-muted-foreground">
              {format(currentTime, 'EEEE, MMMM do, yyyy')}
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {celebrityMode ? 'celebrity' : 'personal'} birthdays for {hours.toString().padStart(2, '0')}/{minutes.toString().padStart(2, '0')} (Month/Day)
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              📊 {filledDates} of {totalValidDates} dates filled • {remainingDates} remaining
            </div>
          </div>
        </Card>

        {/* Birthday Display or TBD */}
        {currentTimeIsValidDate && (
          <>
            {matchingBirthdays.length > 0 ? (
              <BirthdayDisplay birthdays={matchingBirthdays} />
            ) : (
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
          </>
        )}

        {!currentTimeIsValidDate && (
          <div className="relative overflow-hidden rounded-xl">
            {/* Wallpaper Mode */}
            <div 
              className="h-96 bg-cover bg-center bg-no-repeat rounded-xl shadow-lg relative"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1200&h=600&fit=crop')`
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-xl" />
              
              {/* Content */}
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center space-y-4 text-white">
                  <div className="text-5xl mb-4">🌟</div>
                  <h3 className="text-3xl font-bold tracking-wide">
                    Wallpaper Mode
                  </h3>
                  <p className="text-lg opacity-90">
                    {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')} - Impossible Time
                  </p>
                  <p className="text-sm opacity-75 max-w-md mx-auto">
                    Enjoying the view while we wait for a valid date time
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 text-white/60 text-sm">
                Wallpaper Mode
              </div>
            </div>
          </div>
        )}

        {/* Birthday Form - Only show in personal mode */}
        {!celebrityMode && (
          <div className="space-y-4">
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
            How it works
          </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>• The time format maps to birthdays: hours become month, minutes become day</p>
              <p>• For example: 2:02 PM shows people born on February 2nd (02/02)</p>
            <p>• Add birthdays manually using the form above</p>
            <p>• Photos will appear with celebration effects when birthdays match the current time</p>
          </div>
        </Card>
      </div>
    </div>
  );
};