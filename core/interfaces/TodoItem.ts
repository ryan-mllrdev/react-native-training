/* eslint-disable prettier/prettier */
export interface TodoItem {
  id?: number;
  title?: string;
  description?: string;
  completed?: boolean;
  createdOn?: Date;
  updatedOn?: Date | null;
  completedOn?: Date | null;
  expiredOn?: Date | null;
}
