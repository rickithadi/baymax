import { LineChart, Line,XAxis,YAxis,CartesianGrid,Tooltip } from 'recharts';
import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class SimpleGraph extends React.Component {
  state = {
 data: {
   weight: this.props.exercise.weight,
   sets: this.props.exercise.sets,
   reps: this.props.exercise.reps,
   name: this.props.exercise.name,
   date: this.props.exercise.date
 },
 loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    console.log('graph received', props);
    this.setState({
      data: {
        weight: props.exercise.weight,
        sets: props.exercise.sets,
        reps: props.exercise.reps,
        name: props.exercise.name,
        date: props.exercise.date
      },
    });
  }
  filterData(graphData){
}

 render() {
    const { errors, data, loading } = this.state;
    const sample = [
      { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
        { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
	  { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
	    { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
	      { name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28 },
	        { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
		  { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
		    { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
		      { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
		        { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
			];
    return (
      <Segment>
		      <LineChart width={300} height={300} data={sample} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
		 <Line type="monotone" dataKey="uv" stroke="#8884d8" />
		 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
		  <XAxis dataKey="name" />
		    <YAxis />
		      <Tooltip />
	.			</LineChart>
     </Segment>
    );
  }
}

SimpleGraph.propTypes = {
  exercise: PropTypes.shape({
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    sets: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  })
};

export default SimpleGraph;
