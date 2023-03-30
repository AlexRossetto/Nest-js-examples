// import { MinLength } from 'class-validator';
import { Field, ArgsType, Int } from '@nestjs/graphql';

/* eslint-disable */
@ArgsType()
class PaginationArgs {
  @Field((type) => Int)
  offSet: number = 0;

  @Field((type) => Int)
  limit: number = 10;
}
/* eslint-enable */

@ArgsType()
export class GetAuthorArgs extends PaginationArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  // @MinLength(3)
  lastName: string;
}

////This will result in generating the following part of the GraphQL schema in SDL:
// type Query {
//   author(firstName: String, lastName: String = ''): Author
// }
