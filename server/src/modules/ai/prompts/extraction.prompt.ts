export const extractTasksPrompt = (rawText: string) => {
  return `You are an AI productivity planner.

Extract tasks from this user input:
"${rawText}"

Return ONLY valid JSON in this format:
{
  "tasks": [
    {
      "title": "",
      "task_type": "",
      "deadline": "",
      "estimated_duration_minutes": 0,
      "importance_score": 0
    }
  ],

  IMPORTANT instructions:
  1. tasks type should be one of {
    -- deadline_task,
    -- long_term,
    -- recurring,
    -- essential,
    -- flexible
    }

    2. Normalize the important score in [0, 10] where 0 is least important and 10 is most important. Consider the urgency and importance of the task while assigning the score.

    3. deadline should be calculated in such as :
        if user specified a deadline please return as it is(should be logical, not time < curret Time) should be in postgres TIMESTAMP [Expected ISO-8601 DateTime.]
  `;
};
