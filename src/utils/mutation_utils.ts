import { Resource, User } from "../index"
import { tagInterface } from "../config/static"

export function get_tag_query(tags: [String], url: String) {
  var tagList: tagInterface[] = []

  tags.map((tag: string) => {
    var temp: tagInterface = {
      where: {
        node: {
          name: tag,
        },
      },
      onCreate: {
        node: {
          name: tag,
        },
        edge: {
          name: tag.toLowerCase(),
        },
      },
    }
    tagList.push(temp)
  })

  const tagQuery = {
    connectOrCreate: {
      tags: tagList,
    },
    where: {
      url: url,
    },
  }
  return tagQuery
}

export async function make_bookmark(
  id: String,
  url: String,
  userAddedTags?: String[]
) {
  try {
    await User.update({
      where: {
        id: id,
      },
      update: {
        bookmarks: [
          {
            connect: [
              {
                where: {
                  node: {
                    url: url,
                  },
                },
                edge: {
                  userAddedTags: userAddedTags ? userAddedTags : [],
                },
              },
            ],
          },
        ],
      },
    })

    return
  } catch (e) {
    return e
  }
}
