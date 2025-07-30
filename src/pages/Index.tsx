import { BirthdayClock } from '@/components/BirthdayClock';
import { PersonalPageSetup } from '@/components/PersonalPageSetup';
import { usePersonalPage } from '@/hooks/usePersonalPage';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { needsSetup, createPersonalPage, currentSlug, migrateSlug } = usePersonalPage();

  // Show migration button for the misspelled slug
  if (currentSlug === 'shawnshawngaithier1031') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Fix Your URL</h1>
          <p className="text-muted-foreground">
            Your current URL has "Gaithier" but it should be "Gauthier".<br/>
            Click below to migrate your data to the correct spelling.
          </p>
          <Button 
            onClick={() => migrateSlug('shawnshawngaithier1031', 'shawnshawngauthier1031')}
            className="px-8 py-2"
          >
            Fix My URL to: shawnshawngauthier1031
          </Button>
        </div>
      </div>
    );
  }

  if (needsSetup) {
    return <PersonalPageSetup onSetup={createPersonalPage} />;
  }

  return <BirthdayClock />;
};

export default Index;
