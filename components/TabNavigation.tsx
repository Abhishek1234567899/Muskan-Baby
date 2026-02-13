
import React from 'react';
import { AppTab } from '../types';

interface TabNavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: AppTab.LETTER, label: 'Love Letter', icon: '✉️' },
    { id: AppTab.IMAGE, label: 'Dreamy Art', icon: '🎨' },
    { id: AppTab.VIDEO, label: 'Reel Script', icon: '🎬' },
    { id: AppTab.MESSAGE, label: 'Sweet Message', icon: '💬' },
    { id: AppTab.PROPOSAL, label: 'The Proposal', icon: '❤️' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 p-1 bg-rose-100/50 rounded-2xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
            activeTab === tab.id
              ? 'bg-rose-500 text-white shadow-lg scale-105'
              : 'text-rose-600 hover:bg-rose-200'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
