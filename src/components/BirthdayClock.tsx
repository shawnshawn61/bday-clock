import { useEffect, useMemo, useState } from "react";
import { useBirthdayStorage } from '@/hooks/useBirthdayStorage';
import { usePersonalPage } from '@/hooks/usePersonalPage';

export interface Birthday {
  id: string;
  name: string;
  date: string; // MM-DD format
  photo?: string;
  relationship?: string;
  imdb?: string; // For celebrities
  wikipedia?: string; // For non-actors (musicians, politicians, etc.)
  profession?: string; // 'actor', 'musician', 'politician', etc.
}

type Entry = {
  name: string;
  month: number; // 1..12
  day: number;   // 1..31
  photoUrl?: string;
};

function mmddFromNow(d = new Date()) {
  const hour12 = (d.getHours() % 12) || 12;            // 1..12
  const minute = String(d.getMinutes()).padStart(2, "0");
  const mm = String(hour12).padStart(2, "0");          // '01'..'12'
  return mm + minute;                                  // 'MMDD'
}

function entryToMMDD(e: Entry) {
  return String(e.month).padStart(2, "0") + String(e.day).padStart(2, "0");
}

export const BirthdayClock = () => {
  const { currentSlug } = usePersonalPage();
  const { birthdays } = useBirthdayStorage(currentSlug);
  
  console.log('BirthdayClock rendering, currentSlug:', currentSlug);
  console.log('Birthdays:', birthdays);
  
  // Convert birthdays to Entry format
  const entries: Entry[] = birthdays.map(birthday => {
    const [month, day] = birthday.date.split('-').map(Number);
    return {
      name: birthday.name,
      month,
      day,
      photoUrl: birthday.photo
    };
  });

  return <ClockHero entries={entries} />;
};

function ClockHero({ entries }: { entries: Entry[] }) {
  const [now, setNow] = useState<Date>(new Date());

  console.log('ClockHero rendering with entries:', entries);

  // tick exactly on the minute
  useEffect(() => {
    const msToNextMin = 60_000 - (Date.now() % 60_000);
    let t = setTimeout(function loop() {
      setNow(new Date());
      t = setTimeout(loop, 60_000);
    }, msToNextMin);
    return () => clearTimeout(t);
  }, []);

  const match = useMemo(() => {
    const target = mmddFromNow(now);
    console.log('Looking for match, target:', target);
    return entries.find((e) => entryToMMDD(e) === target) ?? null;
  }, [now, entries]);

  const hh = ((now.getHours() % 12) || 12).toString();
  const min = String(now.getMinutes()).padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4">
      <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6">
          {/* Clock */}
          <div className="text-6xl font-bold tracking-tight">
            <span className="inline-block rounded-xl border border-yellow-400/60 px-4 py-2 shadow">
              {hh}:{min}
            </span>
            <span className="ml-2 text-zinc-400 text-2xl align-top">{ampm}</span>
          </div>

          {/* Right card: either the birthday photo or Add Friend */}
          {match ? (
            <div className="w-[130px] h-[170px] rounded-2xl overflow-hidden ring-2 ring-white/60 shadow-lg">
              <img
                src={match.photoUrl || "/placeholder.jpg"}
                alt={match.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex w-[130px] h-[170px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-600 bg-zinc-800/50 text-zinc-400 transition-colors hover:border-zinc-500 hover:bg-zinc-800/70">
              <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">Add Friend</span>
            </div>
          )}
        </div>
        {match && (
          <div className="mt-4 text-center">
            <p className="text-lg text-white">
              It's <span className="text-yellow-400 font-semibold">{match.name}</span> O'clock! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}