import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Task from "../models/task";
import Project from "../models/project";
import { notifyWebhooks } from "../utils/webhookNotifier";

export const listTasks = async (req: Request, res: Response): Promise<void> => {
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  try {
    const count = await Task.countDocuments({ project: req.query.projectId });
    const tasks = await Task.find({ project: req.query.projectId })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .exec();

    res.json({ tasks, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { projectId, title, description, status } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ msg: "Project not found" });
      return;
    }
    const newTask = new Task({
      project: projectId,
      title,
      description,
      status,
    });

    const task = await newTask.save();
    res.json(task);
    notifyWebhooks("taskCreated", task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const editTask = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(task);
    notifyWebhooks("taskUpdated", task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
