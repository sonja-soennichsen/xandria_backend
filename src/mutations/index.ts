import resources from "./resources"
import auth from "./auth"
import user from "./user"
import comment from "./comment"

export default {
  Mutation: {
    ...resources,
    ...auth,
    ...user,
    ...comment,
  },
}