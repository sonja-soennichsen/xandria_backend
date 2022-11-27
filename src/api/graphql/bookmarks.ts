import { User, Resource } from "../../index"
import { check_auth, check_resource_exists } from "../../utils/check"
import { fetch_scraper } from "../../utils/fetch_scraper"
import { resource_by_id, resource_by_url } from "../../utils/find"
import { add_tag_to_resouce, make_bookmark } from "../../utils/mutation_utils"
var sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl

const makeBookmark = async (
  _source: any,
  { resourceId, userAddedTags }: any,
  context: any
) => {
  try {
    check_auth(context)
    const [resource] = await resource_by_id(resourceId)
    await make_bookmark(context.currentUser.id, resource[0].url, userAddedTags)

    return true
  } catch (e) {
    return e
  }
}

const removeBookmark = async (
  _source: any,
  { resourceId }: any,
  context: any
) => {
  try {
    check_auth(context)
    await check_resource_exists(resourceId)

    await User.update({
      where: {
        id: context.currentUser.id,
      },
      disconnect: {
        bookmarks: [
          {
            where: {
              node: {
                id: resourceId,
              },
            },
          },
        ],
      },
    })

    return true
  } catch (e) {
    return e
  }
}

const makeBookmarkFromUrl = async (
  _source: any,
  { resourceUrl }: any,
  context: any
) => {
  try {
    check_auth(context)
    const sanitized_url = sanitizeUrl(resourceUrl)
    const [existing] = await resource_by_url(sanitizeUrl)

    if (existing) {
      await make_bookmark(context.currentUser.id, sanitizeUrl)
    } else {
      const content = await fetch_scraper(sanitized_url)

      await User.update({
        where: {
          id: context.currentUser.id,
        },
        connectOrCreate: {
          bookmarks: [
            {
              where: {
                node: {
                  url: sanitized_url,
                },
              },
              onCreate: {
                node: {
                  headline: content["headline"],
                  description: content["description"],
                  url: content["url"],
                  imageURL: content["imageURL"],
                  rootSite: content["rootSite"],
                  author: content["author"],
                },
                edge: {
                  userAddedTags: [],
                },
              },
            },
          ],
        },
      })

      content["tags"].map(async (tag: string) => {
        await add_tag_to_resouce(tag, sanitized_url)
      })
    }

    return true
  } catch (e) {
    return e
  }
}

export default {
  makeBookmarkFromUrl,
  makeBookmark,
  removeBookmark,
}
