const fetch = require("@adobe/node-fetch-retry")

interface ScraperData {
  headline: String
  description: String
  url: String
  imageURL: String
  rootSite: String
  author: String
  tags: [String]
}

export async function fetch_scraper(url: String) {
  const returned = await fetch(
    "https://xandria-scraper-2jytui6ygq-ey.a.run.app",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    },
    {
      retryOptions: {
        retryInitialDelay: 1000,
        forceSocketTimeout: true,
        retryMaxDuration: 300000,
      },
    }
  )
  const content: ScraperData = await returned.json()
  return await content
}