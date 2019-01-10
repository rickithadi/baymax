import React from "react";
import Formsy from 'formsy-react';
import {Label,Dropdown,Select,TextArea,Form} from 'formsy-semantic-ui-react';
import { Card } from 'semantic-ui-react';
import {  Header, Checkbox,Icon, Modal } from 'semantic-ui-react';
import axios from "axios";
import { Input } from 'semantic-ui-react';
import { connect } from "react-redux";
import { allExercisesSelector } from "../../reducers/exercises";
import { createExercise,fetchExercises } from "../../actions/exercises";
import PropTypes from "prop-types";
import {  Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";


class WorkoutForm extends React.Component {
    
    state = { modalOpen: false,EditModalOpen:false,   loading: false,
              workout:null, exerciseList:null, exercises:[], formError:false}

    handleOpen = () => this.setState({ modalOpen: true }); 
    handleClose = (exercise) => {this.setState({ modalOpen: false });
                                 this.clearlocalEx();
                                }
    editHandleOpen = (exercise,key) => this.setState({ EditModalOpen: true,
                                                       temp_name:exercise.name,
                                                       temp_sets:exercise.sets,
                                                       temp_reps:exercise.reps,
                                                       temp_weight:exercise.weight,
                                                       temp_key:key
                                                 });
    editHandleClose = () => this.setState({ EditModalOpen: false }); 

    componentDidMount=()=> {
        this.getExerciseList();
    }
    onInit = props =>{


        props.fetchExercises();}
    addLocalEx=(exercise)=>{
        console.log('adding local',exercise);
        this.state.exercises.push(exercise);
        console.log('now execise =', this.state.exercises);
        // this.clearlocalEx();
    }
    removeLocalEx=(exerciseKey,exlist)=>{
    console.log('removing', exerciseKey);
        console.log('=', exlist[exerciseKey]);
    exlist.splice( exerciseKey,1) ;
    console.log('local',exlist);

    this.setState({exercises:exlist});
}

    editLocalEx=(exercise,key)=>{
        console.log('editing', exercise);

        let list=this.state.exercises;
        list[key]=exercise;
        console.log('exercises are now ', list[key]);
        this.setState({exercises:list});

        this.clearlocalEx();
        this.editHandleClose();
    }
    getExerciseList=()=>{
        this.setState({ loading: true });
        axios
            .get('/exercises')
            .then(res => {console.log(res.data);
                          this.setState({ loading: false,  exerciseList: res.data });
                         });
   }
    
    // handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmit = e => {
     console.log('submitted',e);
        let temp={
            name:e.exerciseName,
            reps:e.reps,
            sets:e.sets,
            weight:e.weight
        };
     this.addLocalEx(temp);
        this.refs.form.reset();

  };
   editHandleSubmit = e => {
        console.log('submitted for edit',e);
        let temp={
            name:e.exerciseName,
            reps:e.reps,
            sets:e.sets,
            weight:e.weight,
        };

       let key=this.state.temp_key;
       this.editLocalEx(temp,key);
        this.refs.editForm.reset();

    };
    finalHandleSubmit = e => {
        console.log('submitted final',e);
        let workout={
            desc:e.workoutRemarks,
            exercises:this.state.exercises,
        };
        this.props.submit(workout);

    };
 
 
    clearlocalEx=()=>{
        this.setState({temp_weight:'',temp_sets:'',temp_reps:'',temp_name:null});
    }
      
   render() {
       const { errors,data, loading,temp_name,temp_reps,temp_sets,temp_weight} = this.state;
      let localExercises=this.state.exercises ;
       const errorLabel= <h1>porpblem</h1>;

   return (
        <div>
          <div>
         
      <Segment attached>
        
           <Card.Group itemsPerRow={3}> 
             {this.state.exercises.length>0 &&
              this.state.exercises.map((ex,i)=>{
                  return (
                      <Card key={i}>
                        <Card.Content>
                          <Card.Header>{ex.name}, {i}</Card.Header>
                      <Card.Meta>{ex.sets} by {ex.reps} at <strong>{ex.weight}kg</strong></Card.Meta>
                          <Card.Description>
                            Steve wants to add you to the group <strong>best friends</strong>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <div className='ui two buttons'>
                            <Button onClick={()=>this.editHandleOpen(ex,i)} basic color='blue'>
                              <Icon name='edit' size='large'></Icon>
                            </Button>
                            <Button onClick={()=>this.removeLocalEx(i,this.state.exercises)} basic color='red' >

                              <Icon name='delete' size='large'></Icon>
                            </Button>
                          </div>
                        </Card.Content>
                      </Card>
                  );
              })

             }

             <Card onClick={this.handleOpen}>
             <Card.Content>

               <Grid centered>
               <Card.Description>
                 Tap here to add an exercise
                 <Icon name='plus circle' size='massive'></Icon>

               </Card.Description>
                 </Grid>
             </Card.Content>
           </Card>

         </Card.Group> 
        <Grid centered >
        <Grid.Row>
        <Grid.Column mobile={16} tablet={8} computer={12} >

          <Formsy onValidSubmit={this.finalHandleSubmit} ref="finalForm">
          <Form.TextArea name='workoutRemarks' rows={3} placeholder='Workout remarks' />
            <Button type="submit" disabled={this.state.exercises.length<1}> Submit</Button>
          </Formsy>
        </Grid.Column>
        </Grid.Row>
        </Grid>  
      </Segment>
            {/* <Button primary attached='bottom' onClick={this.onSubmit} content='Submit'/> */}

        </div>
       <Modal
       open={this.state.EditModalOpen}
       onClose={this.editHandleClose}
       size='small'
       /* style={inlineStyle.modal} */
       >

         <Header icon='browser' content='Edit Exercise' />
            <Modal.Content>
              <Formsy onValidSubmit={this.editHandleSubmit} ref="editForm" >
<Form.Group>
               <Grid centered>
                 <Grid.Row>
                   <Form.Field required >
               {this.state.exerciseList &&
                <Dropdown name="exerciseName"
                          required
                          search selection
                          value={temp_name}
                          onChange={(e) => this.setState({temp_name: e.target.innerText})}
                          options={this.state.exerciseListt} placeholder='Select your exercise'/>}
       </Form.Field>
                   {this.state.formError && <h4>invalid</h4>}
       </Grid.Row>
               <Grid.Row>
                  <Form.Input name="sets" value={temp_sets}type='number' required onChange={(e) => this.setState({temp_sets: e.target.value})}placeholder='Sets' />
                  <Form.Input name="reps"value={temp_reps}type='number' required  onChange={(e) => this.setState({temp_reps: e.target.value})} placeholder='Reps' />
       </Grid.Row>
       <Grid.Row>
                  <Form.Input name="weight" value={temp_weight} type='number' required size='massive'  onChange={(e) => this.setState({temp_weight: e.target.value})}placeholder='Weight' />

             </Grid.Row>

                 <Form.Button color='green' type='submit' inverted>

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
            size='small'
            /* style={inlineStyle.modal} */
          >
            <Header icon='browser' content='Add Exercise' />
            <Modal.Content>
              <Formsy onValidSubmit={this.handleSubmit} ref="form" >
<Form.Group>
               <Grid centered>
                 <Grid.Row>
                   <Form.Field required >
               {this.state.exerciseList &&
                <Dropdown name="exerciseName"
                          required
                          search selection
                          value={temp_name}
                          /* errorLabel={errorLabel} */
                          /* validationErrors={{ */
                          /*     isDefaultRequiredValue: 'You need to select an exercise', */
                          /* }} */
                          onChange={(e) => this.setState({temp_name: e.target.innerText})} options={this.state.exerciseList} placeholder='Select your exercise'/>}
       </Form.Field>
                   {this.state.formError && <h4>invalid</h4>}
       </Grid.Row>
               <Grid.Row>
                  <Form.Input name="sets" value={temp_sets}type='number' required onChange={(e) => this.setState({temp_sets: e.target.value})}placeholder='Sets' />
                  <Form.Input name="reps"value={temp_reps}type='number' required  onChange={(e) => this.setState({temp_reps: e.target.value})} placeholder='Reps' />
       </Grid.Row>
       <Grid.Row>
                  <Form.Input name="weight" value={temp_weight} type='number' required size='massive'  onChange={(e) => this.setState({temp_weight: e.target.value})}placeholder='Weight' />

             </Grid.Row>

                 <Form.Button color='green' type='submit'  inverted>
                   submit
                 </Form.Button>
                </Grid>


 </Form.Group>
               </Formsy>
            </Modal.Content>
            <Modal.Actions>
            </Modal.Actions>

          </Modal>
        </div>
        </div>
    );
  }
}

WorkoutForm.propTypes = {
  submit: PropTypes.func.isRequired,
    createExercise:PropTypes.func.isRequired,
    fetchExercises: PropTypes.func.isRequired,
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    ).isRequired

    // exerciseList:PropTypes.array.isRequired
  };
function mapStateToProps(state) {return {
        exercises: allExercisesSelector(state),
    };
}
export default connect(mapStateToProps,{createExercise,fetchExercises}) (WorkoutForm);
