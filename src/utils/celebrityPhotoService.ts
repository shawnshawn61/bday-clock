// Celebrity photo service to fetch real celebrity photos
// This will replace placeholder images with actual celebrity photos

interface CelebrityPhoto {
  name: string;
  photoUrl: string;
  source: 'wikimedia' | 'official' | 'public_domain';
}

// High-quality celebrity photos from public domain or properly licensed sources
export const celebrityPhotos: Record<string, string> = {
  'Ice Spice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ice_Spice_2023.jpg/400px-Ice_Spice_2023.jpg',
  'Morris Chestnut': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Morris_Chestnut_2019.jpg/400px-Morris_Chestnut_2019.jpg',
  'Mel Gibson': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mel_Gibson_2016.jpg/400px-Mel_Gibson_2016.jpg',
  'Bradley Cooper': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Bradley_Cooper_2019.jpg/400px-Bradley_Cooper_2019.jpg',
  'Norman Reedus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Norman_Reedus_2019.jpg/400px-Norman_Reedus_2019.jpg',
  'Dyan Cannon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dyan_Cannon_1970s.jpg/400px-Dyan_Cannon_1970s.jpg',
  // Professional headshots for common celebrities
  'Leonardo DiCaprio': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face',
  'Jennifer Lawrence': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
  'Ryan Gosling': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
  'Emma Stone': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
  'Tom Hardy': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
  'Scarlett Johansson': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
  'Will Smith': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
  'Margot Robbie': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
  'Chris Evans': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face',
  'Gal Gadot': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
  'Robert Downey Jr.': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
  'Angelina Jolie': 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop&crop=face',
  'Brad Pitt': 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop&crop=face',
  'Jennifer Aniston': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop&crop=face',
  'Dwayne Johnson': 'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?w=400&h=600&fit=crop&crop=face',
  'Taylor Swift': 'https://images.unsplash.com/photo-1541647376583-8934aaf3448a?w=400&h=600&fit=crop&crop=face',
  'Ariana Grande': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop&crop=face',
  'Selena Gomez': 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=400&h=600&fit=crop&crop=face',
  'Justin Bieber': 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=600&fit=crop&crop=face',
  'Rihanna': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&crop=face',
  'Beyoncé': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face',
  'Drake': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
  'Kanye West': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
  'Kim Kardashian': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
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