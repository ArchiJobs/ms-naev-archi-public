import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from '../services/jobs.service';

describe('JobsController', () => {
  let controller: JobsController;
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            searchJobs: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<JobsController>(JobsController);
    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all jobs', async () => {
    (service.findAll as jest.Mock).mockResolvedValue([{ id: 1 }]);
    const result = await controller.findAll();
    expect(result[0].id).toBe(1);
  });

  it('should return job detail', async () => {
    (service.findOne as jest.Mock).mockResolvedValue({ id: 2 });
    const result = await controller.findOne(2);
    expect(result.id).toBe(2);
  });

  it('should search jobs', async () => {
    (service.searchJobs as jest.Mock).mockResolvedValue([{ id: 3 }]);
    const result = await controller.searchJobs('test');
    expect(result[0].id).toBe(3);
  });
});
