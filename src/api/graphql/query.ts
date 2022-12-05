import { Resource } from "../../index"
import { check_auth } from "../../utils/check"

const resourceQuery = async (parent: any, args: any, context: any) => {
  const selectionSet = `
    {
        id
        url
    }
`
  Resource.selectionSet = selectionSet
  const resources = await Resource.find({ selectionSet })
  return resources
}

export default {
  resourceQuery,
}
