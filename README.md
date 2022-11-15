# Xandria

Xandria is a collaborative search engine and bookmarking tool. Users can bookmark a website with a browser extension that imports the link and additional information about it to the platform to make the resource discoverable for other users, which also have the ability to bookmark it for themselves. A Resource is considered anything that people find worth bookmarking such as Articles, Tutorials, Videos, Online Courses etc. They are discoverable in the form of a visual hypergraph, sorted into different “bubbles” according to their tags/topics, which are assigned when importing the resource, but which users can also add on their own. On the platform resources are represented as nodes in the graph and, when clicked, display a short description, a picture, additional information and a link to the website. The information is imported alongside the resources and gathered by a distributed scraper which is triggered by the browser extension. Users are able to write private notes and public comments on the resource.

## High-Level Backend Architecture

[Dataflow](https://lucid.app/lucidchart/b166b3cb-8b14-48f0-ba71-6757a1814617/edit?viewport_loc=362%2C132%2C1363%2C765%2C0_0&invitationId=inv_e5425ce7-ba1f-4c8a-94e3-1af7d14eb1b9)

## Deployed Version

[https://xandria-2jytui6ygq-ey.a.run.app](https://xandria-2jytui6ygq-ey.a.run.app)

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
npm run dev-test
```

# Datamodel

All types can be viewed in detail in the Apollo GraphQL Studio, when opening up the local development environment <br>
[Database Model](https://lucid.app/lucidchart/6c38858c-a8c5-4263-8493-dbcbdf3e9218/edit?viewport_loc=-2512%2C-2101%2C6624%2C3717%2C5JU8BlX8iaSE&invitationId=inv_7ebd40b3-085f-452f-a088-37de2821ea27)

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

## Indexes

To improve query performance there are a number of indexes applied

- User by name

```sql
# Query
MATCH (n:User) WHERE n.name = $param

# Index
CREATE INDEX user_index FOR (n:User) ON (n.name)
```

- Resource by name of tag-relationship, url and headline

```sql
# Query
MATCH (n:Resource) - [r:HAS_TAG] - (t:Tag)
WHERE r.name = $param
return n, r, t

# Index
CREATE TEXT INDEX tag_resource_rel FOR ()-[r:HAS_TAG]-() ON (r.name)
CREATE TEXT INDEX resource_url FOR (n:Resource) ON (n.url)
CREATE TEXT INDEX resource_headline FOR (n:Resource) ON (n.headline)
```

- Nodes by label

```sql
CREATE LOOKUP INDEX node_label_lookup_index FOR (n) ON EACH labels(n)#
```

- Relationship by type

```sql
CREATE LOOKUP INDEX rel_type_lookup_index FOR ()-[r]-() ON EACH type(r)
```

<br> <br>

# API Reference

- List of all active endpoints
- Development starts at `http:localhost:4000`

## Auth

REST Endpoints can be accessed via cURL or [Postman](https://www.postman.com/)

### Sign-Up

- POST-Request to `/signup` (Request body following format below)
- Request body following format below
- Respone: JWT and set HTTPOnly Cookie for subsequent request to the GraphQL API

```
{

  "username":String,
  "password": String,
  "name": String,
  "email": String

}
```

### Login

- POST-Request to `/login` (Request body following format below)
- Respone: JWT and set HTTPOnly Cookie for subsequent request to the GraphQL API

```
{
  "username": String,
  "password": String
}
```

### Refresh Token

- `/refresh` when a valid JWT is provided, it sets a new httpOnly cookie with a new token

### Signout

- `/signout` simply deletes the JWT cookie

## GraphQL Mutations

- GraphQL Queries can be sent to `/graphql` including CRUD-Operations and resolvers as listed below
- JWT needs to be provided as Cookie
- Can easily be accessed via the Apollo GraphQL Studio (when deployed locally) on `/graphql`

### Make Bookmark

Makes a bookmark for the user sending the request (getting user id out of JWT)

```
mutation MakeBookmark($resourceUrl: String!) {
makeBookmark(resourceURL: $resourceUrl)
}
{
"resourceUrl": String
}

```

### Make Bookmark and create resource if it doesn't exist yet

```
mutation MakeBookmarkToNewResource($resourceUrl: String!, $headline: String!) {
  makeBookmarkToNewResource(resourceURL: $resourceUrl, headline: $headline)
}
{
  "resourceUrl": String,
  "headline": String
}
```

### Remove Bookmark

```
mutation RemoveBookmark($resourceUrl: String!) {
  removeBookmark(resourceURL: $resourceUrl)
}
{
  "resourceUrl": String
}
```

### Add Comment

Makes a comment from the currently logged in user for the selected resource

```
mutation Mutation($resourceUrl: String!, $text: String!) {
  addComment(resourceURL: $resourceUrl, text: $text)
}
{
  "resourceUrl": String,
  "text": String
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
query GetResourcesByTag($tag: String!) {
  getResourcesByTag(tag: $tag) {
    description
    ... others
  }
}
{
  "tag": String
}
```

### get all resources related to a tag and its related tags

```

query GetResourcesByRelatedTag($tag: String!) {
  getResourcesByRelatedTag(tag: $tag) {
    description
    tags {
      name
    }
  }
}
{
  "tag": String
}
```

### Get Resource by ID

```
query GetResourceByID($resourceId: String!) {
  getResourceByID(resourceID: $resourceId) {
    comments {
      updatedAt
      text
      id
      createdAt
      author {
        name
        id
        username
      }
    }
  }
}
{
  "resourceId": String
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
