"use client";

import { ProfileLayout } from "./ProfileLayout";
import { RequestInfo } from "rwsdk/worker";
import { useState } from "react";

// Mock data for conversations
interface Message {
  id: number;
  text: string;
  timestamp: string;
  isSent: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

// TODO: Replace mockConversations with data from database.
const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Jennifer Markus",
    avatar: "/src/app/assets/icons/boy-icon.png",
    timestamp: "2 days 10:10 AM",
    unread: false,
    messages: [
      {
        id: 1,
        text: "Hey, I would love to have you help me design the new website",
        timestamp: "10:10",
        isSent: false,
      },
    ],
  },
  {
    id: 2,
    name: "Iva Ryan",
    avatar: "/src/app/assets/icons/boy-icon.png",
    timestamp: "2 days 10:10 AM",
    unread: true,
    messages: [
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        timestamp: "10:10",
        isSent: false,
      },
      {
        id: 2,
        text: "Maecti sagittis mollis est, et porttitor.",
        timestamp: "10:21",
        isSent: false,
      },
      {
        id: 3,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        timestamp: "15:32",
        isSent: true,
      },
      {
        id: 4,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac quam orci. Pharetra vitae turpis vel non malesuada sed. Ac malesuada sed mattis ut viverra eget vitae. Blandit lorem morbi ultricies pretium. Sed in faucibus bibendum id in varius bibendum. Tincidunt eget est, semper pharetra non. Nunc, consequat tempor tellus. Elementum dui cursus nisl fringilla id mauris eu.",
        timestamp: "15:32",
        isSent: true,
      },
      {
        id: 5,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac quam orci. Pharetra vitae turpis vel non malesuada sed. Ac malesuada sed mattis ut viverra eget vitae. Blandit lorem morbi ultricies pretium. Sed in faucibus bibendum id in varius bibendum. Tincidunt eget est, semper pharetra non. Nunc, consequat tempor tellus. Elementum dui cursus nisl fringilla id mauris eu.",
        timestamp: "15:32",
        isSent: true,
      },
    ],
  },
  {
    id: 3,
    name: "Jerry Hailer",
    avatar: "/src/app/assets/icons/boy-icon.png",
    timestamp: "2 days 10:10 AM",
    unread: false,
    messages: [
      {
        id: 1,
        text: "Hey, I would love to have you help me design the new website",
        timestamp: "10:10",
        isSent: false,
      },
    ],
  },
  {
    id: 4,
    name: "David Elson",
    avatar: "/src/app/assets/icons/boy-icon.png",
    timestamp: "2 days 10:10 AM",
    unread: false,
    messages: [
      {
        id: 1,
        text: "Maecti sagittis mollis est, et porttitor.",
        timestamp: "10:21",
        isSent: false,
      },
    ],
  },
  {
    id: 5,
    name: "Mary Freund",
    avatar: "/src/app/assets/icons/boy-icon.png",
    timestamp: "2 days 10:10 AM",
    unread: false,
    messages: [
      {
        id: 1,
        text: "Hey, I would love to have you help me design the new website",
        timestamp: "10:10",
        isSent: false,
      },
    ],
  },
];

