import { BirthdayClock } from './BirthdayClock';
import { PersonalPageSetup } from './PersonalPageSetup';
import { usePersonalPage } from '@/hooks/usePersonalPage';

const ClockHeroLite = () => {
  const { needsSetup, createPersonalPage } = usePersonalPage();

  if (needsSetup) {
    return <PersonalPageSetup onSetup={createPersonalPage} />;
  }

  return <BirthdayClock />;
};

export default ClockHeroLite;