
export const markSubTaskDone = async() => {
  try {

  } catch (error: any) {
    return res.status(200).json(message: `Could not mark the subtask as marked ${error.message}`)
  }
}
