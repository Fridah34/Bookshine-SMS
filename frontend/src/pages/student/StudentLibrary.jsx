import React, { useState } from 'react';
import { BookOpen, Search, Calendar, Clock, Filter, History, Star, AlertCircle, CheckCircle, Library, FileText, Users } from 'lucide-react';

const StudentLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Books');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('browse');

  // Realistic Kenyan high school library books
  const libraryBooks = [
    {
      id: 1,
      title: 'A Doll\'s House',
      author: 'Henrik Ibsen',
      category: 'Set Books - Literature',
      isbn: '978-0-486-27062-0',
      copies: 45,
      available: 12,
      status: 'available',
      coverColor: 'from-blue-500 to-cyan-500',
      description: 'Form 3 & 4 Literature set book',
      publisher: 'East African Educational Publishers'
    },
    {
      id: 2,
      title: 'The River and the Source',
      author: 'Margaret Ogola',
      category: 'Set Books - Literature',
      isbn: '978-9966-46-612-8',
      copies: 50,
      available: 8,
      status: 'limited',
      coverColor: 'from-purple-500 to-pink-500',
      description: 'Popular KCSE Literature text',
      publisher: 'Focus Publishers'
    },
    {
      id: 3,
      title: 'Blossoms of the Savannah',
      author: 'Henry Ole Kulet',
      category: 'Set Books - Literature',
      isbn: '978-9966-56-020-8',
      copies: 40,
      available: 0,
      status: 'unavailable',
      coverColor: 'from-amber-500 to-orange-500',
      description: 'Form 3 & 4 Literature set book',
      publisher: 'Longhorn Publishers'
    },
    {
      id: 4,
      title: 'The Caucasian Chalk Circle',
      author: 'Bertolt Brecht',
      category: 'Set Books - Literature',
      isbn: '978-0-141-18977-6',
      copies: 38,
      available: 15,
      status: 'available',
      coverColor: 'from-green-500 to-emerald-500',
      description: 'Drama - Form 3 & 4',
      publisher: 'Heinemann'
    },
    {
      id: 5,
      title: 'Inheritance',
      author: 'David Mulwa',
      category: 'Set Books - Literature',
      isbn: '978-9966-56-023-9',
      copies: 42,
      available: 19,
      status: 'available',
      coverColor: 'from-indigo-500 to-purple-500',
      description: 'Contemporary African play',
      publisher: 'Oxford University Press'
    },
    {
      id: 6,
      title: 'Mathematics Form 3',
      author: 'KLB',
      category: 'Textbooks - Mathematics',
      isbn: '978-9966-22-345-6',
      copies: 60,
      available: 25,
      status: 'available',
      coverColor: 'from-blue-600 to-indigo-600',
      description: 'Kenya Literature Bureau textbook',
      publisher: 'Kenya Literature Bureau'
    },
    {
      id: 7,
      title: 'Chemistry Topical Revision',
      author: 'Multiple Authors',
      category: 'Revision Materials',
      isbn: '978-9966-88-234-1',
      copies: 35,
      available: 3,
      status: 'limited',
      coverColor: 'from-green-600 to-teal-600',
      description: 'KCSE preparation guide',
      publisher: 'Spotlight Publishers'
    },
    {
      id: 8,
      title: 'Shujaa wa KCSE Kiswahili',
      author: 'Wanyama & Wafula',
      category: 'Revision Materials',
      isbn: '978-9966-77-456-3',
      copies: 28,
      available: 10,
      status: 'available',
      coverColor: 'from-red-500 to-rose-500',
      description: 'Comprehensive Kiswahili guide',
      publisher: 'Moran Publishers'
    },
    {
      id: 9,
      title: 'Biology Practical Manual',
      author: 'KLB',
      category: 'Textbooks - Sciences',
      isbn: '978-9966-22-567-8',
      copies: 45,
      available: 18,
      status: 'available',
      coverColor: 'from-emerald-500 to-green-500',
      description: 'Lab experiments and procedures',
      publisher: 'Kenya Literature Bureau'
    },
    {
      id: 10,
      title: 'Peak Revision KCSE Physics',
      author: 'Ochieng et al',
      category: 'Revision Materials',
      isbn: '978-9966-33-789-2',
      copies: 32,
      available: 14,
      status: 'available',
      coverColor: 'from-cyan-500 to-blue-500',
      description: 'Past papers with answers',
      publisher: 'East African Publishers'
    },
    {
      id: 11,
      title: 'Daily Nation Archives',
      author: 'Nation Media Group',
      category: 'Newspapers & Magazines',
      isbn: 'N/A',
      copies: 5,
      available: 5,
      status: 'available',
      coverColor: 'from-slate-500 to-gray-600',
      description: 'Current affairs for essays',
      publisher: 'Nation Media Group'
    },
    {
      id: 12,
      title: 'The Standard Newspaper',
      author: 'Standard Media Group',
      category: 'Newspapers & Magazines',
      isbn: 'N/A',
      copies: 5,
      available: 5,
      status: 'available',
      coverColor: 'from-slate-600 to-gray-700',
      description: 'Daily newspaper',
      publisher: 'Standard Media Group'
    }
  ];

  // Currently borrowed books
  const borrowedBooks = [
    {
      id: 2,
      title: 'The River and the Source',
      author: 'Margaret Ogola',
      borrowDate: '2024-11-20',
      dueDate: '2024-12-20',
      status: 'active',
      daysLeft: 5,
      coverColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 7,
      title: 'Chemistry Topical Revision',
      author: 'Multiple Authors',
      borrowDate: '2024-12-01',
      dueDate: '2024-12-31',
      status: 'active',
      daysLeft: 16,
      coverColor: 'from-green-600 to-teal-600'
    }
  ];

  // Reading history
  const readingHistory = [
    {
      id: 1,
      title: 'A Doll\'s House',
      author: 'Henrik Ibsen',
      borrowDate: '2024-10-15',
      returnDate: '2024-11-14',
      status: 'returned',
      coverColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      title: 'The Caucasian Chalk Circle',
      author: 'Bertolt Brecht',
      borrowDate: '2024-09-10',
      returnDate: '2024-10-10',
      status: 'returned',
      coverColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 6,
      title: 'Mathematics Form 3',
      author: 'KLB',
      borrowDate: '2024-11-01',
      returnDate: '2024-11-08',
      status: 'returned',
      coverColor: 'from-blue-600 to-indigo-600'
    }
  ];

  const categories = [
    'All Books',
    'Set Books - Literature',
    'Textbooks - Mathematics',
    'Textbooks - Sciences',
    'Revision Materials',
    'Newspapers & Magazines'
  ];

  const filteredBooks = libraryBooks.filter(book => {
    const matchesCategory = selectedCategory === 'All Books' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDaysLeftColor = (days) => {
    if (days <= 3) return 'text-red-600 bg-red-50';
    if (days <= 7) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                School Library
              </h1>
              <p className="text-slate-600 text-lg">
                Browse, Borrow & Learn • Academic Year 2024
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg">
              <Library className="text-indigo-600 w-6 h-6" />
              <div>
                <p className="text-sm text-slate-600 font-medium">Books Borrowed</p>
                <p className="text-lg font-bold text-slate-800">{borrowedBooks.length} / 3</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-2 shadow-lg flex gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'browse'
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 hover:bg-white hover:scale-105'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Browse Books</span>
            </button>
            <button
              onClick={() => setActiveTab('borrowed')}
              className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'borrowed'
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 hover:bg-white hover:scale-105'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Currently Borrowed</span>
              {borrowedBooks.length > 0 && (
                <span className="px-2 py-1 bg-white text-indigo-600 rounded-full text-xs font-bold">
                  {borrowedBooks.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-slate-600 hover:bg-white hover:scale-105'
              }`}
            >
              <History className="w-5 h-5" />
              <span className="font-semibold">Reading History</span>
            </button>
          </div>
        </div>

        {/* Browse Books Tab */}
        {activeTab === 'browse' && (
          <div className="animate-fade-in">
            {/* Search and Filter */}
            <div className="mb-6">
              <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-4 shadow-lg">
                <div className="flex gap-4">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by title or author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-12 pr-8 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none appearance-none cursor-pointer font-medium text-slate-700 transition-all duration-300"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Library Statistics */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Total Books</span>
                </div>
                <div className="text-3xl font-bold text-slate-800">{libraryBooks.length}</div>
                <div className="text-xs text-slate-500 mt-1">In collection</div>
              </div>

              <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Available</span>
                </div>
                <div className="text-3xl font-bold text-slate-800">
                  {libraryBooks.reduce((sum, book) => sum + book.available, 0)}
                </div>
                <div className="text-xs text-slate-500 mt-1">Ready to borrow</div>
              </div>

              <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Borrowed</span>
                </div>
                <div className="text-3xl font-bold text-slate-800">{borrowedBooks.length}</div>
                <div className="text-xs text-slate-500 mt-1">By you</div>
              </div>

              <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Books Read</span>
                </div>
                <div className="text-3xl font-bold text-slate-800">{readingHistory.length}</div>
                <div className="text-xs text-slate-500 mt-1">This term</div>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300"
                >
                  {/* Book Cover */}
                  <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${book.coverColor} flex items-center justify-center mb-4 shadow-lg relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <BookOpen className="w-16 h-16 text-white relative z-10" />
                    <div className="absolute top-3 right-3">
                      {book.status === 'available' && (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
                          Available
                        </span>
                      )}
                      {book.status === 'limited' && (
                        <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-md">
                          Limited
                        </span>
                      )}
                      {book.status === 'unavailable' && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                          Out
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{book.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">by {book.author}</p>
                    <p className="text-xs text-indigo-600 font-medium mb-2">{book.category}</p>
                    <p className="text-xs text-slate-500 mb-3">{book.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                      <span>{book.available}/{book.copies} copies</span>
                    </div>
                  </div>

                  {/* Borrow Button */}
                  <button
                    disabled={book.status === 'unavailable' || borrowedBooks.length >= 3}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      book.status === 'unavailable' || borrowedBooks.length >= 3
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:scale-105 hover:shadow-lg'
                    }`}
                  >
                    {book.status === 'unavailable'
                      ? 'Not Available'
                      : borrowedBooks.length >= 3
                      ? 'Borrow Limit Reached'
                      : 'Borrow Book'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Currently Borrowed Tab */}
        {activeTab === 'borrowed' && (
          <div className="animate-fade-in">
            {borrowedBooks.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-12 shadow-lg text-center">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-600 mb-2">No Books Borrowed</h3>
                <p className="text-slate-500">Browse the library to borrow books for your studies</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {borrowedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      {/* Book Cover */}
                      <div className={`w-32 h-40 rounded-xl bg-gradient-to-br ${book.coverColor} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <BookOpen className="w-12 h-12 text-white" />
                      </div>

                      {/* Book Details */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-800 mb-1">{book.title}</h3>
                        <p className="text-slate-600 mb-4">by {book.author}</p>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-white rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-indigo-500" />
                              <span className="text-xs text-slate-600">Borrowed</span>
                            </div>
                            <p className="text-sm font-semibold text-slate-800 font-mono">
                              {new Date(book.borrowDate).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="bg-white rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-purple-500" />
                              <span className="text-xs text-slate-600">Due Date</span>
                            </div>
                            <p className="text-sm font-semibold text-slate-800 font-mono">
                              {new Date(book.dueDate).toLocaleDateString()}
                            </p>
                          </div>

                          <div className={`rounded-xl p-3 ${getDaysLeftColor(book.daysLeft)}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs">Time Left</span>
                            </div>
                            <p className="text-sm font-semibold font-mono">
                              {book.daysLeft} days
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 px-4 py-3 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-md">
                            Renew Book
                          </button>
                          <button className="flex-1 px-4 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-md">
                            Return Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reading History Tab */}
        {activeTab === 'history' && (
          <div className="animate-fade-in">
            <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Reading Journey</h2>
              <div className="space-y-4">
                {readingHistory.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-20 rounded-lg bg-gradient-to-br ${book.coverColor} flex items-center justify-center shadow-md flex-shrink-0`}>
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{book.title}</h4>
                        <p className="text-sm text-slate-600">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-600">Borrowed</p>
                        <p className="text-sm font-semibold text-slate-800 font-mono">
                          {new Date(book.borrowDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-600">Returned</p>
                        <p className="text-sm font-semibold text-slate-800 font-mono">
                          {new Date(book.returnDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="px-4 py-2 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Library Rules */}
        <div className="mt-8 bg-white/70 backdrop-blur-lg border border-white/80 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Library Rules & Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300">
              <p className="font-semibold mb-2">📚 Borrowing Limits</p>
              <p>Students may borrow up to 3 books at a time for a maximum of 30 days.</p>
            </div>
            <div className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300">
              <p className="font-semibold mb-2">🔄 Renewals</p>
              <p>Books can be renewed once if no other student has requested them.</p>
            </div>
            <div className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300">
              <p className="font-semibold mb-2">⚠️ Late Returns</p>
              <p>Late returns attract a fine of KES 10 per day per book.</p>
            </div>
            <div className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300">
              <p className="font-semibold mb-2">📖 Set Books</p>
              <p>Literature set books are in high demand. Return promptly for other students.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLibrary;