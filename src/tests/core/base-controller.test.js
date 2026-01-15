const BaseController = require('../../core/base-controller');

describe('BaseController', () => {
  let controller;
  let mockService;
  let req, res, next;

  beforeEach(() => {
    mockService = {
      findAll: jest.fn(),
    };

    controller = new BaseController(mockService);

    req = {
      query: {},
    };
    res = {};
    next = jest.fn();
  });

  it('handleRequest executes controller method', async () => {
    mockService.findAll.mockResolvedValue([]);

    const handler = controller.handleRequest('findAll');
    await handler(req, res, next);

    expect(mockService.findAll).toHaveBeenCalledWith({});
  });

  it('handleRequest forwards errors to next()', async () => {
    const error = new Error('Boom');

    controller.findAll = jest.fn().mockRejectedValue(error);

    const handler = controller.handleRequest('findAll');
    await handler(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
  it('delegates create to service', async () => {
  const controller = new BaseController({
    create: jest.fn().mockResolvedValue({ id: 1 }),
  });

  const handler = controller.handleRequest('create');

  await handler({ body: { name: 'John' } }, {}, jest.fn());

  expect(controller.service.create).toHaveBeenCalledWith({ name: 'John' });
});
it('delegates delete to service', async () => {
  const service = {
    delete: jest.fn().mockResolvedValue(true),
  };

  const controller = new BaseController(service);
  const handler = controller.handleRequest('delete');

  await handler({ params: { id: 1 } }, {}, jest.fn());

  expect(service.delete).toHaveBeenCalledWith(1);
});
it('delegates findById to service', async () => {
  const service = {
    findById: jest.fn().mockResolvedValue({ id: 1 }),
  };

  const controller = new BaseController(service);
  const handler = controller.handleRequest('findById');

  await handler({ params: { id: 1 } }, {}, jest.fn());

  expect(service.findById).toHaveBeenCalledWith(1);
});
});
