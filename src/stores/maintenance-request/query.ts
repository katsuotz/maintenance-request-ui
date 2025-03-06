import { gql } from "@apollo/client";

export const GET_MAINTENANCE_REQUESTS = gql`
  query {
    maintenanceRequests {
      id
      title
      description
      status
      urgency
      resolvedAt
      createdAt
      updatedAt
    }
  }
`;
export const GET_MAINTENANCE_REQUEST_BY_ID = gql`
  query GetMaintenanceRequest($id: Int!) {
    maintenanceRequest(id: $id) {
      id
      title
      description
      status
      urgency
      resolvedAt
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_MAINTENANCE_REQUEST = gql`
  mutation CreateMaintenanceRequest($data: CreateMaintenanceRequestInput!) {
    createMaintenanceRequest(data: $data) {
      id
      title
      description
      status
      urgency
      resolvedAt
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_MAINTENANCE_REQUEST = gql`
  mutation UpdateMaintenanceRequest(
    $id: Int!
    $data: UpdateMaintenanceRequestInput!
  ) {
    updateMaintenanceRequest(id: $id, data: $data) {
      id
      title
      description
      status
      urgency
      resolvedAt
      createdAt
      updatedAt
    }
  }
`;
