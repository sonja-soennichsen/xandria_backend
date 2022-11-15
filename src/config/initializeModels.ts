const { OGM } = require("@neo4j/graphql-ogm")
import { typeDefs } from "../model/index"

export function initializeModels(driver: any) {
  const ogm = new OGM({ typeDefs, driver })
  ogm.init()
  const User = ogm.model("User")
  const Resource = ogm.model("Resource")
  const Tag = ogm.model("Tag")
  const Comment = ogm.model("Comment")
  const Note = ogm.model("Note")

  return { User, Resource, Tag, Comment, Note }
}
