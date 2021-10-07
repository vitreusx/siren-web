/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddSfTrackInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddSfTrack
// ====================================================

export interface AddSfTrack_addSfTrack {
  __typename: "Track";
  id: string;
}

export interface AddSfTrack {
  addSfTrack: AddSfTrack_addSfTrack | null;
}

export interface AddSfTrackVariables {
  input: AddSfTrackInput;
}
