import React, { useState } from 'react';
import {
  Printer,
  Download,
  Share2,
  FileText,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useCV } from '../context/CVContext';
import { MasterCV, CVTemplateType } from '../types/cv';

interface CVPreviewProps {
  initialSelectedId?: string;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ initialSelectedId }) => {
  const { masterCV, adaptedCVs } = useCV();

  const [selectedCVId, setSelectedCVId] = useState<string>(
    initialSelectedId || (adaptedCVs.length > 0 ? adaptedCVs[0].id : 'master')
  );
  const [template, setTemplate] = useState<CVTemplateType>('modern');

  // Determine which data to render
  let activeCVData: MasterCV = masterCV;
  let activeTitle = 'CV Maestro (General)';
  let activeSubtitle = 'Información completa';

  if (selectedCVId !== 'master') {
    const foundAdapted = adaptedCVs.find((c) => c.id === selectedCVId);
    if (foundAdapted) {
      activeCVData = foundAdapted.cvData;
      activeTitle = foundAdapted.reference;
      activeSubtitle = `${foundAdapted.company} · ${foundAdapted.targetRole}`;
    }
  }

  const handlePrint = () => {
    window.print();
  };

  const visibleExperiences = activeCVData.experiences.filter((e) => e.included !== false);
  const visibleEducation = activeCVData.education.filter((e) => e.included !== false);
  const visibleSkills = activeCVData.skillCategories.filter((c) => c.included !== false);
  const visibleProjects = activeCVData.projects.filter((p) => p.included !== false);
  const visibleLanguages = activeCVData.languages.filter((l) => l.included !== false);
  const visibleCerts = activeCVData.certifications.filter((c) => c.included !== false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Control Toolbar (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* CV Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
            Visualizando CV:
          </label>
          <select
            value={selectedCVId}
            onChange={(e) => setSelectedCVId(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          >
            <option value="master">CV Maestro (Información General)</option>
            <optgroup label="CVs Adaptados por Oferta">
              {adaptedCVs.map((cv) => (
                <option key={cv.id} value={cv.id}>
                  {cv.reference} ({cv.company})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Template Selector & Print Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                template === 'modern'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Moderna
            </button>
            <button
              onClick={() => setTemplate('executive')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                template === 'executive'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ejecutiva
            </button>
            <button
              onClick={() => setTemplate('minimal')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                template === 'minimal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Minimal ATS
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap ml-auto"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>
      </div>

      {/* Realistic Paper Layout (A4 formatted) */}
      <div className="flex justify-center">
        <div
          id="cv-printable-sheet"
          className="print-page-container w-full max-w-[850px] bg-white border border-slate-200 shadow-lg rounded-sm p-8 sm:p-12 text-slate-800 transition-all"
        >
          {/* TEMPLATE 1: MODERN TECH */}
          {template === 'modern' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                  {activeCVData.personal.fullName}
                </h1>
                <p className="text-base font-semibold text-blue-700 mt-1">
                  {activeCVData.personal.headline}
                </p>

                {/* Contact links unboxed with · separator */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-3">
                  {activeCVData.personal.email && (
                    <span>{activeCVData.personal.email}</span>
                  )}
                  {activeCVData.personal.phone && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{activeCVData.personal.phone}</span>
                    </>
                  )}
                  {activeCVData.personal.location && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{activeCVData.personal.location}</span>
                    </>
                  )}
                  {activeCVData.personal.linkedin && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{activeCVData.personal.linkedin}</span>
                    </>
                  )}
                  {activeCVData.personal.github && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{activeCVData.personal.github}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              {activeCVData.personal.summary && (
                <div className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    Perfil Profesional
                  </h2>
                  <p className="text-xs leading-relaxed text-slate-700">
                    {activeCVData.personal.summary}
                  </p>
                </div>
              )}

              {/* Work Experience */}
              {visibleExperiences.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    Experiencia Laboral
                  </h2>

                  <div className="space-y-4">
                    {visibleExperiences.map((exp) => (
                      <div key={exp.id} className="space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                          <h3 className="text-sm font-bold text-slate-900">
                            {exp.role} <span className="font-semibold text-blue-700">· {exp.company}</span>
                          </h3>
                          <span className="text-xs text-slate-500 font-mono">
                            {exp.startDate} – {exp.current ? 'Presente' : exp.endDate} | {exp.location}
                          </span>
                        </div>

                        {exp.summary && (
                          <p className="text-xs text-slate-700 italic">
                            {exp.summary}
                          </p>
                        )}

                        {exp.bullets.length > 0 && (
                          <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 leading-normal">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}

                        {exp.technologies.length > 0 && (
                          <div className="text-[11px] text-slate-600 pt-0.5">
                            <strong className="text-slate-800">Stack:</strong> {exp.technologies.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {visibleEducation.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    Educación & Formación
                  </h2>
                  <div className="space-y-2">
                    {visibleEducation.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-start text-xs">
                        <div>
                          <div className="font-bold text-slate-900">
                            {edu.degree} en {edu.field}
                          </div>
                          <div className="text-slate-600">
                            {edu.institution} {edu.location ? `· ${edu.location}` : ''}
                          </div>
                          {edu.details && (
                            <div className="text-[11px] text-slate-500 italic mt-0.5">{edu.details}</div>
                          )}
                        </div>
                        <span className="text-slate-500 font-mono shrink-0 ml-4">
                          {edu.startDate} – {edu.endDate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Two-Column Bottom Row: Skills & Other */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Skills */}
                {visibleSkills.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                      Habilidades Principales
                    </h2>
                    <div className="space-y-2 text-xs">
                      {visibleSkills.map((cat) => (
                        <div key={cat.id}>
                          <span className="font-semibold text-slate-800">{cat.category}: </span>
                          <span className="text-slate-600">{cat.skills.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages & Certifications */}
                <div className="space-y-4">
                  {visibleLanguages.length > 0 && (
                    <div className="space-y-1.5">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                        Idiomas
                      </h2>
                      <div className="text-xs space-y-1">
                        {visibleLanguages.map((l) => (
                          <div key={l.id} className="flex justify-between">
                            <span className="font-semibold text-slate-800">{l.name}</span>
                            <span className="text-slate-600">{l.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {visibleCerts.length > 0 && (
                    <div className="space-y-1.5">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                        Certificaciones
                      </h2>
                      <div className="text-xs space-y-1">
                        {visibleCerts.map((c) => (
                          <div key={c.id} className="flex justify-between">
                            <span className="text-slate-800">
                              <strong>{c.name}</strong> · {c.issuer}
                            </span>
                            <span className="text-slate-500 font-mono ml-2">{c.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TEMPLATE 2: EXECUTIVE SERIF */}
          {template === 'executive' && (
            <div className="space-y-6 font-serif-display">
              {/* Header */}
              <div className="text-center border-b border-slate-300 pb-5 space-y-2">
                <h1 className="text-3xl font-normal tracking-tight text-slate-900">
                  {activeCVData.personal.fullName}
                </h1>
                <p className="text-sm font-sans tracking-widest uppercase text-slate-600 font-medium">
                  {activeCVData.personal.headline}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-x-3 text-xs font-sans text-slate-500 pt-1">
                  {activeCVData.personal.email && <span>{activeCVData.personal.email}</span>}
                  {activeCVData.personal.phone && (
                    <>
                      <span>/</span>
                      <span>{activeCVData.personal.phone}</span>
                    </>
                  )}
                  {activeCVData.personal.location && (
                    <>
                      <span>/</span>
                      <span>{activeCVData.personal.location}</span>
                    </>
                  )}
                  {activeCVData.personal.linkedin && (
                    <>
                      <span>/</span>
                      <span>{activeCVData.personal.linkedin}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              {activeCVData.personal.summary && (
                <div className="space-y-1 text-center max-w-2xl mx-auto">
                  <p className="text-sm leading-relaxed text-slate-700 italic">
                    &ldquo;{activeCVData.personal.summary}&rdquo;
                  </p>
                </div>
              )}

              {/* Experience */}
              {visibleExperiences.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                    Trayectoria Ejecutiva & Laboral
                  </h2>

                  <div className="space-y-4">
                    {visibleExperiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline font-sans text-xs">
                          <span className="font-bold text-slate-900 text-sm">
                            {exp.role}, {exp.company}
                          </span>
                          <span className="text-slate-500 font-mono">
                            {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                          </span>
                        </div>

                        {exp.bullets.length > 0 && (
                          <ul className="list-disc pl-4 space-y-1 text-xs font-sans text-slate-700">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-sans">
                {visibleEducation.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                      Formación Académica
                    </h2>
                    {visibleEducation.map((edu) => (
                      <div key={edu.id} className="text-xs">
                        <div className="font-bold text-slate-900">{edu.degree}</div>
                        <div className="text-slate-600">{edu.institution}, {edu.startDate} – {edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                )}

                {visibleSkills.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                      Competencias Clave
                    </h2>
                    <div className="text-xs space-y-1 text-slate-700">
                      {visibleSkills.map((c) => (
                        <div key={c.id}>
                          <strong>{c.category}:</strong> {c.skills.join(', ')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TEMPLATE 3: MINIMAL ATS */}
          {template === 'minimal' && (
            <div className="space-y-5 font-sans">
              {/* ATS Header */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold uppercase text-slate-900">
                  {activeCVData.personal.fullName}
                </h1>
                <p className="text-xs font-semibold text-slate-700">
                  {activeCVData.personal.headline}
                </p>
                <p className="text-xs text-slate-600">
                  {activeCVData.personal.email} | {activeCVData.personal.phone} | {activeCVData.personal.location} | {activeCVData.personal.linkedin}
                </p>
              </div>

              <hr className="border-slate-800" />

              {/* Summary */}
              {activeCVData.personal.summary && (
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase text-slate-900">
                    RESUMEN
                  </h2>
                  <p className="text-xs text-slate-800 leading-normal">
                    {activeCVData.personal.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {visibleExperiences.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase text-slate-900">
                    EXPERIENCIA PROFESIONAL
                  </h2>
                  {visibleExperiences.map((exp) => (
                    <div key={exp.id} className="space-y-1 text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.role} - {exp.company}</span>
                        <span className="font-mono">{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</span>
                      </div>
                      <p className="text-slate-700">{exp.summary}</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {visibleEducation.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase text-slate-900">
                    EDUCACIÓN
                  </h2>
                  {visibleEducation.map((edu) => (
                    <div key={edu.id} className="flex justify-between text-xs text-slate-800">
                      <span><strong>{edu.degree}</strong>, {edu.institution}</span>
                      <span className="font-mono">{edu.startDate} - {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {visibleSkills.length > 0 && (
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase text-slate-900">
                    HABILIDADES TÉCNICAS
                  </h2>
                  <div className="text-xs text-slate-800 space-y-0.5">
                    {visibleSkills.map((c) => (
                      <div key={c.id}>
                        <strong>{c.category}:</strong> {c.skills.join(', ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
