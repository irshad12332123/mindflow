import {
  fixedConstraintsType,
  freeSlotsType,
  taskType,
} from "../../task/types/task";

export const subTaskPrompt = (
  tasks: taskType[],
  fixedConstraints: fixedConstraintsType,
  freeSlots: freeSlotsType,
) => {
  return `
You are an intelligent task decomposition and prioritization engine.

Your responsibilities:

1. Break high-level tasks into actionable subtasks
2. Assign a priority score to EACH parent task
3. Use available free time and user constraints while prioritizing

IMPORTANT RULES:

1. Preserve the exact task_id from input.
2. Return the same task_id for each corresponding task.

3. Create subtasks for meaningful tasks such as:
- exams
- assignments
- DSA practice
- projects
- interview preparation
- learning goals
- deadlines
- personal goals

These are examples, not strict limitations.

4. Do NOT create subtasks for:
- sleep
- eating
- relaxing
- commuting
- fixed daily activities

For these tasks:
return an empty subtasks array.

5. Each subtask must:
- be actionable
- realistic
- small enough to complete
- collectively match the parent task duration approximately

6. Assign priority_score between 0 and 10:

0 → least urgent/important
10 → most urgent/important

While assigning priority consider:

- task deadline
- urgency
- long-term importance
- available free time
- existing fixed commitments
- user workload

7. DO NOT generate schedules or time blocks.
Scheduling will be handled separately.

8. Return ONLY valid JSON.
Do NOT return markdown.
Do NOT return explanations.

-----------------------------------
INPUT TASKS:
${JSON.stringify(tasks, null, 2)}

-----------------------------------
USER FIXED CONSTRAINTS:
${JSON.stringify(fixedConstraints, null, 2)}

-----------------------------------
AVAILABLE FREE SLOTS:
${JSON.stringify(freeSlots, null, 2)}

-----------------------------------

Return STRICTLY in this format:

{
  "tasks": [
    {
      "task_id": "uuid_here",
      "priority_score": 8,
      "subtasks": [
        {
          "title": "Subtask title",
          "estimated_duration_minutes": 60
        }
      ]
    }
  ]
}
`;
};
