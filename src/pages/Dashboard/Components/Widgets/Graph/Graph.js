import React, { PureComponent } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { updateGraph } from "../../../../../redux/action";
import { connect } from "react-redux";

class Graph extends PureComponent {

  graphWindowIterval = undefined;

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      options: {
        chart: {
          id: `realtime${this.props.id}`,
          background: "#f4f4f4",
          foreColor: "#333",
          type: "bar",
          height: "350",
          width: "100%",
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 5,
            left: -7,
            top: 22,
          },
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: {
          min: 0,
          decimalsInFloat: 2,
        },
      },
      series: [
        {
          name: "series-0",
          data: [],
        },
        {
          name: "series-1",
          data: [],
        },
        {
          name: "series-2",
          data: [],
        },
        {
          name: "series-3",
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    console.log("graph", this.props.deviceList[this.props.id - 1]);

    this.graphWindowIterval = window.setInterval(() => {
      //console.log("v1", this.props.deviceList[this.props.id - 1].v1);
      ApexCharts.exec(`realtime${this.props.id}`, "updateSeries", [
        {
          name: "series-0",
          data: this.props.deviceList[this.props.id - 1].v1.slice(
            this.props.deviceList[this.props.id - 1].v1.length -
              parseInt(this.props.deviceList[this.props.id - 1].graphRange.name)
          ),
        },
        {
          name: "series-1",
          data: this.props.deviceList[this.props.id - 1].v2.slice(
            this.props.deviceList[this.props.id - 1].v2.length -
              parseInt(this.props.deviceList[this.props.id - 1].graphRange.name)
          ),
        },
        {
          name: "series-2",
          data: this.props.deviceList[this.props.id - 1].v3.slice(
            this.props.deviceList[this.props.id - 1].v3.length -
              parseInt(this.props.deviceList[this.props.id - 1].graphRange.name)
          ),
        },
        {
          name: "series-3",
          data: this.props.deviceList[this.props.id - 1].v4.slice(
            this.props.deviceList[this.props.id - 1].v4.length -
              parseInt(this.props.deviceList[this.props.id - 1].graphRange.name)
          ),
        },
      ]);
    }, 1000);

  }

  componentWillUnmount() {
    window.clearInterval(this.graphWindowIterval)
  }

  dismiss() {
    this.el.remove();
}

  render() {

    return <Chart options={this.state.options} series={this.state.series} />;
  }
}

const mapStateToProps = (state) => {
  return {
    deviceList: state.deviceList,
  };
};

const mapDispatchToProps = {
  updateGraph,
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
