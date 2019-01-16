import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import UserForm from "../forms/UserForm";
import WorkoutForm from "../forms/WorkoutForm";
import {update} from "../../actions/users";

class UserSettingsPage extends React.Component {
  state = {
      user: null
  };
   updateUser = user =>{
        console.log('updateing user',user);;
    // this.props
    //        .createWorkout(workout)
    //        // .then((res) => this.props.createExercise(workout.exercises,res.data.result))
    //        .then((res) => this.addExercises(workout.exercises,res.data.result))
    //        .then(() => this.props.history.push("/dashboard"));

    }
 render() {
    return (
      <Segment>
       <UserForm />
      </Segment>
    );
  }
}

UserSettingsPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  update:PropTypes.func.isRequired
};

export default connect(null, {update })(UserSettingsPage);
