import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import WorkoutForm from "../forms/WorkoutForm";
import { createWorkout } from "../../actions/workouts";

class NewWorkoutPage extends React.Component {
  state = {
      workout: null, exerciseList:null
  };
   addWorkout = workout =>{
        console.log('adding workout',workout,this.state);;
    // this.props
    //   .createWorkout(workout)
    //   .then(() => this.props.history.push("/dashboard"));
    }
  render() {
    return (
      <Segment>
        <h1>Add new workout to your collection</h1>

        
        <WorkoutForm submit={this.addWorkout} exerciseList={this.state.exerciseList}  /> 
        {/* {this.state.workout && ( */}
        {/*   <WorkoutForm submit={this.addWorkout}  /> */}
        {/* )} */}
      </Segment>
    );
  }
}

NewWorkoutPage.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createWorkout })(NewWorkoutPage);
