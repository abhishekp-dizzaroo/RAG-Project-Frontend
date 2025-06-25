import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import apiService from './services/ai.service';

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your RAG assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Document Analysis', active: true },
    { id: 2, title: 'Research Questions', active: false },
    { id: 3, title: 'Data Processing', active: false },
  ]);
  const [backend, setBackend] = useState('weaviate');

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Send query to backend API (pass backend as argument for future use)
      const response = await apiService.generate_response(currentInput, backend);
      
      // Add assistant response
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Handle error
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `Error: ${error.message}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: 'Hello! I\'m your RAG assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
    setInputValue('');
    setIsLoading(false);
  };

  const handleConversationSelect = (conversationId) => {
    setConversations(prev => 
      prev.map(conv => ({
        ...conv,
        active: conv.id === conversationId
      }))
    );
  };

  const currentConversation = conversations.find(conv => conv.active)?.title || 'Document Analysis';

  return (
    <div className="fixed inset-0 flex bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen}
        conversations={conversations}
        onNewChat={handleNewChat}
        onConversationSelect={handleConversationSelect}
      />
      
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-shrink-0">
          <Header 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            currentConversation={currentConversation}
            backend={backend}
            onBackendChange={setBackend}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ChatArea messages={messages} isLoading={isLoading} />
          </div>
          <div className="flex-shrink-0">
            <InputArea 
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;