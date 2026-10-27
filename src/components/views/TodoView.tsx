import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Calendar,
  Tag,
  ArrowLeft,
} from 'lucide-react';
import { NavItemId } from '../../types/dashboard';

interface TodoItem {
  id: string;
  title: string;
  dueDate: string;
  category: string;
  completed: boolean;
}

interface TodoViewProps {
  onBackToDashboard: () => void;
}

const INITIAL_TODOS: TodoItem[] = [
  {
    id: 't-1',
    title: 'Review Q3 financial reports with accounting team',
    dueDate: 'Today',
    category: 'Finance',
    completed: false,
  },
  {
    id: 't-2',
    title: 'Approve new Italian distribution contract for Marko',
    dueDate: 'Tomorrow',
    category: 'Deals',
    completed: true,
  },
  {
    id: 't-3',
    title: 'Deploy updated analytics tracking for Direct Search traffic',
    dueDate: 'Oct 28',
    category: 'Dev',
    completed: false,
  },
  {
    id: 't-4',
    title: 'Schedule quarterly business review with VP of Operations',
    dueDate: 'Nov 02',
    category: 'Management',
    completed: false,
  },
  {
    id: 't-5',
    title: 'Update customer invoice template with new VAT number',
    dueDate: 'Nov 05',
    category: 'Billing',
    completed: true,
  },
];

export const TodoView: React.FC<TodoViewProps> = ({ onBackToDashboard }) => {
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: TodoItem = {
      id: `t-${Date.now()}`,
      title: newTitle.trim(),
      dueDate: 'Today',
      category: newCategory,
      completed: false,
    };
    setTodos([item, ...todos]);
    setNewTitle('');
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-sm font-bold text-[#303744]">Todo List & Tasks</h1>
          <p className="text-xs text-[#89909C]">
            {activeCount} active tasks remaining
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold hover:bg-[#D9307E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Add task form & filters */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs">
            <h2 className="text-xs font-bold text-[#303744] mb-3">Add New Task</h2>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Task Description
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none bg-white"
                >
                  <option value="General">General</option>
                  <option value="Finance">Finance</option>
                  <option value="Deals">Deals</option>
                  <option value="Dev">Dev</option>
                  <option value="Management">Management</option>
                  <option value="Billing">Billing</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </form>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs">
            <h3 className="text-xs font-bold text-[#303744] mb-2.5">Task Filter</h3>
            <div className="space-y-1">
              {(['all', 'active', 'completed'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFilter(opt)}
                  className={`w-full px-3 py-2 text-left rounded-md text-xs font-medium capitalize flex items-center justify-between transition-colors ${
                    filter === opt
                      ? 'bg-[#FDF2F7] text-[#EC388A] font-semibold'
                      : 'text-[#5A6270] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span>{opt} Tasks</span>
                  <span className="text-[10px] tabular-nums px-1.5 py-0.5 rounded-full bg-white border border-[#EDF0F4]">
                    {opt === 'all'
                      ? todos.length
                      : opt === 'active'
                      ? todos.filter((t) => !t.completed).length
                      : todos.filter((t) => t.completed).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Task list */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#EDF0F4] flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#303744] uppercase tracking-wider">
                Current Tasks ({filteredTodos.length})
              </h2>
              {todos.some((t) => t.completed) && (
                <button
                  type="button"
                  onClick={() => setTodos(todos.filter((t) => !t.completed))}
                  className="text-[11px] font-semibold text-[#DC2626] hover:underline"
                >
                  Clear Completed
                </button>
              )}
            </div>

            <div className="divide-y divide-[#F3F5F9]">
              {filteredTodos.length === 0 ? (
                <div className="p-8 text-center text-[#89909C] text-xs">
                  No tasks found in this view.
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#FAFBFD] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => handleToggle(todo.id)}
                        aria-label={`Toggle ${todo.title}`}
                        className="text-[#89909C] hover:text-[#EC388A] transition-colors shrink-0"
                      >
                        {todo.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-[#4AD962]" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-medium truncate ${
                            todo.completed
                              ? 'line-through text-[#89909C]'
                              : 'text-[#303744]'
                          }`}
                        >
                          {todo.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-[#89909C]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {todo.dueDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#F3F5F9] text-[#5A6270]">
                            <Tag className="w-2.5 h-2.5" /> {todo.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                      aria-label="Delete task"
                      className="p-1 rounded text-[#89909C] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
