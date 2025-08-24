import { Injectable, NotFoundException } from '@nestjs/common';
import { hackeErrorException } from '../utils/error.util';
import { Oferta } from '../entities/oferta.entity';
import { JobSearchDto, JobDetailDto } from '../dto/job.dto';
import { OfertaRepository } from '../repositories/oferta.repository';

@Injectable()
export class JobsService {
  constructor(
    private readonly ofertaRepository: OfertaRepository,
  ) {}

  async findAll(): Promise<JobDetailDto[]> {
    try {
      const ofertas = await this.ofertaRepository.find();
      return ofertas.map(o => this.toJobDetailDto(o));
    } catch (error) {
      hackeErrorException(error);
    }
  }

  async findOne(id: number): Promise<JobDetailDto> {
    try {
      const oferta = await this.ofertaRepository.findOneBy({ id });
      if (!oferta) {
        throw new NotFoundException(`Oferta with ID ${id} not found`);
      }
      return this.toJobDetailDto(oferta);
    } catch (error) {
      hackeErrorException(error);
    }
  }

  // Búsqueda avanzada de trabajos
  async searchJobs(params: JobSearchDto): Promise<JobDetailDto[]> {
    try {
      // Si tienes un repositorio personalizado, úsalo correctamente
      // Si no, implementa la búsqueda avanzada aquí
      if (typeof (this.ofertaRepository as any).searchJobs === 'function') {
        // Pasa todos los parámetros relevantes
        const ofertas = await (this.ofertaRepository as any).searchJobs({
          query: params.query,
          location: params.location,
          category: params.category,
          salaryRange: params.salaryRange,
          limit: params.limit,
          offset: params.offset,
          page: params.page,
        });
        return ofertas.map((o: Oferta) => this.toJobDetailDto(o));
      } else {
        // fallback: búsqueda simple con filtros básicos
        const where: any = {};
        if (params.query) {
          where.titulo = params.query;
        }
        if (params.location) {
          where.ubicacionId = params.location;
        }
        if (params.category) {
          where.categoriaId = params.category;
        }
        // Puedes agregar más filtros según tu entidad
        const ofertas = await this.ofertaRepository.find({ where });
        return ofertas.map(o => this.toJobDetailDto(o));
      }
    } catch (error) {
      hackeErrorException(error);
    }
  }

  private toJobDetailDto(oferta: Oferta): JobDetailDto {
    return {
      id: oferta.id,
      empresaId: oferta.empresaId,
      categoriaId: oferta.categoriaId,
      ubicacionId: oferta.ubicacionId,
      titulo: oferta.titulo,
      descripcion: oferta.descripcion,
      modalidad: oferta.modalidad,
      tipoContrato: oferta.tipoContrato,
      salarioMin: oferta.salarioMin,
      salarioMax: oferta.salarioMax,
      fechaPublicacion: oferta.fechaPublicacion,
      activo: oferta.activo,
    };
  }
  async getJobFilters(): Promise<any> {
    try {
      if (typeof (this.ofertaRepository as any).getFilters === 'function') {
        return await (this.ofertaRepository as any).getFilters();
      }
      console.log('no existe el método getFilters');
      // Si no existe el método, retorna objeto vacío o implementa lógica alternativa
      return {};
    } catch (error) {
      hackeErrorException(error);
    }
  }
}
