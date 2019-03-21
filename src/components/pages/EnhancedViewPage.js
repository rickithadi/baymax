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
import {
  Card,
  Radio,
  Dropdown,
  Form,
  Button,
  Grid,
  Header,
} from 'semantic-ui-react';
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
    target: false,
    max: false,
    Weight: false,
    Sets: false,
    Reps: false,
    RPE: false,
    target_value: null,
    max_value: null,
    graph_data: null,
  };
  componentDidMount = () => {
    this.onInit(this.props);
  };
  onInit = props => {
    props.fetchWorkouts();
    props.fetchExercises();
  };
  handleChange = (e, {value}) => this.setState({value});

  setMetrics = (addText, deleteText) => {
    if (addText === '') {
      console.log('deleting', deleteText);
      this.setState({[deleteText]: false});
    } else {
      console.log('setting', addText);

      this.setState({[addText]: true});
    }
    console.log(this.state)
  };

  setMaxandToggle(exercise) {
    let list = {};

    this.props.user.exercise_list.map((ex, i) => {
      if (ex.text == exercise) {
        list = ex;
      }
    });
    console.log('found max', list.max);
    this.setState({target_value: list.target, max_value: list.max});
  }
  retrieveGraph(exercise) {
    console.log('selected=', exercise);
    this.setMaxandToggle(exercise);
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
      user,
      value,
      workouts,
      exercises,
      graph_data,
      metrics,
    } = this.props;
    const selection = ['weight', 'sets', 'reps'];

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
        <Line
          type="monotone"
		yAxisId="right"
          dataKey="sets"
          stroke="#cc0099"
          dot={false}
        />
      ),
      reps: (
        <Line
          type="monotone"
          yAxisId="right"
          dataKey="reps"
          stroke="#0000cc"
          dot={false}
        />
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
        key: 'Volume',
        value: 'Volume',
        label: {color: 'green', empty: true, circular: true},
        text: 'Volume',
      },
{
        key: 'RPE',
        value: 'RPE',
        label: {color: 'yellow', empty: true, circular: true},
        text: 'RPE',
      },
    ];
    const max = (
      <ReferenceLine
        y={this.state.max_value}
        label="Max"
        stroke="red"
        strokeDasharray="3 3"
      />
    );

    const target = (
      <ReferenceLine
        y={this.state.target_value}
        label="Target"
        stroke="brown"
        strokeDasharray="3 3"
      />
    );
    const range = (
      <ReferenceArea
        y1={130}
        y2={190}
        label="Optimal"
        stroke="brown"
        strokeDasharray="3 3"
      />
    );

    let sortedWorkouts = this.props.workouts.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    const generalChart = data => {
      return (
        <ResponsiveContainer width="95%" height="40%">
          <ComposedChart
            width={400}
            height={400}
            data={data}
            syncId="anyId"
            margin={{top: 0, right: 0, left: 0, bottom: 5}}>
            <YAxis unit="kg" type="number" domain={[0, 200]} />
            {this.state.max && max}

            <XAxis dataKey="parseDate" type="category" hide={true}/>
            {this.state.target && target}
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip />
            {this.state.Weight && options.weight}
          </ComposedChart>
        </ResponsiveContainer>
      );
    };

    const volumeChart = data => {
      return (
        <ResponsiveContainer width="95%" height="60%">
          <ComposedChart
            width={400}
            height={400}
            data={data}
            syncId="anyId"
            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
            <XAxis dataKey="parseDate" type="category" />
            <YAxis />
            <YAxis yAxisId="right" hide={true} orientation="right" />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <CartesianGrid strokeDasharray="1 1" />
            <Tooltip />
            {/* <Legend /> */}
            <Legend />
            {this.state.Volume && options.volume}
            {this.state.Sets && options.sets}
            {this.state.Reps && options.reps}
            <Brush />
          </ComposedChart>
        </ResponsiveContainer>
      );
    };

    let restable = this.props.exercises.map(exercise => {
      return exercise.name;
    });
    return (
      <div

      >
        {this.props.user && (
          <Grid centered>
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
                      onChange={e => this.retrieveGraph(e.target.innerText)}
                      options={this.props.user.exercise_list}
                      placeholder="Exercise"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Radio
                      toggle
                      label="Max"
                      value="this.state.max"
                      onChange={e => this.setState({max: !this.state.max})}
                      //value={this.state.max}
                    />
                    <Radio
                      toggle
                      label="Target"
                      value="this.state.target"
                      onChange={e =>
                        this.setState({target: !this.state.target})
                      }
                    />
                  </Grid.Column>
                </Form.Group>
                <Form.Group inline>
                  <Dropdown
                    fluid
                    multiple
                    selection
                    // value={this.state.metrics|| []}
                    options={Doptions}
                    onChange={e =>
                      this.setMetrics(
                        e.target.textContent,
                        e.target.parentElement.textContent,
                      )
                    }
                    placeholder="metrics"
                  />
                </Form.Group>
              </Form>
            </Grid.Row>
          </Grid>
        )}
        {this.state.graph_data && (
          <div
            style={{
              height: '80vh',
              width: '90wh',
              marginRight: '10px',
              marginLeft: '-15px',
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
    user: state.user,
    isConfirmed: !!state.user.confirmed,
    workouts: allWorkoutsSelector(state),
    exercises: allExercisesSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {fetchWorkouts, fetchExercises},
)(EnhancedViewPage);
