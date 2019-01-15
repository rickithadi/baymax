import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import userForm from "../forms/userForm";
import {update} from "../../actions/users";

class userSettingsPage extends React.Component {
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
        <userForm/>
       <h1>anus</h1>
        <userForm />
      </Segment>
    );
  }
}

userSettingsPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  update:PropTypes.func.isRequired
};

export default connect(null, {update })(userSettingsPage);
