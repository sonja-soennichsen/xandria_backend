import resources from "./resources"
import auth from "./auth"
import user from "./user"
import comment from "./comment"
import note from "./note"
import tag from "./tag"

export default {
  Mutation: {
    ...resources,
    ...auth,
    ...user,
    ...comment,
    ...note,
    ...tag,
  },
}
