const { OGM } = require("@neo4j/graphql-ogm")
import { driver } from "../index"
import { typeDefs } from "../type_defs/index"
import { CreateInput, UpdateInput } from "../config/static"

export class NoteModel extends OGM {
  constructor() {
    super({ typeDefs, driver })
    this.Note = this.intializeNote()
  }
  intializeNote() {
    this.init()
    return this.model("Note")
  }

  async create(query: CreateInput) {
    return this.Note.create(query)
  }

  async update(query: UpdateInput) {
    return this.Note.update(query)
  }

  async delete(query: UpdateInput) {
    return this.Note.delete(query)
  }
}
