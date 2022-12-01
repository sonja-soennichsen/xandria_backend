const { OGM } = require("@neo4j/graphql-ogm")
import { driver } from "../index"
import { typeDefs } from "../type_defs/index"
import { CreateInput, UpdateInput } from "../config/static"
import { GraphQLError } from "graphql"

export class ResourceModel extends OGM {
  constructor() {
    super({ typeDefs, driver })
    this.Resource = this.initialize_resource()
  }
  initialize_resource() {
    this.init()
    return this.model("Resource")
  }

  async find_by_id(id: string) {
    return await this.Resource.find({
      where: { id },
    })
  }

  async find_by_url(url: String) {
    return await this.Resource.find({
      where: { url: url },
    })
  }

  async exists(id: string) {
    const exists = await this.find_by_id(id)
    if (!exists) {
      throw new GraphQLError("Wrong ID provided", {
        extensions: {
          code: "The Resource doesn't exist",
          http: {
            status: 404,
          },
        },
      })
    }
  }

  async not_double(url: string) {
    const [exists] = await this.find_by_url(url)
    if (exists) {
      throw new GraphQLError("Resoure already exists", {
        extensions: {
          code: "The id to resource already exists",
          http: {
            status: 404,
          },
        },
      })
    }
  }

  async create(query: CreateInput) {
    return this.Resource.create(query)
  }

  async update(query: UpdateInput) {
    return this.Resource.update(query)
  }

  async find(query: any) {
    return this.Resource.find(query)
  }
}
