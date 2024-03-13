import mongoose, { Document, Schema } from 'mongoose';

interface IProject extends Document {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  projectManager: mongoose.Types.ObjectId;
  status: 'active' | 'inactive' | 'completed';
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectManager',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active',
  },
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
