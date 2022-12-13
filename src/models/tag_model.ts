const { OGM } = require("@neo4j/graphql-ogm")
import { driver } from "../index"
import { typeDefs } from "../type_defs/index"
import { CreateInput, UpdateInput } from "../config/static"

export class TagModel extends OGM {
  constructor() {
    super({ typeDefs, driver })
    this.Tag = this.intialize_tag()
  }
  intialize_tag() {
    this.init()
    return this.model("Tag")
  }

  async create(query: CreateInput) {
    return this.Tag.create(query)
  }

  async update(query: UpdateInput) {
    return this.Tag.update(query)
  }

  async find(query: any) {
    return this.Tag.find(query)
  }
}
