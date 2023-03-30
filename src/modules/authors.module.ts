import { Module } from '@nestjs/common';
import { AuthorsResolver } from 'src/models/Authors/authors.resolver';

// Once we're done, we have declaratively specified all the information needed by the GraphQLModule to generate a resolver map.

// The GraphQLModule uses reflection to introspect the meta data provided via the decorators, and transforms classes into the correct resolver map automatically.

// The only other thing you need to take care of is to provide (i.e., list as a provider in some module) the resolver class(es) (AuthorsResolver), and importing the module (AuthorsModule) somewhere, so Nest will be able to utilize it.

// For example, we can do this in an AuthorsModule, which can also provide other services needed in this context. Be sure to import AuthorsModule somewhere (e.g., in the root module, or some other module imported by the root module).

@Module({
  imports: [PostsModule],
  providers: [AuthorsService, AuthorsResolver],
})
export class AuthorsModule {}
