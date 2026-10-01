/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CVProvider, useCV } from './context/CVContext';
import { Header, ActiveTab } from './components/Header';
import { MasterCVEditor } from './components/MasterCVEditor';
import { AdaptedCVList } from './components/AdaptedCVList';
import { AdaptedCVEditor } from './components/AdaptedCVEditor';
import { CVPreview } from './components/CVPreview';
import { CVComparator } from './components/CVComparator';
import { NewAdaptedModal } from './components/NewAdaptedModal';

function MainApp() {
  const { adaptedCVs } = useCV();
  const [activeTab, setActiveTab] = useState<ActiveTab>('adapted');
  const [editingAdaptedId, setEditingAdaptedId] = useState<string | null>(null);
  const [selectedPreviewId, setSelectedPreviewId] = useState<string>('master');
  const [selectedCompareId, setSelectedCompareId] = useState<string>('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // When opening a new adapted CV, close editor and open modal
  const handleOpenNewModal = () => {
    setIsNewModalOpen(true);
  };

  const handleCreatedNewAdapted = (newId: string) => {
    setActiveTab('adapted');
    setEditingAdaptedId(newId);
  };

  const handleEditAdapted = (id: string) => {
    setActiveTab('adapted');
    setEditingAdaptedId(id);
  };

  const handlePreviewAdapted = (id: string) => {
    setSelectedPreviewId(id);
    setActiveTab('preview');
  };

  const handleCompareAdapted = (id: string) => {
    setSelectedCompareId(id);
    setActiveTab('compare');
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    // If navigating to adapted tab from another tab, reset editing mode if not already editing
    if (tab !== 'adapted') {
      setEditingAdaptedId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenNewAdaptedModal={handleOpenNewModal}
        adaptedCount={adaptedCVs.length}
      />

      <main className="flex-1">
        {/* TAB 1: CV MAESTRO (INFORMACIÓN GENERAL) */}
        {activeTab === 'master' && (
          <MasterCVEditor onStartAdaptedCV={handleOpenNewModal} />
        )}

        {/* TAB 2: CVS ADAPTADOS POR OFERTA */}
        {activeTab === 'adapted' && (
          <>
            {editingAdaptedId ? (
              <AdaptedCVEditor
                cvId={editingAdaptedId}
                onBack={() => setEditingAdaptedId(null)}
                onPreview={(id) => handlePreviewAdapted(id)}
              />
            ) : (
              <AdaptedCVList
                onOpenNewModal={handleOpenNewModal}
                onEditAdapted={handleEditAdapted}
                onPreviewAdapted={handlePreviewAdapted}
                onCompareAdapted={handleCompareAdapted}
              />
            )}
          </>
        )}

        {/* TAB 3: VISTA PREVIA & PDF EXPORT */}
        {activeTab === 'preview' && (
          <CVPreview initialSelectedId={selectedPreviewId} />
        )}

        {/* TAB 4: COMPARADOR MASTER VS ADAPTADO */}
        {activeTab === 'compare' && (
          <CVComparator
            initialAdaptedId={selectedCompareId}
            onEditAdapted={handleEditAdapted}
          />
        )}
      </main>

      {/* Creation Modal for New Adapted CV */}
      <NewAdaptedModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreated={handleCreatedNewAdapted}
      />
    </div>
  );
}

export default function App() {
  return (
    <CVProvider>
      <MainApp />
    </CVProvider>
  );
}
