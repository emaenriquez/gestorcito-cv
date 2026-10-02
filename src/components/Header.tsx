import React from 'react';
import {
  FileText,
  Briefcase,
  Eye,
  GitCompare,
  Plus,
} from 'lucide-react';

export type ActiveTab = 'master' | 'adapted' | 'preview' | 'compare';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewAdaptedModal: () => void;
  adaptedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewAdaptedModal,
  adaptedCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-lg font-bold tracking-tight text-slate-900">
            GestorsitoCv
          </span>
        </div>

        {/* Zone 2: 4 clean text navigation links with interactive states */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('master')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'master'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>CV Maestro (General)</span>
          </button>

          <button
            onClick={() => setActiveTab('adapted')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'adapted'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            <span>CVs Adaptados por Oferta</span>
            <span className="text-[11px] font-mono tabular-nums text-slate-500 ml-0.5">
              ({adaptedCount})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Vista Previa & PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'compare'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-slate-500" />
            <span>Comparador</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewAdaptedModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo CV Adaptado</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex border-t border-slate-200 px-2 py-1.5 overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('master')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'master' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          CV Maestro
        </button>
        <button
          onClick={() => setActiveTab('adapted')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'adapted' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Adaptados ({adaptedCount})
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'preview' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Vista Previa
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-2.5 py-1.5 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'compare' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Comparar
        </button>
      </div>
    </header>
  );
};
