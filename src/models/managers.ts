import mongoose, { Document, Schema } from 'mongoose';

interface IProjectManager extends Document {
  name: string;
  email: string;
}

const ProjectManagerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const ProjectManager = mongoose.model<IProjectManager>('ProjectManager', ProjectManagerSchema);
export default ProjectManager;
