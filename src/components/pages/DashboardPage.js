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
    check=()=> console.log('anus');
   render() {
     const { isConfirmed, workouts, exercises,filterExercises} = this.props;
       let restable = this.props.exercises.map((exercise) => {
           return exercise.name;
           /// ...
       });
   return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        <exerciseDisplay id={100}/>
       {workouts.length === 0 ? <AddWorkoutCtA /> : <ul className="bookList">
                                                 {this.props.workouts.map((workout)=>{
                                                     return <div key={workout._id}>

                                                              <div className="ui raised very padded text container segment">

                                                                <h2 className="ui header">{workout.desc}</h2>
                                                                <div className="ui relaxed grid">
                                                                  <div className="four wide column">
                                                                    </div>
                                                                  <div className="eight wide column">{workout.weight}
                                                     <h3>{workout.userId}</h3> 
                                                                    <h3>{workout.date}</h3> 
                                                                    {this.props.exercises.map((exercise) => {
                                                                        if (exercise.workoutId==workout._id){
                                                                            return exercise.name;}
                                                                    })}


                                                                  </div>
                                                                </div>
                                                                </div>
                                                            </div>  ;

                                                 })
                                                 }
                                               </ul>}
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
