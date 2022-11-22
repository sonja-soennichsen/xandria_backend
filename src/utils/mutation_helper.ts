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
              name: tag,
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
