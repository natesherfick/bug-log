import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { notesService } from '../services/NotesService'



//PUBLIC
export class NotesController extends BaseController {
  constructor() {
    super("api/notes")
    this.router
    .use(auth0provider.getAuthorizedUserInfo)
    .get('', this.getAll)
    .get('/:id', this.getById)
    .get('/:id/notes', this.getNotesByBugId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }


  async getAll(req, res, next) {
    try {
      let data = await notesService.getAll()
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await notesService.getById(req.params.id)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getNotesByBugId(req, res, next) {
    try {
      let data = await notesService.getNotesByBugId(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await notesService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await notesService.edit(req.params.id, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await notesService.delete(req.params.id)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}