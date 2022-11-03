import { Tag } from "../../index"
import { checkAuth } from "../../helpers/checkAuth"

const relateTag = async (_source: any, { tag1, tag2 }: any, context: any) => {
  checkAuth(context)

  try {
    await Tag.update({
      where: {
        name: tag1,
      },
      connectOrCreate: {
        related: [
          {
            where: {
              node: {
                name: tag2,
              },
            },
            onCreate: {
              node: {
                name: tag2,
              },
            },
          },
        ],
      },
    })
    return "it worked"
  } catch (e) {
    return e
  }
}

export default {
  relateTag,
}
