'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Send, Globe, MessageCircle, Phone, Calendar, Menu, X, Languages, ChevronDown } from 'lucide-react'

// Language translations
const translations = {
  en: {
    title: "AISOD",
    tagline: "Meet 3A - Namibia's #1 AI assistant solving real problems",
    subtitle: "Transform your business, advance your career, or automate operations with AISOD 3A",
    searchPlaceholder: "Ask 3A anything about AISOD...",
    chatPlaceholder: "Ask 3A another question...",
    quickActions: "Quick Actions",
    chatWith3A: "Chat with 3A",
    newChat: "New Chat",
    suggestedQuestions: [
      { short: "What is 3A?", full: "What is AISOD 3A and how can it help me?" },
      { short: "Learn AI skills", full: "How can I learn AI skills with AISOD?" },
      { short: "Automate my business", full: "How can AISOD help automate my business operations?" },
      { short: "AI for education", full: "How can AISOD help with AI in education?" },
      { short: "Build AI agents", full: "Tell me about building AI agents with AISOD" },
      { short: "Get in touch", full: "How can I contact AISOD?" }
    ],
    relatedWebsites: "Related AISOD websites:"
  },
  pt: {
    title: "AISOD",
    tagline: "Conheça 3A - Assistente de IA nº 1 da Namíbia resolvendo problemas reais",
    subtitle: "Transforme seu negócio, avance sua carreira ou automatize operações com AISOD 3A",
    searchPlaceholder: "Pergunte qualquer coisa ao 3A sobre AISOD...",
    chatPlaceholder: "Faça outra pergunta ao 3A...",
    quickActions: "Ações Rápidas",
    chatWith3A: "Conversar com 3A",
    newChat: "Nova Conversa",
    suggestedQuestions: [
      { short: "O que é 3A?", full: "O que é AISOD 3A e como pode me ajudar?" },
      { short: "Aprender IA", full: "Como posso aprender habilidades de IA com AISOD?" },
      { short: "Automatizar negócio", full: "Como AISOD pode ajudar a automatizar as operações do meu negócio?" },
      { short: "IA para educação", full: "Como AISOD pode ajudar com IA na educação?" },
      { short: "Criar agentes de IA", full: "Fale-me sobre a criação de agentes de IA com AISOD" },
      { short: "Entrar em contato", full: "Como posso entrar em contato com AISOD?" }
    ],
    relatedWebsites: "Sites AISOD relacionados:"
  },
  af: {
    title: "AISOD",
    tagline: "Ontmoet 3A - Namibië se #1 KI-assistent wat werklike probleme oplos",
    subtitle: "Transformeer jou besigheid, bevorder jou loopbaan of outomatiseer bedrywighede met AISOD 3A",
    searchPlaceholder: "Vra 3A enigiets oor AISOD...",
    chatPlaceholder: "Vra 3A nog 'n vraag...",
    quickActions: "Vinnige Aksies",
    chatWith3A: "Gesels met 3A",
    newChat: "Nuwe Gesels",
    suggestedQuestions: [
      { short: "Wat is 3A?", full: "Wat is AISOD 3A en hoe kan dit my help?" },
      { short: "Leer KI", full: "Hoe kan ek KI vaardighede met AISOD leer?" },
      { short: "Outomatiseer", full: "Hoe kan AISOD help om my besigheid te outomatiseer?" },
      { short: "KI vir onderwys", full: "Hoe kan AISOD help met KI in onderwys?" },
      { short: "Bou KI agente", full: "Vertel my oor die bou van KI agente met AISOD" },
      { short: "Kontak", full: "Hoe kan ek AISOD kontak?" }
    ],
    relatedWebsites: "Verwante AISOD webwerwe:"
  },
  de: {
    title: "AISOD",
    tagline: "Treffen Sie 3A - Namibias #1 KI-Assistent zur Lösung realer Probleme",
    subtitle: "Transformieren Sie Ihr Geschäft, fördern Sie Ihre Karriere oder automatisieren Sie Betriebsabläufe mit AISOD 3A",
    searchPlaceholder: "Fragen Sie 3A alles über AISOD...",
    chatPlaceholder: "Stellen Sie 3A eine weitere Frage...",
    quickActions: "Schnellaktionen",
    chatWith3A: "Mit 3A chatten",
    newChat: "Neuer Chat",
    suggestedQuestions: [
      { short: "Was ist 3A?", full: "Was ist AISOD 3A und wie kann es mir helfen?" },
      { short: "KI lernen", full: "Wie kann ich KI-Fähigkeiten mit AISOD lernen?" },
      { short: "Automatisieren", full: "Wie kann AISOD helfen, mein Geschäft zu automatisieren?" },
      { short: "KI für Bildung", full: "Wie kann AISOD mit KI in der Bildung helfen?" },
      { short: "KI-Agenten", full: "Erzählen Sie mir über das Erstellen von KI-Agenten mit AISOD" },
      { short: "Kontakt", full: "Wie kann ich AISOD kontaktieren?" }
    ],
    relatedWebsites: "Verwandte AISOD-Websites:"
  },
  om: {
    title: "AISOD",
    tagline: "Mone 3A - Omutali gwaAI ogupandula okwaShilongo sha Namibia",
    subtitle: "Longitha omadhina gago, loleke omalumbilo gago, ehe okukala omagumbo gago ngo AISOD 3A",
    searchPlaceholder: "Pula 3A oshike oshoshili tsaAISOD...",
    chatPlaceholder: "Pula 3A omapulo gamagambi...",
    quickActions: "Omagumbo Geshipandula",
    chatWith3A: "Longela shi 3A",
    newChat: "Olongelo Loshili",
    suggestedQuestions: [
      { short: "3A ngi?", full: "AISOD 3A ngi nosho ukundjisa shi?" },
      { short: "Longo AI", full: "Ondi ka longa shike omalumbilo gaAI ngo AISOD?" },
      { short: "Guma omadhina", full: "AISOD ya ka ndjisa shili nogukala omadhina gange?" },
      { short: "AI yoshikola", full: "AISOD ya ka ndjisa shi muoshikola ngo AI?" },
      { short: "Longela AI agents", full: "Popi kombinga okukala AI agents ngo AISOD" },
      { short: "Tuleniihanga", full: "Ondi ka tuleniihanga AISOD shi?" }
    ],
    relatedWebsites: "Iiwebsite yAISOD yoshili:"
  }
}

