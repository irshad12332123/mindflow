import prisma from "../../lib/prisma";

export const storeRawText = async (text: string, userID: string) => {
  return await prisma.brain_dumps.create({
    data: {
      raw_text: text,
      user_id: userID,
    },
  });
};
