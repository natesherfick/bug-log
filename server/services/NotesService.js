import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class NotesService {
  async getAll() {
    return await dbContext.Notes.find().populate("creator", "name picture")
  }

  async getById(id) {
    let data = await dbContext.Notes.findOne({ _id: id})
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Notes.create(rawData)
    return data
  }

  async edit(id, update) {
    let data = await dbContext.Notes.findOneAndUpdate({ _id: id}, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Notes.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }
  
  //BUG IS JUST AN OBJECT ID, NOT THE WHOLE OBJECT!!
  async getNotesByBugId(bugId) {
    let data = await dbContext.Notes.find({ bug: bugId })
    if (!data) {
      throw new BadRequest("Invalid List ID or you do not own this list")
    }
    return data
  }
}


export const notesService = new NotesService()