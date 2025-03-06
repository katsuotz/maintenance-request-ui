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
