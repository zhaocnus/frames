import React, { Component, PropTypes } from 'react';
import MainNav from '../MainNav';
import MainFooter from '../MainFooter';
import MainContent from '../MainContent';
import PreviewPanelContainer from '../../containers/PreviewPanelContainer';
import GifPanelContainer from '../../containers/GifPanelContainer';
import Loader from '../../common/Loader';

class MainApp extends Component {
  componentDidMount() {
    this.props.fetchInitData();
  }

  render() {
    return (
      <div className="main-app">
        <div className="main-app-inner-wrapper">
          <MainNav />
          {
            this.props.hasSequence ?
              (
                <MainContent
                  leftChild={<PreviewPanelContainer />}
                  rightChild={<GifPanelContainer />} /> 
              ) :
              (
                <div className="container">
                  <Loader text="Loading image sequence" />
                </div>
              )
          }
        </div>
        <MainFooter />
      </div>
    );
  }
}

MainApp.propTypes = {
  hasSequence: PropTypes.bool.isRequired,
  fetchInitData: PropTypes.func.isRequired
};

export default MainApp