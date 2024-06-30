import mongoose, { Document, Schema, Types } from "mongoose";

export type OnetimeTaskListDBType = Document & {
  taskIds: Array<Types.ObjectId>;
};

const OnetimeTaskListSchema: Schema = new mongoose.Schema(
  {
    taskIds: {
      type: [
        {
          type: Types.ObjectId,
          ref: "OnetimeTask",
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const OnetimeTaskListModel =
  mongoose.models.OnetimeTaskList ||
  mongoose.model<OnetimeTaskListDBType>(
    "OnetimeTaskList",
    OnetimeTaskListSchema,
  );
export default OnetimeTaskListModel;
