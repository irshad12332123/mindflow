export const verifyFields = (email: unknown, password: unknown): boolean => {
if (typeof email !== "string" || typeof password !== "string") return false;
 if (
   email === "" ||
   password === "" ||
   !email.includes("@")
 ) return false;
   return true;
 };
