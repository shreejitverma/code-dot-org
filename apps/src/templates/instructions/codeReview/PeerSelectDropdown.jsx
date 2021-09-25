import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from '@cdo/apps/templates/DropdownButton';
import Button from '@cdo/apps/templates/Button';
import javalabMsg from '@cdo/javalab/locale';

const PeerSelectDropdown = ({text, peers, onSelectPeer}) => (
  // goal text: No other projects are ready for review yet
  <div style={styles.container}>
    <DropdownButton text={text} color={Button.ButtonColor.white}>
      {peers.length > 0
        ? peers.map(peer => (
            <a
              key={peer.id}
              onClick={() => {
                onSelectPeer(peer);
              }}
            >
              {peer.name}
            </a>
          ))
        : [
            <a key={0} onClick={() => {}}>
              {javalabMsg.noProjectsAvailableForReview()}
            </a>
          ]}
    </DropdownButton>
  </div>
);

PeerSelectDropdown.propTypes = {
  text: PropTypes.string,
  peers: PropTypes.array.isRequired,
  onSelectPeer: PropTypes.func
};

const styles = {
  container: {
    display: 'flex'
  }
};

export default PeerSelectDropdown;
