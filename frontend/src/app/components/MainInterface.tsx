import { useState } from 'react';
import { Home, Search, ArrowRightLeft, Bot, UserCircle } from 'lucide-react';
import { HomeTab } from './HomeTab';
import { SearchSkills } from './SearchSkills';
import { TransactionLedger } from './TransactionLedger';
import { AIChatbot } from './AIChatbot';
import { AccountDetails } from './AccountDetails';

type Tab = 'home' | 'search' | 'ledger' | 'chatbot' | 'account';

export function MainInterface() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const navItems = [
    { id: 'home' as Tab, icon: Home, label: 'Home' },
    { id: 'search' as Tab, icon: Search, label: 'Search' },
    { id: 'ledger' as Tab, icon: ArrowRightLeft, label: 'Ledger' },
    { id: 'chatbot' as Tab, icon: Bot, label: 'AI Chat' },
    { id: 'account' as Tab, icon: UserCircle, label: 'Account' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'search' && <SearchSkills />}
        {activeTab === 'ledger' && <TransactionLedger />}
        {activeTab === 'chatbot' && <AIChatbot />}
        {activeTab === 'account' && <AccountDetails />}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-amber-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center py-3 px-4 transition-all ${
                    isActive
                      ? 'text-amber-700 font-semibold'
                      : 'text-amber-500 hover:text-amber-700'
                  }`}
                >
                  <Icon size={24} className={isActive ? 'mb-1' : 'mb-1'} />
                  <span className="text-xs">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 w-12 h-1 bg-amber-700 rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
