import React, { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Globe,
  Award,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCV } from '../context/CVContext';
import {
  MasterCV,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  LanguageItem,
  CertificationItem,
} from '../types/cv';

interface MasterCVEditorProps {
  onStartAdaptedCV: () => void;
}

export const MasterCVEditor: React.FC<MasterCVEditorProps> = ({ onStartAdaptedCV }) => {
  const { masterCV, updateMasterCV } = useCV();
  const [activeSection, setActiveSection] = useState<
    'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certs'
  >('personal');

  // Track expanded experiences/projects
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'exp-1': true,
    'proj-1': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Updaters
  const updatePersonal = (field: keyof MasterCV['personal'], value: string) => {
    updateMasterCV({
      ...masterCV,
      personal: {
        ...masterCV.personal,
        [field]: value,
      },
    });
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newId = `exp-${Date.now()}`;
    const newExp: ExperienceItem = {
      id: newId,
      role: 'Nuevo Puesto',
      company: 'Empresa',
      location: 'Remoto / Híbrido',
      startDate: '2023-01',
      endDate: '',
      current: true,
      summary: 'Descripción general de las responsabilidades principales.',
      bullets: ['Logro cuantificable o hito relevante alcanzado.'],
      technologies: ['Tecnología 1', 'Herramienta 2'],
      included: true,
    };
    updateMasterCV({
      ...masterCV,
      experiences: [newExp, ...masterCV.experiences],
    });
    setExpandedItems((prev) => ({ ...prev, [newId]: true }));
  };

  const handleUpdateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    updateMasterCV({
      ...masterCV,
      experiences: masterCV.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updated } : exp
      ),
    });
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm('¿Eliminar esta experiencia del CV Maestro?')) {
      updateMasterCV({
        ...masterCV,
        experiences: masterCV.experiences.filter((exp) => exp.id !== id),
      });
    }
  };

  const handleAddBulletToExp = (expId: string) => {
    const exp = masterCV.experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bullets, 'Nuevo logro o responsabilidad clave'];
    handleUpdateExperience(expId, { bullets: newBullets });
  };

  const handleUpdateBullet = (expId: string, index: number, value: string) => {
    const exp = masterCV.experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bullets];
    newBullets[index] = value;
    handleUpdateExperience(expId, { bullets: newBullets });
  };

  const handleDeleteBullet = (expId: string, index: number) => {
    const exp = masterCV.experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = exp.bullets.filter((_, i) => i !== index);
    handleUpdateExperience(expId, { bullets: newBullets });
  };

  // Education handlers
  const handleAddEducation = () => {
    const newId = `edu-${Date.now()}`;
    const newEdu: EducationItem = {
      id: newId,
      institution: 'Universidad / Instituto',
      degree: 'Grado o Licenciatura',
      field: 'Especialidad',
      startDate: '2016',
      endDate: '2020',
      location: 'Ciudad',
      details: '',
      included: true,
    };
    updateMasterCV({
      ...masterCV,
      education: [newEdu, ...masterCV.education],
    });
  };

  const handleUpdateEducation = (id: string, updated: Partial<EducationItem>) => {
    updateMasterCV({
      ...masterCV,
      education: masterCV.education.map((edu) =>
        edu.id === id ? { ...edu, ...updated } : edu
      ),
    });
  };

  const handleDeleteEducation = (id: string) => {
    updateMasterCV({
      ...masterCV,
      education: masterCV.education.filter((edu) => edu.id !== id),
    });
  };

  // Skills Category handlers
  const handleAddSkillCategory = () => {
    const newId = `cat-${Date.now()}`;
    const newCat: SkillCategory = {
      id: newId,
      category: 'Nueva Categoría',
      skills: ['Habilidad 1', 'Habilidad 2'],
      included: true,
    };
    updateMasterCV({
      ...masterCV,
      skillCategories: [...masterCV.skillCategories, newCat],
    });
  };

  const handleUpdateSkillCategory = (id: string, updated: Partial<SkillCategory>) => {
    updateMasterCV({
      ...masterCV,
      skillCategories: masterCV.skillCategories.map((cat) =>
        cat.id === id ? { ...cat, ...updated } : cat
      ),
    });
  };

  const handleDeleteSkillCategory = (id: string) => {
    updateMasterCV({
      ...masterCV,
      skillCategories: masterCV.skillCategories.filter((cat) => cat.id !== id),
    });
  };

  // Projects handlers
  const handleAddProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProj: ProjectItem = {
      id: newId,
      name: 'Nuevo Proyecto',
      role: 'Creador / Desarrollador Principal',
      url: '',
      description: 'Breve descripción del impacto del proyecto.',
      technologies: ['React', 'Node.js'],
      included: true,
    };
    updateMasterCV({
      ...masterCV,
      projects: [newProj, ...masterCV.projects],
    });
    setExpandedItems((prev) => ({ ...prev, [newId]: true }));
  };

  const handleUpdateProject = (id: string, updated: Partial<ProjectItem>) => {
    updateMasterCV({
      ...masterCV,
      projects: masterCV.projects.map((proj) =>
        proj.id === id ? { ...proj, ...updated } : proj
      ),
    });
  };

  const handleDeleteProject = (id: string) => {
    updateMasterCV({
      ...masterCV,
      projects: masterCV.projects.filter((proj) => proj.id !== id),
    });
  };

  // Languages handlers
  const handleAddLanguage = () => {
    const newId = `lang-${Date.now()}`;
    const newLang: LanguageItem = {
      id: newId,
      name: 'Nuevo Idioma',
      proficiency: 'Intermedio B2',
      included: true,
    };
    updateMasterCV({
      ...masterCV,
      languages: [...masterCV.languages, newLang],
    });
  };

  const handleUpdateLanguage = (id: string, updated: Partial<LanguageItem>) => {
    updateMasterCV({
      ...masterCV,
      languages: masterCV.languages.map((l) => (l.id === id ? { ...l, ...updated } : l)),
    });
  };

  const handleDeleteLanguage = (id: string) => {
    updateMasterCV({
      ...masterCV,
      languages: masterCV.languages.filter((l) => l.id !== id),
    });
  };

  // Certifications handlers
  const handleAddCert = () => {
    const newId = `cert-${Date.now()}`;
    const newCert: CertificationItem = {
      id: newId,
      name: 'Nueva Certificación',
      issuer: 'Entidad Emisora',
      year: new Date().getFullYear().toString(),
      included: true,
    };
    updateMasterCV({
      ...masterCV,
      certifications: [...masterCV.certifications, newCert],
    });
  };

  const handleUpdateCert = (id: string, updated: Partial<CertificationItem>) => {
    updateMasterCV({
      ...masterCV,
      certifications: masterCV.certifications.map((c) =>
        c.id === id ? { ...c, ...updated } : c
      ),
    });
  };

  const handleDeleteCert = (id: string) => {
    updateMasterCV({
      ...masterCV,
      certifications: masterCV.certifications.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner introducing the Master CV */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Repositorio Central de Información</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            CV Maestro: Información General
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Aquí almacenas toda tu trayectoria profesional completa. Al adaptarlo para una empresa o reclutador,
            este CV servirá como molde base editable sin perder tu información general.
          </p>
        </div>

        <button
          onClick={onStartAdaptedCV}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Adaptar a Nueva Oferta</span>
        </button>
      </div>

      {/* Navigation sub-tabs between sections */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          onClick={() => setActiveSection('personal')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'personal'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Datos Personales</span>
        </button>

        <button
          onClick={() => setActiveSection('experience')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'experience'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experiencia</span>
          <span className="text-[11px] font-mono tabular-nums opacity-80">
            ({masterCV.experiences.length})
          </span>
        </button>

        <button
          onClick={() => setActiveSection('education')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'education'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Educación</span>
          <span className="text-[11px] font-mono tabular-nums opacity-80">
            ({masterCV.education.length})
          </span>
        </button>

        <button
          onClick={() => setActiveSection('skills')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'skills'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Habilidades</span>
          <span className="text-[11px] font-mono tabular-nums opacity-80">
            ({masterCV.skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
          </span>
        </button>

        <button
          onClick={() => setActiveSection('projects')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'projects'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Proyectos</span>
          <span className="text-[11px] font-mono tabular-nums opacity-80">
            ({masterCV.projects.length})
          </span>
        </button>

        <button
          onClick={() => setActiveSection('languages')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'languages'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Idiomas</span>
          <span className="text-[11px] font-mono tabular-nums opacity-80">
            ({masterCV.languages.length})
          </span>
        </button>

        <button
          onClick={() => setActiveSection('certs')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'certs'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Certificaciones</span>
          <span className="text-[11px] font-mono tabular-nums opacity-80">
            ({masterCV.certifications.length})
          </span>
        </button>
      </div>

      {/* Section Content Area */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        {/* 1. PERSONAL INFO */}
        {activeSection === 'personal' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Datos Personales y Perfil Profesional
                </h2>
                <p className="text-xs text-slate-500">
                  Tu información de contacto principal y extracto bio general.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={masterCV.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Alejandro Morales"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Titular Profesional (Headline)
                </label>
                <input
                  type="text"
                  value={masterCV.personal.headline}
                  onChange={(e) => updatePersonal('headline', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Senior Full Stack Engineer & Tech Lead"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={masterCV.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="text"
                  value={masterCV.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="+34 612 345 678"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Ubicación & Modalidad
                </label>
                <input
                  type="text"
                  value={masterCV.personal.location}
                  onChange={(e) => updatePersonal('location', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Madrid, España (Disponible Remoto)"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Perfil de LinkedIn
                </label>
                <input
                  type="text"
                  value={masterCV.personal.linkedin}
                  onChange={(e) => updatePersonal('linkedin', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="linkedin.com/in/usuario"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  GitHub / Portfolio Web
                </label>
                <input
                  type="text"
                  value={masterCV.personal.github}
                  onChange={(e) => updatePersonal('github', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="github.com/usuario"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Sitio Web Personal
                </label>
                <input
                  type="text"
                  value={masterCV.personal.website}
                  onChange={(e) => updatePersonal('website', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="tusitio.com"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Resumen / Perfil Profesional General
              </label>
              <textarea
                rows={4}
                value={masterCV.personal.summary}
                onChange={(e) => updatePersonal('summary', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed text-slate-800"
                placeholder="Escribe tu trayectoria global, propuesta de valor, tecnologías núcleo y logros principales..."
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Tip: Este resumen general luego podrás afinarlo y reescribirlo para cada oferta de empleo específica.
              </p>
            </div>
          </div>
        )}

        {/* 2. WORK EXPERIENCE */}
        {activeSection === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Historial de Experiencia Laboral
                </h2>
                <p className="text-xs text-slate-500">
                  Agrega todos los cargos que has tenido. Al adaptar para una oferta podrás seleccionar cuáles incluir o ajustar sus viñetas.
                </p>
              </div>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Puesto</span>
              </button>
            </div>

            <div className="space-y-4">
              {masterCV.experiences.map((exp, expIdx) => {
                const isExpanded = expandedItems[exp.id] ?? false;
                return (
                  <div
                    key={exp.id}
                    className="border border-slate-200 rounded-lg p-4 bg-slate-50/40 hover:border-slate-300 transition-colors"
                  >
                    {/* Item Summary Bar */}
                    <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleExpand(exp.id)}>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-mono font-medium">
                          {expIdx + 1}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {exp.role || 'Sin título'} · <span className="text-blue-600">{exp.company || 'Empresa'}</span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span>{exp.startDate} - {exp.current ? 'Actualmente' : exp.endDate || 'Fin'}</span>
                            <span>·</span>
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Form */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              Cargo / Rol
                            </label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => handleUpdateExperience(exp.id, { role: e.target.value })}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              Empresa
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              Ubicación
                            </label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => handleUpdateExperience(exp.id, { location: e.target.value })}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 items-center">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">
                                Fecha Inicio
                              </label>
                              <input
                                type="text"
                                value={exp.startDate}
                                placeholder="2022-03"
                                onChange={(e) => handleUpdateExperience(exp.id, { startDate: e.target.value })}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">
                                Fecha Fin
                              </label>
                              <input
                                type="text"
                                value={exp.endDate}
                                placeholder={exp.current ? 'Actual' : '2024-05'}
                                onChange={(e) => handleUpdateExperience(exp.id, { endDate: e.target.value, current: false })}
                                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800 font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`curr-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => handleUpdateExperience(exp.id, { current: e.target.checked })}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`curr-${exp.id}`} className="text-xs text-slate-700">
                            Actualmente trabajando en esta posición
                          </label>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Resumen / Responsabilidad Principal
                          </label>
                          <textarea
                            rows={2}
                            value={exp.summary}
                            onChange={(e) => handleUpdateExperience(exp.id, { summary: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                          />
                        </div>

                        {/* Bullets List */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-slate-700">
                              Logros & Viñetas Cuantificables
                            </label>
                            <button
                              type="button"
                              onClick={() => handleAddBulletToExp(exp.id)}
                              className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Añadir logro</span>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {exp.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2">
                                <span className="text-slate-400 mt-2 text-xs">•</span>
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                                  className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                                  placeholder="Logro alcanzado (ej: Reducción del 30% en costos de infraestructura)..."
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
                        </div>

                        {/* Technologies Tags */}
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Tecnologías y Herramientas (separadas por coma)
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
                            placeholder="React, TypeScript, AWS, Node.js..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. EDUCATION */}
        {activeSection === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Educación y Formación Académica
                </h2>
                <p className="text-xs text-slate-500">
                  Títulos universitarios, grados técnicos y especializaciones.
                </p>
              </div>
              <button
                onClick={handleAddEducation}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Educación</span>
              </button>
            </div>

            <div className="space-y-4">
              {masterCV.education.map((edu) => (
                <div key={edu.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">
                      {edu.degree || 'Grado académico'}
                    </span>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-1 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Institución / Universidad
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleUpdateEducation(edu.id, { institution: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Título obtenido
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(edu.id, { degree: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Campo de Estudio
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleUpdateEducation(edu.id, { field: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Inicio
                        </label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => handleUpdateEducation(edu.id, { startDate: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Fin / Graduación
                        </label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => handleUpdateEducation(edu.id, { endDate: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Detalles o Distinciones (Opcional)
                    </label>
                    <input
                      type="text"
                      value={edu.details}
                      onChange={(e) => handleUpdateEducation(edu.id, { details: e.target.value })}
                      placeholder="Mención de honor, promedio destacado..."
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. SKILLS & COMPETENCIES */}
        {activeSection === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Habilidades & Competencias por Categoría
                </h2>
                <p className="text-xs text-slate-500">
                  Organiza tus habilidades técnicas y blandas. Podrás priorizar las que demande cada oferta.
                </p>
              </div>
              <button
                onClick={handleAddSkillCategory}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Categoría</span>
              </button>
            </div>

            <div className="space-y-4">
              {masterCV.skillCategories.map((cat) => (
                <div key={cat.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/40 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => handleUpdateSkillCategory(cat.id, { category: e.target.value })}
                      className="font-semibold text-sm text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-blue-500 px-1 py-0.5"
                    />
                    <button
                      onClick={() => handleDeleteSkillCategory(cat.id)}
                      className="p-1 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Habilidades (separadas por coma)
                    </label>
                    <input
                      type="text"
                      value={cat.skills.join(', ')}
                      onChange={(e) =>
                        handleUpdateSkillCategory(cat.id, {
                          skills: e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PROJECTS */}
        {activeSection === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Proyectos Relevantes & Portafolio
                </h2>
                <p className="text-xs text-slate-500">
                  Sistemas, librerías open source o productos creados por ti.
                </p>
              </div>
              <button
                onClick={handleAddProject}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Proyecto</span>
              </button>
            </div>

            <div className="space-y-4">
              {masterCV.projects.map((proj) => (
                <div key={proj.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      {proj.name}
                    </span>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Nombre del Proyecto
                      </label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleUpdateProject(proj.id, { name: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Rol en el proyecto
                      </label>
                      <input
                        type="text"
                        value={proj.role || ''}
                        onChange={(e) => handleUpdateProject(proj.id, { role: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Enlace / URL
                      </label>
                      <input
                        type="text"
                        value={proj.url || ''}
                        onChange={(e) => handleUpdateProject(proj.id, { url: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Descripción del Proyecto
                    </label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => handleUpdateProject(proj.id, { description: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Tecnologías (separadas por coma)
                    </label>
                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={(e) =>
                        handleUpdateProject(proj.id, {
                          technologies: e.target.value
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. LANGUAGES */}
        {activeSection === 'languages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Idiomas
                </h2>
                <p className="text-xs text-slate-500">
                  Nivel de fluidez y comunicación profesional.
                </p>
              </div>
              <button
                onClick={handleAddLanguage}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Idioma</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {masterCV.languages.map((lang) => (
                <div key={lang.id} className="border border-slate-200 rounded-lg p-3 bg-slate-50/40 flex items-center justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => handleUpdateLanguage(lang.id, { name: e.target.value })}
                      className="w-full px-2 py-1 text-xs font-medium border border-slate-200 rounded bg-white"
                      placeholder="Idioma"
                    />
                    <select
                      value={lang.proficiency}
                      onChange={(e) => handleUpdateLanguage(lang.id, { proficiency: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-700"
                    >
                      <option value="Nativo">Nativo</option>
                      <option value="Bilingüe">Bilingüe</option>
                      <option value="C2 Profesional Experto">C2 Profesional Experto</option>
                      <option value="C1 Profesional (Fluido)">C1 Profesional (Fluido)</option>
                      <option value="B2 Intermedio Avanzado">B2 Intermedio Avanzado</option>
                      <option value="B1 Intermedio">B1 Intermedio</option>
                      <option value="A2 / A1 Básico">A2 / A1 Básico</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handleDeleteLanguage(lang.id)}
                    className="p-1 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. CERTIFICATIONS */}
        {activeSection === 'certs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Certificaciones & Credenciales
                </h2>
                <p className="text-xs text-slate-500">
                  Certificados oficiales de plataformas o instituciones como AWS, Google, Microsoft, Meta.
                </p>
              </div>
              <button
                onClick={handleAddCert}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Certificación</span>
              </button>
            </div>

            <div className="space-y-3">
              {masterCV.certifications.map((cert) => (
                <div key={cert.id} className="border border-slate-200 rounded-lg p-3 bg-slate-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleUpdateCert(cert.id, { name: e.target.value })}
                      placeholder="Nombre del certificado"
                      className="px-2.5 py-1 text-xs border border-slate-200 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => handleUpdateCert(cert.id, { issuer: e.target.value })}
                      placeholder="Emisor (ej: AWS, Meta)"
                      className="px-2.5 py-1 text-xs border border-slate-200 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={cert.year}
                      onChange={(e) => handleUpdateCert(cert.id, { year: e.target.value })}
                      placeholder="Año (ej: 2023)"
                      className="px-2.5 py-1 text-xs border border-slate-200 rounded bg-white font-mono"
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteCert(cert.id)}
                    className="p-1 text-slate-400 hover:text-red-500 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
