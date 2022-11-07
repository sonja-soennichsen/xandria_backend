import resources from "./resources"
import user from "./user"
import comment from "./comment"
import note from "./note"
import tag from "./tag"
import bookmarks from "./bookmarks"

export default {
  Mutation: {
    ...resources,
    ...user,
    ...comment,
    ...note,
    ...tag,
    ...bookmarks,
  },
}
