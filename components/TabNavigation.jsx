// components/TabNavigation.jsx
import { memo } from "react";

export const TabNavigation = memo(function TabNavigation({
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    { id: "episodes", label: "Episodes" },
    { id: "characters", label: "Characters" },
    { id: "recommendations", label: "Recommendations" },
  ];

  return (
    <div className="flex gap-4 mb-6 border-b border-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === tab.id
              ? "text-purple-500 border-b-2 border-purple-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
});
