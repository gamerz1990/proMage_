import { Request, Response } from "express";
import * as ProjectModel from "../models/project"; // Adjust the import according to your project structure
import { listProjects } from "../controllers/project";
import sinon from "sinon";
import { jest } from "@jest/globals";

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

  it("should return a list of projects", async () => {
    const expectedProjects = {
      page: 1,
      pages: 1,
      projects: [{ id: "1", name: "Test Project" }],
    };
    // Mock the Project.find method
    const findStub = sinon.stub(ProjectModel.default, "find").returns({
      limit: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      populate: sinon.stub().returnsThis(),
      exec: sinon.stub().resolves(expectedProjects),
    } as any); // Use 'as any' to bypass TypeScript's type checking
    sinon.stub(ProjectModel.default, "countDocuments").resolves(1);

    let data = await listProjects(
      mockRequest as Request,
      mockResponse as Response
    );

    // Assertions
    let resp = (mockResponse as any).body;
    resp = resp.projects;
    expect(JSON.stringify(resp)).toEqual(JSON.stringify(expectedProjects));
    expect(findStub.called).toBeTruthy();
  });
});
