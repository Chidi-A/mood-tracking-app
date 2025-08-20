import { Greeting } from '../components/Greeting';
import { Header } from '../components/Header';
import { DashboardSummary } from '../components/DashboardSummary';
import { LogMoodModal } from '../features/LogMoodModal';
import type { MoodFormData } from '../features/types';

export const HomePage = () => {
  const handleSubmitMood = async (formData: MoodFormData) => {
    console.log('formData', formData);
  };

  return (
    <div className="max-w-[80rem] mx-auto px-6 sm:px-8 lg:p12x-">
      <Header />
      <Greeting />
      <DashboardSummary />
      <LogMoodModal onSubmit={handleSubmitMood} />
    </div>
  );
};
