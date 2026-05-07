export const cleanResponse = (response: string) => {
  const cleanResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanResponse);
};
