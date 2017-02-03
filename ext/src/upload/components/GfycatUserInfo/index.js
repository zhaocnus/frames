import React, { Component, PropTypes } from 'react';
import SimpleButton from '../../common/SimpleButton';

class GfycatUserInfo extends Component {
  componentDidMount() {
    this.props.gfycatGetUserInfo();
  }

  render() {
    const { user } = this.props;
    const hasUserInfo = user.name && !user.err;
    const logout = hasUserInfo ?
      (
        <button
          type="button"
          onClick={this.props.gfycatLogout}
          className="btn btn-link btn-sm pull-right">Logout
        </button>
      ) : null;
    const header = (
      <div className="header">
        {logout}
      </div>
    );
    const userInfo = hasUserInfo ?
      (
        <div className="user">
          <span 
            className="avatar" 
            style={{ backgroundImage: user.profileUrl ? `url(${user.profileUrl})` : null }} />
          <strong>{user.name}</strong>
        </div>
      ) : 
      (
        <SimpleButton 
          text="Gfycat login"
          types={['info', 'block']}
          onClick={this.props.gfycatAuth} />
      );

    return (
      <div className="gfycat-user-info">
        {header}
        {userInfo}
      </div> 
    );
  }
}

GfycatUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  gfycatLogout: PropTypes.func.isRequired,
  gfycatAuth: PropTypes.func.isRequired,
  gfycatGetUserInfo: PropTypes.func.isRequired
};

export default GfycatUserInfo