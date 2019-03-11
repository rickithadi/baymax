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
import {Card,Dropdown, Button, Grid, Header} from 'semantic-ui-react';
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
    modalOpen: false,
    temp_ex: {},
    selection:'',
    exerciseList: null,
    graph_data: [],
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
  handleOpen = exercise => {
    this.setState({
      modalOpen: true,
      temp_ex: exercise,
    });
    this.retrieveGraph(exercise);
  };
  handleClose = () =>
    this.setState({
      modalOpen: false,
    });

  sortDate(graph_data) {
    graph_data.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });

    console.log('sorted date of ', graph_data);
  }
  retrieveGraph(exercise) {
    const DATE_OPTIONS = {weekday: 'short', month: 'short', day: 'numeric'};
    let graph = [];
    this.props.exercises.map(ex => {
      if (ex.name === exercise.name) {
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
    //dummy
    let hold = sortedExes;
    sortedExes.map((ex, index) => {
      if (ex._id === exercise._id) {
        this.simpleGraphData(index, hold);
      }
    });
  }
  simpleGraphData(index, unfilteredData) {
    let final = [];
    let count = 0;
    let limit;
    if (unfilteredData.length - index > 5) {
      limit = 6;
    } else {
      limit = unfilteredData.length - index;
    }
    //start graph from current date
    do {
      final.push(unfilteredData[index]);
      index++;
      count++;
      console.log('count', count, index);
    } while (count < limit);
    final.reverse();
    this.setState({graph_data: final});
  }

  render() {
    const {isConfirmed,selection, workouts, exercises, graph_data} = this.props;

    let sortedWorkouts = this.props.workouts.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });

    const renderLineChart = data => {
      return (
        <ResponsiveContainer width="100%" height="100%">
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
            {/* <Area yAxisId="right" type="monotone" dataKey="volume" stroke="#82ca9d" /> */}

            <Area
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
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
                        <Dropdown
                          name="exerciseName"
                          required
                          search
                          selection
                          value={selection}
                          onChange={e =>
                            this.setState({temp_name: e.target.innerText})
                          }
                          options={this.state.exerciseList}
                          placeholder="Select your exercise"
                        />
                      )}
                  there are gonna graphs and shit here
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
