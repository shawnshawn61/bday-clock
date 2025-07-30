import { BirthdayClock } from '@/components/BirthdayClock';
import { PersonalPageSetup } from '@/components/PersonalPageSetup';
import { usePersonalPage } from '@/hooks/usePersonalPage';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { needsSetup, createPersonalPage, currentSlug, migrateSlug } = usePersonalPage();

  // Remove the migration code since slug is now correct

  if (needsSetup) {
    return <PersonalPageSetup onSetup={createPersonalPage} />;
  }

  return <BirthdayClock />;
};

export default Index;
