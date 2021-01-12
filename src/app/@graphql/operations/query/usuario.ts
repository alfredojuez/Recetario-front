import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
    query getLogin($user:String!, $pass: String!)
    {
      login(email: $user, pass: $pass)
      {
        status
        message
        token
      }
    }
`;