import React, { useState } from 'react';
import {
  ArrowLeft,
  Save,
  Eye,
  CheckCircle2,
  Building2,
  User,
  Briefcase,
  FileText,
  RotateCcw,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Clock,
  NotebookPen,
  Calendar,
} from 'lucide-react';
import { useCV } from '../context/CVContext';
import {
  AdaptedCV,
  ApplicationStatus,
  ExperienceItem,
  SkillCategory,
  ProjectItem,
} from '../types/cv';

interface AdaptedCVEditorProps {
  cvId: string;
  onBack: () => void;
  onPreview: (id: string) => void;
}

export const AdaptedCVEditor: React.FC<AdaptedCVEditorProps> = ({
  cvId,
  onBack,
  onPreview,
}) => {
  const { adaptedCVs, masterCV, updateAdaptedCV, updateAdaptedCVCVData } = useCV();
  const cv = adaptedCVs.find((c) => c.id === cvId);

  const [activeTab, setActiveTab] = useState<
    'profile' | 'experience' | 'skills' | 'projects' | 'notes'
  >('profile');
  const [showJobNotes, setShowJobNotes] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  // If for any reason the CV is not found, show error state
  if (!cv) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-800">CV Adaptado no encontrado</h2>
        <p className="text-xs text-slate-500">Es posible que haya sido eliminado.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-md"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  const triggerSaveNotification = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  // Helper updaters
  const handleUpdateMeta = (fields: Partial<AdaptedCV>) => {
    updateAdaptedCV(cv.id, fields);
    triggerSaveNotification();
  };

  const handleUpdatePersonal = (field: keyof typeof cv.cvData.personal, value: string) => {
    const updatedCVData = {
      ...cv.cvData,
      personal: {
        ...cv.cvData.personal,
        [field]: value,
      },
    };
    updateAdaptedCVCVData(cv.id, updatedCVData);
    triggerSaveNotification();
  };

  const handleResetPersonalToMaster = () => {
    if (confirm('¿Restablecer datos personales y resumen con los del CV Maestro?')) {
      const updatedCVData = {
        ...cv.cvData,
        personal: { ...masterCV.personal },
      };
      updateAdaptedCVCVData(cv.id, updatedCVData);
      triggerSaveNotification();
    }
  };

  // Experience updates for adapted CV
  const handleToggleExperienceInclusion = (expId: string) => {
    const updatedExperiences = cv.cvData.experiences.map((exp) => {
      if (exp.id === expId) {
        return { ...exp, included: exp.included === false ? true : false };
      }
      return exp;
    });
    updateAdaptedCVCVData(cv.id, { ...cv.cvData, experiences: updatedExperiences });
    triggerSaveNotification();
  };

  const handleUpdateExperience = (expId: string, updated: Partial<ExperienceItem>) => {
    const updatedExperiences = cv.cvData.experiences.map((exp) =>
      exp.id === expId ? { ...exp, ...updated } : exp
    );
    updateAdaptedCVCVData(cv.id, { ...cv.cvData, experiences: updatedExperiences });
    triggerSaveNotification();
  };

  const handleResetExpFromMaster = (expId: string) => {
    const masterExp = masterCV.experiences.find((e) => e.id === expId);
    if (!masterExp) return;
    if (confirm('¿Restablecer este puesto a la redacción del CV Maestro?')) {
      handleUpdateExperience(expId, { ...masterExp });
    }
  };

  const handleAddBullet = (expId: string) => {
    const exp = cv.cvData.experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bullets, 'Logro enfocado en los requisitos de esta empresa'];
    handleUpdateExperience(expId, { bullets: newBullets });
  };

  const handleUpdateBullet = (expId: string, index: number, value: string) => {
    const exp = cv.cvData.experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bullets];
    newBullets[index] = value;
    handleUpdateExperience(expId, { bullets: newBullets });
  };

  const handleDeleteBullet = (expId: string, index: number) => {
    const exp = cv.cvData.experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = exp.bullets.filter((_, i) => i !== index);
    handleUpdateExperience(expId, { bullets: newBullets });
  };

  // Skills updates for adapted CV
  const handleUpdateSkills = (catId: string, skillsStr: string) => {
    const skills = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const updatedCats = cv.cvData.skillCategories.map((c) =>
      c.id === catId ? { ...c, skills } : c
    );
    updateAdaptedCVCVData(cv.id, { ...cv.cvData, skillCategories: updatedCats });
    triggerSaveNotification();
  };

  const handleToggleSkillCategory = (catId: string) => {
    const updatedCats = cv.cvData.skillCategories.map((c) =>
      c.id === catId ? { ...c, included: c.included === false ? true : false } : c
    );
    updateAdaptedCVCVData(cv.id, { ...cv.cvData, skillCategories: updatedCats });
    triggerSaveNotification();
  };

  // Projects inclusion
  const handleToggleProject = (projId: string) => {
    const updatedProjects = cv.cvData.projects.map((p) =>
      p.id === projId ? { ...p, included: p.included === false ? true : false } : p
    );
    updateAdaptedCVCVData(cv.id, { ...cv.cvData, projects: updatedProjects });
    triggerSaveNotification();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Workspace Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        {/* Navigation & Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Volver a lista de adaptados"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Adaptando CV para Oferta
                </span>
                {savedNotice && (
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Guardado automático
                  </span>
                )}
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{cv.reference}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
              <span className="text-xs text-slate-500">Estado:</span>
              <select
                value={cv.status}
                onChange={(e) => handleUpdateMeta({ status: e.target.value as ApplicationStatus })}
                className="text-xs font-semibold bg-transparent border-none focus:outline-none text-slate-800 cursor-pointer"
              >
                <option value="Borrador">Borrador</option>
                <option value="Enviado">Enviado</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Entrevista">Entrevista</option>
                <option value="Oferta">Oferta</option>
                <option value="Descartado">Descartado</option>
              </select>
            </div>

            <button
              onClick={() => onPreview(cv.id)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista Previa & PDF</span>
            </button>
          </div>
        </div>

        {/* Reference & Metadata Quick Edit Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Referencia / Etiqueta
            </label>
            <input
              type="text"
              value={cv.reference}
              onChange={(e) => handleUpdateMeta({ reference: e.target.value })}
              className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded font-medium text-slate-900"
              placeholder="Ej: Empresa X - Martín RRHH"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Empresa
            </label>
            <input
              type="text"
              value={cv.company}
              onChange={(e) => handleUpdateMeta({ company: e.target.value })}
              className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded text-slate-800"
              placeholder="Ej: Empresa X"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Contacto / Reclutador
            </label>
            <input
              type="text"
              value={cv.recruiter}
              onChange={(e) => handleUpdateMeta({ recruiter: e.target.value })}
              className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded text-slate-800"
              placeholder="Ej: Martín RRHH"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Puesto Objetivo
            </label>
            <input
              type="text"
              value={cv.targetRole}
              onChange={(e) => handleUpdateMeta({ targetRole: e.target.value })}
              className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded text-blue-700 font-medium"
              placeholder="Ej: Lead Frontend Developer"
            />
          </div>
        </div>
      </div>

      {/* Offer Notes & Requirements Helper Drawer */}
      <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowJobNotes(!showJobNotes)}
        >
          <div className="flex items-center gap-2">
            <NotebookPen className="w-4 h-4 text-blue-700" />
            <h3 className="text-xs font-semibold text-blue-950">
              Requisitos & Palabras Clave de la Vacante ({cv.company || 'Empresa'})
            </h3>
          </div>
          <button
            type="button"
            className="text-xs text-blue-700 font-medium flex items-center gap-1 hover:underline"
          >
            {showJobNotes ? (
              <>
                <span>Ocultar notas</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Ver requisitos de la vacante</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {showJobNotes && (
          <div className="mt-3 space-y-2 pt-2 border-t border-blue-100">
            <p className="text-[11px] text-blue-900/80">
              Mantén aquí los requisitos del reclutador para incorporar fácilmente las tecnologías y palabras clave en tu resumen y experiencia laboral.
            </p>
            <textarea
              rows={3}
              value={cv.jobDescription || ''}
              onChange={(e) => handleUpdateMeta({ jobDescription: e.target.value })}
              placeholder="Pega aquí el texto de la oferta de trabajo o notas del contacto..."
              className="w-full px-3 py-2 text-xs bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Section Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'profile'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          1. Titular & Resumen Adaptado
        </button>

        <button
          onClick={() => setActiveTab('experience')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'experience'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          2. Experiencias & Logros Seleccionados
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'skills'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          3. Habilidades Específicas
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'projects'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          4. Proyectos a Incluir
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'notes'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          5. Bitácora de Postulación
        </button>
      </div>

      {/* Editor Body */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        {/* 1. PROFILE & SUMMARY TAILORING */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Titular & Resumen Adaptado para {cv.company}
                </h2>
                <p className="text-xs text-slate-500">
                  Modifica tu presentación para alinearte a lo que busca {cv.recruiter || cv.company}.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetPersonalToMaster}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                title="Restablecer con el contenido del CV Maestro"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar del Maestro</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Titular Profesional (Headline) en este CV
                </label>
                <input
                  type="text"
                  value={cv.cvData.personal.headline}
                  onChange={(e) => handleUpdatePersonal('headline', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-900"
                  placeholder="Ej: Lead Frontend Architect (React, TypeScript & Micro-frontends)"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  En el CV Maestro es: &quot;{masterCV.personal.headline}&quot;
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-800">
                    Resumen Profesional Adaptado
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {cv.cvData.personal.summary.length} caracteres
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={cv.cvData.personal.summary}
                  onChange={(e) => handleUpdatePersonal('summary', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed text-slate-800"
                  placeholder="Adapta tu propuesta de valor, destacando exactamente lo que pide la vacante..."
                />
                <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] text-slate-600">
                  <strong className="text-slate-800">Resumen original en CV Maestro:</strong>
                  <p className="italic mt-0.5 line-clamp-2">{masterCV.personal.summary}</p>
                </div>
              </div>

              {/* Contact info adjustments if needed */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-700 mb-2">
                  Datos de Contacto (generalmente compartidos con el Maestro)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500">Email</label>
                    <input
                      type="text"
                      value={cv.cvData.personal.email}
                      onChange={(e) => handleUpdatePersonal('email', e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500">Teléfono</label>
                    <input
                      type="text"
                      value={cv.cvData.personal.phone}
                      onChange={(e) => handleUpdatePersonal('phone', e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500">Ubicación</label>
                    <input
                      type="text"
                      value={cv.cvData.personal.location}
                      onChange={(e) => handleUpdatePersonal('location', e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. EXPERIENCES TAILORING */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Selección y Adaptación de Experiencias Laborales
                </h2>
                <p className="text-xs text-slate-500">
                  Activa o desactiva puestos según su relevancia, y afina los logros para esta vacante específica.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {cv.cvData.experiences.map((exp, idx) => {
                const isIncluded = exp.included !== false;

                return (
                  <div
                    key={exp.id}
                    className={`border rounded-xl p-4 transition-all ${
                      isIncluded
                        ? 'border-slate-200 bg-white shadow-xs'
                        : 'border-slate-200/60 bg-slate-50/70 opacity-60'
                    }`}
                  >
                    {/* Header with Include toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleExperienceInclusion(exp.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                            isIncluded
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          {isIncluded ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Incluido en este CV</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Oculto para esta oferta</span>
                            </>
                          )}
                        </button>

                        <span className="text-sm font-bold text-slate-900">
                          {exp.role} · <span className="text-slate-600 font-normal">{exp.company}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</span>
                        <button
                          type="button"
                          onClick={() => handleResetExpFromMaster(exp.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                          title="Restablecer viñetas originales del Maestro"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Detailed Editor if included */}
                    {isIncluded ? (
                      <div className="pt-3 space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Resumen del Puesto (Enfocado en lo que busca {cv.company})
                          </label>
                          <input
                            type="text"
                            value={exp.summary}
                            onChange={(e) =>
                              handleUpdateExperience(exp.id, { summary: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                          />
                        </div>

                        {/* Bullets tailored */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-slate-700">
                              Viñetas / Logros adaptados para esta vacante:
                            </label>
                            <button
                              type="button"
                              onClick={() => handleAddBullet(exp.id)}
                              className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Añadir viñeta</span>
                            </button>
                          </div>

                          {exp.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2">
                              <span className="text-slate-400 text-xs">•</span>
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                                className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteBullet(exp.id, bIdx)}
                                className="p-1 text-slate-400 hover:text-red-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Technologies */}
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Tecnologías destacadas para este puesto
                          </label>
                          <input
                            type="text"
                            value={exp.technologies.join(', ')}
                            onChange={(e) =>
                              handleUpdateExperience(exp.id, {
                                technologies: e.target.value
                                  .split(',')
                                  .map((t) => t.trim())
                                  .filter(Boolean),
                              })
                            }
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic pt-2">
                        Esta experiencia no aparecerá en el PDF o vista previa de esta postulación.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. SKILLS TAILORING */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Habilidades & Competencias Prioritarias
                </h2>
                <p className="text-xs text-slate-500">
                  Reordena o agrega tecnologías requeridas en el anuncio para maximizar el match ATS.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {cv.cvData.skillCategories.map((cat) => (
                <div key={cat.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {cat.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSkillCategory(cat.id)}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                        cat.included !== false
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.included !== false ? 'Visible' : 'Oculta en este CV'}
                    </button>
                  </div>

                  {cat.included !== false && (
                    <>
                      <div>
                        <label className="block text-[11px] text-slate-600 mb-1">
                          Habilidades (separadas por coma):
                        </label>
                        <input
                          type="text"
                          value={cat.skills.join(', ')}
                          onChange={(e) => handleUpdateSkills(cat.id, e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                        />
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Proyectos a Destacar
                </h2>
                <p className="text-xs text-slate-500">
                  Elige qué proyectos son relevantes para esta posición.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {cv.cvData.projects.map((proj) => {
                const isIncluded = proj.included !== false;
                return (
                  <div
                    key={proj.id}
                    className={`border rounded-lg p-3 flex items-center justify-between gap-3 ${
                      isIncluded ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                        <span>{proj.name}</span>
                        {proj.role && <span className="text-slate-500 font-normal">({proj.role})</span>}
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        {proj.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleProject(proj.id)}
                      className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        isIncluded ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isIncluded ? 'Incluido' : 'Oculto'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. APPLICATION NOTES & LOG */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Bitácora de Postulación & Seguimiento
              </h2>
              <p className="text-xs text-slate-500">
                Lleva un registro de los contactos con {cv.recruiter || cv.company}, llamadas, expectativas y próximos pasos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Expectativa Salarial / Rango
                </label>
                <input
                  type="text"
                  value={cv.salaryExpectation || ''}
                  onChange={(e) => handleUpdateMeta({ salaryExpectation: e.target.value })}
                  placeholder="Ej: 60.000€ - 70.000€ brutos anuales"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Fecha de Postulación
                </label>
                <input
                  type="date"
                  value={cv.applicationDate || ''}
                  onChange={(e) => handleUpdateMeta({ applicationDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Notas y Diario de Contacto
              </label>
              <textarea
                rows={5}
                value={cv.notes}
                onChange={(e) => handleUpdateMeta({ notes: e.target.value })}
                placeholder="Ej: 28/09: Llamada telefónica de 15 min con Martín. Me preguntó por experiencia en Micro-frontends. Entrevista técnica el jueves con el Director de Ingeniería..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 leading-relaxed text-slate-800"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
