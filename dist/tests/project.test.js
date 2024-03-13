"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectModel = __importStar(require("../models/project")); // Adjust the import according to your project structure
const project_1 = require("../controllers/project");
const sinon_1 = __importDefault(require("sinon"));
describe("ProjectController", () => {
    let mockRequest;
    let mockResponse;
    let responseObject;
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
            json: function (body) {
                this.body = body;
                return this;
            },
            status: function (code) {
                this.statusCode = code;
                return this;
            },
        };
        mockResponse = responseObject;
    });
    afterEach(() => {
        sinon_1.default.restore();
    });
    it("should return a list of projects", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedProjects = {
            page: 1,
            pages: 1,
            projects: [{ id: "1", name: "Test Project" }],
        };
        // Mock the Project.find method
        const findStub = sinon_1.default.stub(ProjectModel.default, "find").returns({
            limit: sinon_1.default.stub().returnsThis(),
            skip: sinon_1.default.stub().returnsThis(),
            populate: sinon_1.default.stub().returnsThis(),
            exec: sinon_1.default.stub().resolves(expectedProjects),
        }); // Use 'as any' to bypass TypeScript's type checking
        sinon_1.default.stub(ProjectModel.default, "countDocuments").resolves(1);
        let data = yield (0, project_1.listProjects)(mockRequest, mockResponse);
        // Assertions
        let resp = mockResponse.body;
        resp = resp.projects;
        expect(JSON.stringify(resp)).toEqual(JSON.stringify(expectedProjects));
        expect(findStub.called).toBeTruthy();
    }));
});
