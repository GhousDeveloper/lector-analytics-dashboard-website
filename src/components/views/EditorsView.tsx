import React, { useState } from 'react';
import {
  ArrowLeft,
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Eye,
  Edit3,
  Columns,
  Download,
  Trash2,
  Copy,
  CheckCircle2,
  FileText,
  Sparkles,
} from 'lucide-react';

interface EditorsViewProps {
  onBackToDashboard: () => void;
}

const DEFAULT_MARKDOWN = `# Monthly Revenue & Traffic Strategy

Welcome to the **Lector Business Executive Summary** editor. You can compose memos, customer agreements, and telemetry release notes with live preview.

## Key Performance Objectives
- **Gross Earnings**: Achieve over $50,000 monthly run-rate across verified invoices.
- **Traffic Acquisition**: Expand social conversions through targeted YouTube and Facebook campaigns.
- **Deal Velocity**: Reduce average lead-to-close pipeline latency below 7 business days.

> "Data-driven decisions compound over quarters. Rigorous tracking turns volatile pipelines into predictable growth."

### Active Integration Stack
\`\`\`typescript
interface PipelineMetrics {
  grossEarnings: number;
  activeDeals: number;
  conversionRate: string;
}
\`\`\`

Feel free to format text, toggle preview modes, and export this report directly.
`;

const CODE_TEMPLATES: Record<string, string> = {
  typescript: `// Lector Analytics Telemetry Hook
import { useState, useEffect } from 'react';

export function useRevenueMetrics(period: 'monthly' | 'yearly') {
  const [data, setData] = useState({
    grossRevenue: 52567.53,
    activeDeals: 82,
    currency: 'USD',
  });

  useEffect(() => {
    // Connect to real-time telemetry stream
    const socket = new WebSocket('wss://api.lector.io/v1/stream');
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === 'EARNINGS_UPDATE') {
        setData((prev) => ({ ...prev, grossRevenue: payload.amount }));
      }
    };
    return () => socket.close();
  }, [period]);

  return data;
}`,
  javascript: `// Deal status pipeline evaluator
function evaluateDealRisk(price, status) {
  if (status === 'On Hold' && price > 2000) {
    return { flagged: true, reason: 'High-value compliance review required' };
  }
  return { flagged: false, priority: price > 1500 ? 'Tier-1' : 'Standard' };
}`,
  json: `{
  "workspace": "Lector Analytics",
  "version": "2.4.0",
  "environment": "production",
  "activeHubs": [
    { "region": "Brazil", "code": "BR", "deals": 24, "status": "nominal" },
    { "region": "Italy", "code": "IT", "deals": 18, "status": "nominal" },
    { "region": "Japan", "code": "JP", "deals": 31, "status": "nominal" }
  ]
}`,
  css: `/* Lector Brand Identity Gradients */
.lector-header-prism {
  background: linear-gradient(135deg, #EC388A 0%, #8052C7 60%, #38B9DF 100%);
  border-radius: 8px;
  box-shadow: 0 4px 20px -2px rgba(236, 56, 138, 0.25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}`,
};

