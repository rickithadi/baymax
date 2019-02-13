import React from "react";
import {Icon,Modal } from "semantic-ui-react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allWorkoutsSelector } from "../../reducers/workouts";
import { allExercisesSelector } from "../../reducers/exercises";
import AddWorkoutCtA from "../ctas/AddWorkoutCtA";
import { fetchWorkouts } from "../../actions/workouts";
import { fetchExercises } from "../../actions/exercises";
import Moment from 'react-moment';
import {Card,Button, Grid, Header} from 'semantic-ui-react';
import {Line,Legend,AreaChart, LineChart,Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

class DashboardPage extends React.Component {
state={
modalOpen:false,
temp_ex:{}
}
  componentDidMount = () => this.onInit(this.props);

    onInit = props =>{  props.fetchWorkouts();
                        props.fetchExercises();
                     };
    handleOpen = (exercise) =>{ this.setState({
	modalOpen: true,
	temp_ex: exercise
    });
   this.retrieveGraph(exercise.name)
    }
    handleClose = () =>  this.setState({
	    modalOpen: false
        });

retrieveGraph(exercise){

this.props.exercises.map((ex)=>{

if(ex.name===exercise){
console.log('match',ex)
}

})

}

    filterExercises= (list,w_id) => {
        list.map(function(exercise){
            if(exercise.workoutId===w_id){
                return <b> yup {exercise.w_id}</b>;

            }
            else return <h1>nope</h1>;
        });
                        }

   render() {
     const { isConfirmed, workouts, exercises,filterExercises} = this.props;
  const data = [
       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
       {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
       {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
       {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
       {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
	       ];
     const renderLineChart = (data)=>{
     return (
	     <ResponsiveContainer width={"100%"} height="80%">
       <LineChart width={600} height={400} data={data}>
           <Line type="monotone" dataKey="uv" stroke="#8884d8" />
	   <XAxis dataKey="name"/>
          <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
	        <Tooltip/>
	       <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
             <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
	     </LineChart>
	      </ResponsiveContainer>
	     );}

       let restable = this.props.exercises.map((exercise) => {
           return exercise.name;
           /// ...
       });
   return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

       {workouts.length === 0 ? <AddWorkoutCtA /> : <div className="bookList">
         {this.props.workouts.slice(0).reverse().map((workout)=>{
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
                if (exercise.workoutId===workout._id){
                  return (
                    <Card key={exercise._id}>
                      <Card.Header textAlign='center'><h3 >{exercise.name}</h3></Card.Header>
<Card.Content textAlign='center'>
<Card.Header textAlign='center' style={{color:'red'}}>{exercise.weight}kg</Card.Header>
                                                                                {exercise.sets} sets X {exercise.reps} reps
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
	<Button onClick={()=>this.handleOpen(exercise)}>
	<Icon name="line graph" size="large"/>
     </Button>

     <Button onClick={()=>this.setState({penis:exercise})}>
     <Icon name="info" size="large"/>
     </Button>
</div>
                                        </Card.Content>

              </Card>
                                                     )}
                                                                    })}
                                                                    </Card.Group>
                                                            </Card.Content>
                                                   </Card>
                                                 })
                                                 }
                                               </div>}
	      <Modal
              open={this.state.modalOpen}
            size='large'
            onClose={this.handleClose}
	    dimmer='blurring'
                >
                    <Header icon='eye' content={this.state.temp_ex.name}/>
                    <Modal.Content style={{height:'100vh'}}>
		    {renderLineChart(data)}
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
      exercises: allExercisesSelector(state)
  };
}

export default connect(mapStateToProps, {  fetchWorkouts,fetchExercises })(DashboardPage);
