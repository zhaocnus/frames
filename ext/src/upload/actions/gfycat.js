import {
  GFYCAT_AUTH_SUCCEEDED,
  GFYCAT_AUTH_FAILED,
  GFYCAT_USER_INFO_FETCHED,
  GFYCAT_CREATION_INITIATED,
  GFYCAT_CREATION_FAILED,
  GFYCAT_CREATION_SUCCEEDED
} from '../constants/actionTypes';

export const gfycatAuthSucceeded = () => ({
  type: GFYCAT_AUTH_SUCCEEDED
});


export const gfycatAuthFailed = err => ({
  type: GFYCAT_AUTH_FAILED,
  err
});

export const gfycatUserInfoFetched = user => ({
  type: GFYCAT_USER_INFO_FETCHED,
  user
});

// image creation
export const gfycatCreationInitiated = () => ({
  type: GFYCAT_CREATION_INITIATED
});

export const gfycatCreationFailed = err => ({
  type: GFYCAT_CREATION_FAILED,
  err
});

export const gfycatCreationSucceeded = gfyname => ({
  type: GFYCAT_CREATION_SUCCEEDED,
  gfyname
});

export const gfycatCreationPropsUpdated = gfycatCreationProps => ({
  type: GFYCAT_CREATION_SUCCEEDED,
  gfycatCreationProps
});