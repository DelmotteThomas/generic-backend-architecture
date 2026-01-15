const UserService = require('../services/user.service');

describe('UserService', () => {
  let userService;
  let fakeRepository;

  beforeEach(() => {
    fakeRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    userService = new UserService(fakeRepository);
  });

  it('delegates findAll to repository', async () => {
    fakeRepository.findAll.mockResolvedValue([]);

    const result = await userService.findAll();

    expect(fakeRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('delegates create to repository', async () => {
    fakeRepository.create.mockResolvedValue({ id: 1 });

    const result = await userService.create({ name: 'John' });

    expect(fakeRepository.create).toHaveBeenCalledWith({ name: 'John' });
    expect(result).toEqual({ id: 1 });
  });

  it('delegates findById to repository', async () => {
    fakeRepository.findById.mockResolvedValue({ id: 1 });

    const result = await userService.findById(1);

    expect(fakeRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1 });
  });
});
