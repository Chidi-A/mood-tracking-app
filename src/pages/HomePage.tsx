import { Greeting } from '../components/Greeting';
import { Header } from '../components/Header';
import { DashboardSummary } from '../components/DashboardSummary';
import { LogMoodModal } from '../features/LogMoodModal';
import type { AppData } from '../index';
import appData from '../data.json';
import { useAppDispatch } from '../store/hooks';
import { openModal } from '../store/moodFormSlice';
import type { MoodFormData } from '../features/types';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const handleLogMood = () => {
    console.log('🔘 Log Mood button clicked');
    dispatch(openModal());
  };

  const handleSubmitMood = async (formData: MoodFormData) => {
    console.log('📋 Form submitted from HomePage:', formData);
    // This will be called after successful Supabase submission
  };

  return (
    <div className="max-w-[80rem] mx-auto px-6 sm:px-8 lg:p12x-">
      <Header />
      <Greeting userName="Lisa" />
      <DashboardSummary data={appData as AppData} />
      <LogMoodModal onSubmit={handleSubmitMood} />
    </div>
  );
};