export function MessagesPage({ ctx }: RequestInfo) {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showConversationMenu, setShowConversationMenu] = useState(false);

  const activeConversation =
    conversations.find((conv) => conv.id === selectedConversationId) || null;

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = (conversationId: number) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unread: false } : conv
      )
    );
    setSelectedConversationId(conversationId);
  };

  function sendMessage(conversationId: number, message: string) {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id:
                    conv.messages.length > 0
                      ? conv.messages[conv.messages.length - 1].id + 1
                      : 1,
                  text: message,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }),
                  isSent: true,
                },
              ],
            }
          : conv
      )
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, messageInput);
    setMessageInput("");
  };

  const handleRemoveChat = () => {
    if (!activeConversation) return;
    setConversations((prev) =>
      prev.filter((conv) => conv.id !== activeConversation.id)
    );
    setSelectedConversationId(null);
    setShowConversationMenu(false);
  };

  const handleBlockUser = () => {
    if (!activeConversation) return;
    // TODO: Implement block user functionality
    alert(`Blocked ${activeConversation.name}`);
    setShowConversationMenu(false);
  };

  const handleReportUser = () => {
    if (!activeConversation) return;
    // TODO: Implement report user functionality
    alert(`Reported ${activeConversation.name}`);
    setShowConversationMenu(false);
  };

  const handleViewProfile = () => {
    if (!activeConversation) return;
    // TODO: Navigate to user profile
    window.location.href = `/profile/${activeConversation.id}`;
    setShowConversationMenu(false);
  };

  return (
    <ProfileLayout ctx={ctx}>
      <main className="h-[calc(100vh-200px)] flex">
        {/* Sidebar: List of all conversations */}
        <aside className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
          <header className="p-4 border-b border-gray-200">
            <h1
              id="conversations-heading"
              className="text-xl font-bold text-gray-900 mb-4"
            >
              All Messages
            </h1>

            <div className="relative">
              {/* SVG generert med Claude */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search or start a new chat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-[280ms]"
              />
            </div>
          </header>

          <nav className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <article
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  selectedConversationId === conversation.id
                    ? "bg-gray-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <figure>
                    <img
                      src={conversation.avatar}
                      alt={`${conversation.name}'s avatar`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                    />
                  </figure>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h2 className="font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </h2>
                      {conversation.unread && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-1">
                      {conversation.messages[conversation.messages.length - 1]
                        ?.text || "No messages yet"}
                    </p>
                    <time className="text-xs text-gray-400">
                      {conversation.timestamp}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </nav>
        </aside>

        {/* Chat Area - Right Side: Shows messages for selected conversation */}
        <section className="flex-1 bg-gray-50 flex flex-col">
          {activeConversation ? (
            <>
              <header className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <figure>
                    <img
                      src={activeConversation.avatar}
                      alt={`${activeConversation.name}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                    />
                  </figure>
                  <div>
                    <h2
                      id="chat-heading"
                      className="font-semibold text-gray-900"
                    >
                      {activeConversation.name}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative">
                  <button 
                    onClick={() => setShowConversationMenu(!showConversationMenu)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    aria-label="Conversation options"
                    aria-expanded={showConversationMenu}
                    aria-haspopup="true"
                  >
                    {/* SVG generert med Claude */}
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showConversationMenu && (
                    <>
                      {/* Backdrop to close menu when clicking outside */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowConversationMenu(false)}
                      />
                      
                      <div 
                        className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <button
                          onClick={handleViewProfile}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors cursor-pointer"
                          role="menuitem"
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          View Profile
                        </button>

                        <hr className="my-2 border-gray-200" />

                        <button
                          onClick={handleRemoveChat}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors cursor-pointer"
                          role="menuitem"
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove Chat
                        </button>

                        <button
                          onClick={handleBlockUser}
                          className="w-full px-4 py-2 text-left text-sm text-orange-600 hover:bg-orange-50 flex items-center gap-3 transition-colors cursor-pointer"
                          role="menuitem"
                        >
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          Block User
                        </button>

                        <button
                          onClick={handleReportUser}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors cursor-pointer"
                          role="menuitem"
                        >
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Report User
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </header>

              {/* Messages Area: List of messages in conversation */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse gap-4">
                {[...(activeConversation.messages ?? [])]
                  .reverse()
                  .map((message) => (
                    <article
                      key={message.id}
                      className={`flex ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl ${
                          message.isSent
                            ? "bg-primary text-white rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words">
                          {message.text}
                        </p>
                        <time
                          className={`text-xs mt-1 block ${
                            message.isSent ? "text-white/80" : "text-gray-400"
                          }`}
                        >
                          {message.timestamp}
                        </time>
                      </div>
                    </article>
                  ))}
              </div>

              <footer className="bg-white p-4 border-t border-gray-200">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-stretch gap-3"
                >
                  <div className="flex-1 relative">
                    <label htmlFor="message-input" className="sr-only">
                      Type your message
                    </label>
                    <textarea
                      id="message-input"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message here..."
                      rows={1}
                      className="w-full h-full px-4 py-3 pr-24 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-[280ms]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <button
                        type="button"
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                      >
                        {/* SVG generert med Claude */}
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                      >
                        {/* SVG generert med Claude */}
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="px-4 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors duration-[280ms] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                  >
                    {/* SVG generert med Claude */}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </footer>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                {/* SVG generert med Claude */}
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm text-gray-400 mt-1">
                  Choose from your existing conversations or start a new one
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </ProfileLayout>
  );
}
