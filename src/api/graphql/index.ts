import user from "./user"
import resources from "./resources"
import note from "./note"
import bookmarks from "./bookmarks"
import comment from "./comment"
import tag from "./tag"
import query from "./query"

export default {
  Mutation: {
    ...resources,
    ...user,
    ...comment,
    ...note,
    ...tag,
    ...bookmarks,
  },
  Query: {
    ...query,
  },
}
