import { useState, useEffect } from 'react';
import type { Birthday } from '@/components/BirthdayClock';

const STORAGE_KEY = 'birthday-clock-data';

export const useBirthdayStorage = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);

  // Load birthdays from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBirthdays(parsed);
      }
    } catch (error) {
      console.error('Error loading birthdays from storage:', error);
    }
  }, []);

  // Save birthdays to localStorage whenever birthdays change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(birthdays));
    } catch (error) {
      console.error('Error saving birthdays to storage:', error);
    }
  }, [birthdays]);

  const addBirthday = (newBirthday: Omit<Birthday, 'id'>) => {
    const birthday: Birthday = {
      ...newBirthday,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setBirthdays(prev => [...prev, birthday]);
  };

  const removeBirthday = (id: string) => {
    setBirthdays(prev => prev.filter(birthday => birthday.id !== id));
  };

  const updateBirthday = (id: string, updates: Partial<Omit<Birthday, 'id'>>) => {
    setBirthdays(prev => 
      prev.map(birthday => 
        birthday.id === id ? { ...birthday, ...updates } : birthday
      )
    );
  };

  const clearAllBirthdays = () => {
    setBirthdays([]);
  };

  return {
    birthdays,
    addBirthday,
    removeBirthday,
    updateBirthday,
    clearAllBirthdays,
  };
};