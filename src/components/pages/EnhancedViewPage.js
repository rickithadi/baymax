import React from 'react';
import {Icon, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {connect} from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import {allWorkoutsSelector} from '../../reducers/workouts';
import {allExercisesSelector} from '../../reducers/exercises';
import AddWorkoutCtA from '../ctas/AddWorkoutCtA';
import {fetchWorkouts} from '../../actions/workouts';
import {fetchExercises} from '../../actions/exercises';
import Moment from 'react-moment';
import {Card, Radio,Dropdown, Form, Button, Grid, Header} from 'semantic-ui-react';
import {
  Bar,
  ReferenceLine,
  Brush,
  ReferenceArea,
  ComposedChart,
  Line,
  Legend,
  AreaChart,
  ScatterChart,
  Scatter,
  LineChart,
  Area,
  XAxis,
  ZAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class EnhancedViewPage extends React.Component {
  state = {
    exerciseList: null,
    graph_data: null,
  };
  getExerciseList = () => {
    this.setState({
      loading: true,
    });
    axios.get('/exercises').then(res => {
      console.log(res.data);
      this.setState({
        loading: false,
        exerciseList: res.data,
      });
    });
  };

  componentDidMount = () => {
    this.onInit(this.props);
    this.getExerciseList();
  };
  onInit = props => {
    props.fetchWorkouts();
    props.fetchExercises();
  };
  handleChange = (e, { value }) => this.setState({ value })
  retrieveGraph(exercise) {
    console.log('selected=', exercise);
    const DATE_OPTIONS = {weekday: 'short', month: 'short', day: 'numeric'};
    let graph = [];
    this.props.exercises.map(ex => {
      if (ex.name === exercise) {
        ex.volume = ex.sets * ex.reps * ex.weight;
        ex.parseDate = new Date(ex.date).toLocaleDateString(
          'en-us',
          DATE_OPTIONS,
        );
        graph.push(ex);
      }
    });
    let sortedExes = graph.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    this.setState({graph_data: sortedExes.reverse()});
    console.log('state', this.state);
  }
  render() {
    const {
      isConfirmed,
      value,
      selection,
      workouts,
      exercises,
      graph_data,
    } = this.props;

    const options = {
      weight: (
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#ff7300"
          activeDot={{r: 8}}
        />
      ),
      sets: (
        <Line type="monotone" yAxisId="right" dataKey="sets" stroke="#cc0099" />
      ),
      reps: (
        <Line type="monotone" yAxisId="right" dataKey="reps" stroke="#0000cc" />
      ),
      volume: (
        <Area
          type="monotone"
          dataKey="volume"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      ),
    };
    const radio = [
      { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
	]

    const Doptions = [
      {
        key: 'Weight',
        value: 'Weight',
        label: {color: 'orange', empty: true, circular: true},
        text: 'Weight',
      },
      {
        key: 'Sets',
        value: 'Sets',
        label: {color: 'pink', empty: true, circular: true},
        text: 'Sets',
      },
      {
        key: 'Reps',
        value: 'Reps',
        label: {color: 'blue', empty: true, circular: true},
        text: 'Reps',
      },
      {
        key: 'Max',
        value: 'Max',
        label: {color: 'black', empty: true, circular: true},
        text: 'Max',
      },
      {
        key: 'Goal',
        value: 'Goal',
        label: {color: 'red', empty: true, circular: true},
        text: 'Goal',
      },
    ];

    let sortedWorkouts = this.props.workouts.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    const generalChart = data => {
      return (
        <ResponsiveContainer width="90%" height="40%">
          <ComposedChart
            width={400}
            height={400}
            data={data}
            syncId="anyId"
            margin={{top: 0, right: 0, left: 0, bottom: 5}}>
            <YAxis unit="kg" type="number" />
            <ReferenceLine
              y={150}
              label="Max"
              stroke="red"
              strokeDasharray="3 3"
            />
            <ReferenceArea
              y1={100}
              y2={130}
              label="optimal"
              stroke="black"
              strokeOpacity={0.3}
            />
            {/* <XAxis dataKey="parseDate" /> */}
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip />
            {options.weight}
          </ComposedChart>
        </ResponsiveContainer>
      );
    };

    const scatterChart = data => {
      return (
        <ResponsiveContainer width="90%" height="40%">
          <ScatterChart
            width={400}
            syncId="anyId"
            height={400}
            margin={{top: 10, right: 0, left: 0, bottom: 5}}>
            <XAxis range={[0, 20]} dataKey="sets" />
            <YAxis range={[0, 20]} type="number" dataKey="reps" />
            <ZAxis range={[0, 200]} dataKey="weight" name="weight" unit="kg" />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            <Scatter name="A school" data={data} fill="#82ca9d" />
          </ScatterChart>
        </ResponsiveContainer>
      );
    };
    const volumeChart = data => {
      return (
        <ResponsiveContainer width="90%" height="60%">
          <ComposedChart
            width={400}
            height={400}
            data={data}
            syncId="anyId"
            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
            <XAxis dataKey="parseDate" />
            <YAxis />
            <YAxis yAxisId="right" hide={true} orientation="right" />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Legend />
            {options.volume}
            {options.sets}
            {options.reps}
            <Brush />
          </ComposedChart>
        </ResponsiveContainer>
      );
    };

    let restable = this.props.exercises.map(exercise => {
      return exercise.name;
    });
    return (
      <div>
        {this.state.exerciseList && (
          <Grid.Row>
            <Form>
              <Form.Group inline>
                <Grid.Column>
                  <Dropdown
                    name="exerciseName"
                    icon="tags"
                    compact
                    required
                    selection
                    floating
                    labeled
                    button
                    className="icon"
                    value={selection}
                    onChange={e => this.retrieveGraph(e.target.innerText)}
                    options={this.state.exerciseList}
                    placeholder="Exercise"
                  />
                </Grid.Column>
                <Grid.Column >
                <Radio toggle
                  label="Max"
                />
                <Radio toggle
                  label="Target"
                  value="target"
                />
                 </Grid.Column>
              </Form.Group>
              <Form.Group inline>
		      <Dropdown fluid multiple selection options={Doptions}
		      placeholder="metrics"/>
                 </Form.Group>
            </Form>
          </Grid.Row>
        )}
        {this.state.graph_data && (
          <div
            style={{
              height: '80vh',
              width: '100wh',
              marginRight: '-30px',
              marginLeft: '-20px',
            }}>
            {generalChart(this.state.graph_data)}
            {volumeChart(this.state.graph_data)}
          </div>
        )}
      </div>
    );
  }
}

EnhancedViewPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchWorkouts: PropTypes.func.isRequired,
  fetchExercises: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    workouts: allWorkoutsSelector(state),
    exercises: allExercisesSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {fetchWorkouts, fetchExercises},
)(EnhancedViewPage);
