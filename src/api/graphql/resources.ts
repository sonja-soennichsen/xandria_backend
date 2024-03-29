import { Resource } from "../../index"
import { check_auth } from "../../utils/check"
import { get_tag_query } from "../../utils/mutation_utils"
var sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl

const addResource = async (
  _source: any,
  {
    headline,
    description,
    url,
    imageURL,
    rootSite,
    author,
    tags,
    userAddedTags,
  }: any,
  context: any
) => {
  check_auth(context)
  const sanitized_url = sanitizeUrl(url)

  try {
    await Resource.not_double(sanitized_url)
    await Resource.create({
      input: [
        {
          headline,
          description,
          url: sanitized_url,
          imageURL,
          rootSite,
          author,
          tags: {
            connectOrCreate: {
              where: { node: { name: tags } },
              onCreate: {
                node: {
                  name: tags,
                },
                edge: {
                  name: tags.toLowerCase(),
                },
              },
            },
          },
          userAddedTags,
          counter: 0,
          upvotes: 0,
          downvotes: 0,
        },
      ],
    })
    return true
  } catch (e) {
    return e
  }
}

const addTagToResource = async (
  _source: any,
  { resourceId, tags }: any,
  context: any
) => {
  try {
    check_auth(context)
    const resource = await Resource.find_by_id(resourceId)

    const tagQuery = get_tag_query(tags, resource[0].url)
    await Resource.update(tagQuery)

    return true
  } catch (e) {
    return e
  }
}

export default {
  addResource,
  addTagToResource,
}
