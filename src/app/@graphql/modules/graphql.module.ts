import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphqlModule { 
  constructor(apollo: Apollo, httpLink: HttpLink){
      //Para capturar los errores de consulta y/o de red
      
     
      const errorLink = onError(({graphQLErrors, networkError}) =>{
        if(graphQLErrors)
        {
          console.log(`Errores de GraphQL: ${graphQLErrors}`);
        }

        if(networkError)
        {
          console.log(`Errores de RED: ${networkError}`)
        }

        //URL del playground de GraphQL
        const uri = 'http://localhost:2004/graphql';
        const link = ApolloLink.from (
          [
            errorLink, 
            httpLink.create({uri})
          ]);
        apollo.create({
          link, 
          cache: new InMemoryCache()
        });
      });
  };
}
