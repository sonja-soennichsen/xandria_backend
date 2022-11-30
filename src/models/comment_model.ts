const { OGM } = require("@neo4j/graphql-ogm")
import { driver } from "../index"
import { typeDefs } from "../type_defs/index"
import { CreateInput, UpdateInput } from "../config/static"

export class CommentModel extends OGM {
  constructor() {
    super({ typeDefs, driver })
    this.Comment = this.intializeComment()
  }
  intializeComment() {
    this.init()
    return this.model("Comment")
  }

  async create(query: CreateInput) {
    return this.Comment.create(query)
  }

  async update(query: UpdateInput) {
    return this.Comment.update(query)
  }

  async delete(query: UpdateInput) {
    return this.Comment.delete(query)
  }

  async find(query: any) {
    return this.Comment.find(query)
  }
}
