import { Card } from '@/components/ui/card';
import type { Birthday } from './BirthdayClock';

interface BirthdayDisplayProps {
  birthdays: Birthday[];
}

export const BirthdayDisplay = ({ birthdays }: BirthdayDisplayProps) => {
  return (
    <Card className="p-8 bg-gradient-celebration border-celebration animate-birthday-celebration">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            🎉 Birthday Time! 🎉
          </h2>
          <p className="text-white/90 text-lg">
            {birthdays.length === 1 
              ? "Someone special is celebrating today!" 
              : `${birthdays.length} special people are celebrating today!`
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {birthdays.map((birthday) => (
            <div
              key={birthday.id}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center animate-float border border-white/30"
            >
              {birthday.photo ? (
                <div className="relative mb-4">
                  <img
                    src={birthday.photo}
                    alt={birthday.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                    🎈
                  </div>
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/30 flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-lg">
                  {birthday.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {birthday.name}
              </h3>
              
              <div className="text-white/80 text-sm">
                Birthday: {birthday.date.replace('-', '/')}
              </div>
              
              <div className="text-white font-bold text-lg mt-2 animate-pulse">
                It's {birthday.name.split(' ')[0]} o'clock 🥳⏰
              </div>
              
              <div className="mt-4 text-2xl">
                🎂✨🎊
              </div>
            </div>
          ))}
        </div>

        <div className="text-white/80 text-sm animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]">
          🌟 Happy Birthday! May your special day be filled with joy and celebration! 🌟
        </div>
      </div>
    </Card>
  );
};