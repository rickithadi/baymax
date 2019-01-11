import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allWorkoutsSelector } from "../../reducers/workouts";
import { allExercisesSelector } from "../../reducers/exercises";
import AddWorkoutCtA from "../ctas/AddWorkoutCtA";
import { fetchWorkouts } from "../../actions/workouts";
import { fetchExercises } from "../../actions/exercises";
import exerciseDisplay from "./exerciseDisplay";
import Moment from 'react-moment';
import {Card,Grid,Header} from 'semantic-ui-react';
class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

    onInit = props =>{  props.fetchWorkouts();
                        props.fetchExercises();
                     };

    filterExercises= (list,w_id) => {
        list.map(function(exercise){
            if(exercise.workoutId==w_id){
                return <b> yup {exercise.w_id}</b>;

            }
            else return <h1>nope</h1>;
        });
                                }
   render() {
     const { isConfirmed, workouts, exercises,filterExercises} = this.props;
       let restable = this.props.exercises.map((exercise) => {
           return exercise.name;
           /// ...
       });
   return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

       {workouts.length === 0 ? <AddWorkoutCtA /> : <div className="bookList">
                                                 {this.props.workouts.map((workout)=>{
                                                   return <Card key={workout._id} fluid >
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
                                                                    {this.props.exercises.map((exercise) => {
                                                                        if (exercise.workoutId==workout._id){
                                                                          return (
                                                                            <Card key={exercise._id}>
                                                                              <Card.Header textAlign='center'><h3 >{exercise.name}</h3></Card.Header>
                                                                              <Card.Content textAlign='center'>
                                                                                <Card.Header textAlign='center' style={{color:'lightblue'}}>{exercise.weight}kg</Card.Header>
                                                                                {exercise.sets} sets X {exercise.reps} reps
                                                                              </Card.Content>
                                                                              </Card>
                                                                            )
                                                                                 }
                                                                    })}
                                                                    </Card.Group>
                                                            </Card.Content>
                                                   </Card>

                                                 })
                                                 }
                                               </div>}
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
      exercises: allExercisesSelector(state)
  };
}

export default connect(mapStateToProps, {  fetchWorkouts,fetchExercises })(DashboardPage);
