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

- `/login` to login (POST-Request)
- `/signup` to sign up (POST-Request)
- `/graphql` to access GraphQL API

## Testing

```bash
npm run test
```

# Datamodel

All types can be viewed in detail in the Apollo GraphQL Studio, when opening up the local development environment

```
 type Resource {
    id: ID!
    headline: String!
    description: String!
    url: String!
    imageURL: String
    rootSite: String!
    tags: [Tag!]! @relationship(direction: OUT, type: "HAS_TAG")
    users: [User!]! @relationship(direction: IN, type: "BOOKMARKED")
    comments: [Comment!]! @relationship(direction: IN, type: "HAS_COMMENT")
    notes: [Note!]! @relationship(direction: IN, type: "HAS_NOTE")
    userAddedTags: [String]
    author: String
    createdAt: DateTime
    updatedAt: DateTime
    upvotes: Int
    downvotes: Int
    counter: Int
  }

  type User {
    id: ID
    username: String!
    password: String  <- can't be queried
    salt: String! <- can't be queried
    name: String!
    role: String!
    email: String!
    createdAt: DateTime
    updatedAt: DateTime
    bookmarks: [Resource!]! @relationship(direction: OUT, type: "BOOKMARKED")
    comments: [Comment!]! @relationship(direction: OUT, type: "WROTE_COMMENT")
    notes: [Note!]! @relationship(direction: OUT, type: "WROTE_NOTE")
  }

  type Tag {
    id: ID
    name: String! @unique
    createdAt: DateTime
    updatedAt: DateTime
    resources: [Resource!]! @relationship(direction: IN, type: "HAS_TAG")
    related: [Tag!]!
      @relationship(
        direction: OUT
        type: "RELATED"
        queryDirection: DEFAULT_UNDIRECTED
      )
  }

  type Collection {
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    collectionTags: [String]
  }

  type Note {
    text: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    resource: [Resource!]! @relationship(direction: OUT, type: "HAS_NOTE")
    author: [User!]! @relationship(direction: IN, type: "WROTE_NOTE")
  }

  type Comment {
    id: ID!
    text: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    resource: [Resource!]! @relationship(direction: OUT, type: "HAS_COMMENT")
    author: [User!]! @relationship(direction: IN, type: "WROTE_COMMENT")
  }
```

# GraphQL API Reference

Can easily be accessed via the Apollo GraphQL Studio

## Auth

### Sign-Up

- POST-Request to `/signup` (Request body following format below)
- Request body following format below
- Respone: JWT and set HTTPOnly Cookie for subsequent request to the GraphQL API

```
{

  "username": "",
  "password": "",
  "name": "",
  "email": ""

}
```

### Login

- POST-Request to `/login` (Request body following format below)
- Respone: JWT and set HTTPOnly Cookie for subsequent request to the GraphQL API

```
{
  "username": "",
  "password": ""
}
```

## Mutations

- CREATE, UPDATE, DELETE Operations to /graphql
- JWT needs to be provided as Cookie

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

### Make Bookmark and create resource if it doesn't exist yet

```
mutation MakeBookmarkToNewResource($resourceUrl: String!, $headline: String!) {
  makeBookmarkToNewResource(resourceURL: $resourceUrl, headline: $headline)
}
{
  "resourceUrl": "something new",
  "headline": "great headline"
}
```

### Add Comment

Makes a comment from the currently logged in user for the selected resource

```
mutation Mutation($resourceUrl: String!, $text: String!) {
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

### Add Tag to Resource

Adds a tag to the selected resource. If the tag doesn't exist, it creates a new one

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

## Relate Tag to another Tag

Relates tag1 to tag2 if tag2 exists, otherwise creates a new one

```
mutation RelateTag($tag1: String!, $tag2: String!) {
  relateTag(tag1: $tag1, tag2: $tag2)
}
{
  "tag1": tagname,
  "tag2": tagname
}
```

### Update Password

- only works for currently logged in user
- checks if old password is correct, only then sets the new password

```
mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
{
  "oldPassword": "new",
  "newPassword": "old"
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

### get all resources related to a tag and its related tags

```

query Tags($where: TagWhere) {
  tags(where: $where) {
    related {
      resources {
        headline
        description
        url
        tags {
          name
        }
      }
    }
    resources {
      headline
      description
      id
      url
      imageURL
    }
  }
}

{
  "where": {
    "name": "wohooo"
  }
}
```

### Get Resource by ID

```
query Query($where: ResourceWhere) {
  resources(where: $where) {
    headline
    description
    id
    url
    rootSite
    imageURL
    ... whatever you need
  }
}
{
  "where": {
    "id": "id
  }
}
```

### Get all tag names

```
query Tags {
  tags {
    name
  }
}
```
