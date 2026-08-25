import { useState, useEffect } from 'react';
import { Trash2, Plus, CheckCircle, Circle } from 'lucide-react';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

const STORAGE_KEY = 'dayly_todos';

export default function TodoListApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Carica dai localStorage al mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        setTodos(parsed);
      } catch (error) {
        console.error('Errore caricamento todos:', error);
      }
    }
  }, []);

  // Salva nei localStorage quando cambiano i todos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title: inputValue,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 To-Do List</h1>
          <p className="text-gray-600">Gestisci le tue attività con localStorage</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Form */}
          <form onSubmit={addTodo} className="p-6 border-b border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Aggiungi una nuova attività..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Aggiungi
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{todos.length}</p>
              <p className="text-sm text-gray-600">Totali</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
              <p className="text-sm text-gray-600">Attive</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              <p className="text-sm text-gray-600">Completate</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 px-6 py-4 border-b border-gray-200 bg-gray-50">
            {(['all', 'active', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {f === 'all' && 'Tutte'}
                {f === 'active' && 'Attive'}
                {f === 'completed' && 'Completate'}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="divide-y">
            {filteredTodos.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-lg">
                  {filter === 'all' && '✨ Nessuna attività. Aggiunine una!'}
                  {filter === 'active' && '🎉 Tutte le attività completate!'}
                  {filter === 'completed' && '📋 Nessuna attività completata'}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-3 group"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {todo.completed ? (
                      <CheckCircle size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-lg ${
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {todos.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {activeCount} {activeCount === 1 ? 'attività' : 'attività'} rimaste
              </p>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Cancella completate
                </button>
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">💾 localStorage</h3>
          <p className="text-sm text-blue-800">
            I tuoi to-do sono salvati localmente nel tuo browser. Aggiorna la pagina e vedrai che i dati persistono!
          </p>
        </div>
      </div>
    </div>
  );
}
