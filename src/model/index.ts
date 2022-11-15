import { baseModel } from "./baseModel"
import { authRules } from "./authRules"
import { mutations } from "./mutations"
import { queries } from "./queries"

export const typeDefs = [baseModel, authRules, mutations, queries]
