const BaseService = require('../../core/base-service');

describe('BaseService', () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new BaseService(mockRepository);
  });

  it('delegates findAll to repository', async () => {
    mockRepository.findAll.mockResolvedValue([]);

    const result = await service.findAll();

    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('delegates findById to repository', async () => {
    mockRepository.findById.mockResolvedValue({ id: 1 });

    const result = await service.findById(1);

    expect(mockRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1 });
  });
});
