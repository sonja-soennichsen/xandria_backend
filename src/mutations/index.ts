import resources from "./resources"
import auth from "./auth"
import user from "./user"

export default {
  Mutation: {
    ...resources,
    ...auth,
  },
}
