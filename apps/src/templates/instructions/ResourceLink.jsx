import React, { PropTypes } from 'react';
import Radium from 'radium';
import color from '@cdo/apps/util/color';
import FontAwesome from '@cdo/apps/templates/FontAwesome';
import LegacyDialog from '../../code-studio/LegacyDialog';

const styles = {
  textLink: {
    display: 'inline-block',
    margin: 8,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: '25px',
    cursor: 'pointer',
    maxWidth: '90%'
  },
  mapThumbnail: {
    backgroundColor: color.teal,
  },
  commonThumbnail: {
    borderRadius: 5,
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 16,
    paddingBottom: 9,
  },
  commonIcon: {
    fontSize: 22,
  },
  mapIcon: {
    color: color.white
  },
  resourceIcon: {
    color: color.teal
  },
  resourceStyle: {
    margin: 8
  }
};

class ResourceLink extends React.Component {
  static propTypes = {
    highlight: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
  };

  state = {
    dialogSelected: false
  };

  selectResource = () => {
    var dialog = new LegacyDialog({
      body: $('<iframe>')
        .addClass('markdown-instructions-container')
        .width('100%')
        .attr('src', this.props.reference),
      autoResizeScrollableElement: '.markdown-instructions-container',
      id: 'block-documentation-lightbox'
    });
    dialog.show();
  };

  render() {
    const {icon, text, highlight} = this.props;

    const iconStyle = {
      ...styles.commonIcon,
      ...(highlight ? styles.mapIcon : styles.resourceIcon)};
    const thumbnailStyle = {
      ...styles.commonThumbnail,
      ...(highlight && styles.mapThumbnail)};

    return (
      <div>
        <div style={styles.resourceStyle} onClick={this.selectResource}>
          <span style={thumbnailStyle}>
            <FontAwesome
              icon={icon}
              style={iconStyle}
              title={text}
            />
          </span>
          <a style={styles.textLink}>
            {text}
          </a>
        </div>
      </div>
    );
  }
}

export default Radium(ResourceLink);
