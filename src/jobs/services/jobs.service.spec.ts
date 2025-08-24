import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { OfertaRepository } from '../repositories/oferta.repository';

describe('JobsService', () => {
  let service: JobsService;
  let repo: OfertaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: OfertaRepository,
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            searchJobs: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<JobsService>(JobsService);
    repo = module.get<OfertaRepository>(OfertaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all jobs', async () => {
    (repo.find as jest.Mock).mockResolvedValue([{ id: 1 }]);
    const result = await service.findAll();
    expect(result[0].id).toBe(1);
  });

  it('should return job detail', async () => {
    (repo.findOneBy as jest.Mock).mockResolvedValue({ id: 2 });
    const result = await service.findOne(2);
    expect(result.id).toBe(2);
  });

  it('should search jobs', async () => {
    (repo.searchJobs as jest.Mock).mockResolvedValue([{ id: 3 }]);
    const result = await service.searchJobs({ query: 'test' });
    expect(result[0].id).toBe(3);
  });
});
