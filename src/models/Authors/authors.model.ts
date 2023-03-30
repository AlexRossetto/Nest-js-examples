//In this case, using the code first approach, we define schemas
//using TypeScript classes and using TypeScript decorators to annotate the fields of those classes. The equivalent of the above SDL in the code first approach is:

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../Post/post.model';

@ObjectType()
export class Author {
  //The @Field() decorator accepts an optional type function (e.g., type => Int), and optionally an options object.
  //The type function is required when there's the potential for ambiguity between the TypeScript type system and the GraphQL type system.
  //Specifically: it is not required for string and boolean types; it is required for number (which must be mapped to either a GraphQL Int or Float).
  //The type function should simply return the desired GraphQL type (as shown in various examples in these chapters).
  @Field((type) => Int)
  id: number;

  ////The options object can have any of the following key/value pairs:
  //nullable: for specifying whether a field is nullable (in SDL, each field is non-nullable by default); boolean
  //description: for setting a field description; string
  //deprecationReason: for marking a field as deprecated; string
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  ////To declare that an array's items (not the array itself) are nullable, set the nullable property to 'items' as shown below:
  ////If both the array and its items are nullable, set nullable to 'itemsAndList' instead.
  // @Field(type => [Post], { nullable: 'items' })
  // posts: Post[];

  ////When the field is an array, we must manually indicate the array type in the Field() decorator's type function, as shown below:
  @Field((type) => [Post])
  posts: Post[];
}

//Creates the following GraphQl Schema:

// type Author {
//   id: Int!
//   firstName: String
//   lastName: String
//   posts: [Post!]!
// }
