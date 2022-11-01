# xandria-BE

Deployment: [https://xandria-2jytui6ygq-ey.a.run.app](https://xandria-2jytui6ygq-ey.a.run.app)

## Development

```bash
npm install
npm run dev
```

## Build and start

```bash
npm run start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Testing

```bash
npm run test
```

# GraphQL API Reference

## Mutations

CREATE, UPDATE, DELETE Operations

### Sign-Up

```
mutation SignUp($username: String!, $password: String!, $name: String!, $email: String!) {
  signUp(username: $username, password: $password, name: $name, email: $email)
}
```

### Login

```
mutation Mutation($username: String!, $password: String!) {
signIn(username: $username, password: $password)
}
```

### Make Bookmark

Makes a bookmark for the user sending the request (getting user id out of JWT)

```
mutation MakeBookmark($resourceUrl: String!) {
makeBookmark(resourceURL: $resourceUrl)
}
{
"resourceUrl": resource url
}

```

### Add Comment

Makes a comment from the currently logged in user for the selected resource

```mutation Mutation($resourceUrl: String!, $text: String!) {
  addComment(resourceURL: $resourceUrl, text: $text)
}
{
  "resourceUrl": resourceUrl,
  "text": text
}
```

### Add Note

Makes a note from the currently logged in user for the selected resource

```
mutation AddNote($resourceUrl: String!, $text: String!) {
  addNote(resourceURL: $resourceUrl, text: $text)
}
{
  "resourceUrl": null,
  "text": null
}
```

### Add existing Tag to Resource

```
mutation AddTagToResource($resourceUrl: String, $tagName: String) {
  addTagToResource(resourceURL: $resourceUrl, tagName: $tagName)
}
{
  "resourceUrl": "resourceUrl",
  "tagName": "tagName"
}
```

### Add Resource

```
mutation AddResource($headline: String!, $description: String!, $url: String!, $imageUrl: String!, $rootSite: String!, $author: String!, $tags: String!)
{
  addResource(headline: $headline, description: $description, url: $url, imageURL: $imageUrl, rootSite: $rootSite, author: $author, tags: $tags)
}
{
  "headline": null,
  "description": null,
  "url": null,
  "imageUrl": null,
  "rootSite": null,
  "author": null,
  "tags": null
}
```

## Query

### Get User

- Returns user that is currently logged in with a valid JWT
- Fields can be selected upon what is needed
- Salt and password marked as private and cannot be queried

```
query Me {
  me {
    id
    username
    name
    role
    createdAt
    email
    updatedAt
    bookmarks {
      id
      headline
    }
    comments {
      id
      text
      createdAt
      updatedAt
      resource {
        url
        id
        headline
      }
      author {
        username
        name
      }
    }
    notes {
      text
      createdAt
      resource {
        id
      }
      author {
        username
      }
    }
  }

}
```

### get all resource by tag

```
query GetResourcesByTag($tagName: String!) {
  getResourcesByTag(tagName: $tagName) {
    id
    description
    headline
    ... or any other information needed
  }
}

{
  "tagName": tagname
}
```
