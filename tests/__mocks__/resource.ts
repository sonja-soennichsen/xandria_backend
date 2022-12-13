import { ScraperData } from "../../src/config/static"

export const scraperData: ScraperData = {
  headline: "Test Healdine",
  description: "This is a descrption",
  url: "example.de",
  imageURL: "image.de",
  rootSite: "example.de",
  author: "John Doe",
  tags: ["Tag"],
}

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

export const resourceInputScraper = {
  resourceUrl: "https://en.wikipedia.org/wiki/Brazil",
}

export const addResourceQueryScraper = `mutation Mutation($resourceUrl: String!) {
    makeBookmarkFromUrl(resourceUrl: $resourceUrl)
  }`

export const resourceQuery = `query Query {
    resources {
      headline
      description
      url
    }
  }`
