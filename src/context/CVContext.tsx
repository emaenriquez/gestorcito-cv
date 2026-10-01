import React, { createContext, useContext, useState, useEffect } from 'react';
import { MasterCV, AdaptedCV, PersonalInfo } from '../types/cv';
import { DEFAULT_MASTER_CV, DEFAULT_ADAPTED_CVS } from '../data/defaultData';

interface CVContextType {
  masterCV: MasterCV;
  adaptedCVs: AdaptedCV[];
  updateMasterCV: (cv: MasterCV) => void;
  updateMasterPersonal: (personal: PersonalInfo) => void;
  createAdaptedCV: (params: {
    reference: string;
    company: string;
    recruiter?: string;
    targetRole: string;
    jobDescription?: string;
    cloneFromId?: string;
  }) => string;
  updateAdaptedCV: (id: string, changes: Partial<AdaptedCV>) => void;
  updateAdaptedCVCVData: (id: string, updatedData: MasterCV) => void;
  duplicateAdaptedCV: (id: string, newReference: string) => string;
  deleteAdaptedCV: (id: string) => void;
  resetToDefaults: () => void;
  exportBackupJSON: () => void;
  importBackupJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY_MASTER = 'curriculomatch_master_cv_v1';
const STORAGE_KEY_ADAPTED = 'curriculomatch_adapted_cvs_v1';

const CVContext = createContext<CVContextType | null>(null);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [masterCV, setMasterCV] = useState<MasterCV>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading master CV from localStorage:', e);
    }
    return DEFAULT_MASTER_CV;
  });

  const [adaptedCVs, setAdaptedCVs] = useState<AdaptedCV[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADAPTED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading adapted CVs from localStorage:', e);
    }
    return DEFAULT_ADAPTED_CVS;
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MASTER, JSON.stringify(masterCV));
    } catch (e) {
      console.error('Failed to save master CV:', e);
    }
  }, [masterCV]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ADAPTED, JSON.stringify(adaptedCVs));
    } catch (e) {
      console.error('Failed to save adapted CVs:', e);
    }
  }, [adaptedCVs]);

  const updateMasterCV = (cv: MasterCV) => {
    setMasterCV({
      ...cv,
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateMasterPersonal = (personal: PersonalInfo) => {
    setMasterCV(prev => ({
      ...prev,
      personal,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const createAdaptedCV = ({
    reference,
    company,
    recruiter = '',
    targetRole,
    jobDescription = '',
    cloneFromId,
  }: {
    reference: string;
    company: string;
    recruiter?: string;
    targetRole: string;
    jobDescription?: string;
    cloneFromId?: string;
  }): string => {
    const newId = `cv-${Date.now()}`;
    let baseCVData: MasterCV = JSON.parse(JSON.stringify(masterCV));

    if (cloneFromId) {
      const found = adaptedCVs.find(a => a.id === cloneFromId);
      if (found) {
        baseCVData = JSON.parse(JSON.stringify(found.cvData));
      }
    }

    // Set targeted headline if not specifically customized yet
    if (targetRole && baseCVData.personal) {
      baseCVData.personal.headline = targetRole;
    }

    const newAdapted: AdaptedCV = {
      id: newId,
      reference: reference.trim() || `${company} - ${targetRole}`,
      company: company.trim() || 'Empresa Confidencial',
      recruiter: recruiter.trim(),
      targetRole: targetRole.trim(),
      jobDescription: jobDescription.trim(),
      status: 'Borrador',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      template: 'modern',
      cvData: baseCVData,
    };

    setAdaptedCVs(prev => [newAdapted, ...prev]);
    return newId;
  };

  const updateAdaptedCV = (id: string, changes: Partial<AdaptedCV>) => {
    setAdaptedCVs(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...changes,
            updatedAt: new Date().toISOString(),
          };
        }
        return item;
      })
    );
  };

  const updateAdaptedCVCVData = (id: string, updatedData: MasterCV) => {
    setAdaptedCVs(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            cvData: updatedData,
            updatedAt: new Date().toISOString(),
          };
        }
        return item;
      })
    );
  };

  const duplicateAdaptedCV = (id: string, newReference: string): string => {
    const original = adaptedCVs.find(a => a.id === id);
    if (!original) return '';

    const newId = `cv-${Date.now()}`;
    const duplicated: AdaptedCV = {
      ...JSON.parse(JSON.stringify(original)),
      id: newId,
      reference: newReference.trim() || `${original.reference} (Copia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Borrador',
    };

    setAdaptedCVs(prev => [duplicated, ...prev]);
    return newId;
  };

  const deleteAdaptedCV = (id: string) => {
    setAdaptedCVs(prev => prev.filter(item => item.id !== id));
  };

  const resetToDefaults = () => {
    setMasterCV(DEFAULT_MASTER_CV);
    setAdaptedCVs(DEFAULT_ADAPTED_CVS);
  };

  const exportBackupJSON = () => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      masterCV,
      adaptedCVs,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curriculomatch-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importBackupJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.masterCV && Array.isArray(data.adaptedCVs)) {
        setMasterCV(data.masterCV);
        setAdaptedCVs(data.adaptedCVs);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import JSON backup:', e);
      return false;
    }
  };

  return (
    <CVContext.Provider
      value={{
        masterCV,
        adaptedCVs,
        updateMasterCV,
        updateMasterPersonal,
        createAdaptedCV,
        updateAdaptedCV,
        updateAdaptedCVCVData,
        duplicateAdaptedCV,
        deleteAdaptedCV,
        resetToDefaults,
        exportBackupJSON,
        importBackupJSON,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};
