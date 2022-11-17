export const resourceInput = {
  headline: "Test Headline",
  description: "amazing description",
  url: "example.com/image",
  imageUrl: "image.com",
  rootSite: "example.com",
  author: "me",
  tags: "example",
}

export const addResourceQuery = `mutation AddResource($headline: String!, $description: String!, $url: String!, $imageUrl: String!, $rootSite: String!, $author: String!, $tags: String!) {
    addResource(headline: $headline, description: $description, url: $url, imageURL: $imageUrl, rootSite: $rootSite, author: $author, tags: $tags)
  }`

export const resourceQuery = `query Query {
    resources {
      headline
      description
      url
    }
  }`
