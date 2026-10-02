import React, { useState } from 'react';
import { X, Sparkles, Building2, User, Briefcase, FileText, Link } from 'lucide-react';
import { useCV } from '../context/CVContext';
import { CVTemplateType } from '../types/cv';

interface NewAdaptedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newId: string) => void;
}

export const NewAdaptedModal: React.FC<NewAdaptedModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const { adaptedCVs, createAdaptedCV } = useCV();

  const [reference, setReference] = useState('');
  const [company, setCompany] = useState('');
  const [recruiter, setRecruiter] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [cloneFromId, setCloneFromId] = useState<string>('master');
  const [template, setTemplate] = useState<CVTemplateType>('modern');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim() && !company.trim()) {
      alert('Por favor ingresa una referencia o el nombre de la empresa.');
      return;
    }

    const newId = createAdaptedCV({
      reference: reference.trim() || `${company} - ${targetRole || 'Postulación'}`,
      company: company.trim() || 'Empresa Confidencial',
      recruiter: recruiter.trim(),
      targetRole: targetRole.trim() || 'Candidato Profesional',
      jobDescription: jobDescription.trim(),
      cloneFromId: cloneFromId === 'master' ? undefined : cloneFromId,
    });

    onCreated(newId);
    onClose();
  };

  // Helper to auto-fill reference when company/recruiter changes if user hasn't heavily modified it
  const handleCompanyChange = (val: string) => {
    setCompany(val);
    if (!reference || reference.includes(' - ')) {
      const rec = recruiter ? ` - ${recruiter}` : '';
      setReference(`${val}${rec}`);
    }
  };

  const handleRecruiterChange = (val: string) => {
    setRecruiter(val);
    if (company) {
      setReference(`${company} - ${val}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Crear Nuevo CV Adaptado a Oferta</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Copia la información general de tu CV para ajustarla específicamente a esta vacante.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Reference Input (Highlighted) */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3.5 space-y-1.5">
            <label className="block text-xs font-semibold text-blue-950">
              Referencia del CV <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ej: Empresa X - Martín RRHH"
              className="w-full px-3 py-2 text-sm bg-white border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium"
            />
            <p className="text-[11px] text-blue-800/80">
              Nombre clave para identificar rápidamente esta versión adaptada en tu lista.
            </p>
          </div>

          {/* Company & Recruiter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Empresa / Organización</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => handleCompanyChange(e.target.value)}
                placeholder="Ej: Mercado Libre, Google, etc."
                className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Contacto / Reclutador</span>
              </label>
              <input
                type="text"
                value={recruiter}
                onChange={(e) => handleRecruiterChange(e.target.value)}
                placeholder="Ej: Martín RRHH, Laura Headhunter"
                className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Target Role */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>Puesto / Cargo Objetivo</span>
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="Ej: Senior React Developer, Tech Lead..."
              className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Clone from base selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Base inicial de información</span>
              </label>
              <select
                value={cloneFromId}
                onChange={(e) => setCloneFromId(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
              >
                <option value="master">CV Maestro (Información General)</option>
                {adaptedCVs.map((cv) => (
                  <option key={cv.id} value={cv.id}>
                    Clonar de: {cv.reference}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Plantilla visual sugerida
              </label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as CVTemplateType)}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
              >
                <option value="modern">Moderna & Limpia (Tech / General)</option>
                <option value="executive">Ejecutiva Clásica (Serif)</option>
                <option value="minimal">Minimalista ATS (1 Columna)</option>
              </select>
            </div>
          </div>

          {/* Job description notes */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Requisitos / Palabras clave de la oferta (Opcional)
            </label>
            <textarea
              rows={2}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Pega aquí los requisitos clave de la oferta para tenerlos a mano mientras adaptas tu CV..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md transition-colors shadow-sm"
            >
              Crear y Adaptar CV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
