import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BugsService {
  async getAll() {
    return await dbContext.Bugs.find().populate("creator", "name picture")
  }

  async getById(id) {
    let data = await dbContext.Bugs.findOne({ _id: id})
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Bugs.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
  
  //BUG IS JUST AN OBJECT ID, NOT THE WHOLE OBJECT!!
  async getNotesByBugId(bug) {
    let data = await dbContext.Notes.find({ boardId: bug })
    if (!data) {
      throw new BadRequest("Invalid List ID or you do not own this list")
    }
    return data
  }
}


export const bugsService = new BugsService()