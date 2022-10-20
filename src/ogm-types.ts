import type { SelectionSetNode, DocumentNode } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date and time, represented as an ISO-8601 string */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  resources: Array<Resource>;
  resourcesAggregate: ResourceAggregateSelection;
  resourcesConnection: ResourcesConnection;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
  tags: Array<Tag>;
  tagsAggregate: TagAggregateSelection;
  tagsConnection: TagsConnection;
  collections: Array<Collection>;
  collectionsAggregate: CollectionAggregateSelection;
  collectionsConnection: CollectionsConnection;
  bookmarks: Array<Bookmark>;
  bookmarksAggregate: BookmarkAggregateSelection;
  bookmarksConnection: BookmarksConnection;
  notes: Array<Note>;
  notesAggregate: NoteAggregateSelection;
  notesConnection: NotesConnection;
  comments: Array<Comment>;
  commentsAggregate: CommentAggregateSelection;
  commentsConnection: CommentsConnection;
};

export type QueryResourcesArgs = {
  where?: InputMaybe<ResourceWhere>;
  options?: InputMaybe<ResourceOptions>;
};

export type QueryResourcesAggregateArgs = {
  where?: InputMaybe<ResourceWhere>;
};

export type QueryResourcesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<ResourceWhere>;
  sort?: InputMaybe<Array<InputMaybe<ResourceSort>>>;
};

export type QueryUsersArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
};

export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};

export type QueryUsersConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<UserWhere>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
};

export type QueryTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
};

export type QueryTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
};

export type QueryTagsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<TagWhere>;
  sort?: InputMaybe<Array<InputMaybe<TagSort>>>;
};

export type QueryCollectionsArgs = {
  where?: InputMaybe<CollectionWhere>;
  options?: InputMaybe<CollectionOptions>;
};

export type QueryCollectionsAggregateArgs = {
  where?: InputMaybe<CollectionWhere>;
};

export type QueryCollectionsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<CollectionWhere>;
  sort?: InputMaybe<Array<InputMaybe<CollectionSort>>>;
};

export type QueryBookmarksArgs = {
  where?: InputMaybe<BookmarkWhere>;
  options?: InputMaybe<BookmarkOptions>;
};

export type QueryBookmarksAggregateArgs = {
  where?: InputMaybe<BookmarkWhere>;
};

export type QueryBookmarksConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<BookmarkWhere>;
  sort?: InputMaybe<Array<InputMaybe<BookmarkSort>>>;
};

export type QueryNotesArgs = {
  where?: InputMaybe<NoteWhere>;
  options?: InputMaybe<NoteOptions>;
};

export type QueryNotesAggregateArgs = {
  where?: InputMaybe<NoteWhere>;
};

export type QueryNotesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<NoteWhere>;
  sort?: InputMaybe<Array<InputMaybe<NoteSort>>>;
};

export type QueryCommentsArgs = {
  where?: InputMaybe<CommentWhere>;
  options?: InputMaybe<CommentOptions>;
};

export type QueryCommentsAggregateArgs = {
  where?: InputMaybe<CommentWhere>;
};

export type QueryCommentsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<CommentWhere>;
  sort?: InputMaybe<Array<InputMaybe<CommentSort>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  signUp: Scalars["String"];
  signIn: Scalars["String"];
  createResources: CreateResourcesMutationResponse;
  deleteResources: DeleteInfo;
  updateResources: UpdateResourcesMutationResponse;
  createUsers: CreateUsersMutationResponse;
  deleteUsers: DeleteInfo;
  updateUsers: UpdateUsersMutationResponse;
  createTags: CreateTagsMutationResponse;
  deleteTags: DeleteInfo;
  updateTags: UpdateTagsMutationResponse;
  createCollections: CreateCollectionsMutationResponse;
  deleteCollections: DeleteInfo;
  updateCollections: UpdateCollectionsMutationResponse;
  createBookmarks: CreateBookmarksMutationResponse;
  deleteBookmarks: DeleteInfo;
  updateBookmarks: UpdateBookmarksMutationResponse;
  createNotes: CreateNotesMutationResponse;
  deleteNotes: DeleteInfo;
  updateNotes: UpdateNotesMutationResponse;
  createComments: CreateCommentsMutationResponse;
  deleteComments: DeleteInfo;
  updateComments: UpdateCommentsMutationResponse;
};

export type MutationSignUpArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
  email: Scalars["String"];
};

export type MutationSignInArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateResourcesArgs = {
  input: Array<ResourceCreateInput>;
};

export type MutationDeleteResourcesArgs = {
  where?: InputMaybe<ResourceWhere>;
};

export type MutationUpdateResourcesArgs = {
  where?: InputMaybe<ResourceWhere>;
  update?: InputMaybe<ResourceUpdateInput>;
};

export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};

export type MutationDeleteUsersArgs = {
  where?: InputMaybe<UserWhere>;
};

export type MutationUpdateUsersArgs = {
  where?: InputMaybe<UserWhere>;
  update?: InputMaybe<UserUpdateInput>;
};

export type MutationCreateTagsArgs = {
  input: Array<TagCreateInput>;
};

export type MutationDeleteTagsArgs = {
  where?: InputMaybe<TagWhere>;
  delete?: InputMaybe<TagDeleteInput>;
};

export type MutationUpdateTagsArgs = {
  where?: InputMaybe<TagWhere>;
  update?: InputMaybe<TagUpdateInput>;
  connect?: InputMaybe<TagConnectInput>;
  disconnect?: InputMaybe<TagDisconnectInput>;
  create?: InputMaybe<TagRelationInput>;
  delete?: InputMaybe<TagDeleteInput>;
};

export type MutationCreateCollectionsArgs = {
  input: Array<CollectionCreateInput>;
};

export type MutationDeleteCollectionsArgs = {
  where?: InputMaybe<CollectionWhere>;
};

export type MutationUpdateCollectionsArgs = {
  where?: InputMaybe<CollectionWhere>;
  update?: InputMaybe<CollectionUpdateInput>;
};

export type MutationCreateBookmarksArgs = {
  input: Array<BookmarkCreateInput>;
};

export type MutationDeleteBookmarksArgs = {
  where?: InputMaybe<BookmarkWhere>;
};

