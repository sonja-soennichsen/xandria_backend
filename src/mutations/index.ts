import resources from "./resources"
import auth from "./auth"

export default {
  Mutation: {
    ...resources,
    ...auth,
  },
}
