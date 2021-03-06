import React, { Component } from "react";
import { withRouter } from "next/router";
import { Bar, Line, Pie } from "react-chartjs-2";
import moment from "moment";

class ValidatorChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [],
      },
    };
  }

  setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 600, 550);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    return gradient;
  };

  getChartData = (canvas) => {
    const { participationData } = this.props;
    let colors = ["rgb(0,194,152)", "rgba(53,87,210)"];
    let data = {
      labels: participationData.timestamp,
      datasets: [
        {
          label: "Active Validators",
          yAxisID: "active_validators",

          fill: true,
          // backgroundColor: 'rgba(255, 0, 255, 0.75)',
          // borderColor: color[1],
          // pointBackgroundColor: color[1],
          // pointBorderColor: color[1],
          // pointHoverBackgroundColor: color[1],
          // pointHoverBorderColor: color[1],

          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: participationData.active_validators_count,
        },
        {
          label: "Eligible Ether (ETH)",
          yAxisID: "eligible_ether",
          fill: true,
          // backgroundColor: 'rgba(0, 255, 0, 0.75)',
          // borderColor: color[2],
          // pointBackgroundColor: color[2],
          // pointBorderColor: color[2],
          // pointHoverBackgroundColor: color[2],
          // pointHoverBorderColor: color[2],

          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: participationData.eligible_ether,
        },
      ],
    };

    data.datasets.forEach((set, i) => {
      set.backgroundColor = this.setGradientColor(canvas, colors[i]);
      set.borderWidth = 2;
      set.borderColor = colors[i];
      set.pointBackgroundColor = colors[i];
      set.pointBorderColor = colors[i];
      set.pointHoverBackgroundColor = colors[i];
      set.pointHoverBorderColor = colors[i];
    });

    return data;
  };

  render() {
    const { participationData } = this.props;
    const { chartData } = this.state;

    return (
      <div className="chart-container line-chart card">
        <Line
          id="lineChart"
          style={{ width: "100%" }}
          data={this.getChartData}
          // data={chartData}
          // height={30%}
          // width={80}
          options={{
            initialize: function (data) {
              Chart.types.Line.prototype.initialize.apply(this, arguments);

              // keep a reference to the original clear
              this.originalClear = this.clear;
              this.clear = function () {
                this.originalClear();

                // 1 x scale unit
                var unitX =
                  this.datasets[0].points[1].x - this.datasets[0].points[0].x;

                var yTop = this.scale.startPoint;
                var yHeight = this.scale.endPoint - this.scale.startPoint;

                // change your color here
                this.chart.ctx.fillStyle = "rgba(100,100,100,0.8)";

                // we shift it by half a x scale unit to the left because the space between gridline is actually a shared space
                this.chart.ctx.fillRect(
                  this.datasets[0].points[5].x - 0.5 * unitX,
                  yTop,
                  unitX * 5,
                  yHeight
                );
                this.chart.ctx.fillRect(
                  this.datasets[0].points[15].x - 0.5 * unitX,
                  yTop,
                  unitX * 5,
                  yHeight
                );
              };
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Validator Participation Chart",
            },
            legend: {
              display: true,
              position: "bottom",
              fontSize: 25,
            },
            scales: {
              xAxes: [
                {
                  stacked: true,
                },
              ],
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
            tooltips: {
              mode: "index",
              intersect: false,
              callbacks: {
                label: function (tooltipItem, data, index) {
                  var value =
                    Math.round(
                      data.datasets[tooltipItem.datasetIndex].data[
                        tooltipItem.index
                      ] * 100
                    ) / 100;
                  var label = data.datasets[tooltipItem.datasetIndex].label;
                  value = value
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return label + " " + value;
                },
                title: function (tooltipItem, data, index) {
                  return (
                    tooltipItem[0].label.split(",")[0] +
                    " (UTC), " +
                    tooltipItem[0].label.split(",")[1]
                  );
                },
              },
            },
            hover: {
              mode: "index",
              intersect: false,
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false,
                  },
                  id: "active_validators",
                  type: "linear",
                  position: "left",
                  scaleLabel: {
                    display: true,
                    labelString: "Active Validators",
                  },
                },
                {
                  gridLines: {
                    drawOnChartArea: false,
                  },
                  id: "eligible_ether",
                  type: "linear",
                  position: "right",
                  ticks: {
                    // Abbreviate the Thousands
                    // callback: function(value, index, values) {
                    //     return value / 1e3 + 'K';
                    // }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Eligible Ether (ETH)",
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false,
                  },
                  ticks: {
                    // display: !this.isMobileDevice(),
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                    maxTicksLimit: 4,
                    callback: function (label) {
                      const customLabel = [label[1]];
                      // const customLabel =[moment(label[0]).format('HH:mm')+ '    ',label[1]]
                      // const customLabel = [label[0].split(" ")[1].slice(0, -3)+'    ', label[1]]
                      return customLabel;
                      // return label[0].split(" ")[1].slice(0, -3) +'\n' + label[1];
                      // if (/\s/.test(label)) {
                      //   return label.split(" ")[1].slice(0, -3);
                      // }else{
                      //   return label;
                      // }
                    },
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default withRouter(ValidatorChart);
