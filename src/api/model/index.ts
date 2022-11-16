import { base_model } from "./base_model"
import { auth_rules } from "./auth_rules"
import { mutations } from "./mutations"
import { queries } from "./queries"

export const typeDefs = [base_model, auth_rules, mutations, queries]
