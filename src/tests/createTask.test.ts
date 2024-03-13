import { Request, Response } from "express";
import * as taskModel from "../models/task";
import { listTasks } from "../controllers/task";
import sinon from "sinon";

describe("ProjectController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: { statusCode: number; body?: any; [key: string]: any };

  beforeEach(() => {
    mockRequest = {
      query: {
        page: "1",
        pageSize: "10",
      },
    };

    responseObject = {
      statusCode: 0,
      body: null,
      json: function (this: any, body: any) {
        this.body = body;
        return this;
      },
      status: function (this: any, code: number) {
        this.statusCode = code;
        return this;
      },
    };

    mockResponse = responseObject;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return a list of tasks", async () => {
    const expectedTasks = {
      page: 1,
      pages: 1,
      tasks: [{ id: "1", name: "Test Task" }],
    };

    const findStub = sinon.stub(taskModel.default, "find").returns({
      limit: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      populate: sinon.stub().returnsThis(),
      exec: sinon.stub().resolves(expectedTasks),
    } as any);
    sinon.stub(taskModel.default, "countDocuments").resolves(1);

    let data = await listTasks(
      mockRequest as Request,
      mockResponse as Response
    );

    // Assertions
    let resp = (mockResponse as any).body;
    resp = resp.tasks;
    expect(JSON.stringify(resp)).toEqual(JSON.stringify(expectedTasks));
    expect(findStub.called).toBeTruthy();
  });
});
