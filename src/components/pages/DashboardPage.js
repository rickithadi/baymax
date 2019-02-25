import React from 'react';
import {Icon, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import {allWorkoutsSelector} from '../../reducers/workouts';
import {allExercisesSelector} from '../../reducers/exercises';
import AddWorkoutCtA from '../ctas/AddWorkoutCtA';
import {fetchWorkouts} from '../../actions/workouts';
import {fetchExercises} from '../../actions/exercises';
import Moment from 'react-moment';
import {Card, Button, Grid, Header} from 'semantic-ui-react';
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

class DashboardPage extends React.Component {
  state = {
    modalOpen: false,
    temp_ex: {},
    graph_data: [],
  };

  componentDidMount = () => {
    this.onInit(this.props);
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
    this.retrieveGraph(exercise.name);
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
      if (ex.name === exercise) {
        ex.volume = ex.sets * ex.reps;
        ex.parseDate = new Date(ex.date).toLocaleDateString(
          'en-us',
          DATE_OPTIONS,
        );
        graph.push(ex);
      }
    });
    console.log('graph', graph);
    this.sortDate(graph);
    this.setState({graph_data: graph});
  }

  render() {
    const {isConfirmed, workouts, exercises, graph_data} = this.props;

    let sortedEx = this.props.workouts.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });

    const renderLineChart = data => {
      return (
        <ResponsiveContainer width={'100%'} height="80%">
          <ComposedChart
            width={600}
            height={400}
            data={data}
            margin={{top: 5, right: 25, left: 5, bottom: 5}}>
            <XAxis dataKey="parseDate" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#ff7300"
              activeDot={{r: 8}}
            />
            <Area type="monotone" dataKey="volume" stroke="#82ca9d" />
          </ComposedChart>
        </ResponsiveContainer>
      );
    };

    let restable = this.props.exercises.map(exercise => {
      return exercise.name;
    });
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {workouts.length === 0 ? (
          <AddWorkoutCtA />
        ) : (
          <div className="bookList">
            {sortedEx.map(workout => {
              return (
                <Card key={workout._id} fluid>
                  <Card.Content>
                    <Card.Header style={{display: 'flex'}}>
                      <Moment format="D MMM YYYY">{workout.date}</Moment>
                    </Card.Header>
                    <Card.Meta style={{display: 'flex'}}>
                      <p>
                        <span style={{marginTop: '30px'}}>{workout.desc}</span>
                      </p>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <Card.Group stackable itemsPerRow={4}>
                      {this.props.exercises.map(exercise => {
                        if (exercise.workoutId === workout._id) {
                          return (
                            <Card key={exercise._id}>
                              <Card.Header textAlign="center">
                                <h3>{exercise.name}</h3>
                              </Card.Header>
                              <Card.Content textAlign="center">
                                <Card.Header
                                  textAlign="center"
                                  style={{color: 'red'}}>
                                  {exercise.weight}kg
                                </Card.Header>
                                {exercise.sets} sets X {exercise.reps} reps
                              </Card.Content>
                              <Card.Content extra>
                                <div className="ui two buttons">
                                  <Button
                                    onClick={() => this.handleOpen(exercise)}>
                                    <Icon name="line graph" size="large" />
                                  </Button>

                                  <Button
                                    onClick={() =>
                                      this.setState({penis: exercise})
                                    }>
                                    <Icon name="info" size="large" />
                                  </Button>
                                </div>
                              </Card.Content>
                            </Card>
                          );
                        }
                      })}
                    </Card.Group>
                  </Card.Content>
                </Card>
              );
            })}
          </div>
        )}
        <Modal
          open={this.state.modalOpen}
          size="large"
          onClose={this.handleClose}
          dimmer="blurring">
          <Header icon="eye" content={this.state.temp_ex.name} />
          <Modal.Content style={{height: '100vh'}}>
            {renderLineChart(this.state.graph_data)}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

DashboardPage.propTypes = {
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
)(DashboardPage);
