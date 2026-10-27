import React, { useState } from 'react';
import { ArrowLeft, Check, Save } from 'lucide-react';

interface FormElementsViewProps {
  onBackToDashboard: () => void;
}

export const FormElementsView: React.FC<FormElementsViewProps> = ({
  onBackToDashboard,
}) => {
  const [inputText, setInputText] = useState('Global Distribution Inc.');
  const [currency, setCurrency] = useState('USD');
  const [toggleState, setToggleState] = useState(true);
  const [sliderVal, setSliderVal] = useState(75);
  const [selectedTag, setSelectedTag] = useState('Finance');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <h1 className="text-sm font-bold text-[#303744]">Form Controls & Elements</h1>
          <p className="text-xs text-[#89909C]">
            Interactive input controls, toggles, and form inputs
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Card: Text & Select */}
        <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-[#303744]">Standard Inputs</h2>

          <div>
            <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
              Company / Entity Name
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] text-[#303744] focus:border-[#EC388A] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] text-[#303744] bg-white focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                Category Tag
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] text-[#303744] bg-white focus:outline-none"
              >
                <option value="Finance">Finance</option>
                <option value="Logistics">Logistics</option>
                <option value="Technology">Technology</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Card: Switches, Sliders */}
        <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-[#303744]">Interactive Controls</h2>

          <div className="flex items-center justify-between p-3 rounded-md bg-[#FAFBFD] border border-[#F1F3F7]">
            <div>
              <p className="text-xs font-semibold text-[#303744]">
                Automated Reconciliation
              </p>
              <p className="text-[10px] text-[#89909C]">
                Sync invoices automatically when marked as Done
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToggleState(!toggleState)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                toggleState ? 'bg-[#EC388A]' : 'bg-[#DCE1EA]'
              }`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  toggleState ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold text-[#5A6270]">
                Telemetry Sampling Frequency
              </label>
              <span className="text-xs font-bold text-[#EC388A] tabular-nums">
                {sliderVal}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full accent-[#EC388A] cursor-pointer"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-xs text-[#4AD962] font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Preferences saved!
              </span>
            ) : (
              <span className="text-[11px] text-[#89909C]">
                Ready to apply changes
              </span>
            )}
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
