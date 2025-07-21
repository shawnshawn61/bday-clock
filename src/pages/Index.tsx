import { BirthdayClock } from '@/components/BirthdayClock';
import { PersonalPageSetup } from '@/components/PersonalPageSetup';
import { usePersonalPage } from '@/hooks/usePersonalPage';

const Index = () => {
  const { needsSetup, createPersonalPage } = usePersonalPage();

  if (needsSetup) {
    return <PersonalPageSetup onSetup={createPersonalPage} />;
  }

  return <BirthdayClock />;
};

export default Index;
