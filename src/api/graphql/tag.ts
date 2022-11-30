import { Tag } from "../../index"
import { check_auth } from "../../utils/check"

const relateTag = async (_source: any, { tag1, tag2 }: any, context: any) => {
  try {
    check_auth(context)
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
    return true
  } catch (e) {
    return e
  }
}

export default {
  relateTag,
}
