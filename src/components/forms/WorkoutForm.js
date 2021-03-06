import React from 'react';
import Formsy from 'formsy-react';
import {
  Label,
  Dropdown,
  Select,
  TextArea,
  Form,
  Input,
} from 'formsy-semantic-ui-react';
import {Card} from 'semantic-ui-react';
import {Header, Checkbox, Icon, Modal} from 'semantic-ui-react';
import axios from 'axios';
// import { Input } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {allExercisesSelector} from '../../reducers/exercises';
import {createExercise, fetchExercises} from '../../actions/exercises';
import PropTypes from 'prop-types';
import {Button, Grid, Segment, Image} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class WorkoutForm extends React.Component {
  state = {
    modalOpen: false,
    EditModalOpen: false,
    loading: false,
    workout: null,
    exercises: [],
    formError: false,
  };

  handleOpen = () =>
    this.setState({
      modalOpen: true,
    });
  handleClose = exercise => {
    this.setState({
      modalOpen: false,
    });
    this.clearlocalEx();
  };
  editHandleOpen = (exercise, key) =>
    this.setState({
      EditModalOpen: true,
      temp_name: exercise.name,
      temp_sets: exercise.sets,
      temp_reps: exercise.reps,
      temp_weight: exercise.weight,
      temp_key: key,
    });
  editHandleClose = () =>
    this.setState({
      EditModalOpen: false,
    });

  componentDidMount = () => {
  };
  onInit = props => {
    props.fetchExercises();
  };
  addLocalEx = exercise => {
    console.log('adding local', exercise);
    this.state.exercises.push(exercise);
    console.log('now execise =', this.state.exercises);
    // this.clearlocalEx();
  };
  removeLocalEx = (exerciseKey, exlist) => {
    console.log('removing', exerciseKey);
    console.log('=', exlist[exerciseKey]);
    exlist.splice(exerciseKey, 1);
    console.log('local', exlist);

    this.setState({
      exercises: exlist,
    });
  };

  editLocalEx = (exercise, key) => {
    console.log('editing', exercise);

    let list = this.state.exercises;
    list[key] = exercise;
    console.log('exercises are now ', list[key]);
    this.setState({
      exercises: list,
    });

    this.clearlocalEx();
    this.editHandleClose();
  };
  getExerciseList = () => {
    this.setState({
      loading: true,
    });
  };

  handleSubmit = e => {
    console.log('submitted', e);
    let temp = {
      name: e.exerciseName,
      reps: e.reps,
      sets: e.sets,
      weight: e.weight,
    };
    this.addLocalEx(temp);
    this.refs.form.reset();
  };
  editHandleSubmit = e => {
    console.log('submitted for edit', e);
    let temp = {
      name: e.exerciseName,
      reps: e.reps,
      sets: e.sets,
      weight: e.weight,
    };

    let key = this.state.temp_key;
    this.editLocalEx(temp, key);
    this.refs.editForm.reset();
  };
  finalHandleSubmit = e => {
    console.log('submitted final', e);
    let workout = {
      desc: e.workoutRemarks,
      exercises: this.state.exercises,
    };
    this.props.submit(workout);
  };

  clearlocalEx = () => {
    this.setState({
      temp_weight: '',
      temp_sets: '',
      temp_reps: '',
      temp_name: null,
    });
  };

  render() {
    const {
      errors,
      user,
      data,
      loading,
      temp_name,
      temp_reps,
      temp_sets,
      temp_weight,
    } = this.state;
    let localExercises = this.state.exercises;
    const centered = {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      padding: '15px',
    };
    return (
      <div>
        <div>
          <Card.Group stackable itemsPerRow={3} style={centered}>
            {this.state.exercises.length > 0 &&
              this.state.exercises.map((ex, i) => {
                return (
                  <Card key={i}>
                    <Card.Content>
                      <Card.Header>{ex.name}</Card.Header>
                      <Card.Meta>
                        {ex.sets} by {ex.reps} at <strong>{ex.weight}kg</strong>
                      </Card.Meta>
                      <Card.Description>
                        description stuff auaucyh
                        <strong>best friends</strong>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button
                          onClick={() => this.editHandleOpen(ex, i)}
                          basic
                          color="blue">
                          <Icon name="edit" size="large" />
                        </Button>
                        <Button
                          onClick={() =>
                            this.removeLocalEx(i, this.state.exercises)
                          }
                          basic
                          color="red">
                          <Icon name="delete" size="large" />
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                );
              })}

            <Card centered onClick={this.handleOpen}>
              <Card.Content>
                <Grid centered>
                  <Card.Description>
                    Tap here to add an exercise
                    <Icon name="plus circle" size="massive" />
                  </Card.Description>
                </Grid>
              </Card.Content>
            </Card>
          </Card.Group>
          <Grid centered>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} computer={12}>
                <Formsy onValidSubmit={this.finalHandleSubmit} ref="finalForm">
                  <TextArea
                    name="workoutRemarks"
                    size="huge"
                    rows={3}
                    placeholder="Workout remarks"
                    style={{width: '100%', padding: '5px'}}
                  />
                  <Grid.Column textAlign="center" style={{textAlign: 'center'}}>
                    <Button
                      type="submit"
                      size="huge"
                      disabled={this.state.exercises.length < 1}
                      style={{centered: 'horizontal'}}>
                      Submit
                    </Button>
                  </Grid.Column>
                </Formsy>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Modal
          open={this.state.EditModalOpen}
          onClose={this.editHandleClose}
          size="small"
          /* style={inlineStyle.modal} */
        >
          <Header icon="browser" content="Edit Exercise" />
          <Modal.Content>
            <Formsy onValidSubmit={this.editHandleSubmit} ref="editForm">
              <Form.Group>
                <Grid centered>
                  <Grid.Row>
                    <Form.Field required>
                      {this.props.user.exercise_list && (
                        <Dropdown
                          name="exerciseName"
                          required
                          search
                          selection
                          value={temp_name}
                          onChange={e =>
                            this.setState({temp_name: e.target.innerText})
                          }
                          options={this.props.user.exercise_list}
                          placeholder="Select your exercise"
                        />
                      )}
                    </Form.Field>
                    {this.state.formError && <h4>invalid</h4>}
                  </Grid.Row>
                  <Grid.Row>
                    <Form.Input
                      name="sets"
                      value={temp_sets}
                      type="number"
                      required
                      onChange={e => this.setState({temp_sets: e.target.value})}
                      placeholder="Sets"
                    />
                    <Form.Input
                      name="reps"
                      value={temp_reps}
                      type="number"
                      required
                      onChange={e => this.setState({temp_reps: e.target.value})}
                      placeholder="Reps"
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Form.Input
                      name="weight"
                      value={temp_weight}
                      type="number"
                      required
                      size="massive"
                      onChange={e =>
                        this.setState({temp_weight: e.target.value})
                      }
                      placeholder="Weight"
                    />
                  </Grid.Row>

                  <Form.Button color="green" type="submit" inverted>
                    Edit
                  </Form.Button>
                </Grid>
              </Form.Group>
            </Formsy>
          </Modal.Content>
        </Modal>
        <div>
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            size="small"
            /* style={inlineStyle.modal} */
          >
            <Header icon="browser" content="Add Exercise" />
            <Modal.Content>
              <Formsy onValidSubmit={this.handleSubmit} ref="form">
                <Form.Group>
                  <Grid centered>
                    <Grid.Row>
                      <Form.Field required>
                        {this.props.user.exercise_list && (
                          <Dropdown
                            name="exerciseName"
                            required
                            search
                            selection
                            value={temp_name}
                            onChange={e =>
                              this.setState({temp_name: e.target.innerText})
                            }
                          options={this.props.user.exercise_list}
                            placeholder="Select your exercise"
                          />
                        )}
                      </Form.Field>
                      {this.state.formError && <h4>invalid</h4>}
                    </Grid.Row>
                    <Grid.Row>
                      <Form.Input
                        name="sets"
                        value={temp_sets}
                        type="number"
                        style={{textAlign: 'center'}}
                        min="0"
                        required
                        onChange={e =>
                          this.setState({temp_sets: e.target.value})
                        }
                        placeholder="Sets"
                      />
                      <Form.Input
                        name="reps"
                        value={temp_reps}
                        type="number"
                        min="0"
                        required
                        onChange={e =>
                          this.setState({temp_reps: e.target.value})
                        }
                        placeholder="Reps"
                      />
                    </Grid.Row>
                    <Grid.Row>
                      <Form.Input
                        name="weight"
                        value={temp_weight}
                        type="number"
                        min="0"
                        required
                        size="massive"
                        onChange={e =>
                          this.setState({temp_weight: e.target.value})
                        }
                        placeholder="Weight"
                      />
                    </Grid.Row>

                    <Form.Button color="green" type="submit" inverted>
                      submit
                    </Form.Button>
                  </Grid>
                </Form.Group>
              </Formsy>
            </Modal.Content>
            <Modal.Actions />
          </Modal>
        </div>
      </div>
    );
  }
}

WorkoutForm.propTypes = {
  submit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  createExercise: PropTypes.func.isRequired,
  fetchExercises: PropTypes.func.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,

  // exerciseList:PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    exercises: allExercisesSelector(state),
  };
}
export default connect(
  mapStateToProps,
  {
    createExercise,
    fetchExercises,
  },
)(WorkoutForm);
