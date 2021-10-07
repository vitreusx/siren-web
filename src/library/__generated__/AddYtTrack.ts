/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddYtTrackInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddYtTrack
// ====================================================

export interface AddYtTrack_addYtTrack {
  __typename: "Track";
  id: string;
}

export interface AddYtTrack {
  addYtTrack: AddYtTrack_addYtTrack | null;
}

export interface AddYtTrackVariables {
  input: AddYtTrackInput;
}
