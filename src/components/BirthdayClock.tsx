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
import { getCelebrityPhoto, getFallbackPhoto } from '@/utils/celebrityPhotoService';

export interface Birthday {
  id: string;
  name: string;
  date: string; // MM-DD format
  photo?: string;
  imdb?: string;
}

export const BirthdayClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [celebrityMode, setCelebrityMode] = useState(false);
  const [useQuickEntry, setUseQuickEntry] = useState(false);
  const [giftMode, setGiftMode] = useState(false);
  const [currentBirthdayIndex, setCurrentBirthdayIndex] = useState(0);
  const { birthdays, addBirthday, removeBirthday } = useBirthdayStorage();

  // Gift showcase data with curated items
  const giftShowcase = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      title: 'Artisan Books',
      description: 'Curated literary gifts',
      retailer: 'Barnes & Noble',
      link: 'https://www.barnesandnoble.com/b/gifts'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop',
      title: 'Outdoor Adventure',
      description: 'Sustainable outdoor gear',
      retailer: 'Patagonia',
      link: 'https://www.patagonia.com/shop/gifts'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=600&fit=crop',
      title: 'Fine Jewelry',
      description: 'Timeless elegance',
      retailer: 'Tiffany & Co.',
      link: 'https://www.tiffany.com/gifts/'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      title: 'Artisan Crafts',
      description: 'Handmade treasures',
      retailer: 'Etsy',
      link: 'https://www.etsy.com/c/craft-supplies-and-tools'
    }
  ];

  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);

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
  
  // Debug logging for celebrity mode
  console.log('Celebrity mode:', celebrityMode);
  console.log('Active birthdays length:', activeBirthdays.length);
  console.log('Celebrity birthdays length:', celebrityBirthdays.length);
  console.log('Personal birthdays length:', birthdays.length);
  
  // Find birthdays that match current time
  const matchingBirthdays = activeBirthdays.filter(birthday => {
    const [month, day] = birthday.date.split('-');
    const birthdayTimeFormat = `${month}-${day}`;
    return birthdayTimeFormat === timeAsDate;
  });

  // Rotate gift showcase every 8 seconds when in gift mode
  useEffect(() => {
    if (!giftMode) return;
    
    const giftTimer = setInterval(() => {
      setCurrentGiftIndex(prev => (prev + 1) % giftShowcase.length);
    }, 8000);

    return () => clearInterval(giftTimer);
  }, [giftMode, giftShowcase.length]);

  // Rotate through matching birthdays every 5 seconds when there are multiple
  useEffect(() => {
    if (matchingBirthdays.length <= 1) {
      setCurrentBirthdayIndex(0);
      return;
    }
    
    const birthdayTimer = setInterval(() => {
      setCurrentBirthdayIndex(prev => (prev + 1) % matchingBirthdays.length);
    }, 5000);

    return () => clearInterval(birthdayTimer);
  }, [matchingBirthdays.length]);
  
  // Calculate countdown
  const totalValidDates = getValidDateCount();
  const filledDates = new Set(activeBirthdays.map(b => b.date)).size;
  const remainingDates = totalValidDates - filledDates;

  // Show gift showcase for impossible dates or when no birthdays match
  const shouldShowGift = giftMode && (!currentTimeIsValidDate || matchingBirthdays.length === 0);
  const currentGift = giftShowcase[currentGiftIndex];

  return (
    <div className="min-h-screen bg-gradient-clock p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/8903630c-9f11-485e-9baf-37ae1a7bde4f.png" 
              alt="Bday Clock Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground text-lg">
            Time To Remember Bdays.
          </p>
        </div>


        {/* Digital Clock */}
        <Card className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-photo-frame">
          {/* Clock and Photo Unit - Centered */}
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Time and Photo Row */}
            <div className="flex items-center justify-center gap-6 md:gap-8">
              {/* Large Time Display */}
              <div className="text-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-7xl font-mono font-bold text-celebration animate-clock-pulse leading-none">
                    {format(currentTime, 'h:mm')}
                  </span>
                  <span className="text-lg md:text-xl font-mono text-muted-foreground self-end mb-1 md:mb-2">
                    {format(currentTime, 'a')}
                  </span>
                </div>
              </div>
              
              {/* Portrait Photo - Always present for consistent layout */}
              <div className="flex-shrink-0 relative">
                <div className="w-24 md:w-36 aspect-[3/4] rounded-xl overflow-hidden border-4 border-photo-frame shadow-lg">
                  {shouldShowGift ? (
                    <div className="w-full h-full relative group">
                      <img
                        src={currentGift.image}
                        alt={currentGift.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-xs font-medium truncate">{currentGift.title}</div>
                        <div className="text-xs opacity-80 truncate">{currentGift.description}</div>
                      </div>
                    </div>
                  ) : currentTimeIsValidDate && matchingBirthdays.length > 0 ? (
                    (() => {
                      const currentBirthday = matchingBirthdays[currentBirthdayIndex];
                      // Use celebrity photo service first for high-quality photos, then fallback
                      const photoUrl = celebrityMode 
                        ? getCelebrityPhoto(currentBirthday.name) || currentBirthday?.photo || getFallbackPhoto(currentBirthday.name)
                        : currentBirthday?.photo;
                      
                      return photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={currentBirthday.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to a different image if the original fails to load
                            const target = e.target as HTMLImageElement;
                            if (celebrityMode && !target.src.includes('unsplash')) {
                              target.src = getFallbackPhoto(currentBirthday.name);
                            } else {
                              // Show initials as ultimate fallback
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent && !parent.querySelector('.fallback-initials')) {
                                const fallbackDiv = document.createElement('div');
                                fallbackDiv.className = 'fallback-initials w-full h-full bg-gradient-to-br from-celebration to-celebration/70 flex items-center justify-center text-3xl md:text-5xl text-white font-bold';
                                fallbackDiv.textContent = currentBirthday.name.charAt(0).toUpperCase();
                                parent.appendChild(fallbackDiv);
                              }
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-celebration to-celebration/70 flex items-center justify-center text-3xl md:text-5xl text-white font-bold">
                          {currentBirthday?.name.charAt(0).toUpperCase()}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                      <div className="text-center text-muted-foreground/50">
                        <div className="text-2xl md:text-4xl mb-1">🎂</div>
                        <button 
                          onClick={() => {
                            const formSection = document.querySelector('[data-form-section]');
                            formSection?.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(() => {
                              const nameInput = document.querySelector('input[placeholder*="name"], input[name="name"]') as HTMLInputElement;
                              nameInput?.focus();
                            }, 300);
                          }}
                          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors underline"
                        >
                          Add Friend
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Countdown counter */}
                <div className="absolute -bottom-2 -right-2 text-xs text-muted-foreground/60 font-mono">
                  {remainingDates}
                </div>
              </div>
            </div>

            {/* Celebrity O'clock Message - Full Width */}
            {currentTimeIsValidDate && matchingBirthdays.length > 0 && !shouldShowGift && (
              <div className="w-full text-center">
                <div className="text-lg md:text-xl font-playfair font-medium text-foreground px-4">
                  It's{' '}
                  {celebrityMode && matchingBirthdays[currentBirthdayIndex]?.imdb ? (
                    <a 
                      href={matchingBirthdays[currentBirthdayIndex].imdb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-celebration hover:text-celebration/80 transition-colors underline decoration-2 underline-offset-4"
                    >
                      {matchingBirthdays[currentBirthdayIndex].name}
                    </a>
                  ) : !celebrityMode ? (
                    <a 
                      href={`sms:?body=Hiya, you popped up on Bday Clock at ${currentTimeString} and I just wanted to say hi.`}
                      className="text-celebration hover:text-celebration/80 transition-colors underline decoration-2 underline-offset-4"
                    >
                      {matchingBirthdays[currentBirthdayIndex]?.name}
                    </a>
                  ) : (
                    <span className="text-celebration">{matchingBirthdays[currentBirthdayIndex]?.name}</span>
                  )}
                  {' '}O'clock! 🥳⏰
                </div>
              </div>
            )}

            {/* Gift showcase info */}
            {shouldShowGift && (
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground mb-1">
                  {currentGift.title}
                </div>
                <a 
                  href={currentGift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-primary hover:text-primary/80 transition-colors underline decoration-dotted underline-offset-2"
                >
                  Shop at {currentGift.retailer}
                </a>
              </div>
            )}
          </div>

        </Card>


        {/* Gift Shop */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-photo-frame">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {celebrityMode ? "Bday Clock eLux Shop" : "Bday Clock eGift Shop"}
            </h2>
            <p className="text-muted-foreground text-sm italic">Last minute gifts.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {celebrityMode ? (
                <>
                  {/* Luxury Items */}
                  <div className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">💎</div>
                    <div className="text-sm font-medium">Jewelry</div>
                    <div className="text-xs text-muted-foreground">Fine Jewelry</div>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🏖️</div>
                    <div className="text-sm font-medium">Excursions</div>
                    <div className="text-xs text-muted-foreground">Travel Experiences</div>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🏨</div>
                    <div className="text-sm font-medium">Luxury Hotels</div>
                    <div className="text-xs text-muted-foreground">Premium Stays</div>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">👜</div>
                    <div className="text-sm font-medium">Luxury Goods</div>
                    <div className="text-xs text-muted-foreground">Designer Items</div>
                  </div>
                </>
              ) : (
                <>
                  {/* Regular Gift Cards */}
                  <div className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🛍️</div>
                    <div className="text-sm font-medium">Retail</div>
                    <div className="text-xs text-muted-foreground">Gift Cards</div>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🍽️</div>
                    <div className="text-sm font-medium">Dining</div>
                    <div className="text-xs text-muted-foreground">Restaurants</div>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">💆</div>
                    <div className="text-sm font-medium">Spa</div>
                    <div className="text-xs text-muted-foreground">Experiences</div>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">📱</div>
                    <div className="text-sm font-medium">Apps</div>
                    <div className="text-xs text-muted-foreground">Subscriptions</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>


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

        {/* Mode Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Gift Showcase Toggle */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-photo-frame">
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="gift-mode" className="text-lg font-medium text-foreground">
                {giftMode ? '🎁 Gift Gallery' : '🖼️ Gallery Off'}
              </Label>
              <Switch
                id="gift-mode"
                checked={giftMode}
                onCheckedChange={setGiftMode}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {giftMode 
                ? 'Showcasing curated gifts from premium retailers'
                : 'Turn on to see beautiful gift inspiration'
              }
            </p>
          </Card>
        </div>

        {/* Retailer Partnership Info */}
        {giftMode && (
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-photo-frame">
            <h3 className="text-lg font-semibold mb-3 text-foreground text-center">
              🏪 Retailers: Purchase Time Slots
            </h3>
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">
                Transform impossible dates into gift inspiration moments. Partner with us to showcase your curated collections.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <span className="px-3 py-1 bg-secondary/50 rounded-full">Barnes & Noble</span>
                <span className="px-3 py-1 bg-secondary/50 rounded-full">Patagonia</span>
                <span className="px-3 py-1 bg-secondary/50 rounded-full">Tiffany & Co.</span>
                <span className="px-3 py-1 bg-secondary/50 rounded-full">Etsy</span>
              </div>
              <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Retailer Partnership Inquiry
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};