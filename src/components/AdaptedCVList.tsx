import React, { useState } from 'react';
import {
  Search,
  Plus,
  Briefcase,
  Building2,
  User,
  Calendar,
  ExternalLink,
  Edit3,
  Eye,
  GitCompare,
  Copy,
  Trash2,
  FileCheck,
  CheckCircle,
  Clock,
  Send,
  Sparkles,
} from 'lucide-react';
import { useCV } from '../context/CVContext';
import { AdaptedCV, ApplicationStatus } from '../types/cv';

interface AdaptedCVListProps {
  onOpenNewModal: () => void;
  onEditAdapted: (id: string) => void;
  onPreviewAdapted: (id: string) => void;
  onCompareAdapted: (id: string) => void;
}

export const AdaptedCVList: React.FC<AdaptedCVListProps> = ({
  onOpenNewModal,
  onEditAdapted,
  onPreviewAdapted,
  onCompareAdapted,
}) => {
  const { adaptedCVs, updateAdaptedCV, duplicateAdaptedCV, deleteAdaptedCV } = useCV();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCVs = adaptedCVs.filter((cv) => {
    const matchesSearch =
      cv.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.recruiter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.targetRole.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || cv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    updateAdaptedCV(id, { status: newStatus });
  };

  const handleDuplicate = (cv: AdaptedCV) => {
    const newRef = prompt(
      'Nombre de referencia para la copia duplicada:',
      `${cv.reference} (Variante)`
    );
    if (newRef) {
      const newId = duplicateAdaptedCV(cv.id, newRef);
      if (newId) {
        onEditAdapted(newId);
      }
    }
  };

  const handleDelete = (id: string, refName: string) => {
    if (confirm(`¿Estás seguro de eliminar la versión adaptada "${refName}"?`)) {
      deleteAdaptedCV(id);
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Borrador':
        return 'text-slate-600 bg-slate-100 border-slate-200';
      case 'Enviado':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'En Proceso':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Entrevista':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Oferta':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Descartado':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header and Contextual Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            CVs Adaptados por Oferta
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Crea versiones personalizadas de tu CV para empresas específicas (ej: &quot;Empresa X - Martín RRHH&quot;),
            destacando la experiencia requerida para cada postulación.
          </p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nuevo CV Adaptado</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por referencia (ej: Empresa X), empresa, reclutador o puesto..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Estado:</span>
          {(['all', 'Borrador', 'Enviado', 'Entrevista', 'Oferta', 'Descartado'] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {status === 'all' ? 'Todos' : status}
              </button>
            )
          )}
        </div>
      </div>

      {/* List of Adapted CV Cards */}
      {filteredCVs.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-sm font-semibold text-slate-900">
              No se encontraron versiones adaptadas
            </h3>
            <p className="text-xs text-slate-500">
              {searchTerm || statusFilter !== 'all'
                ? 'Prueba modificando tus filtros de búsqueda.'
                : 'Crea tu primer CV adaptado para empezar a postularte con un currículum hecho a la medida de la vacante.'}
            </p>
          </div>
          <button
            onClick={onOpenNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Crear primer CV adaptado</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCVs.map((cv) => {
            const includedExpCount = cv.cvData.experiences.filter(
              (e) => e.included !== false
            ).length;
            const updatedDate = new Date(cv.updatedAt).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={cv.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top Reference Line and Status Dropdown */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900 truncate">
                          {cv.reference}
                        </h2>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-slate-700 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {cv.company}
                        </span>
                        {cv.recruiter && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="flex items-center gap-1 text-slate-600">
                              <User className="w-3 h-3 text-slate-400" />
                              {cv.recruiter}
                            </span>
                          </>
                        )}
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-blue-700 font-medium">
                          {cv.targetRole}
                        </span>
                      </div>
                    </div>

                    {/* Status Pill with interactive quick selector */}
                    <select
                      value={cv.status}
                      onChange={(e) => handleStatusChange(cv.id, e.target.value as ApplicationStatus)}
                      className={`text-xs font-semibold px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${getStatusColor(
                        cv.status
                      )}`}
                    >
                      <option value="Borrador">Borrador</option>
                      <option value="Enviado">Enviado</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Entrevista">Entrevista</option>
                      <option value="Oferta">Oferta</option>
                      <option value="Descartado">Descartado</option>
                    </select>
                  </div>

                  {/* Tailored Headline / Summary excerpt */}
                  <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cv.cvData.personal.summary || 'Sin resumen adaptado.'}
                  </div>

                  {/* Metadata and job notes hint */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <div className="flex items-center gap-3">
                      <span>
                        <strong className="text-slate-700 font-mono tabular-nums">{includedExpCount}</strong> exp. incluidas
                      </span>
                      <span>·</span>
                      <span>Modificado {updatedDate}</span>
                    </div>

                    {cv.jobDescription && (
                      <span className="text-blue-600 font-medium text-[11px]">
                        Con notas de oferta
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditAdapted(cv.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                      title="Modificar información de este CV adaptado"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Modificar Datos</span>
                    </button>

                    <button
                      onClick={() => onPreviewAdapted(cv.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                      title="Vista previa e imprimir"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Vista Previa</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onCompareAdapted(cv.id)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                      title="Comparar diferencias con el CV Maestro"
                    >
                      <GitCompare className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDuplicate(cv)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                      title="Duplicar para otra empresa/contacto"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(cv.id, cv.reference)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Eliminar este CV adaptado"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
