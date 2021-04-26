import React from 'react';
import {Chart} from 'react-google-charts';
import color from '@cdo/apps/util/color';
import BaseDialog from '@cdo/apps/templates/BaseDialog.jsx';
import * as coreLibrary from './coreLibrary';

export const INITIAL_STATE = {
  isVisualizerOpen: false,
  selectedTab: 'TABLE'
};

const dataVizTabs = [
  {
    key: 'TABLE',
    headerText: 'Table'
  },
  {
    key: 'CHART',
    headerText: 'Chart'
  }
];

const styles = {
  container: {
    margin: 'auto',
    textAlign: 'center'
  },
  pill: {
    ':hover': {
      color: color.teal
    },
    border: 'none',
    borderRadius: 50,
    fontSize: 20,
    backgroundColor: color.lightest_gray,
    color: color.charcoal,
    margin: '0 0 0 20px',
    padding: '8px 18px',
    float: 'left',
    cursor: 'pointer'
  },
  selectedPill: {
    ':hover': {
      color: color.white
    },
    backgroundColor: color.teal,
    color: color.white
  }
};

class SpritelabDataView extends React.Component {
  static propTypes = {};

  state = {...INITIAL_STATE};

  handleOpen = () => {
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
          <h1>Simulation Data Visualizer</h1>
          <div style={{height: '36px'}}>
            {dataVizTabs.map(tab => (
              <div
                key={tab.key}
                style={
                  this.state.selectedTab === tab.key
                    ? {...styles.pill, ...styles.selectedPill}
                    : styles.pill
                }
                onClick={() => this.setState({selectedTab: tab.key})}
              >
                {tab.headerText}
              </div>
            ))}
          </div>

          {this.state.selectedTab === 'TABLE' && (
            <table style={styles.container}>
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
          )}
          {this.state.selectedTab === 'CHART' && (
            <Chart
              style={styles.container}
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                colors: [color.purple],
                hAxis: {
                  title: 'Time',
                  showTextEvery: 1
                },
                vAxis: {
                  title: 'Value'
                },
                legend: 'none',
                lineWidth: 3,
                pointSize: 9
              }}
            />
          )}
        </BaseDialog>
      </span>
    );
  }
}

export default SpritelabDataView;
