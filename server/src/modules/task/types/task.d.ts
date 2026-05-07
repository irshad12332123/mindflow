export type taskType = {
  brain_dump_id: string;
  user_id: string;
  title: string;
  task_type: string;
  deadline: string | null;
  estimated_duration_minutes: number | null;
  priority_score: number | null;
  recommended_time_minutes: number | null;
  status: string;
};

export type subTaskType = {
  id: string;
  task_id: string;
  title: string;
  estimated_duration_minutes: number;
  status: string;
};
