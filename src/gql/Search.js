import gql from 'graphql-tag';

export const NewSearch = gql`mutation NewSearch($title: String!, $sources: json!, $userId: Int!) {
  insert_search(objects: {title: $title, sources: $sources, created_by: $userId}) {
    returning {
      id
    }
  }
}`

export const AllSearches = gql`
query GetSearches($userId: Int!) {
  search(where: {created_by: {_eq: $userId}}) {
  id
    title
  }
}`
