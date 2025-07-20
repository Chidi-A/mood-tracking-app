import { Greeting } from '../components/Greeting';
import { Header } from '../components/Header';
import { DashboardSummary } from '../components/DashboardSummary';
import type { AppData } from '../index';
import appData from '../data.json';

export const HomePage = () => {
  return (
    <div className="max-w-[80rem] mx-auto px-6 sm:px-8 lg:p12x-">
      <Header />
      <Greeting userName="Lisa" onLogMood={() => {}} />
      <DashboardSummary data={appData as AppData} />
    </div>
  );
};
