import React, { useState } from 'react';
import {
  Mail,
  Star,
  Trash2,
  Send,
  Search,
  ArrowLeft,
  Paperclip,
  Check,
} from 'lucide-react';

interface EmailViewProps {
  onBackToDashboard: () => void;
}

interface EmailMessage {
  id: string;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  starred: boolean;
  unread: boolean;
}

const INITIAL_EMAILS: EmailMessage[] = [
  {
    id: 'm-1',
    sender: 'Patrick Taylor',
    email: 'patrick@partner.com',
    subject: 'New Deal Invoicing: Contract #12386',
    preview:
      'Hi Rachel, I submitted the updated invoice documents for Marko. The pricing and VAT breakdown are attached.',
    time: '10:42 AM',
    starred: true,
    unread: true,
  },
  {
    id: 'm-2',
    sender: 'Sari Onuka',
    email: 'sari@tokyodistrib.jp',
    subject: 'Deal Confirmation - Finished Deliverables',
    preview:
      'Thank you for processing our transaction. Our finance team received the receipt and marked the order Done.',
    time: 'Yesterday',
    starred: false,
    unread: false,
  },
  {
    id: 'm-3',
    sender: 'Charly Dues',
    email: 'charly@duestech.br',
    subject: 'Brazilian Gateway Expansion Discussion',
    preview:
      'Can we schedule a 15-minute call regarding the direct search traffic acquisition and conversion rates?',
    time: 'Oct 24',
    starred: true,
    unread: false,
  },
  {
    id: 'm-4',
    sender: 'Jonathan Vance',
    email: 'jonathan@acme.org',
    subject: 'Comments on the Q3 Marketing Dock',
    preview:
      'Reviewed the dock updated by Rachel. The conversion figures for the referral earnings look very solid.',
    time: 'Oct 23',
    starred: false,
    unread: false,
  },
];

export const EmailView: React.FC<EmailViewProps> = ({ onBackToDashboard }) => {
  const [emails, setEmails] = useState<EmailMessage[]>(INITIAL_EMAILS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_EMAILS[0].id);
  const [search, setSearch] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const selectedEmail =
    emails.find((e) => e.id === selectedId) || emails[0];

  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim()) return;
    const newMsg: EmailMessage = {
      id: `m-${Date.now()}`,
      sender: composeTo.split('@')[0],
      email: composeTo,
      subject: composeSubject,
      preview: composeBody,
      time: 'Just now',
      starred: false,
      unread: false,
    };
    setEmails([newMsg, ...emails]);
    setSelectedId(newMsg.id);
    setShowCompose(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
  };

  const filtered = emails.filter(
    (e) =>
      e.sender.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <h1 className="text-sm font-bold text-[#303744]">Business Email</h1>
          <p className="text-xs text-[#89909C]">
            Connected inbox and partner correspondence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCompose(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold hover:bg-[#D9307E] transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Compose
          </button>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#DCE1EA] text-[#5A6270] text-xs font-semibold hover:bg-[#FAFBFD] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Email list */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-[#EDF0F4] shadow-xs overflow-hidden flex flex-col">
          <div className="p-3 border-b border-[#EDF0F4]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#89909C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search mail..."
                className="w-full pl-9 pr-3 py-1.5 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#EC388A] focus:outline-none"
              />
            </div>
          </div>

          <div className="divide-y divide-[#F3F5F9] overflow-y-auto max-h-[560px]">
            {filtered.map((msg) => {
              const isSelected = msg.id === selectedId;
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedId(msg.id);
                    setEmails((prev) =>
                      prev.map((item) =>
                        item.id === msg.id ? { ...item, unread: false } : item
                      )
                    );
                  }}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#FDF2F7]/50' : 'hover:bg-[#FAFBFD]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs truncate ${
                        msg.unread
                          ? 'font-bold text-[#303744]'
                          : 'font-medium text-[#5A6270]'
                      }`}
                    >
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-[#89909C] tabular-nums shrink-0 ml-2">
                      {msg.time}
                    </span>
                  </div>
                  <h4
                    className={`text-[11px] truncate ${
                      msg.unread
                        ? 'font-bold text-[#EC388A]'
                        : 'text-[#303744]'
                    }`}
                  >
                    {msg.subject}
                  </h4>
                  <p className="text-[11px] text-[#89909C] line-clamp-1 mt-0.5">
                    {msg.preview}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F8FAFC]">
                    <button
                      type="button"
                      onClick={(e) => handleToggleStar(msg.id, e)}
                      className={`text-xs p-1 ${
                        msg.starred
                          ? 'text-[#FFA62B]'
                          : 'text-[#CBD2DF] hover:text-[#FFA62B]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(msg.id, e)}
                      className="text-xs p-1 text-[#89909C] hover:text-[#DC2626]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Email reading pane */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-6 flex flex-col justify-between">
          {selectedEmail ? (
            <div>
              <div className="flex items-start justify-between border-b border-[#EDF0F4] pb-4 mb-4">
                <div>
                  <h2 className="text-sm font-bold text-[#303744]">
                    {selectedEmail.subject}
                  </h2>
                  <p className="text-xs text-[#89909C] mt-1">
                    From:{' '}
                    <strong className="text-[#303744]">
                      {selectedEmail.sender}
                    </strong>{' '}
                    &lt;{selectedEmail.email}&gt;
                  </p>
                </div>
                <span className="text-xs text-[#89909C] tabular-nums">
                  {selectedEmail.time}
                </span>
              </div>

              <div className="text-xs text-[#303744] leading-relaxed whitespace-pre-line space-y-3">
                <p>{selectedEmail.preview}</p>
                <p className="text-[#89909C]">
                  Please let me know if any further clarification or billing adjustment is needed before the end of the reporting cycle.
                </p>
                <p>Best regards,<br />{selectedEmail.sender}</p>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-[#89909C]">
              No message selected.
            </div>
          )}

          <div className="pt-4 border-t border-[#EDF0F4] flex items-center justify-between text-xs text-[#89909C]">
            <span>Fast reply ready</span>
            <button
              type="button"
              onClick={() => setShowCompose(true)}
              className="px-3 py-1.5 rounded-md bg-[#293548] text-white font-semibold hover:bg-[#1E2638] flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3 h-3" /> Reply
            </button>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-xl border border-[#EDF0F4] max-w-md w-full p-5">
            <h3 className="text-sm font-bold text-[#303744] mb-3">
              New Message
            </h3>
            <form onSubmit={handleSend} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  To:
                </label>
                <input
                  type="email"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Subject:
                </label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="Subject line"
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Message:
                </label>
                <textarea
                  rows={4}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EDF0F4]">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="px-3 py-1.5 rounded-md border border-[#DCE1EA] text-xs font-semibold text-[#5A6270]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
