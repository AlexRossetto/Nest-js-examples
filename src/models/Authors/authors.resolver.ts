import { Type } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Post } from '../Post/post.model';
import { Author } from './authors.model';
import { GetAuthorArgs } from './dto/get-author.args';
import { UpvotePostInput } from './dto/upvotePost-input';

// In the example below, we created the AuthorsResolver which defines one query resolver function and one field resolver function.
// To create a resolver, we create a class with resolver functions as methods, and annotate the class with the @Resolver() decorator.

// In this example, we defined a query handler to get the author object based on the id sent in the request. To specify that the method is a query handler, use the @Query() decorator.

// The argument passed to the @Resolver() decorator is optional, but comes into play when our graph becomes non-trivial.
// It's used to supply a parent object used by field resolver functions as they traverse down through an object graph.

// In our example, since the class includes a field resolver function (for the posts property of the Author object type), we must supply the @Resolver() decorator with a value to indicate which class is the parent type
// (i.e., the corresponding ObjectType class name) for all field resolvers defined within this class.
// As should be clear from the example, when writing a field resolver function, it's necessary to access the parent object (the object the field being resolved is a member of).
// In this example, we populate an author's posts array with a field resolver that calls a service which takes the author's id as an argument.
// Hence the need to identify the parent object in the @Resolver() decorator.
// Note the corresponding use of the @Parent() method parameter decorator to then extract a reference to that parent object in the field resolver.

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query((returns) => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findByOne(id);
  }

  @Mutation((returns) => Post)
  async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
    return this.postsService.upvoteById({ id: postId });
  }

  @Mutation((returns) => Post)
  async upvotePost(@Args('data') data: UpvotePostInput) {
    const { postId } = data;
    return this.postsService.upvoteById({ id: postId });
  }

  ////Generates the following type mutation:
  // type Mutation {
  //   upvotePost(postId: Int!): Post
  // }

  ////Another way of passing args as an object
  // @Query((returns) => Author, { name: 'author' })
  // async getAuthor(@Args() args: GetAuthorArgs) {
  //   const { firstName } = args;
  //   return this.authorsService.findByOne(firstName);
  // }

  //We do this because the Author type has a property that references another type , in this case post.
  @ResolveField('posts', (returns) => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}

////Generates the following query type:
// type Query {
//   author(id: Int!): Author
// }

//Generic findAll query.

// an explicit return type (any below) is required: otherwise TypeScript complains about the usage of a private class definition.
// Recommended: define an interface instead of using any.
// Type is imported from the @nestjs/common package
// The isAbstract: true property indicates that SDL (Schema Definition Language statements) shouldn't be generated for this class.
// Note, you can set this property for other types as well to suppress SDL generation.

function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    @Query((type) => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return [];
    }
  }
  return BaseResolverHost;
}

//Utilizing the above baseResolver
@Resolver((of) => Author)
export class RecipesResolver extends BaseResolver(Author) {
  constructor(private authorsService: AuthorsService) {
    super();
  }
}
