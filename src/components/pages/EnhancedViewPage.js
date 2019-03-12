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
import {Card, Dropdown, Button, Grid, Header} from 'semantic-ui-react';
import {
  Bar,
  ComposedChart,
  Line,
  Legend,
  AreaChart,
  LineChart,
  Area,
  XAxis,
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
      selection,
      workouts,
      exercises,
      graph_data,
    } = this.props;

    let sortedWorkouts = this.props.workouts.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });

    const generalChart = data => {
      return (
        <ComposedChart
          width={600}
          height={400}
          data={data}
          margin={{top: 25, right: -20, left: -23, bottom: 5}}>
          <XAxis dataKey="parseDate" />
          <YAxis />
          <YAxis yAxisId="right" orientation="right" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#ff7300"
            activeDot={{r: 8}}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="volume"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </ComposedChart>
      );
    };

    let restable = this.props.exercises.map(exercise => {
      return exercise.name;
    });
    return (
      <div>
        {this.state.exerciseList && (
          <Dropdown
            name="exerciseName"
            required
            search
            selection
            value={selection}
            onChange={e => this.retrieveGraph(e.target.innerText)}
            options={this.state.exerciseList}
            placeholder="Select your exercise"
          />
        )}
        {this.state.graph_data && (
          <div style={{height: '80vh', width: '50wh'}}>
            <ResponsiveContainer width="100%" height="100%">
              {generalChart(this.state.graph_data)}
            </ResponsiveContainer>
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
