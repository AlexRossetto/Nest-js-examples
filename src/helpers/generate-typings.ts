import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

//Method use to create the application's types on demand.
const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['.src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  watch: true, //Generates types whenever any .graphql file changes.
  emitTypenameField: true, //Automatically generates __typefield.
  skipResolverArgs: true, //To generate resolvers (queries, mutations, subscriptions) as plain fields without arguments.
});

// ts-node generate typings to execute this file.
