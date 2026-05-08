export type taskType = {
  brain_dump_id: string;
  user_id: string;
  title: string;
  task_type: string | null;
  deadline: Date | null;
  estimated_duration_minutes: number | null;
  priority_score: Decimal | null;
  recommended_time_minutes: number | null;
  status: string | null;
};

export type subTasksType = {
  id: string;
  task_id: string;
  title: string;
  estimated_duration_minutes: number | null;
  status: string | null;
  created_at: Date | null;
}[];

export type fixedConstraintsType = {
  title: string;
  start_time: string;
  end_time: string;
}[];

export type freeSlotsType = {
  start_time: string;
  end_time: string;
}[];

export type GeminiSubtaskResponse = {
  tasks: {
    task_id: string;
    priority_score: number;
    subtasks: {
      title: string;
      estimated_duration_minutes: number;
    }[];
  }[];
};

export type TaskPriorityType = {
  taskId: string;
  priority: number;
}[];
