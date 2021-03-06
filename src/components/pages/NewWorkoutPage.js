import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import WorkoutForm from "../forms/WorkoutForm";
import { createWorkout } from "../../actions/workouts";
import { createExercise } from "../../actions/exercises";

class NewWorkoutPage extends React.Component {
  state = {
      workout: null
  };
   addWorkout = workout =>{
        console.log('adding workout',workout);;
    this.props
           .createWorkout(workout)
           // .then((res) => this.props.createExercise(workout.exercises,res.data.result))
           .then((res) => this.addExercises(workout.exercises,res.data.result))
           .then(() => this.props.history.push("/dashboard"));

    }
    addExercises(exercises,id){
        for(let i in exercises){
            this.props.createExercise(exercises[i],id);
        }
    }
  render() {
    return (
        <div>

        <WorkoutForm submit={this.addWorkout}   />
</div>
    );
  }
}

NewWorkoutPage.propTypes = {
  createWorkout: PropTypes.func.isRequired,
    createExercise:PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createWorkout,createExercise })(NewWorkoutPage);
