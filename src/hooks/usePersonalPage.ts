import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export interface PersonalPageData {
  slug: string;
  firstName: string;
  lastInitial: string;
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

  const generateSlug = (firstName: string, lastInitial: string, birthday: string) => {
    const baseSlug = `${firstName.toLowerCase()}${lastInitial.toLowerCase()}${birthday}`;
    let finalSlug = baseSlug;
    let counter = 2;
    
    // Check for duplicates
    while (localStorage.getItem(`personal-page-${finalSlug}`)) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    return finalSlug;
  };

  const createPersonalPage = (firstName: string, lastInitial: string, birthday: string) => {
    const slug = generateSlug(firstName, lastInitial, birthday);
    const personalData: PersonalPageData = {
      slug,
      firstName,
      lastInitial,
      birthday
    };
    
    localStorage.setItem(`personal-page-${slug}`, JSON.stringify(personalData));
    localStorage.setItem('user-personal-slug', slug);
    
    navigate(`/${slug}`);
    setNeedsSetup(false);
  };

  return {
    isPersonalPage,
    needsSetup,
    currentSlug: userSlug,
    createPersonalPage
  };
};