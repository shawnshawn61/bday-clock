import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export interface PersonalPageData {
  slug: string;
  firstName: string;
  lastName: string;
  birthday: string; // MMDD format
}

export const usePersonalPage = () => {
  const { userSlug } = useParams();
  const navigate = useNavigate();
  const [isPersonalPage, setIsPersonalPage] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    if (userSlug) {
      setIsPersonalPage(true);
      // Check if this is a valid personal page in localStorage
      const personalData = localStorage.getItem(`personal-page-${userSlug}`);
      if (!personalData) {
        // This slug doesn't exist, redirect to setup
        setNeedsSetup(true);
      }
    } else {
      // On root page, check if user has a personal page already
      const existingSlug = localStorage.getItem('user-personal-slug');
      if (existingSlug) {
        navigate(`/${existingSlug}`);
      } else {
        setNeedsSetup(true);
      }
    }
  }, [userSlug, navigate]);

  const generateSlug = (firstName: string, lastName: string, birthday: string) => {
    const baseSlug = `${firstName.toLowerCase()}${lastName.toLowerCase()}${birthday}`;
    let finalSlug = baseSlug;
    let counter = 2;
    
    // Check for duplicates
    while (localStorage.getItem(`personal-page-${finalSlug}`)) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    return finalSlug;
  };

  const createPersonalPage = (firstName: string, lastName: string, birthday: string) => {
    const slug = generateSlug(firstName, lastName, birthday);
    const personalData: PersonalPageData = {
      slug,
      firstName,
      lastName,
      birthday
    };
    
    localStorage.setItem(`personal-page-${slug}`, JSON.stringify(personalData));
    localStorage.setItem('user-personal-slug', slug);
    
    navigate(`/${slug}`);
    setNeedsSetup(false);
  };

  const migrateSlug = (oldSlug: string, newSlug: string) => {
    // Migrate personal page data
    const oldPersonalData = localStorage.getItem(`personal-page-${oldSlug}`);
    if (oldPersonalData) {
      const personalData = JSON.parse(oldPersonalData);
      personalData.slug = newSlug;
      localStorage.setItem(`personal-page-${newSlug}`, JSON.stringify(personalData));
      localStorage.removeItem(`personal-page-${oldSlug}`);
    }
    
    // Migrate birthday data
    const oldBirthdayData = localStorage.getItem(`birthday-clock-data-${oldSlug}`);
    if (oldBirthdayData) {
      localStorage.setItem(`birthday-clock-data-${newSlug}`, oldBirthdayData);
      localStorage.removeItem(`birthday-clock-data-${oldSlug}`);
    }
    
    // Update user's personal slug
    localStorage.setItem('user-personal-slug', newSlug);
    
    navigate(`/${newSlug}`);
  };

  return {
    isPersonalPage,
    needsSetup,
    currentSlug: userSlug,
    createPersonalPage,
    migrateSlug
  };
};