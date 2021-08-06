import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@cdo/locale';
import color from '@cdo/apps/util/color';
import FontAwesome from '@cdo/apps/templates/FontAwesome';
import JavalabButton from './JavalabButton';
import JavalabSettings from './JavalabSettings';

export default function ControlButtons({
  isRunning,
  toggleRun,
  isEditingStartSources,
  disableFinishButton,
  onContinue,
  renderSettings,
  disableRunButtons
}) {
  return (
    <div>
      <div style={styles.leftButtons}>
        <JavalabButton
          text={isRunning ? i18n.stop() : i18n.runProgram()}
          icon={
            <FontAwesome icon={isRunning ? 'stop' : 'play'} className="fa" />
          }
          onClick={toggleRun}
          isHorizontal
          style={{...styles.button.all, ...styles.button.orange}}
          isDisabled={disableRunButtons}
          id="javalabRun"
        />
      </div>
      <div style={styles.rightButtons}>
        <JavalabSettings>{renderSettings()}</JavalabSettings>
        {!isEditingStartSources && (
          <JavalabButton
            text={i18n.finish()}
            onClick={onContinue}
            style={{...styles.button.all, ...styles.button.blue}}
            isDisabled={disableFinishButton}
            id="javalabFinish"
          />
        )}
      </div>
    </div>
  );
}

ControlButtons.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  toggleRun: PropTypes.func.isRequired,
  isEditingStartSources: PropTypes.bool,
  disableFinishButton: PropTypes.bool,
  onContinue: PropTypes.func.isRequired,
  renderSettings: PropTypes.func.isRequired,
  disableRunButtons: PropTypes.bool
};

const styles = {
  leftButtons: {
    float: 'left'
  },
  rightButtons: {
    float: 'right'
  },
  button: {
    all: {
      float: 'left',
      fontSize: 15,
      width: 140,
      backgroundColor: color.orange,
      borderColor: color.orange,
      fontFamily: '"Gotham 5r"',
      padding: '5px 12px',
      margin: '5px 0 5px 5px',
      justifyContent: 'center',
      ':hover': {
        color: color.white,
        boxShadow: 'none'
      }
    },
    orange: {
      backgroundColor: color.orange,
      borderColor: color.orange
    },
    white: {
      backgroundColor: color.white,
      borderColor: color.dark_charcoal,
      color: color.dark_charcoal,
      ':hover': {
        color: color.dark_charcoal,
        boxShadow: 'none'
      }
    },
    blue: {
      backgroundColor: color.default_blue,
      borderColor: color.default_blue
    }
  },
  finish: {
    backgroundColor: color.orange,
    borderColor: color.orange,
    fontFamily: '"Gotham 5r"',
    fontSize: '15px',
    padding: '1px 8px',
    margin: '5px 0 5px 5px'
  }
};
