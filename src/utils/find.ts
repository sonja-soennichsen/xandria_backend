import { Resource, User } from "../index"

export async function user_by_username(username: String) {
  return await User.find({
    where: { username: username },
  })
}

export async function user_by_id(id: String) {
  return await User.find({
    where: { id: id },
  })
}

export async function resource_by_id(id: String) {
  return await Resource.find({
    where: { id: id },
  })
}

export async function resource_by_url(url: String) {
  return await Resource.find({
    where: { url: url },
  })
}
