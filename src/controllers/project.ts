import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Project from "../models/project";
import ProjectManager from "../models/managers";
import { notifyWebhooks } from "../utils/webhookNotifier";

export const listProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  let query: any = {};
  if (req.query.current === "true") {
    query.endDate = { $gte: new Date() };
  }

  try {
    const count = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate("projectManager")
      .exec();
    res.json({ projects, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { name, description, startDate, endDate, projectManagerId } = req.body;

  try {
    if (projectManagerId) {
      const projectManager = await ProjectManager.findById(projectManagerId);
      if (!projectManager) {
        res.status(404).json({ msg: "Project Manager not found" });
        return;
      }
    }
    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      projectManager: projectManagerId,
    });
    await project.save();
    res.json(project);
    notifyWebhooks("projectCreated", project);
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getProjectDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const project = await Project.findById(req.params.id).populate(
      "projectManager"
    );
    if (!project) {
      res.status(404).json({ msg: "Project not found" });
      return;
    }
    res.json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { name, description, startDate, endDate, projectManagerId } = req.body;

  try {
    const projectFields: any = { name, description, startDate, endDate };
    if (projectManagerId) {
      const projectManager = await ProjectManager.findById(projectManagerId);
      if (!projectManager) {
        res.status(404).json({ msg: "Project Manager not found" });
        return;
      }
      projectFields.projectManager = projectManagerId;
    }
    let project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ msg: "Project not found" });
      return;
    }
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    ).populate("projectManager");
    notifyWebhooks("projectUpdated", project);
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const assignProjectManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { projectManagerId } = req.body;

  try {
    const projectManager = await ProjectManager.findById(projectManagerId);
    if (!projectManager) {
      res.status(404).json({ msg: "Project Manager not found" });
      return;
    }
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ msg: "Project not found" });
      return;
    }
    project.projectManager = projectManagerId;
    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
