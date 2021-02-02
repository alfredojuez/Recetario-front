import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';

@Injectable({
  providedIn: 'root'
})
export class TablePaginationService extends ApiService
{

  constructor(apollo: Apollo)
  {
    super(apollo);
  }

  getCollectionData(query: DocumentNode, variables: object = {}, context: object = {})
  {
    console.log('getCollectionData  getCollectionData  getCollectionData')
    console.log(variables)
    return this.get(query, variables, context);
  }
}