export type MutationUpdateBookmarksArgs = {
  where?: InputMaybe<BookmarkWhere>;
  update?: InputMaybe<BookmarkUpdateInput>;
};

export type MutationCreateNotesArgs = {
  input: Array<NoteCreateInput>;
};

export type MutationDeleteNotesArgs = {
  where?: InputMaybe<NoteWhere>;
};

export type MutationUpdateNotesArgs = {
  where?: InputMaybe<NoteWhere>;
  update?: InputMaybe<NoteUpdateInput>;
};

export type MutationCreateCommentsArgs = {
  input: Array<CommentCreateInput>;
};

export type MutationDeleteCommentsArgs = {
  where?: InputMaybe<CommentWhere>;
};

export type MutationUpdateCommentsArgs = {
  where?: InputMaybe<CommentWhere>;
  update?: InputMaybe<CommentUpdateInput>;
};

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = "ASC",
  /** Sort by field values in descending order. */
  Desc = "DESC",
}

export type Bookmark = {
  __typename?: "Bookmark";
  personalTags?: Maybe<Array<Scalars["String"]>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type BookmarkAggregateSelection = {
  __typename?: "BookmarkAggregateSelection";
  count: Scalars["Int"];
  createdAt: DateTimeAggregateSelectionNonNullable;
  updatedAt: DateTimeAggregateSelectionNonNullable;
};

export type BookmarkEdge = {
  __typename?: "BookmarkEdge";
  cursor: Scalars["String"];
  node: Bookmark;
};

export type BookmarksConnection = {
  __typename?: "BookmarksConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<BookmarkEdge>;
};

export type Collection = {
  __typename?: "Collection";
  name: Scalars["String"];
  collectionTags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type CollectionAggregateSelection = {
  __typename?: "CollectionAggregateSelection";
  count: Scalars["Int"];
  name: StringAggregateSelectionNonNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  updatedAt: DateTimeAggregateSelectionNonNullable;
};

export type CollectionEdge = {
  __typename?: "CollectionEdge";
  cursor: Scalars["String"];
  node: Collection;
};

export type CollectionsConnection = {
  __typename?: "CollectionsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<CollectionEdge>;
};

export type Comment = {
  __typename?: "Comment";
  text: Scalars["String"];
  createdAt: Scalars["DateTime"];
};

export type CommentAggregateSelection = {
  __typename?: "CommentAggregateSelection";
  count: Scalars["Int"];
  text: StringAggregateSelectionNonNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
};

export type CommentEdge = {
  __typename?: "CommentEdge";
  cursor: Scalars["String"];
  node: Comment;
};

export type CommentsConnection = {
  __typename?: "CommentsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<CommentEdge>;
};

export type CreateBookmarksMutationResponse = {
  __typename?: "CreateBookmarksMutationResponse";
  info: CreateInfo;
  bookmarks: Array<Bookmark>;
};

export type CreateCollectionsMutationResponse = {
  __typename?: "CreateCollectionsMutationResponse";
  info: CreateInfo;
  collections: Array<Collection>;
};

export type CreateCommentsMutationResponse = {
  __typename?: "CreateCommentsMutationResponse";
  info: CreateInfo;
  comments: Array<Comment>;
};

export type CreateInfo = {
  __typename?: "CreateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
};

export type CreateNotesMutationResponse = {
  __typename?: "CreateNotesMutationResponse";
  info: CreateInfo;
  notes: Array<Note>;
};

export type CreateResourcesMutationResponse = {
  __typename?: "CreateResourcesMutationResponse";
  info: CreateInfo;
  resources: Array<Resource>;
};

export type CreateTagsMutationResponse = {
  __typename?: "CreateTagsMutationResponse";
  info: CreateInfo;
  tags: Array<Tag>;
};

export type CreateUsersMutationResponse = {
  __typename?: "CreateUsersMutationResponse";
  info: CreateInfo;
  users: Array<User>;
};

export type DateTimeAggregateSelectionNonNullable = {
  __typename?: "DateTimeAggregateSelectionNonNullable";
  min: Scalars["DateTime"];
  max: Scalars["DateTime"];
};

export type DeleteInfo = {
  __typename?: "DeleteInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesDeleted: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type IdAggregateSelectionNullable = {
  __typename?: "IDAggregateSelectionNullable";
  shortest?: Maybe<Scalars["ID"]>;
  longest?: Maybe<Scalars["ID"]>;
};

export type IntAggregateSelectionNonNullable = {
  __typename?: "IntAggregateSelectionNonNullable";
  max: Scalars["Int"];
  min: Scalars["Int"];
  average: Scalars["Float"];
  sum: Scalars["Int"];
};

export type Note = {
  __typename?: "Note";
  text: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type NoteAggregateSelection = {
  __typename?: "NoteAggregateSelection";
  count: Scalars["Int"];
  text: StringAggregateSelectionNonNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  updatedAt: DateTimeAggregateSelectionNonNullable;
};

export type NoteEdge = {
  __typename?: "NoteEdge";
  cursor: Scalars["String"];
  node: Note;
};

export type NotesConnection = {
  __typename?: "NotesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<NoteEdge>;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type Resource = {
  __typename?: "Resource";
  id?: Maybe<Scalars["ID"]>;
  headline: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  url: Scalars["String"];
  imageURL?: Maybe<Scalars["String"]>;
  rootSite: Scalars["String"];
  counter: Scalars["Int"];
  generatedTags?: Maybe<Array<Scalars["String"]>>;
  userAddedTags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  author?: Maybe<Scalars["String"]>;
  upvotes: Scalars["Int"];
  downvotes: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  addedAt: Scalars["DateTime"];
};

export type ResourceAggregateSelection = {
  __typename?: "ResourceAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNullable;
  headline: StringAggregateSelectionNonNullable;
  description: StringAggregateSelectionNullable;
  url: StringAggregateSelectionNonNullable;
  imageURL: StringAggregateSelectionNullable;
  rootSite: StringAggregateSelectionNonNullable;
  counter: IntAggregateSelectionNonNullable;
  author: StringAggregateSelectionNullable;
  upvotes: IntAggregateSelectionNonNullable;
  downvotes: IntAggregateSelectionNonNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  addedAt: DateTimeAggregateSelectionNonNullable;
};

export type ResourceEdge = {
  __typename?: "ResourceEdge";
  cursor: Scalars["String"];
  node: Resource;
};

export type ResourcesConnection = {
  __typename?: "ResourcesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<ResourceEdge>;
};

export type StringAggregateSelectionNonNullable = {
  __typename?: "StringAggregateSelectionNonNullable";
  shortest: Scalars["String"];
  longest: Scalars["String"];
};

export type StringAggregateSelectionNullable = {
  __typename?: "StringAggregateSelectionNullable";
  shortest?: Maybe<Scalars["String"]>;
  longest?: Maybe<Scalars["String"]>;
};

export type Tag = {
  __typename?: "Tag";
  name: Scalars["String"];
  resources: Array<Resource>;
  resourcesAggregate?: Maybe<TagResourceResourcesAggregationSelection>;
  resourcesConnection: TagResourcesConnection;
};

export type TagResourcesArgs = {
  where?: InputMaybe<ResourceWhere>;
  options?: InputMaybe<ResourceOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagResourcesAggregateArgs = {
  where?: InputMaybe<ResourceWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagResourcesConnectionArgs = {
  where?: InputMaybe<TagResourcesConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TagResourcesConnectionSort>>;
};

export type TagAggregateSelection = {
  __typename?: "TagAggregateSelection";
  count: Scalars["Int"];
  name: StringAggregateSelectionNonNullable;
};

export type TagEdge = {
  __typename?: "TagEdge";
  cursor: Scalars["String"];
  node: Tag;
};

export type TagResourceResourcesAggregationSelection = {
  __typename?: "TagResourceResourcesAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<TagResourceResourcesNodeAggregateSelection>;
};

export type TagResourceResourcesNodeAggregateSelection = {
  __typename?: "TagResourceResourcesNodeAggregateSelection";
  id: IdAggregateSelectionNullable;
  headline: StringAggregateSelectionNonNullable;
  description: StringAggregateSelectionNullable;
  url: StringAggregateSelectionNonNullable;
  imageURL: StringAggregateSelectionNullable;
  rootSite: StringAggregateSelectionNonNullable;
  counter: IntAggregateSelectionNonNullable;
  author: StringAggregateSelectionNullable;
  upvotes: IntAggregateSelectionNonNullable;
  downvotes: IntAggregateSelectionNonNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  addedAt: DateTimeAggregateSelectionNonNullable;
};

export type TagResourcesConnection = {
  __typename?: "TagResourcesConnection";
  edges: Array<TagResourcesRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type TagResourcesRelationship = {
  __typename?: "TagResourcesRelationship";
  cursor: Scalars["String"];
  node: Resource;
};

export type TagsConnection = {
  __typename?: "TagsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<TagEdge>;
};

export type UpdateBookmarksMutationResponse = {
  __typename?: "UpdateBookmarksMutationResponse";
  info: UpdateInfo;
  bookmarks: Array<Bookmark>;
};

export type UpdateCollectionsMutationResponse = {
  __typename?: "UpdateCollectionsMutationResponse";
  info: UpdateInfo;
  collections: Array<Collection>;
};

export type UpdateCommentsMutationResponse = {
  __typename?: "UpdateCommentsMutationResponse";
  info: UpdateInfo;
  comments: Array<Comment>;
};

export type UpdateInfo = {
  __typename?: "UpdateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  nodesDeleted: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type UpdateNotesMutationResponse = {
  __typename?: "UpdateNotesMutationResponse";
  info: UpdateInfo;
  notes: Array<Note>;
};

export type UpdateResourcesMutationResponse = {
  __typename?: "UpdateResourcesMutationResponse";
  info: UpdateInfo;
  resources: Array<Resource>;
};

export type UpdateTagsMutationResponse = {
  __typename?: "UpdateTagsMutationResponse";
  info: UpdateInfo;
  tags: Array<Tag>;
};

export type UpdateUsersMutationResponse = {
  __typename?: "UpdateUsersMutationResponse";
  info: UpdateInfo;
  users: Array<User>;
};

export type User = {
  __typename?: "User";
  id?: Maybe<Scalars["ID"]>;
  username: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
  salt?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  role: Scalars["String"];
  email: Scalars["String"];
  bookmarks?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UserAggregateSelection = {
  __typename?: "UserAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNullable;
  username: StringAggregateSelectionNonNullable;
  password: StringAggregateSelectionNullable;
  salt: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  role: StringAggregateSelectionNonNullable;
  email: StringAggregateSelectionNonNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  updatedAt: DateTimeAggregateSelectionNonNullable;
};

export type UserEdge = {
  __typename?: "UserEdge";
  cursor: Scalars["String"];
  node: User;
};

export type UsersConnection = {
  __typename?: "UsersConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<UserEdge>;
};

export type BookmarkCreateInput = {
  personalTags?: InputMaybe<Array<Scalars["String"]>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type BookmarkOptions = {
  /** Specify one or more BookmarkSort objects to sort Bookmarks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BookmarkSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Bookmarks by. The order in which sorts are applied is not guaranteed when specifying many fields in one BookmarkSort object. */
export type BookmarkSort = {
  createdAt?: InputMaybe<SortDirection>;
  updatedAt?: InputMaybe<SortDirection>;
};

export type BookmarkUpdateInput = {
  personalTags?: InputMaybe<Array<Scalars["String"]>>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  personalTags_POP?: InputMaybe<Scalars["Int"]>;
  personalTags_PUSH?: InputMaybe<Array<Scalars["String"]>>;
};

export type BookmarkWhere = {
  OR?: InputMaybe<Array<BookmarkWhere>>;
  AND?: InputMaybe<Array<BookmarkWhere>>;
  personalTags?: InputMaybe<Array<Scalars["String"]>>;
  personalTags_NOT?: InputMaybe<Array<Scalars["String"]>>;
  personalTags_INCLUDES?: InputMaybe<Scalars["String"]>;
  personalTags_NOT_INCLUDES?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  createdAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  updatedAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  updatedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export type CollectionCreateInput = {
  name: Scalars["String"];
  collectionTags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type CollectionOptions = {
  /** Specify one or more CollectionSort objects to sort Collections by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CollectionSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Collections by. The order in which sorts are applied is not guaranteed when specifying many fields in one CollectionSort object. */
export type CollectionSort = {
  name?: InputMaybe<SortDirection>;
  createdAt?: InputMaybe<SortDirection>;
  updatedAt?: InputMaybe<SortDirection>;
};

export type CollectionUpdateInput = {
  name?: InputMaybe<Scalars["String"]>;
  collectionTags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  collectionTags_POP?: InputMaybe<Scalars["Int"]>;
  collectionTags_PUSH?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CollectionWhere = {
  OR?: InputMaybe<Array<CollectionWhere>>;
  AND?: InputMaybe<Array<CollectionWhere>>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  collectionTags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  collectionTags_NOT?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  collectionTags_INCLUDES?: InputMaybe<Scalars["String"]>;
  collectionTags_NOT_INCLUDES?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  createdAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  updatedAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  updatedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export type CommentCreateInput = {
  text: Scalars["String"];
  createdAt: Scalars["DateTime"];
};

export type CommentOptions = {
  /** Specify one or more CommentSort objects to sort Comments by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CommentSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Comments by. The order in which sorts are applied is not guaranteed when specifying many fields in one CommentSort object. */
export type CommentSort = {
  text?: InputMaybe<SortDirection>;
  createdAt?: InputMaybe<SortDirection>;
};

export type CommentUpdateInput = {
  text?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CommentWhere = {
  OR?: InputMaybe<Array<CommentWhere>>;
  AND?: InputMaybe<Array<CommentWhere>>;
  text?: InputMaybe<Scalars["String"]>;
  text_NOT?: InputMaybe<Scalars["String"]>;
  text_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  createdAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export type NoteCreateInput = {
  text: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type NoteOptions = {
  /** Specify one or more NoteSort objects to sort Notes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<NoteSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Notes by. The order in which sorts are applied is not guaranteed when specifying many fields in one NoteSort object. */
export type NoteSort = {
  text?: InputMaybe<SortDirection>;
  createdAt?: InputMaybe<SortDirection>;
  updatedAt?: InputMaybe<SortDirection>;
};

export type NoteUpdateInput = {
  text?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type NoteWhere = {
  OR?: InputMaybe<Array<NoteWhere>>;
  AND?: InputMaybe<Array<NoteWhere>>;
  text?: InputMaybe<Scalars["String"]>;
  text_NOT?: InputMaybe<Scalars["String"]>;
  text_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  text_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  text_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  text_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  text_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  createdAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  updatedAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  updatedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export type ResourceConnectWhere = {
  node: ResourceWhere;
};

export type ResourceCreateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  headline: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  url: Scalars["String"];
  imageURL?: InputMaybe<Scalars["String"]>;
  rootSite: Scalars["String"];
  counter: Scalars["Int"];
  generatedTags?: InputMaybe<Array<Scalars["String"]>>;
  userAddedTags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  author?: InputMaybe<Scalars["String"]>;
  upvotes: Scalars["Int"];
  downvotes: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  addedAt: Scalars["DateTime"];
};

export type ResourceOptions = {
  /** Specify one or more ResourceSort objects to sort Resources by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ResourceSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Resources by. The order in which sorts are applied is not guaranteed when specifying many fields in one ResourceSort object. */
export type ResourceSort = {
  id?: InputMaybe<SortDirection>;
  headline?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  url?: InputMaybe<SortDirection>;
  imageURL?: InputMaybe<SortDirection>;
  rootSite?: InputMaybe<SortDirection>;
  counter?: InputMaybe<SortDirection>;
  author?: InputMaybe<SortDirection>;
  upvotes?: InputMaybe<SortDirection>;
  downvotes?: InputMaybe<SortDirection>;
  createdAt?: InputMaybe<SortDirection>;
  addedAt?: InputMaybe<SortDirection>;
};

export type ResourceUpdateInput = {
  id?: InputMaybe<Scalars["ID"]>;
  headline?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
  imageURL?: InputMaybe<Scalars["String"]>;
  rootSite?: InputMaybe<Scalars["String"]>;
  counter?: InputMaybe<Scalars["Int"]>;
  generatedTags?: InputMaybe<Array<Scalars["String"]>>;
  userAddedTags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  author?: InputMaybe<Scalars["String"]>;
  upvotes?: InputMaybe<Scalars["Int"]>;
  downvotes?: InputMaybe<Scalars["Int"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  addedAt?: InputMaybe<Scalars["DateTime"]>;
  counter_INCREMENT?: InputMaybe<Scalars["Int"]>;
  counter_DECREMENT?: InputMaybe<Scalars["Int"]>;
  upvotes_INCREMENT?: InputMaybe<Scalars["Int"]>;
  upvotes_DECREMENT?: InputMaybe<Scalars["Int"]>;
  downvotes_INCREMENT?: InputMaybe<Scalars["Int"]>;
  downvotes_DECREMENT?: InputMaybe<Scalars["Int"]>;
  generatedTags_POP?: InputMaybe<Scalars["Int"]>;
  generatedTags_PUSH?: InputMaybe<Array<Scalars["String"]>>;
  userAddedTags_POP?: InputMaybe<Scalars["Int"]>;
  userAddedTags_PUSH?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ResourceWhere = {
  OR?: InputMaybe<Array<ResourceWhere>>;
  AND?: InputMaybe<Array<ResourceWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  headline?: InputMaybe<Scalars["String"]>;
  headline_NOT?: InputMaybe<Scalars["String"]>;
  headline_IN?: InputMaybe<Array<Scalars["String"]>>;
  headline_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  headline_CONTAINS?: InputMaybe<Scalars["String"]>;
  headline_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  headline_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  headline_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  headline_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  headline_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  description_NOT?: InputMaybe<Scalars["String"]>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  description_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  description_CONTAINS?: InputMaybe<Scalars["String"]>;
  description_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  description_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  description_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  description_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  description_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
  url_NOT?: InputMaybe<Scalars["String"]>;
  url_IN?: InputMaybe<Array<Scalars["String"]>>;
  url_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  url_CONTAINS?: InputMaybe<Scalars["String"]>;
  url_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  url_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  url_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  url_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  url_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  imageURL?: InputMaybe<Scalars["String"]>;
  imageURL_NOT?: InputMaybe<Scalars["String"]>;
  imageURL_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  imageURL_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  imageURL_CONTAINS?: InputMaybe<Scalars["String"]>;
  imageURL_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  imageURL_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  imageURL_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  imageURL_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  imageURL_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  rootSite?: InputMaybe<Scalars["String"]>;
  rootSite_NOT?: InputMaybe<Scalars["String"]>;
  rootSite_IN?: InputMaybe<Array<Scalars["String"]>>;
  rootSite_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  rootSite_CONTAINS?: InputMaybe<Scalars["String"]>;
  rootSite_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  rootSite_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  rootSite_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  rootSite_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  rootSite_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  counter?: InputMaybe<Scalars["Int"]>;
  counter_NOT?: InputMaybe<Scalars["Int"]>;
  counter_IN?: InputMaybe<Array<Scalars["Int"]>>;
  counter_NOT_IN?: InputMaybe<Array<Scalars["Int"]>>;
  counter_LT?: InputMaybe<Scalars["Int"]>;
  counter_LTE?: InputMaybe<Scalars["Int"]>;
  counter_GT?: InputMaybe<Scalars["Int"]>;
  counter_GTE?: InputMaybe<Scalars["Int"]>;
  generatedTags?: InputMaybe<Array<Scalars["String"]>>;
  generatedTags_NOT?: InputMaybe<Array<Scalars["String"]>>;
  generatedTags_INCLUDES?: InputMaybe<Scalars["String"]>;
  generatedTags_NOT_INCLUDES?: InputMaybe<Scalars["String"]>;
  userAddedTags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  userAddedTags_NOT?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  userAddedTags_INCLUDES?: InputMaybe<Scalars["String"]>;
  userAddedTags_NOT_INCLUDES?: InputMaybe<Scalars["String"]>;
  author?: InputMaybe<Scalars["String"]>;
  author_NOT?: InputMaybe<Scalars["String"]>;
  author_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  author_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  author_CONTAINS?: InputMaybe<Scalars["String"]>;
  author_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  author_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  author_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  author_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  author_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  upvotes?: InputMaybe<Scalars["Int"]>;
  upvotes_NOT?: InputMaybe<Scalars["Int"]>;
  upvotes_IN?: InputMaybe<Array<Scalars["Int"]>>;
  upvotes_NOT_IN?: InputMaybe<Array<Scalars["Int"]>>;
  upvotes_LT?: InputMaybe<Scalars["Int"]>;
  upvotes_LTE?: InputMaybe<Scalars["Int"]>;
  upvotes_GT?: InputMaybe<Scalars["Int"]>;
  upvotes_GTE?: InputMaybe<Scalars["Int"]>;
  downvotes?: InputMaybe<Scalars["Int"]>;
  downvotes_NOT?: InputMaybe<Scalars["Int"]>;
  downvotes_IN?: InputMaybe<Array<Scalars["Int"]>>;
  downvotes_NOT_IN?: InputMaybe<Array<Scalars["Int"]>>;
  downvotes_LT?: InputMaybe<Scalars["Int"]>;
  downvotes_LTE?: InputMaybe<Scalars["Int"]>;
  downvotes_GT?: InputMaybe<Scalars["Int"]>;
  downvotes_GTE?: InputMaybe<Scalars["Int"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  createdAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  addedAt?: InputMaybe<Scalars["DateTime"]>;
  addedAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  addedAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  addedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  addedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export type TagConnectInput = {
  resources?: InputMaybe<Array<TagResourcesConnectFieldInput>>;
};

export type TagCreateInput = {
  name: Scalars["String"];
  resources?: InputMaybe<TagResourcesFieldInput>;
};

export type TagDeleteInput = {
  resources?: InputMaybe<Array<TagResourcesDeleteFieldInput>>;
};

export type TagDisconnectInput = {
  resources?: InputMaybe<Array<TagResourcesDisconnectFieldInput>>;
};

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type TagRelationInput = {
  resources?: InputMaybe<Array<TagResourcesCreateFieldInput>>;
};

export type TagResourcesAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<TagResourcesAggregateInput>>;
  OR?: InputMaybe<Array<TagResourcesAggregateInput>>;
  node?: InputMaybe<TagResourcesNodeAggregationWhereInput>;
};

export type TagResourcesConnectFieldInput = {
  where?: InputMaybe<ResourceConnectWhere>;
};

export type TagResourcesConnectionSort = {
  node?: InputMaybe<ResourceSort>;
};

export type TagResourcesConnectionWhere = {
  AND?: InputMaybe<Array<TagResourcesConnectionWhere>>;
  OR?: InputMaybe<Array<TagResourcesConnectionWhere>>;
  node?: InputMaybe<ResourceWhere>;
  node_NOT?: InputMaybe<ResourceWhere>;
};

export type TagResourcesCreateFieldInput = {
  node: ResourceCreateInput;
};

export type TagResourcesDeleteFieldInput = {
  where?: InputMaybe<TagResourcesConnectionWhere>;
};

export type TagResourcesDisconnectFieldInput = {
  where?: InputMaybe<TagResourcesConnectionWhere>;
};

export type TagResourcesFieldInput = {
  create?: InputMaybe<Array<TagResourcesCreateFieldInput>>;
  connect?: InputMaybe<Array<TagResourcesConnectFieldInput>>;
};

export type TagResourcesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagResourcesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TagResourcesNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  headline_EQUAL?: InputMaybe<Scalars["String"]>;
  headline_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  headline_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  headline_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  headline_GT?: InputMaybe<Scalars["Int"]>;
  headline_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  headline_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  headline_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  headline_GTE?: InputMaybe<Scalars["Int"]>;
  headline_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  headline_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  headline_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  headline_LT?: InputMaybe<Scalars["Int"]>;
  headline_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  headline_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  headline_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  headline_LTE?: InputMaybe<Scalars["Int"]>;
  headline_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  headline_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  headline_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  description_EQUAL?: InputMaybe<Scalars["String"]>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  description_GT?: InputMaybe<Scalars["Int"]>;
  description_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  description_GTE?: InputMaybe<Scalars["Int"]>;
  description_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  description_LT?: InputMaybe<Scalars["Int"]>;
  description_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  description_LTE?: InputMaybe<Scalars["Int"]>;
  description_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  url_EQUAL?: InputMaybe<Scalars["String"]>;
  url_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  url_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  url_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  url_GT?: InputMaybe<Scalars["Int"]>;
  url_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  url_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  url_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  url_GTE?: InputMaybe<Scalars["Int"]>;
  url_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  url_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  url_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  url_LT?: InputMaybe<Scalars["Int"]>;
  url_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  url_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  url_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  url_LTE?: InputMaybe<Scalars["Int"]>;
  url_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  url_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  url_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  imageURL_EQUAL?: InputMaybe<Scalars["String"]>;
  imageURL_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  imageURL_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  imageURL_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  imageURL_GT?: InputMaybe<Scalars["Int"]>;
  imageURL_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  imageURL_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  imageURL_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  imageURL_GTE?: InputMaybe<Scalars["Int"]>;
  imageURL_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  imageURL_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  imageURL_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  imageURL_LT?: InputMaybe<Scalars["Int"]>;
  imageURL_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  imageURL_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  imageURL_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  imageURL_LTE?: InputMaybe<Scalars["Int"]>;
  imageURL_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  imageURL_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  imageURL_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  rootSite_EQUAL?: InputMaybe<Scalars["String"]>;
  rootSite_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  rootSite_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  rootSite_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  rootSite_GT?: InputMaybe<Scalars["Int"]>;
  rootSite_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  rootSite_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  rootSite_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  rootSite_GTE?: InputMaybe<Scalars["Int"]>;
  rootSite_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  rootSite_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  rootSite_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  rootSite_LT?: InputMaybe<Scalars["Int"]>;
  rootSite_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  rootSite_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  rootSite_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  rootSite_LTE?: InputMaybe<Scalars["Int"]>;
  rootSite_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  rootSite_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  rootSite_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  author_EQUAL?: InputMaybe<Scalars["String"]>;
  author_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  author_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  author_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  author_GT?: InputMaybe<Scalars["Int"]>;
  author_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  author_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  author_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  author_GTE?: InputMaybe<Scalars["Int"]>;
  author_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  author_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  author_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  author_LT?: InputMaybe<Scalars["Int"]>;
  author_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  author_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  author_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  author_LTE?: InputMaybe<Scalars["Int"]>;
  author_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  author_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  author_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  counter_EQUAL?: InputMaybe<Scalars["Int"]>;
  counter_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  counter_MIN_EQUAL?: InputMaybe<Scalars["Int"]>;
  counter_MAX_EQUAL?: InputMaybe<Scalars["Int"]>;
  counter_SUM_EQUAL?: InputMaybe<Scalars["Int"]>;
  counter_GT?: InputMaybe<Scalars["Int"]>;
  counter_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  counter_MIN_GT?: InputMaybe<Scalars["Int"]>;
  counter_MAX_GT?: InputMaybe<Scalars["Int"]>;
  counter_SUM_GT?: InputMaybe<Scalars["Int"]>;
  counter_GTE?: InputMaybe<Scalars["Int"]>;
  counter_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  counter_MIN_GTE?: InputMaybe<Scalars["Int"]>;
  counter_MAX_GTE?: InputMaybe<Scalars["Int"]>;
  counter_SUM_GTE?: InputMaybe<Scalars["Int"]>;
  counter_LT?: InputMaybe<Scalars["Int"]>;
  counter_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  counter_MIN_LT?: InputMaybe<Scalars["Int"]>;
  counter_MAX_LT?: InputMaybe<Scalars["Int"]>;
  counter_SUM_LT?: InputMaybe<Scalars["Int"]>;
  counter_LTE?: InputMaybe<Scalars["Int"]>;
  counter_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  counter_MIN_LTE?: InputMaybe<Scalars["Int"]>;
  counter_MAX_LTE?: InputMaybe<Scalars["Int"]>;
  counter_SUM_LTE?: InputMaybe<Scalars["Int"]>;
  upvotes_EQUAL?: InputMaybe<Scalars["Int"]>;
  upvotes_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  upvotes_MIN_EQUAL?: InputMaybe<Scalars["Int"]>;
  upvotes_MAX_EQUAL?: InputMaybe<Scalars["Int"]>;
  upvotes_SUM_EQUAL?: InputMaybe<Scalars["Int"]>;
  upvotes_GT?: InputMaybe<Scalars["Int"]>;
  upvotes_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  upvotes_MIN_GT?: InputMaybe<Scalars["Int"]>;
  upvotes_MAX_GT?: InputMaybe<Scalars["Int"]>;
  upvotes_SUM_GT?: InputMaybe<Scalars["Int"]>;
  upvotes_GTE?: InputMaybe<Scalars["Int"]>;
  upvotes_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  upvotes_MIN_GTE?: InputMaybe<Scalars["Int"]>;
  upvotes_MAX_GTE?: InputMaybe<Scalars["Int"]>;
  upvotes_SUM_GTE?: InputMaybe<Scalars["Int"]>;
  upvotes_LT?: InputMaybe<Scalars["Int"]>;
  upvotes_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  upvotes_MIN_LT?: InputMaybe<Scalars["Int"]>;
  upvotes_MAX_LT?: InputMaybe<Scalars["Int"]>;
  upvotes_SUM_LT?: InputMaybe<Scalars["Int"]>;
  upvotes_LTE?: InputMaybe<Scalars["Int"]>;
  upvotes_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  upvotes_MIN_LTE?: InputMaybe<Scalars["Int"]>;
  upvotes_MAX_LTE?: InputMaybe<Scalars["Int"]>;
  upvotes_SUM_LTE?: InputMaybe<Scalars["Int"]>;
  downvotes_EQUAL?: InputMaybe<Scalars["Int"]>;
  downvotes_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  downvotes_MIN_EQUAL?: InputMaybe<Scalars["Int"]>;
  downvotes_MAX_EQUAL?: InputMaybe<Scalars["Int"]>;
  downvotes_SUM_EQUAL?: InputMaybe<Scalars["Int"]>;
  downvotes_GT?: InputMaybe<Scalars["Int"]>;
  downvotes_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  downvotes_MIN_GT?: InputMaybe<Scalars["Int"]>;
  downvotes_MAX_GT?: InputMaybe<Scalars["Int"]>;
  downvotes_SUM_GT?: InputMaybe<Scalars["Int"]>;
  downvotes_GTE?: InputMaybe<Scalars["Int"]>;
  downvotes_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  downvotes_MIN_GTE?: InputMaybe<Scalars["Int"]>;
  downvotes_MAX_GTE?: InputMaybe<Scalars["Int"]>;
  downvotes_SUM_GTE?: InputMaybe<Scalars["Int"]>;
  downvotes_LT?: InputMaybe<Scalars["Int"]>;
  downvotes_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  downvotes_MIN_LT?: InputMaybe<Scalars["Int"]>;
  downvotes_MAX_LT?: InputMaybe<Scalars["Int"]>;
  downvotes_SUM_LT?: InputMaybe<Scalars["Int"]>;
  downvotes_LTE?: InputMaybe<Scalars["Int"]>;
  downvotes_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  downvotes_MIN_LTE?: InputMaybe<Scalars["Int"]>;
  downvotes_MAX_LTE?: InputMaybe<Scalars["Int"]>;
  downvotes_SUM_LTE?: InputMaybe<Scalars["Int"]>;
  createdAt_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
  addedAt_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  addedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  addedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  addedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  addedAt_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
};

export type TagResourcesUpdateConnectionInput = {
  node?: InputMaybe<ResourceUpdateInput>;
};

export type TagResourcesUpdateFieldInput = {
  where?: InputMaybe<TagResourcesConnectionWhere>;
  update?: InputMaybe<TagResourcesUpdateConnectionInput>;
  connect?: InputMaybe<Array<TagResourcesConnectFieldInput>>;
  disconnect?: InputMaybe<Array<TagResourcesDisconnectFieldInput>>;
  create?: InputMaybe<Array<TagResourcesCreateFieldInput>>;
  delete?: InputMaybe<Array<TagResourcesDeleteFieldInput>>;
};

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  name?: InputMaybe<SortDirection>;
};

export type TagUpdateInput = {
  name?: InputMaybe<Scalars["String"]>;
  resources?: InputMaybe<Array<TagResourcesUpdateFieldInput>>;
};

export type TagWhere = {
  OR?: InputMaybe<Array<TagWhere>>;
  AND?: InputMaybe<Array<TagWhere>>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  /** @deprecated Use `resources_SOME` instead. */
  resources?: InputMaybe<ResourceWhere>;
  /** @deprecated Use `resources_NONE` instead. */
  resources_NOT?: InputMaybe<ResourceWhere>;
  resourcesAggregate?: InputMaybe<TagResourcesAggregateInput>;
  /** Return Tags where all of the related Resources match this filter */
  resources_ALL?: InputMaybe<ResourceWhere>;
  /** Return Tags where none of the related Resources match this filter */
  resources_NONE?: InputMaybe<ResourceWhere>;
  /** Return Tags where one of the related Resources match this filter */
  resources_SINGLE?: InputMaybe<ResourceWhere>;
  /** Return Tags where some of the related Resources match this filter */
  resources_SOME?: InputMaybe<ResourceWhere>;
  /** @deprecated Use `resourcesConnection_SOME` instead. */
  resourcesConnection?: InputMaybe<TagResourcesConnectionWhere>;
  /** @deprecated Use `resourcesConnection_NONE` instead. */
  resourcesConnection_NOT?: InputMaybe<TagResourcesConnectionWhere>;
  resourcesConnection_ALL?: InputMaybe<TagResourcesConnectionWhere>;
  resourcesConnection_NONE?: InputMaybe<TagResourcesConnectionWhere>;
  resourcesConnection_SINGLE?: InputMaybe<TagResourcesConnectionWhere>;
  resourcesConnection_SOME?: InputMaybe<TagResourcesConnectionWhere>;
};

export type UserCreateInput = {
  username: Scalars["String"];
  password?: InputMaybe<Scalars["String"]>;
  salt?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  role: Scalars["String"];
  email: Scalars["String"];
  bookmarks?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UserOptions = {
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: InputMaybe<SortDirection>;
  username?: InputMaybe<SortDirection>;
  password?: InputMaybe<SortDirection>;
  salt?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  role?: InputMaybe<SortDirection>;
  email?: InputMaybe<SortDirection>;
  createdAt?: InputMaybe<SortDirection>;
  updatedAt?: InputMaybe<SortDirection>;
};

export type UserUpdateInput = {
  username?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  salt?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  bookmarks?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  bookmarks_POP?: InputMaybe<Scalars["Int"]>;
  bookmarks_PUSH?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type UserWhere = {
  OR?: InputMaybe<Array<UserWhere>>;
  AND?: InputMaybe<Array<UserWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  username?: InputMaybe<Scalars["String"]>;
  username_NOT?: InputMaybe<Scalars["String"]>;
  username_IN?: InputMaybe<Array<Scalars["String"]>>;
  username_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  username_CONTAINS?: InputMaybe<Scalars["String"]>;
  username_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  username_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  username_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  username_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  username_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  password_NOT?: InputMaybe<Scalars["String"]>;
  password_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  password_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  password_CONTAINS?: InputMaybe<Scalars["String"]>;
  password_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  password_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  password_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  password_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  password_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  salt?: InputMaybe<Scalars["String"]>;
  salt_NOT?: InputMaybe<Scalars["String"]>;
  salt_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  salt_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  salt_CONTAINS?: InputMaybe<Scalars["String"]>;
  salt_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  salt_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  salt_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  salt_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  salt_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_NOT?: InputMaybe<Scalars["String"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["String"]>;
  role_NOT?: InputMaybe<Scalars["String"]>;
  role_IN?: InputMaybe<Array<Scalars["String"]>>;
  role_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  role_CONTAINS?: InputMaybe<Scalars["String"]>;
  role_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  role_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  role_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  role_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  role_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  email_NOT?: InputMaybe<Scalars["String"]>;
  email_IN?: InputMaybe<Array<Scalars["String"]>>;
  email_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  email_CONTAINS?: InputMaybe<Scalars["String"]>;
  email_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  email_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  email_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  email_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  email_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  bookmarks?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  bookmarks_NOT?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  bookmarks_INCLUDES?: InputMaybe<Scalars["ID"]>;
  bookmarks_NOT_INCLUDES?: InputMaybe<Scalars["ID"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  createdAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  updatedAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  updatedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export interface IdAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface ResourceAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNullable;
  headline?: StringAggregateInputNonNullable;
  description?: StringAggregateInputNullable;
  url?: StringAggregateInputNonNullable;
  imageURL?: StringAggregateInputNullable;
  rootSite?: StringAggregateInputNonNullable;
  counter?: IntAggregateInputNonNullable;
  author?: StringAggregateInputNullable;
  upvotes?: IntAggregateInputNonNullable;
  downvotes?: IntAggregateInputNonNullable;
  createdAt?: DateTimeAggregateInputNonNullable;
  addedAt?: DateTimeAggregateInputNonNullable;
}

export declare class ResourceModel {
  public find(args?: {
    where?: ResourceWhere;

    options?: ResourceOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Resource[]>;
  public create(args: {
    input: ResourceCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateResourcesMutationResponse>;
  public update(args: {
    where?: ResourceWhere;
    update?: ResourceUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateResourcesMutationResponse>;
  public delete(args: {
    where?: ResourceWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: ResourceWhere;

    aggregate: ResourceAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<ResourceAggregateSelection>;
}

export interface IdAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface UserAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNullable;
  username?: StringAggregateInputNonNullable;
  password?: StringAggregateInputNullable;
  salt?: StringAggregateInputNullable;
  name?: StringAggregateInputNonNullable;
  role?: StringAggregateInputNonNullable;
  email?: StringAggregateInputNonNullable;
  createdAt?: DateTimeAggregateInputNonNullable;
  updatedAt?: DateTimeAggregateInputNonNullable;
}

export declare class UserModel {
  public find(args?: {
    where?: UserWhere;

    options?: UserOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<User[]>;
  public create(args: {
    input: UserCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateUsersMutationResponse>;
  public update(args: {
    where?: UserWhere;
    update?: UserUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateUsersMutationResponse>;
  public delete(args: {
    where?: UserWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: UserWhere;

    aggregate: UserAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<UserAggregateSelection>;
}

export interface IdAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface TagAggregateSelectionInput {
  count?: boolean;
  name?: StringAggregateInputNonNullable;
}

export declare class TagModel {
  public find(args?: {
    where?: TagWhere;

    options?: TagOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Tag[]>;
  public create(args: {
    input: TagCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateTagsMutationResponse>;
  public update(args: {
    where?: TagWhere;
    update?: TagUpdateInput;
    connect?: TagConnectInput;
    disconnect?: TagDisconnectInput;
    create?: TagCreateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateTagsMutationResponse>;
  public delete(args: {
    where?: TagWhere;
    delete?: TagDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: TagWhere;

    aggregate: TagAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<TagAggregateSelection>;
}

export interface IdAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface CollectionAggregateSelectionInput {
  count?: boolean;
  name?: StringAggregateInputNonNullable;
  createdAt?: DateTimeAggregateInputNonNullable;
  updatedAt?: DateTimeAggregateInputNonNullable;
}

export declare class CollectionModel {
  public find(args?: {
    where?: CollectionWhere;

    options?: CollectionOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Collection[]>;
  public create(args: {
    input: CollectionCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateCollectionsMutationResponse>;
  public update(args: {
    where?: CollectionWhere;
    update?: CollectionUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateCollectionsMutationResponse>;
  public delete(args: {
    where?: CollectionWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: CollectionWhere;

    aggregate: CollectionAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<CollectionAggregateSelection>;
}

export interface IdAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface BookmarkAggregateSelectionInput {
  count?: boolean;
  createdAt?: DateTimeAggregateInputNonNullable;
  updatedAt?: DateTimeAggregateInputNonNullable;
}

export declare class BookmarkModel {
  public find(args?: {
    where?: BookmarkWhere;

    options?: BookmarkOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Bookmark[]>;
  public create(args: {
    input: BookmarkCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateBookmarksMutationResponse>;
  public update(args: {
    where?: BookmarkWhere;
    update?: BookmarkUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateBookmarksMutationResponse>;
  public delete(args: {
    where?: BookmarkWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: BookmarkWhere;

    aggregate: BookmarkAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<BookmarkAggregateSelection>;
}

export interface IdAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface NoteAggregateSelectionInput {
  count?: boolean;
  text?: StringAggregateInputNonNullable;
  createdAt?: DateTimeAggregateInputNonNullable;
  updatedAt?: DateTimeAggregateInputNonNullable;
}

export declare class NoteModel {
  public find(args?: {
    where?: NoteWhere;

    options?: NoteOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Note[]>;
  public create(args: {
    input: NoteCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateNotesMutationResponse>;
  public update(args: {
    where?: NoteWhere;
    update?: NoteUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateNotesMutationResponse>;
  public delete(args: {
    where?: NoteWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: NoteWhere;

    aggregate: NoteAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<NoteAggregateSelection>;
}

export interface IdAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface IntAggregateInputNonNullable {
  max?: boolean;
  min?: boolean;
  average?: boolean;
  sum?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface CommentAggregateSelectionInput {
  count?: boolean;
  text?: StringAggregateInputNonNullable;
  createdAt?: DateTimeAggregateInputNonNullable;
}

export declare class CommentModel {
  public find(args?: {
    where?: CommentWhere;

    options?: CommentOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Comment[]>;
  public create(args: {
    input: CommentCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateCommentsMutationResponse>;
  public update(args: {
    where?: CommentWhere;
    update?: CommentUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateCommentsMutationResponse>;
  public delete(args: {
    where?: CommentWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: CommentWhere;

    aggregate: CommentAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<CommentAggregateSelection>;
}

export interface ModelMap {
  Resource: ResourceModel;
  User: UserModel;
  Tag: TagModel;
  Collection: CollectionModel;
  Bookmark: BookmarkModel;
  Note: NoteModel;
  Comment: CommentModel;
}
