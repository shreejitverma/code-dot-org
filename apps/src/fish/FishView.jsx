/** @file Top-level view for Fish */
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import StudioAppWrapper from '../templates/StudioAppWrapper';
import CodeWorkspaceContainer from '../templates/CodeWorkspaceContainer';
import _ from 'lodash';

const styles = {
  container: {
    position: 'absolute',
    userSelect: 'none'
  },
  containerReact: {
    position: 'absolute',
    width: '100%',
    margin: '0 auto',
    userSelect: 'none',
    fontFamily: '"Gotham 4r", arial, sans-serif',
    color: 'rgb(30,30,30)',
    lineHeight: 1.3
  },
  backgroundCanvas: {
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex: -1,
    borderRadius: '10px'
  },
  activityCanvas: {
    width: '100%',
    borderRadius: '10px',
    border: 'none'
  }
};

/**
 * Top-level React wrapper for Fish
 */
class FishView extends React.Component {
  static propTypes = {
    isProjectLevel: PropTypes.bool.isRequired,
    isReadOnlyWorkspace: PropTypes.bool.isRequired,
    onMount: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.codeAppRef = document.getElementById('codeApp');

    // Set these values so that the first render can work with them.
    // Note that appWidth/Height are the dimensions of the "codeApp" div
    // which is the space allocated for an app.
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      appWidth: this.codeAppRef.offsetWidth,
      appHeight: this.codeAppRef.offsetHeight
    };
  }

  componentDidMount() {
    this.props.onMount();

    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      appWidth: this.codeAppRef.offsetWidth,
      appHeight: this.codeAppRef.offsetHeight
    });

    window.addEventListener('resize', _.debounce(this.onResize, 100));
  }

  onResize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Check that the window dimensions have actually changed to avoid
    // unnecessary event-processing on iOS Safari.
    if (
      this.state.windowWidth !== windowWidth ||
      this.state.windowHeight !== windowHeight
    ) {
      const appWidth = this.codeAppRef.offsetWidth;
      const appHeight = this.codeAppRef.offsetHeight;

      this.setState({windowWidth, windowHeight, appWidth, appHeight});
    }
  };

  render() {
    // The tutorial has a width:height ratio of 16:9.
    const aspectRatio = 16 / 9;

    // Let's minimize the tutorial width at 320px.
    const minAppWidth = 320;

    // Let's maximize the tutorial width at 1280px.
    const maxAppWidth = 1280;

    // Leave space above the small footer.
    const reduceAppWidth = 36;

    // Specify a baseline font at a baseline width.
    const baselineFontSize = 18;
    const baselineAppWidth = 930;

    let containerWidth, containerHeight;

    // Constrain tutorial to maximum width.
    const maxContainerWidth = Math.min(this.state.appWidth, maxAppWidth);

    // Leave space above the small footer.
    const maxContainerHeight =
      Math.min(this.state.appHeight, this.state.windowHeight) - reduceAppWidth;

    if (maxContainerWidth / maxContainerHeight > aspectRatio) {
      // Constrain by height.
      containerWidth = maxContainerHeight * aspectRatio;
    } else {
      // Constrain by width.
      containerWidth = maxContainerWidth;
    }

    // Constrain tutorial to minimum width;
    if (containerWidth < minAppWidth) {
      containerWidth = minAppWidth;
    }

    // Calculate the height.
    containerHeight = containerWidth / aspectRatio;

    // The tutorial shows 18px fonts when 930px wide.
    const baseFontSize = (baselineFontSize * containerWidth) / baselineAppWidth;

    // Center the container.
    const containerLeft = (this.state.appWidth - containerWidth) / 2;

    return (
      <StudioAppWrapper>
        <CodeWorkspaceContainer topMargin={0}>
          <div
            id="oceans-container"
            style={{
              ...styles.container,
              width: Math.round(containerWidth),
              height: Math.round(containerHeight),
              left: containerLeft
            }}
            dir="ltr"
          >
            <div
              id="container-react"
              style={{...styles.containerReact, fontSize: baseFontSize}}
            />
            <canvas id="background-canvas" style={styles.backgroundCanvas} />
            <canvas id="activity-canvas" style={styles.activityCanvas} />
          </div>
        </CodeWorkspaceContainer>
      </StudioAppWrapper>
    );
  }
}

export default connect(state => ({
  isProjectLevel: state.pageConstants.isProjectLevel,
  isReadOnlyWorkspace: state.pageConstants.isReadOnlyWorkspace
}))(FishView);
