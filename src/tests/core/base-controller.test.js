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
});
