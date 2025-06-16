import { Menu } from 'lucide-react';

const Header = ({ onToggleSidebar, currentConversation }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">RAG Assistant</h1>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">{currentConversation}</span>
      </div>
    </header>
  );
};

export default Header;
