import React from 'react';
import BaseDialog from '@cdo/apps/templates/BaseDialog.jsx';
import * as coreLibrary from './coreLibrary';

export const INITIAL_STATE = {
  isVisualizerOpen: false
};

class SpritelabDataView extends React.Component {
  static propTypes = {};

  state = {...INITIAL_STATE};

  handleOpen = () => {
    console.log(coreLibrary.dataLog);
    this.setState({isVisualizerOpen: true});
  };

  handleClose = () => this.setState({isVisualizerOpen: false});

  render() {
    return (
      <span>
        <button type="button" onClick={this.handleOpen}>
          See Data
        </button>
        <BaseDialog
          isOpen={this.state.isVisualizerOpen}
          handleClose={this.handleClose}
          fullWidth
          fullHeight
        >
          <table>
            <tbody>
              <tr>
                <th>Time</th>
                <th>Value</th>
              </tr>
              {coreLibrary.dataLog.map((logItem, index) => (
                <tr key={index}>
                  <td>{logItem.time}</td>
                  <td>{logItem.datum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </BaseDialog>
      </span>
    );
  }
}

export default SpritelabDataView;
