import resources from "./resources"
import users from "./users"

export default {
  Mutation: {
    ...resources,
    ...users,
  },
}
