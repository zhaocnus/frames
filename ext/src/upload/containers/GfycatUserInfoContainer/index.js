import { connect } from 'react-redux';
import waterfall from 'async/waterfall';
import GfycatUserInfo from '../../components/GfycatUserInfo';
import {   
  getMe, 
  requestAuth, 
  removeUserToken
} from '../../api/gfycat';
import { 
  gfycatAuthFailed, 
  gfycatAuthSucceeded, 
  gfycatUserInfoFetched
} from '../../actions/gfycat';

const mapStateToProps = ({ user }) => {
  return { user };
};

function gfycatGetUserInfo() {
  return function(dispatch) {
    getMe((err, user) => {
      if (err) return dispatch(gfycatAuthFailed(err));

      dispatch(gfycatUserInfoFetched(user));
    });
  }
}

function gfycatAuth() {
  return function(dispatch) {
    waterfall([
      // auth 
      cb => {
        requestAuth(err => {
          if (err) return cb(err);

          dispatch(gfycatAuthSucceeded());
          cb();
        });
      },
      // get user info
      cb => {
        getMe((err, user) => {
          if (err) return cb(err);

          cb(null, user);
        });
      }
    ], (err, user) => {
      if (err) return dispatch(gfycatAuthFailed(err));

      dispatch(gfycatUserInfoFetched(user));
    });
  }
} 

function gfycatLogout() {
  return function(dispatch) {
    removeUserToken(() => {
      dispatch(gfycatAuthFailed('Logged out'));
    });
  }
}


const GfycatUserInfoContainer = connect(
  mapStateToProps,
  { gfycatLogout, gfycatAuth, gfycatGetUserInfo }
)(GfycatUserInfo);

export default GfycatUserInfoContainer
