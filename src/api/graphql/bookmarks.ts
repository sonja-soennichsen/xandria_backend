import { User, Resource } from "../../index"
import { check_auth, check_resource_exists } from "../../utils/check"
import { fetch_scraper } from "../../utils/fetch_scraper"
import { resource_by_id, resource_by_url } from "../../utils/find"
import { get_tag_query, make_bookmark } from "../../utils/mutation_utils"
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
    const [existing] = await resource_by_url(sanitized_url)

    if (existing) {
      await make_bookmark(context.currentUser.id, sanitized_url)
    } else {
      try {
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
                    url: sanitized_url,
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

        const tagQuery = get_tag_query(content["tags"], sanitized_url)
        await Resource.update(tagQuery)
      } catch (e) {
        // If scraper doesn't work, make bookmark for user with only the url
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
                    headline: "",
                    description: null,
                    url: sanitized_url,
                    imageURL: null,
                    rootSite: null,
                    author: null,
                  },
                  edge: {
                    userAddedTags: [],
                  },
                },
              },
            ],
          },
        })
        return "Scraper failed - Bookmark created only with URL "
      }
    }

    return "Bookmark successfully created"
  } catch (e) {
    return e
  }
}

export default {
  makeBookmarkFromUrl,
  makeBookmark,
  removeBookmark,
}
