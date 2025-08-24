export class JobSearchDto {
  query?: string;
  location?: string;
  category?: string;
  salaryRange?: string;
  limit?: number;
  offset?: number;
  page?: number;
}

export class JobDetailDto {
  id: number;
  empresaId: number;
  categoriaId: number;
  ubicacionId: number;
  titulo: string;
  descripcion: string;
  modalidad: string;
  tipoContrato: string;
  salarioMin: number;
  salarioMax: number;
  fechaPublicacion: Date;
  activo: boolean;
}

export class JobFiltersDto {
  categorias: any[]; // Debe ser importado de categories si se requiere
  paises: string[];
  regiones: string[];
  nivelesExperiencia: string[];
  modalidades: string[];
  tiposContrato: string[];
}
