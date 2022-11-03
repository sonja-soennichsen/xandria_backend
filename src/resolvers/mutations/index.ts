import resources from "./resources"
import user from "./user"
import comment from "./comment"
import note from "./note"
import tag from "./tag"

export default {
  Mutation: {
    ...resources,
    ...user,
    ...comment,
    ...note,
    ...tag,
  },
}
