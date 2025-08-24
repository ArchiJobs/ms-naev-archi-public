
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Oferta } from "../entities/oferta.entity";
import { JobFiltersDto, JobSearchDto } from "../dto/job.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OfertaRepository {
  constructor(
    @InjectRepository(Oferta)
    private readonly ofertaRepo: Repository<Oferta>,
  ) {}
  // Proxy para find
  async find(options?: any): Promise<Oferta[]> {
    return this.ofertaRepo.find(options);
  }

  // Proxy para findOneBy
  async findOneBy(where: any): Promise<Oferta | null> {
    return this.ofertaRepo.findOneBy(where);
  }
  async searchJobs(params: JobSearchDto & { limit?: number; offset?: number; page?: number }): Promise<Oferta[]> {
    const qb = this.ofertaRepo.createQueryBuilder('oferta');
    if (params.query) {
      qb.andWhere('oferta.ofe_titulo LIKE :query OR oferta.ofe_descripcion LIKE :query', { query: `%${params.query}%` });
    }
    if (params.location) {
      qb.andWhere('oferta.ubi_id = :location', { location: params.location });
    }
    if (params.category) {
      qb.andWhere('oferta.cat_id = :category', { category: params.category });
    }
    if (params.salaryRange) {
      const [min, max] = params.salaryRange.split('-').map(Number);
      if (!isNaN(min)) qb.andWhere('oferta.ofe_salario_min >= :min', { min });
      if (!isNaN(max)) qb.andWhere('oferta.ofe_salario_max <= :max', { max });
    }
    const limit = params.limit ?? 5;
    const page = params.page ?? 1;
    const offset = params.offset ?? ((page - 1) * limit);
    qb.take(limit);
    qb.skip(offset);
    return qb.getMany();
  }

  async getFilters(): Promise<JobFiltersDto> {
    // Países
  const paisesRows = await this.ofertaRepo.query("SELECT DISTINCT ubi_pais FROM job.ubicacion WHERE ubi_pais IS NOT NULL AND ubi_pais <> ''");
  console.log(paisesRows);
  const paises = paisesRows.map((r: any) => r.ubi_pais).filter((v: string) => !!v);
  // Regiones
  const regionesRows = await this.ofertaRepo.query("SELECT DISTINCT ubi_region FROM job.ubicacion WHERE ubi_region IS NOT NULL AND ubi_region <> ''");
  const regiones = regionesRows.map((r: any) => r.ubi_region).filter((v: string) => !!v);
  // Niveles de experiencia (si tienes una tabla, consulta aquí; si no, puedes dejarlo vacío o agregar valores fijos)
  const nivelesExperiencia: string[] = [];
  // Tipos de contrato
  const tiposContratoRows = await this.ofertaRepo.query("SELECT DISTINCT ofe_tipo_contrato FROM job.oferta WHERE ofe_tipo_contrato IS NOT NULL AND ofe_tipo_contrato <> ''");
  const tiposContrato = tiposContratoRows.map((r: any) => r.ofe_tipo_contrato).filter((v: string) => !!v);
  // Modalidades
  const modalidadesRows = await this.ofertaRepo.query("SELECT DISTINCT ofe_modalidad FROM job.oferta WHERE ofe_modalidad IS NOT NULL AND ofe_modalidad <> ''");
  const modalidades = modalidadesRows.map((r: any) => r.ofe_modalidad).filter((v: string) => !!v);
    // Categorías
    const categoriasRows = await this.ofertaRepo.query('SELECT cat_id, cat_nombre, cat_descripcion FROM job.categoria');
    const categorias = categoriasRows.map((r: any) => ({
      id: r.cat_id,
      nombre: r.cat_nombre,
      descripcion: r.cat_descripcion,
    })).filter((c: any) => !!c.id && !!c.nombre);
    return {
      categorias,
      paises,
      regiones,
      nivelesExperiencia,
      modalidades,
      tiposContrato,
    };
  }
}

