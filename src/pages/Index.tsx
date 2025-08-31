import ErrorBoundary from "@/components/ErrorBoundary";
import ClockHeroLite from "@/components/ClockHeroLite";

const Index = () => {
  return (
    <main className="p-6">
      <ErrorBoundary>
        <ClockHeroLite />
      </ErrorBoundary>
    </main>
  );
};

export default Index;