type Language = 'en' | 'pt' | 'af' | 'de' | 'om'

const languageNames = {
  en: 'English',
  pt: 'Português',
  af: 'Afrikaans',
  de: 'Deutsch',
  om: 'Oshiwambo'
}

export default function Home() {
  const [isSearchMode, setIsSearchMode] = useState(true)
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string, websites?: {name: string, url: string}[]}[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('en')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const t = translations[language]

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsSearchMode(false)
    setIsLoading(true)
    
    const userMessage = { role: 'user' as const, content: searchQuery }
    setMessages([userMessage])
    setQuery('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: searchQuery,
          conversationHistory: messages,
          language: language
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const aiResponse = {
        role: 'assistant' as const,
        content: data.message,
        websites: data.websites || []
      }
      
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error:', error)
      const errorResponse = {
        role: 'assistant' as const,
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or contact AISOD directly at +264 81 497 1482 or info@aisodinstitute.tech for immediate assistance.",
        websites: [
          { name: 'AISOD Main Website', url: 'https://aisod.tech' },
          { name: 'Contact AISOD', url: 'https://aisod.tech' }
        ]
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSearchMode) {
      handleSearch(query)
    } else {
      handleSearch(query)
    }
  }

  const resetToSearch = () => {
    setIsSearchMode(true)
    setMessages([])
    setQuery('')
    setIsSidebarOpen(false)
  }

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchMode])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      // Escape to close sidebar and language menu
      if (e.key === 'Escape') {
        if (isSidebarOpen) setIsSidebarOpen(false)
        if (isLanguageMenuOpen) setIsLanguageMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSidebarOpen, isLanguageMenuOpen])

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isLanguageMenuOpen && !target.closest('.language-selector')) {
        setIsLanguageMenuOpen(false)
      }
    }
    if (isLanguageMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isLanguageMenuOpen])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <div 
             className="flex items-center space-x-2 cursor-pointer"
             onClick={resetToSearch}
             role="button"
             tabIndex={0}
             aria-label="Go to home"
           >
             <img 
               src="/aisod-logo.png" 
               alt="AISOD Logo" 
               className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
               }}
             />
             <span className="text-xl sm:text-2xl font-bold text-blue-600">
               AISOD
             </span>
           </div>
          
          {/* Language Selector - Always visible */}
          <div className="flex items-center space-x-2">
            <div className="relative language-selector">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Select language"
              >
                <Languages className="w-5 h-5 text-slate-600" />
                <span className="hidden sm:inline text-sm font-medium text-slate-700">{languageNames[language]}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
              
              {/* Language dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-fade-in">
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang)
                        setIsLanguageMenuOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        language === lang ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                      }`}
                    >
                      <span className="font-medium">{languageNames[lang]}</span>
                      {language === lang && (
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {!isSearchMode && (
              <>
                {/* Mobile menu button */}
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={isSidebarOpen}
                >
                  <Menu className="w-5 h-5 text-slate-600" />
                </button>
              
              {/* Desktop quick actions */}
              <div className="hidden sm:flex items-center space-x-1">
                <a 
                  href="tel:+26481497148"
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Call AISOD"
                >
                  <Phone className="w-5 h-5 text-slate-600" />
                </a>
                <a 
                  href="mailto:info@aisodinstitute.tech"
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Email AISOD"
                >
                  <Calendar className="w-5 h-5 text-slate-600" />
                </a>
                <a 
                  href="https://aisod.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Visit AISOD website"
                >
                  <Globe className="w-5 h-5 text-slate-600" />
                </a>
              </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {isSearchMode ? (
          /* Google-like Search Mode */
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
             <div className="text-center mb-8 animate-fade-in">
               <div className="flex items-center justify-center mb-6">
                 <img 
                   src="/aisod-logo.png" 
                   alt="AISOD Logo" 
                   className="w-12 h-12 sm:w-16 sm:h-16 object-contain mr-3 sm:mr-4"
                   onError={(e) => {
                     e.currentTarget.style.display = 'none';
                   }}
                 />
                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
                   {t.title}
                 </h1>
               </div>
               <p className="text-lg sm:text-xl text-slate-700 mb-2 font-normal">{t.tagline}</p>
               <p className="text-sm sm:text-base text-slate-500">{t.subtitle}</p>
             </div>

             <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4">
               <div className="relative">
                 <div 
                   className="relative bg-white rounded-full shadow-md hover:shadow-lg border border-slate-300 focus-within:border-blue-500 focus-within:shadow-xl transition-all duration-200 cursor-text"
                   onClick={() => inputRef.current?.focus()}
                 >
                   <div className="flex items-center px-4 sm:px-5 py-3 sm:py-3.5">
                     <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                     <input
                       ref={inputRef}
                       type="text"
                       value={query}
                       onChange={(e) => setQuery(e.target.value)}
                       placeholder={t.searchPlaceholder}
                       className="flex-1 ml-3 sm:ml-4 text-base bg-transparent border-none outline-none text-slate-900 placeholder-slate-500"
                       aria-label="Search AISOD"
                       role="searchbox"
                       autoComplete="off"
                     />
                     {query && (
                       <button
                         type="button"
                         onClick={(e) => {
                           e.stopPropagation();
                           setQuery('');
                         }}
                         className="mr-2 sm:mr-3 p-1 hover:bg-slate-100 rounded-full transition-colors"
                         aria-label="Clear search"
                       >
                         <X className="w-4 h-4 text-slate-500" />
                       </button>
                     )}
                     <button
                       type="submit"
                       disabled={!query.trim()}
                       onClick={(e) => e.stopPropagation()}
                       className="p-2 sm:p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                       aria-label="Submit search"
                       aria-disabled={!query.trim()}
                     >
                       <Send className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
             </form>

             {/* Suggested Questions */}
             <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl px-4">
               {t.suggestedQuestions.map((suggestion) => (
                 <button
                   key={suggestion.short}
                   onClick={() => setQuery(suggestion.full)}
                   className="px-3 sm:px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-full border border-slate-200 hover:border-slate-300 transition-all text-xs sm:text-sm font-medium"
                 >
                   {suggestion.short}
                 </button>
               ))}
             </div>
          </div>
        ) : (
          /* Chat Mode */
          <div className="flex h-[calc(100vh-73px)]">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                   {messages.map((message, index) => (
                     <div key={index} className={`mb-4 sm:mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                       <div className={`max-w-[85%] sm:max-w-2xl ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 border border-slate-200'} rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm`}>
                         <div className={`text-sm sm:text-base ${message.role === 'user' ? 'text-white' : 'text-slate-900'} leading-relaxed space-y-3`}>
                           {message.content.split('\n\n').filter(p => p.trim()).map((paragraph, idx) => (
                             <p key={idx} className="whitespace-pre-wrap">{paragraph.trim()}</p>
                           ))}
                         </div>
                        {message.websites && message.websites.length > 0 && (
                          <div className="mt-3 sm:mt-4 space-y-2">
                            <p className="text-xs sm:text-sm text-slate-600 font-medium">{t.relatedWebsites}</p>
                            {message.websites.map((site, idx) => (
                              <a
                                key={idx}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 p-2 bg-white hover:bg-slate-50 rounded-lg transition-colors group"
                              >
                                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-blue-600" />
                                <span className="text-xs sm:text-sm text-slate-700 group-hover:text-blue-600">{site.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="mb-6 flex justify-start animate-fade-in">
                      <div className="bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                        <div className="space-y-2 w-48 sm:w-64">
                          <div className="h-3 sm:h-4 bg-slate-200 rounded animate-pulse"></div>
                          <div className="h-3 sm:h-4 bg-slate-200 rounded animate-pulse w-5/6"></div>
                          <div className="h-3 sm:h-4 bg-slate-200 rounded animate-pulse w-4/6"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 sm:p-6 border-t border-slate-200 bg-white">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                       placeholder={t.chatPlaceholder}
                       className="w-full px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                       aria-label="Chat input"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!query.trim() || isLoading}
                      className="p-2.5 sm:p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar - Desktop and Mobile Overlay */}
            <div 
              className={`
                fixed lg:relative inset-y-0 right-0 w-full sm:w-80 lg:w-80 xl:w-96
                bg-white border-l border-slate-200 p-4 sm:p-6 
                transform transition-transform duration-300 ease-in-out z-50
                ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                overflow-y-auto
              `}
            >
              {/* Mobile close button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>

              <h3 className="font-semibold text-slate-900 mb-4 text-base sm:text-lg">{t.quickActions}</h3>
              <div className="space-y-2 sm:space-y-3">
                <a 
                  href="tel:+26481497148" 
                  className="w-full flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Phone className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-slate-900 block text-sm sm:text-base font-medium">Contact AISOD</span>
                    <span className="text-xs sm:text-sm text-slate-500">+264 81 497 1482</span>
                  </div>
                </a>
                <a 
                  href="mailto:info@aisodinstitute.tech" 
                  className="w-full flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Calendar className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-slate-900 block text-sm sm:text-base font-medium">Book Appointment</span>
                    <span className="text-xs sm:text-sm text-slate-500">info@aisodinstitute.tech</span>
                  </div>
                </a>
                 <button 
                   onClick={() => {
                     setQuery("I need support with AISOD services")
                     setIsSidebarOpen(false)
                   }}
                   className="w-full flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                 >
                   <MessageCircle className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                   <span className="text-slate-900 text-sm sm:text-base font-medium">{t.chatWith3A}</span>
                 </button>
                <a 
                  href="https://aisod.tech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Globe className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-900 text-sm sm:text-base font-medium">Visit AISOD.tech</span>
                </a>
              </div>
            </div>

            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      {isSearchMode && (
        <footer className="p-4 sm:p-6 text-center">
          <div className="text-xs sm:text-sm text-slate-500 flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="https://aisod.tech" className="hover:text-slate-700 transition-colors">About AISOD</a>
            <a href="https://aisod.tech" className="hover:text-slate-700 transition-colors">Privacy</a>
            <a href="https://aisod.tech" className="hover:text-slate-700 transition-colors">Terms</a>
            <a href="mailto:info@aisodinstitute.tech" className="hover:text-slate-700 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-slate-400 mt-2">© 2026 AISOD Inc. All rights reserved.</p>
        </footer>
      )}
    </div>
  )
}