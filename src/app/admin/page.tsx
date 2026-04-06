'use client'

import { useState, useEffect } from 'react'
import { Users, MessageSquare, BarChart3, ArrowLeft, Eye, Search, LogOut, RefreshCw, Clock, MapPin, Phone, Mail, Calendar } from 'lucide-react'

type User = {
  id: string
  name: string
  surname: string
  email: string | null
  phone: string | null
  location: string | null
  age: number | null
  created_at: string
}

type Conversation = {
  id: string
  summary: string | null
  messages: Array<{role: string, content: string}>
  created_at: string
  updated_at: string
  users: User | null
}

type View = 'dashboard' | 'users' | 'conversations' | 'conversation-detail'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [view, setView] = useState<View>('dashboard')
  const [stats, setStats] = useState({ users: 0, conversations: 0 })
  const [recentConvs, setRecentConvs] = useState<Conversation[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [initDone, setInitDone] = useState(false)
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')

  const fetchAdmin = async (type?: string, id?: string) => {
    const token = localStorage.getItem('admin_token')
    if (!token) return

    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (id) params.set('id', id)

    const res = await fetch(`/api/admin?${params.toString()}`, {
      headers: { 'x-admin-token': token }
    })

    if (res.status === 401) {
      setIsAuthenticated(false)
      localStorage.removeItem('admin_token')
      return
    }

    const data = await res.json()

    if (!type) {
      setStats(data.stats || { users: 0, conversations: 0 })
      setRecentConvs(data.recentConversations || [])
    } else if (type === 'users') {
      setUsers(data.data || [])
    } else if (type === 'conversations') {
      setConversations(data.data || [])
    } else if (type === 'conversation-detail') {
      setSelectedConv(data.data || null)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/admin', {
      headers: { 'x-admin-token': password }
    })

    if (res.ok) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_token', password)
      fetchAdmin()
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_token')
    setView('dashboard')
  }

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
      fetchAdmin().finally(() => setInitDone(true))
    } else {
      setInitDone(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && view !== 'conversation-detail') {
      setLoading(true)
      const type = view === 'users' ? 'users' : view === 'conversations' ? 'conversations' : undefined
      fetchAdmin(type).finally(() => setLoading(false))
    }
  }, [isAuthenticated, view])

  const viewConversation = async (id: string) => {
    setLoading(true)
    setView('conversation-detail')
    await fetchAdmin('conversation-detail', id)
    setLoading(false)
  }

  const filteredUsers = (users || []).filter(u =>
    `${u.name} ${u.surname} ${u.email || ''} ${u.location || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredConvs = (conversations || []).filter(c =>
    `${c.summary || ''} ${c.users?.name || ''} ${c.users?.surname || ''} ${c.users?.email || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <img src="/aisod-logo.png" alt="AISOD" className="w-12 h-12 object-contain mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900">AISOD Admin</h1>
            <p className="text-slate-500 mt-1">Enter admin password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/aisod-logo.png" alt="AISOD" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-bold text-slate-900">AISOD Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-73px)] bg-white border-r border-slate-200 p-4 hidden md:block">
          <nav className="space-y-1">
            <button
              onClick={() => { setView('dashboard'); setSearchTerm('') }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                view === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <img src="/aisod-logo.png" alt="" className="w-5 h-5 object-contain" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => { setView('users'); setSearchTerm('') }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                view === 'users' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </button>
            <button
              onClick={() => { setView('conversations'); setSearchTerm('') }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                view === 'conversations' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Conversations</span>
            </button>
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex z-40">
          <button
            onClick={() => { setView('dashboard'); setSearchTerm('') }}
            className={`flex-1 flex flex-col items-center py-2 text-xs ${
              view === 'dashboard' ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="mt-1">Dashboard</span>
          </button>
          <button
            onClick={() => { setView('users'); setSearchTerm('') }}
            className={`flex-1 flex flex-col items-center py-2 text-xs ${
              view === 'users' ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="mt-1">Users</span>
          </button>
          <button
            onClick={() => { setView('conversations'); setSearchTerm('') }}
            className={`flex-1 flex flex-col items-center py-2 text-xs ${
              view === 'conversations' ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="mt-1">Chats</span>
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pb-20 md:pb-6">
          {view === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Total Users</p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">{stats.users}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Conversations</p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">{stats.conversations}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Conversations */}
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">Recent Conversations</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {recentConvs.length === 0 ? (
                    <p className="px-6 py-8 text-center text-slate-500">No conversations yet</p>
                  ) : (
                    recentConvs.map((conv) => (
                      <div
                        key={conv.id}
                        className="px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => viewConversation(conv.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 truncate">
                              {conv.users ? `${conv.users.name} ${conv.users.surname}` : 'Anonymous'}
                            </p>
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{conv.summary || 'No summary'}</p>
                          </div>
                          <div className="text-xs text-slate-400 ml-4 flex-shrink-0">
                            {new Date(conv.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Users</h2>
                <button
                  onClick={() => fetchAdmin('users')}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                {filteredUsers.length === 0 ? (
                  <p className="px-6 py-8 text-center text-slate-500">No users found</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div key={user.id} className="px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{user.name} {user.surname}</p>
                          <div className="mt-2 space-y-1">
                            {user.email && (
                              <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <Mail className="w-3.5 h-3.5" />
                                <span>{user.email}</span>
                              </div>
                            )}
                            {user.phone && (
                              <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <Phone className="w-3.5 h-3.5" />
                                <span>{user.phone}</span>
                              </div>
                            )}
                            {user.age && (
                              <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{user.age} years old</span>
                              </div>
                            )}
                            {user.location && (
                              <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{user.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {view === 'conversations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Conversations</h2>
                <button
                  onClick={() => fetchAdmin('conversations')}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                {filteredConvs.length === 0 ? (
                  <p className="px-6 py-8 text-center text-slate-500">No conversations found</p>
                ) : (
                  filteredConvs.map((conv) => (
                    <div
                      key={conv.id}
                      className="px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => viewConversation(conv.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900">
                            {conv.users ? `${conv.users.name} ${conv.users.surname}` : 'Anonymous'}
                          </p>
                          {conv.users?.email && (
                            <p className="text-xs text-slate-400 mt-0.5">{conv.users.email}</p>
                          )}
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{conv.summary || 'No summary'}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                          <Eye className="w-4 h-4 text-slate-400" />
                          <span className="text-xs text-slate-400">
                            {new Date(conv.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {view === 'conversation-detail' && selectedConv && (
            <div className="space-y-4">
              <button
                onClick={() => setView('conversations')}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to conversations</span>
              </button>

              {/* User Info */}
              {selectedConv.users && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">User Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-slate-500">Name</span>
                      <p className="font-medium text-slate-900">{selectedConv.users.name} {selectedConv.users.surname}</p>
                    </div>
                    {selectedConv.users.email && (
                      <div>
                        <span className="text-sm text-slate-500">Email</span>
                        <p className="font-medium text-slate-900">{selectedConv.users.email}</p>
                      </div>
                    )}
                    {selectedConv.users.phone && (
                      <div>
                        <span className="text-sm text-slate-500">Phone</span>
                        <p className="font-medium text-slate-900">{selectedConv.users.phone}</p>
                      </div>
                    )}
                    {selectedConv.users.age && (
                      <div>
                        <span className="text-sm text-slate-500">Age</span>
                        <p className="font-medium text-slate-900">{selectedConv.users.age}</p>
                      </div>
                    )}
                    {selectedConv.users.location && (
                      <div>
                        <span className="text-sm text-slate-500">Location</span>
                        <p className="font-medium text-slate-900">{selectedConv.users.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Summary */}
              {selectedConv.summary && (
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Conversation Summary</h3>
                  <p className="text-blue-800 text-sm">{selectedConv.summary}</p>
                </div>
              )}

              {/* Messages */}
              <div className="bg-white rounded-xl border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">Messages</h3>
                </div>
                <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                  {selectedConv.messages?.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <RefreshCw className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
                <p className="text-sm text-slate-600 mt-2">Loading...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
