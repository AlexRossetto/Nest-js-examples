import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule, GraphQLSchemaHost } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

//Allows us to access generated schema, typically used in end-to-end testing.
// const { schema } = app.get(GraphQLSchemaHost);

//Code first for using decorators and typescript to create automatically generated schemas.
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //Set it to true if you want the schemas to be created in memory
      //The configuration below allows us to use Apollo sandbox instead of the default graphQL playground.
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      //sortSchema: true, Allows schema to be sorted
      //This makes it so graphql only accesses a subset of modules.
      //include: [WhatevermMdule]
    }),
  ],
})
export class AppModule {}

// //Asynchronous module definition.
// @Module({
//   imports: [
//     GraphQLModule.forRootAsync<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       //imports: [ConfigModule],
//       useFactory: async () => ({
//         //typePaths: configService.get<string>('GRAPHQL_TYPE_PATHS'), Allows us to access an injected dependency.
//         typePaths: ['./**/*.graphql'],
//       }),
//       //useClass: GQLConfigServiceClass, Allows us to configure the GraphQL module using a class.
//       //inject: [ConfigService],
//     }),
//   ],
// })
// export class AsyncAppModule {}

//In the example above we need to create a class that instantiates the GraphQLService using the createGqlOptions() method to create the options object as shown below.
// @Injectable()
// class GqlConfigService implements GqlOptionsFactory {
//   createGqlOptions(): ApolloDriverConfig {
//     return {
//       typePaths: ['./**/*.graphql'],
//     };
//   }
// }

//__________________________________________________________________________________________________________________________//

// //Schema first: Schemas are written by the developer. (GraphQL SDL types)
// @Module({
//   imports: [
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       typePaths: ['./**/*.graphql'],
//       //Allows graphql to automatically generate typescript types for our SDL types , then are combined in memory.
//       definitions: {
//         path: join(process.cwd(), 'src/graphql.ts'),
//         outputAs: 'class', //Every typescript type is generated as an interface by default , adding this line makes every typescript generated to be a class.
//       },
//     }),
//   ],
// })
// export class AppModuleSchemaFirst {}
