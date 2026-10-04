/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CVProvider, useCV } from './context/CVContext';
import { Header, ActiveTab } from './components/Header';
import { MasterCVEditor } from './components/MasterCVEditor';
import { AdaptedCVList } from './components/AdaptedCVList';
import { AdaptedCVEditor } from './components/AdaptedCVEditor';
import { CVPreview } from './components/CVPreview';
import { CVComparator } from './components/CVComparator';
import { NewAdaptedModal } from './components/NewAdaptedModal';

function parseRoute(hash: string): { tab: ActiveTab; editingId: string | null } {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'adapted') {
    return { tab: 'adapted', editingId: parts[1] ?? null };
  }
  if (parts[0] === 'preview') return { tab: 'preview', editingId: null };
  if (parts[0] === 'compare') return { tab: 'compare', editingId: null };
  // CV Maestro is the main page: '/' and unknown routes land here.
  return { tab: 'master', editingId: null };
}

function MainApp() {
  const { adaptedCVs } = useCV();
  const [hash, setHash] = useState(() => window.location.hash);
  const [selectedPreviewId, setSelectedPreviewId] = useState<string>('master');
  const [selectedCompareId, setSelectedCompareId] = useState<string>('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Keep the rendered page in sync with the URL hash.
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const route = parseRoute(hash);
  const activeTab = route.tab;
  const editingAdaptedId = route.editingId;

  const navigate = (tab: ActiveTab, id?: string) => {
    const target = id ? `#/${tab}/${id}` : `#/${tab}`;
    if (window.location.hash !== target) {
      window.location.hash = target;
    }
  };

  const handleOpenNewModal = () => {
    setIsNewModalOpen(true);
  };

  const handleCreatedNewAdapted = (newId: string) => {
    navigate('adapted', newId);
  };

  const handleEditAdapted = (id: string) => {
    navigate('adapted', id);
  };

  const handlePreviewAdapted = (id: string) => {
    setSelectedPreviewId(id);
    navigate('preview');
  };

  const handleCompareAdapted = (id: string) => {
    setSelectedCompareId(id);
    navigate('compare');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header
        activeTab={activeTab}
        setActiveTab={navigate}
        onOpenNewAdaptedModal={handleOpenNewModal}
        adaptedCount={adaptedCVs.length}
      />

      <main className="flex-1">
        {/* PÁGINA PRINCIPAL: CV MAESTRO (INFORMACIÓN GENERAL) */}
        {activeTab === 'master' && (
          <MasterCVEditor onStartAdaptedCV={handleOpenNewModal} />
        )}

        {/* CVS ADAPTADOS POR OFERTA */}
        {activeTab === 'adapted' && (
          <>
            {editingAdaptedId ? (
              <AdaptedCVEditor
                cvId={editingAdaptedId}
                onBack={() => navigate('adapted')}
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

        {/* VISTA PREVIA & PDF EXPORT */}
        {activeTab === 'preview' && (
          <CVPreview initialSelectedId={selectedPreviewId} />
        )}

        {/* COMPARADOR MASTER VS ADAPTADO */}
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
