import { gql } from '@apollo/client';

export const InsertExperience = gql`mutation NewExperience($userId: Int!, $title: String!, $location: String!, $startDate: String!, $endDate: String!, $responsibilities: String, $experienceId: uuid!) {
  insert_resumes_experience(on_conflict: {constraint: experience_pkey, update_columns: [title, location, start_date, end_date, responsibilities]}, objects: {created_by: $userId, id: $experienceId, title: $title,  location: $location, start_date: $startDate, end_date: $endDate, responsibilities: $responsibilities}) {
    __typename
  }
}`

export const PageContent = gql`subscription PageContent ($userId: Int!) {
  resumes_experience {
    id
    title
    location
    start_date
    end_date
    responsibilities
  }
}`
