const { OGM } = require("@neo4j/graphql-ogm")
import { driver } from "../index"
import { typeDefs } from "../type_defs/index"
import { CreateInput, UpdateInput } from "../config/static"

export class UserModel extends OGM {
  constructor() {
    super({ typeDefs, driver })
    this.User = this.initialize_user()
  }
  initialize_user() {
    this.init()
    return this.model("User")
  }

  async find_by_id(id: string) {
    return await this.User.find({
      where: { id },
    })
  }

  async find_by_username(username: String) {
    return await this.User.find({
      where: { username: username },
    })
  }

  async create(query: CreateInput) {
    return this.User.create(query)
  }

  async update(query: UpdateInput) {
    return this.User.update(query)
  }

  async find(query: any) {
    return this.User.find(query)
  }
}
