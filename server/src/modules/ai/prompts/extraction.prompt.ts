export const extractTasksPrompt = (rawText: string) => {
  return `
You are an AI productivity planning assistant.

Analyze the user's brain dump and extract:

1. Tasks
2. Deadlines
3. Fixed commitments
4. Available free slots
5. Mental load summary

USER INPUT:
"${rawText}"

IMPORTANT RULES:

1. task_type must be one of:
- deadline_task
- long_term
- recurring
- essential
- flexible

2. If user explicitly mentions a deadline:
Convert it into valid ISO-8601 datetime format.

Example:
"exam tomorrow"
→ "2026-05-09T00:00:00Z"

If no deadline exists:
return null

3. If user mentions fixed commitments like:
- college
- office
- gym
- commute
- meetings

Extract them.

4. Calculate available free slots:

If user mentions fixed schedule:
subtract those hours.

If user doesn't mention schedule:
assume:
- 7 hours sleep
- 4 hours daily life tasks

Then generate free slots.

5. Return ONLY valid JSON.
Do not return explanation.
Do not return markdown.

Return format:

{
  "tasks": [
    {
      "title": "",
      "task_type": "",
      "deadline": null,
      "estimated_duration_minutes": 0
    }
  ],
  
  "fixed_commitments": [
    {
      "title": "",
      "start_time": "",
      "end_time": ""
    }
  ],

  "free_slots": [
    {
      "start_time": "",
      "end_time": ""
    }
  ],
}
`;
};
