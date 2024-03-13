import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ProjectManager from "../models/managers";

interface ProjectManagerBody {
  name: string;
  email: string;
}

export const createProjectManager = async (
  req: Request<{}, {}, ProjectManagerBody>,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { name, email } = req.body;
    let projectManager = new ProjectManager({ name, email });
    await projectManager.save();
    res.json(projectManager);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const listProjectManagers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectManagers = await ProjectManager.find();
    res.json(projectManagers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const findProjectManagerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const projectManager = await ProjectManager.findById(req.params.id);
    if (!projectManager) {
      res.status(404).json({ msg: "Project Manager not found" });
      return;
    }
    res.json(projectManager);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
