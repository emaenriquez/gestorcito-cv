import React, { useState } from 'react';
import {
  GitCompare,
  ArrowRight,
  CheckCircle2,
  EyeOff,
  Building2,
  User,
  Briefcase,
  Edit3,
} from 'lucide-react';
import { useCV } from '../context/CVContext';

interface CVComparatorProps {
  initialAdaptedId?: string;
  onEditAdapted: (id: string) => void;
}

export const CVComparator: React.FC<CVComparatorProps> = ({
  initialAdaptedId,
  onEditAdapted,
}) => {
  const { masterCV, adaptedCVs } = useCV();

  const [selectedAdaptedId, setSelectedAdaptedId] = useState<string>(
    initialAdaptedId || (adaptedCVs.length > 0 ? adaptedCVs[0].id : '')
  );

  const adapted = adaptedCVs.find((c) => c.id === selectedAdaptedId);

  if (adaptedCVs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <GitCompare className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-base font-bold text-slate-800">
          Aún no tienes ningún CV adaptado para comparar
        </h2>
        <p className="text-xs text-slate-500">
          Crea primero un CV adaptado para una oferta o reclutador y podrás ver las diferencias lado a lado.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Comparator Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <GitCompare className="w-4 h-4" />
            <span>Comparador de Diferencias</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Comparar CV Maestro vs CV Adaptado
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Analiza qué información se modificó, priorizó u omitió específicamente para la oferta.
          </p>
        </div>

        {/* Adapted CV Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-700 whitespace-nowrap">
            CV a comparar:
          </label>
          <select
            value={selectedAdaptedId}
            onChange={(e) => setSelectedAdaptedId(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          >
            {adaptedCVs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.reference} ({c.company})
              </option>
            ))}
          </select>

          {adapted && (
            <button
              onClick={() => onEditAdapted(adapted.id)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          )}
        </div>
      </div>

      {adapted && (
        <div className="space-y-6">
          {/* Target Metadata Banner */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold text-blue-950 text-sm">
                {adapted.reference}
              </span>
              <span className="text-slate-600 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {adapted.company}
              </span>
              {adapted.recruiter && (
                <span className="text-slate-600 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {adapted.recruiter}
                </span>
              )}
              <span className="text-blue-700 font-semibold">
                Objetivo: {adapted.targetRole}
              </span>
            </div>

            <span className="text-slate-500 font-mono text-[11px]">
              Estado: <strong className="text-slate-800">{adapted.status}</strong>
            </span>
          </div>

          {/* Side by Side: Section 1 Headline & Summary */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                1. Titular Profesional & Resumen
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 p-5 gap-6">
              {/* Left Column: Master */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    CV Maestro (General)
                  </span>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-medium">Titular:</label>
                  <p className="text-xs font-semibold text-slate-800">
                    {masterCV.personal.headline}
                  </p>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-medium">Resumen General:</label>
                  <p className="text-xs leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {masterCV.personal.summary}
                  </p>
                </div>
              </div>

              {/* Right Column: Adapted */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    CV Adaptado para {adapted.company}
                  </span>
                  {adapted.cvData.personal.headline !== masterCV.personal.headline && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-medium px-1.5 py-0.5 rounded">
                      Personalizado
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-medium">Titular Adaptado:</label>
                  <p className="text-xs font-semibold text-blue-900">
                    {adapted.cvData.personal.headline}
                  </p>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-medium">Resumen Enfocado en la Vacante:</label>
                  <p className="text-xs leading-relaxed text-slate-800 bg-blue-50/40 p-3 rounded-lg border border-blue-100">
                    {adapted.cvData.personal.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side by Side: Section 2 Work Experiences */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                2. Experiencias Laborales (Inclusión & Ajustes)
              </h3>
            </div>

            <div className="divide-y divide-slate-200">
              {masterCV.experiences.map((masterExp) => {
                const adaptedExp = adapted.cvData.experiences.find((e) => e.id === masterExp.id);
                const isIncluded = adaptedExp ? adaptedExp.included !== false : false;

                return (
                  <div key={masterExp.id} className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Master Experience */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800">
                          {masterExp.role} · {masterExp.company}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {masterExp.startDate} – {masterExp.current ? 'Actual' : masterExp.endDate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic">{masterExp.summary}</p>
                      <ul className="list-disc pl-4 text-xs text-slate-600 space-y-0.5">
                        {masterExp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Adapted Experience */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          {isIncluded ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Incluido en este CV
                            </span>
                          ) : (
                            <span className="text-slate-400 flex items-center gap-1">
                              <EyeOff className="w-3.5 h-3.5" />
                              Oculto para esta oferta
                            </span>
                          )}
                        </span>
                      </div>

                      {isIncluded && adaptedExp ? (
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1.5">
                          <p className="text-xs text-slate-800 italic">{adaptedExp.summary}</p>
                          <ul className="list-disc pl-4 text-xs text-slate-800 space-y-0.5">
                            {adaptedExp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                          {adaptedExp.technologies.length > 0 && (
                            <div className="text-[11px] text-blue-700 pt-1">
                              <strong>Stack:</strong> {adaptedExp.technologies.join(', ')}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-slate-50 p-4 rounded-lg text-center text-xs text-slate-400">
                          Se omitió esta experiencia para mantener el CV enfocado y conciso para {adapted.company}.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
