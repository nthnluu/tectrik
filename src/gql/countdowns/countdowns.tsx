import { gql } from '@apollo/client';

export const InsertCountdown = gql`mutation NewCountdown($userId: Int!, $title: String!, $countdownTo: timestamptz!, $countdownId: uuid!) {
  insert_countdowns_countdown(on_conflict: {constraint: countdown_pkey, update_columns: [title, countdown_to]}, objects: {created_by: $userId, id: $countdownId, title: $title, countdown_to: $countdownTo}) {
    __typename
  }
}`

export const PageContent = gql`subscription PageContent ($userId: Int!) {
  countdowns_countdown(where: {created_by: {_eq: $userId}}) {
    id
    title
    countdown_to
  }
}`
