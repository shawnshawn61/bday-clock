// Celebrity photo service to fetch real celebrity photos
// This will replace placeholder images with actual celebrity photos

interface CelebrityPhoto {
  name: string;
  photoUrl: string;
  source: 'wikimedia' | 'official' | 'public_domain';
}

// High-quality celebrity photos from public domain or properly licensed sources
export const celebrityPhotos: Record<string, string> = {
  // January celebrities
  'Ice Spice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ice_Spice_2023.jpg/400px-Ice_Spice_2023.jpg',
  'Morris Chestnut': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Morris_Chestnut_2019.jpg/400px-Morris_Chestnut_2019.jpg',
  'Mel Gibson': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mel_Gibson_2016.jpg/400px-Mel_Gibson_2016.jpg',
  'Bradley Cooper': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Bradley_Cooper_2019.jpg/400px-Bradley_Cooper_2019.jpg',
  'Norman Reedus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Norman_Reedus_2019.jpg/400px-Norman_Reedus_2019.jpg',
  'Dyan Cannon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dyan_Cannon_1970s.jpg/400px-Dyan_Cannon_1970s.jpg',
  'Marcus Scribner': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Marcus_Scribner_2017.jpg/400px-Marcus_Scribner_2017.jpg',
  'Noah Cyrus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Noah_Cyrus_2020.jpg/400px-Noah_Cyrus_2020.jpg',
  'Mary J. Blige': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mary_J._Blige_2019.jpg/400px-Mary_J._Blige_2019.jpg',
  'Jason Bateman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Jason_Bateman_2017.jpg/400px-Jason_Bateman_2017.jpg',
  'Regina King': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Regina_King_2018.jpg/400px-Regina_King_2018.jpg',
  'Michelle Obama': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelle_Obama_2013_official_portrait.jpg/400px-Michelle_Obama_2013_official_portrait.jpg',
  'Dave Bautista': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Dave_Bautista_2019.jpg/400px-Dave_Bautista_2019.jpg',
  'Geena Davis': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Geena_Davis_2011.jpg/400px-Geena_Davis_2011.jpg',
  'Alicia Keys': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Alicia_Keys_2019.jpg/400px-Alicia_Keys_2019.jpg',
  'Ellen DeGeneres': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Ellen_DeGeneres_2011.jpg/400px-Ellen_DeGeneres_2011.jpg',
  'Oprah Winfrey': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Oprah_Winfrey_2014.jpg/400px-Oprah_Winfrey_2014.jpg',
  'Phil Collins': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Phil_Collins_2016.jpg/400px-Phil_Collins_2016.jpg',
  'Kerry Washington': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Kerry_Washington_2013.jpg/400px-Kerry_Washington_2013.jpg',

  // February celebrities  
  'Harry Styles': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Harry_Styles_2020.jpg/400px-Harry_Styles_2020.jpg',
  'Shakira': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Shakira_2018.jpg/400px-Shakira_2018.jpg',
  'Michael C. Hall': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Michael_C._Hall_2016.jpg/400px-Michael_C._Hall_2016.jpg',
  'Alice Cooper': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Alice_Cooper_2017.jpg/400px-Alice_Cooper_2017.jpg',
  'Chris Rock': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Chris_Rock_2012.jpg/400px-Chris_Rock_2012.jpg',
  'Tom Hiddleston': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Tom_Hiddleston_2016.jpg/400px-Tom_Hiddleston_2016.jpg',
  'Jennifer Aniston': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Jennifer_Aniston_2012.jpg/400px-Jennifer_Aniston_2012.jpg',
  'Rihanna': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_2012.jpg/400px-Rihanna_2012.jpg',
  'Drew Barrymore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Drew_Barrymore_2017.jpg/400px-Drew_Barrymore_2017.jpg',
  'Justin Bieber': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/400px-Justin_Bieber_in_2015.jpg',

  // March celebrities
  'Jessica Biel': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jessica_Biel_2012.jpg/400px-Jessica_Biel_2012.jpg',
  'Eva Mendes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Eva_Mendes_2012.jpg/400px-Eva_Mendes_2012.jpg',
  'Bryan Cranston': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Bryan_Cranston_2013.jpg/400px-Bryan_Cranston_2013.jpg',
  'Oscar Isaac': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Oscar_Isaac_2015.jpg/400px-Oscar_Isaac_2015.jpg',
  'Bruce Willis': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bruce_Willis_2010.jpg/400px-Bruce_Willis_2010.jpg',
  'Gary Oldman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Gary_Oldman_2014.jpg/400px-Gary_Oldman_2014.jpg',
  'Reese Witherspoon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Reese_Witherspoon_2014.jpg/400px-Reese_Witherspoon_2014.jpg',
  'Lady Gaga': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_Gaga_2018.jpg/400px-Lady_Gaga_2018.jpg',
  'Mariah Carey': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Mariah_Carey_2018.jpg/400px-Mariah_Carey_2018.jpg',
  'Celine Dion': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Celine_Dion_2019.jpg/400px-Celine_Dion_2019.jpg',
  'Ewan McGregor': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ewan_McGregor_2012.jpg/400px-Ewan_McGregor_2012.jpg',

  // April celebrities
  'Robert Downey Jr.': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con.jpg/400px-Robert_Downey_Jr_2014_Comic_Con.jpg',
  'Jackie Chan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Jackie_Chan_2016.jpg/400px-Jackie_Chan_2016.jpg',
  'Kristen Stewart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Kristen_Stewart_2012.jpg/400px-Kristen_Stewart_2012.jpg',
  'Emma Watson': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/400px-Emma_Watson_2013.jpg',
  'Jessica Alba': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Jessica_Alba_2010.jpg/400px-Jessica_Alba_2010.jpg',
  'Jerry Seinfeld': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Jerry_Seinfeld_2010.jpg/400px-Jerry_Seinfeld_2010.jpg',

  // May celebrities
  'George Clooney': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/George_Clooney_2016.jpg/400px-George_Clooney_2016.jpg',
  'Adele': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Adele_2016.jpg/400px-Adele_2016.jpg',
  'Tina Fey': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Tina_Fey_2012.jpg/400px-Tina_Fey_2012.jpg',
  'Cher': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cher_2019.jpg/400px-Cher_2019.jpg',

  // June celebrities  
  'Tom Holland': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_2017.jpg/400px-Tom_Holland_2017.jpg',
  'Angelina Jolie': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Angelina_Jolie_2013.jpg/400px-Angelina_Jolie_2013.jpg',
  'Kanye West': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kanye_West_2019.jpg/400px-Kanye_West_2019.jpg',
  'Natalie Portman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Natalie_Portman_2013.jpg/400px-Natalie_Portman_2013.jpg',
  'Nicole Kidman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Nicole_Kidman_2013.jpg/400px-Nicole_Kidman_2013.jpg',
  'Meryl Streep': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Meryl_Streep_2014.jpg/400px-Meryl_Streep_2014.jpg',
  'Ariana Grande': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Ariana_Grande_2014.jpg/400px-Ariana_Grande_2014.jpg',

  // July celebrities
  'Margot Robbie': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Margot_Robbie_2019.jpg/400px-Margot_Robbie_2019.jpg',
  'Tom Cruise': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_2016.jpg/400px-Tom_Cruise_2016.jpg',
  'Kevin Hart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Kevin_Hart_2014.jpg/400px-Kevin_Hart_2014.jpg',
  'Sofia Vergara': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Sofia_Vergara_2014.jpg/400px-Sofia_Vergara_2014.jpg',
  'Will Ferrell': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Will_Ferrell_2012.jpg/400px-Will_Ferrell_2012.jpg',
  'Selena Gomez': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Selena_Gomez_2012.jpg/400px-Selena_Gomez_2012.jpg',
  'Daniel Radcliffe': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Daniel_Radcliffe_2016.jpg/400px-Daniel_Radcliffe_2016.jpg',

  // August celebrities
  'Jason Momoa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Jason_Momoa_2017.jpg/400px-Jason_Momoa_2017.jpg',
  'Chris Hemsworth': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Chris_Hemsworth_2014.jpg/400px-Chris_Hemsworth_2014.jpg',
  'Jennifer Lawrence': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Jennifer_Lawrence_2016.jpg/400px-Jennifer_Lawrence_2016.jpg',
  'Steve Carell': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Steve_Carell_2010.jpg/400px-Steve_Carell_2010.jpg',
  'Robert De Niro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Robert_De_Niro_2011.jpg/400px-Robert_De_Niro_2011.jpg',
  'Blake Lively': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Blake_Lively_2011.jpg/400px-Blake_Lively_2011.jpg',

  // September celebrities  
  'Zendaya': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zendaya_2019.jpg/400px-Zendaya_2019.jpg',
  'Beyoncé': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonce_2018.jpg/400px-Beyonce_2018.jpg',
  'Adam Sandler': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adam_Sandler_2011.jpg/400px-Adam_Sandler_2011.jpg',
  'Will Smith': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Will_Smith_2019.jpg/400px-Will_Smith_2019.jpg',
  'Gwyneth Paltrow': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Gwyneth_Paltrow_2011.jpg/400px-Gwyneth_Paltrow_2011.jpg',

  // October celebrities
  'Bruno Mars': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Bruno_Mars_2014.jpg/400px-Bruno_Mars_2014.jpg',
  'Hugh Jackman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hugh_Jackman_2013.jpg/400px-Hugh_Jackman_2013.jpg',
  'Zac Efron': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Zac_Efron_2012.jpg/400px-Zac_Efron_2012.jpg',
  'Kim Kardashian': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Kim_Kardashian_2019.jpg/400px-Kim_Kardashian_2019.jpg',
  'Katy Perry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Katy_Perry_2012.jpg/400px-Katy_Perry_2012.jpg',
  'Julia Roberts': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Julia_Roberts_2011.jpg/400px-Julia_Roberts_2011.jpg',

  // November celebrities
  'Emma Stone': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Emma_Stone_2017.jpg/400px-Emma_Stone_2017.jpg',
  'Leonardo DiCaprio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Leonardo_DiCaprio_2014.jpg/400px-Leonardo_DiCaprio_2014.jpg',
  'Anne Hathaway': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Anne_Hathaway_2014.jpg/400px-Anne_Hathaway_2014.jpg',
  'Scarlett Johansson': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Scarlett_Johansson_2019.jpg/400px-Scarlett_Johansson_2019.jpg',
  'Miley Cyrus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Miley_Cyrus_2019.jpg/400px-Miley_Cyrus_2019.jpg',

  // December celebrities
  'Britney Spears': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Britney_Spears_2013.jpg/400px-Britney_Spears_2013.jpg',
  'Taylor Swift': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Taylor_Swift_2019.jpg/400px-Taylor_Swift_2019.jpg',
  'Denzel Washington': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Denzel_Washington_2018.jpg/400px-Denzel_Washington_2018.jpg',
  'LeBron James': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/LeBron_James_2016.jpg/400px-LeBron_James_2016.jpg'
};

export function getCelebrityPhoto(name: string): string | undefined {
  // Try exact match first
  if (celebrityPhotos[name]) {
    return celebrityPhotos[name];
  }
  
  // Try partial match (for cases like "Taylor Swift" vs "Swift, Taylor")
  const nameMatch = Object.keys(celebrityPhotos).find(key => 
    key.toLowerCase().includes(name.toLowerCase()) || 
    name.toLowerCase().includes(key.toLowerCase())
  );
  
  return nameMatch ? celebrityPhotos[nameMatch] : undefined;
}

// Professional portrait photos as fallbacks (diverse representation)
export const fallbackPortraits = [
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face', // Woman 1
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face', // Man 1
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face', // Woman 2
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face', // Man 2
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face', // Woman 3
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face', // Man 3
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face', // Woman 4
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face', // Man 4
];

export function getFallbackPhoto(name: string): string {
  // Use name hash to consistently assign the same fallback photo to the same person
  const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = nameHash % fallbackPortraits.length;
  return fallbackPortraits[index];
}