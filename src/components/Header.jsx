import { Menu } from 'lucide-react';

const Header = ({ onToggleSidebar, currentConversation, backend, onBackendChange }) => {
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
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">{currentConversation}</span>
        <select
          value={backend}
          onChange={e => onBackendChange(e.target.value)}
          className="ml-2 px-2 py-1 border rounded text-sm bg-white"
        >
          <option value="weaviate">Weaviate</option>
          <option value="neo4j">Neo4j</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
