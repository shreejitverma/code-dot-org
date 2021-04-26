import React from 'react';
import {Chart} from 'react-google-charts';
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
    const chartData = coreLibrary.dataLog.map(x => [x.time, x.datum]);
    chartData.unshift(['time', 'datum']);

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
          <div style={{display: 'inline-block', height: '300px'}}>
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
          </div>
          <div style={{display: 'inline-block'}}>
            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                colors: ['#00adbc'],
                hAxis: {
                  title: 'Time',
                  showTextEvery: 1
                },
                vAxis: {
                  title: 'Value'
                },
                legend: 'none',
                lineWidth: 5,
                pointSize: 10
              }}
            />
          </div>
        </BaseDialog>
      </span>
    );
  }
}

export default SpritelabDataView;