export const EditorsView: React.FC<EditorsViewProps> = ({ onBackToDashboard }) => {
  const [markdownContent, setMarkdownContent] = useState(DEFAULT_MARKDOWN);
  const [editorMode, setEditorMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [selectedLanguage, setSelectedLanguage] = useState<'typescript' | 'javascript' | 'json' | 'css'>('typescript');
  const [codeContent, setCodeContent] = useState(CODE_TEMPLATES.typescript);
  const [codeTheme, setCodeTheme] = useState<'dark' | 'light'>('dark');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Compute text statistics
  const charCount = markdownContent.length;
  const wordCount = markdownContent.trim() ? markdownContent.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Insert markdown tag helper
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdownContent.substring(start, end) || 'text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent =
      markdownContent.substring(0, start) +
      replacement +
      markdownContent.substring(end);

    setMarkdownContent(newContent);
    notify(`Formatted with ${prefix}`);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lector-memo.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify('Downloaded lector-memo.md');
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    notify('Copied document markdown to clipboard');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeContent);
    notify(`Copied ${selectedLanguage.toUpperCase()} snippet`);
  };

  const handleLanguageChange = (lang: 'typescript' | 'javascript' | 'json' | 'css') => {
    setSelectedLanguage(lang);
    setCodeContent(CODE_TEMPLATES[lang]);
    notify(`Switched code editor to ${lang.toUpperCase()}`);
  };

  // Simple HTML renderer for markdown preview
  const renderPreview = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-xs text-[#303744] leading-relaxed select-text font-sans">
        {lines.map((line, idx) => {
          if (line.startsWith('# ')) {
            return (
              <h1 key={idx} className="text-lg font-black text-[#303744] pt-2 border-b border-[#EDF0F4] pb-1">
                {line.replace('# ', '')}
              </h1>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-sm font-bold text-[#303744] pt-2 text-[#EC388A]">
                {line.replace('## ', '')}
              </h2>
            );
          }
          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xs font-bold text-[#8052C7] pt-1">
                {line.replace('### ', '')}
              </h3>
            );
          }
          if (line.startsWith('> ')) {
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-[#EC388A] bg-[#FDF2F7] px-3 py-1.5 rounded-r text-[#5A6270] italic my-1.5"
              >
                {line.replace('> ', '')}
              </blockquote>
            );
          }
          if (line.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EC388A] mt-1.5 shrink-0" />
                <span>{line.replace('- ', '')}</span>
              </div>
            );
          }
          if (line.trim() === '') {
            return <div key={idx} className="h-1" />;
          }
          return <p key={idx}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#293548] text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4AD962] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EC388A]" />
            <h1 className="text-sm font-bold text-[#303744]">Document & Code Editors</h1>
          </div>
          <p className="text-xs text-[#89909C] mt-0.5">
            Rich markdown composer with split live preview, document statistics, and syntax-highlighted code viewer
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </button>
      </div>

      {/* SECTION 1: Rich Markdown Editor */}
      <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs overflow-hidden">
        {/* Editor Toolbar */}
        <div className="bg-[#FAFBFD] border-b border-[#EDF0F4] p-2.5 flex flex-wrap items-center justify-between gap-2">
          {/* Formatting buttons */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Bold (**text**)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Italic (*text*)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('~~', '~~')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Strikethrough (~~text~~)"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-4 bg-[#EDF0F4] mx-1" />
            <button
              type="button"
              onClick={() => insertFormatting('# ')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Heading 1"
            >
              <Heading1 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('## ')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Heading 2"
            >
              <Heading2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-4 bg-[#EDF0F4] mx-1" />
            <button
              type="button"
              onClick={() => insertFormatting('- ')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('1. ')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Ordered List"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Quote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('`', '`')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Code span"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('[', '](https://)')}
              className="p-1.5 rounded hover:bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] cursor-pointer"
              title="Hyperlink"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mode switch & actions */}
          <div className="flex items-center gap-2">
            <div className="bg-[#EDF0F4] p-0.5 rounded-md flex items-center">
              <button
                type="button"
                onClick={() => setEditorMode('edit')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  editorMode === 'edit'
                    ? 'bg-white text-[#EC388A] shadow-xs'
                    : 'text-[#5A6270] hover:text-[#303744]'
                }`}
              >
                <Edit3 className="w-3 h-3 inline mr-1" /> Edit
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('split')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  editorMode === 'split'
                    ? 'bg-white text-[#EC388A] shadow-xs'
                    : 'text-[#5A6270] hover:text-[#303744]'
                }`}
              >
                <Columns className="w-3 h-3 inline mr-1" /> Split
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('preview')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  editorMode === 'preview'
                    ? 'bg-white text-[#EC388A] shadow-xs'
                    : 'text-[#5A6270] hover:text-[#303744]'
                }`}
              >
                <Eye className="w-3 h-3 inline mr-1" /> Preview
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="p-1.5 rounded border border-[#EDF0F4] bg-white text-[#5A6270] hover:text-[#303744] hover:bg-[#FAFBFD] cursor-pointer"
              title="Copy markdown text"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="p-1.5 rounded border border-[#EDF0F4] bg-white text-[#5A6270] hover:text-[#303744] hover:bg-[#FAFBFD] cursor-pointer"
              title="Download as .md"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setMarkdownContent('');
                notify('Cleared document text');
              }}
              className="p-1.5 rounded border border-[#EDF0F4] bg-white text-rose-500 hover:bg-rose-50 cursor-pointer"
              title="Clear editor"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Editor Main Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#EDF0F4] min-h-[300px]">
          {/* Edit Pane */}
          {(editorMode === 'edit' || editorMode === 'split') && (
            <div className={`p-4 ${editorMode === 'edit' ? 'lg:col-span-2' : ''}`}>
              <textarea
                id="markdown-textarea"
                rows={14}
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                placeholder="Type markdown documentation here..."
                className="w-full h-full font-mono text-xs text-[#303744] outline-none resize-none bg-transparent leading-relaxed"
              />
            </div>
          )}

          {/* Live Preview Pane */}
          {(editorMode === 'preview' || editorMode === 'split') && (
            <div
              className={`p-4 bg-[#FAFBFD] overflow-y-auto ${
                editorMode === 'preview' ? 'lg:col-span-2' : ''
              }`}
            >
              {renderPreview(markdownContent)}
            </div>
          )}
        </div>

        {/* Footer Statistics */}
        <div className="bg-[#FAFBFD] border-t border-[#EDF0F4] px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-[#89909C]">
          <div className="flex items-center gap-4">
            <span>
              Words: <strong className="text-[#303744]">{wordCount}</strong>
            </span>
            <span>
              Characters: <strong className="text-[#303744]">{charCount}</strong>
            </span>
            <span>
              Est. Reading Time: <strong className="text-[#303744]">{readingTime} min</strong>
            </span>
          </div>
          <span className="text-[10px] text-[#4AD962] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4AD962]" /> Auto-saved to memory
          </span>
        </div>
      </div>

      {/* SECTION 2: Code Snippet Editor & Syntax Box */}
      <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-bold text-[#303744]">Code Snippet & API Inspector</h2>
            <p className="text-[11px] text-[#89909C]">
              Developer syntax playground for Lector integration webhooks and telemetry schemas
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Language tabs */}
            <div className="bg-[#F7F8FB] p-0.5 rounded-md border border-[#EDF0F4] flex items-center">
              {(['typescript', 'javascript', 'json', 'css'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2 py-1 text-[10px] font-bold rounded uppercase transition-colors cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[#293548] text-white shadow-xs'
                      : 'text-[#89909C] hover:text-[#303744]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setCodeTheme(codeTheme === 'dark' ? 'light' : 'dark')}
              className="px-2.5 py-1 text-[11px] font-semibold rounded border border-[#EDF0F4] text-[#5A6270] hover:bg-[#F7F8FB] cursor-pointer"
            >
              {codeTheme === 'dark' ? 'Light Theme' : 'Dark Theme'}
            </button>

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold rounded bg-[#EC388A] text-white hover:bg-[#D9307E] cursor-pointer shadow-xs"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
        </div>

        {/* Code display window */}
        <div
          className={`rounded-lg overflow-hidden border ${
            codeTheme === 'dark'
              ? 'bg-[#0f141c] border-[#1e2736] text-white'
              : 'bg-[#FAFBFD] border-[#EDF0F4] text-[#303744]'
          }`}
        >
          {/* Window header */}
          <div
            className={`px-3 py-2 flex items-center justify-between border-b ${
              codeTheme === 'dark'
                ? 'border-[#1e2736] bg-[#090d14]'
                : 'border-[#EDF0F4] bg-[#F7F8FB]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[10px] font-mono text-[#89909C] ml-2">
                snippet.{selectedLanguage === 'typescript' ? 'ts' : selectedLanguage === 'javascript' ? 'js' : selectedLanguage}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#89909C]">UTF-8</span>
          </div>

          {/* Editable code text area */}
          <textarea
            rows={10}
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
            className={`w-full p-4 font-mono text-[11px] leading-relaxed outline-none resize-none bg-transparent ${
              codeTheme === 'dark' ? 'text-indigo-200' : 'text-slate-800'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
