import { Send } from 'lucide-react';
const InputArea = ({ inputValue, onInputChange, onSendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="w-full border-t bg-white px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about your documents..."
            className="w-full p-2 pr-0 text-sm border border-gray-300 rounded-2xl shadow-sm resize-none transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <button
            onClick={onSendMessage}
            disabled={!inputValue.trim()}
            className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
