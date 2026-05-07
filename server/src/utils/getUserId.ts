import supabase from "../lib/supabase";

export const getUserId = async (token: string) => {
  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      throw new Error("Invalid token");
    }
    return data.user.id;
  } catch (error: any) {
    throw new Error(`Authentication failed ${error.message}`);
  }
};
