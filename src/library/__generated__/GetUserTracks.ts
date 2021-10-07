/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserTracks
// ====================================================

export interface GetUserTracks_me_tracks_source_YtAudio {
  __typename: "YtAudio";
  videoUrl: string;
  streamUrl: string;
}

export interface GetUserTracks_me_tracks_source_SfTrack {
  __typename: "SfTrack";
  trackId: string;
}

export type GetUserTracks_me_tracks_source = GetUserTracks_me_tracks_source_YtAudio | GetUserTracks_me_tracks_source_SfTrack;

export interface GetUserTracks_me_tracks {
  __typename: "Track";
  id: string;
  title: string;
  source: GetUserTracks_me_tracks_source;
}

export interface GetUserTracks_me {
  __typename: "User";
  tracks: GetUserTracks_me_tracks[] | null;
}

export interface GetUserTracks {
  me: GetUserTracks_me | null;
}
