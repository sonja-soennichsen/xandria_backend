import { Resource, User } from "../index"

export async function add_tag_to_resouce(tag: String, url: String) {
  await Resource.update({
    connectOrCreate: {
      tags: [
        {
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
        },
      ],
    },
    where: {
      url: url,
    },
  })
}

export async function find_user(username: String) {
  return await User.find({
    where: {
      username: username,
    },
  })
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
