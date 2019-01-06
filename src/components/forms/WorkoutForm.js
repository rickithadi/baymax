import React from "react";
import { Card } from 'semantic-ui-react';
import {  Header, Checkbox,Icon, Modal } from 'semantic-ui-react';
import axios from "axios";
import { Input } from 'semantic-ui-react';
import { connect } from "react-redux";
import { allExercisesSelector } from "../../reducers/exercises";
import { createExercise,fetchExercises } from "../../actions/exercises";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import { TextArea } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { Select } from 'semantic-ui-react';


class WorkoutForm extends React.Component {
    
    state = { modalOpen: false,   loading: false,
              workout:null, exerciseList:null, exercises:[]}

    handleOpen = () => this.setState({ modalOpen: true }); 

    handleClose = (exercise) => {this.setState({ modalOpen: false });
                                 console.log('modal closed');
                                 this.clearlocalEx();
                         }
    componentDidMount=()=> {
        this.getExerciseList();
    }
        
    onInit = props =>{ props.fetchExercises();}
        
    addLocalEx=(exercise)=>{
        console.log('adding local',exercise);
        this.state.exercises.push(exercise);
        console.log('now execise =', this.state.exercises);
        this.clearlocalEx();
    }
    removeLocalEx=(exerciseKey,exlist)=>{
        console.log('removing', exerciseKey);
            console.log('=', exlist[exerciseKey]);
        exlist.splice( exerciseKey,1) ;

        // console.log('out', this.state.exercises);
        console.log('local',exlist);

        this.setState({exercises:exlist});
        // console.log('out',this.state.exercises);
    }
    editLocalEx=(exerciseKey,exercise,exlist)=>{
        console.log('editing', exerciseKey);
        console.log('from', exlist);
        console.log('ex is now', exercise);
        // this.setState({exerciseList[exerciseKey]:exercise});
    }
    getExerciseList=()=>{
        this.setState({ loading: true });
        axios
            .get('/exercises')
            .then(res => {console.log(res.data);
                          this.setState({ loading: false,  exerciseList: res.data });
                         });
        // let exerciseSelect=this.state.exerciseList.map((name,id)=>{
        //     <option key={id}>{name}</option>
        // });
    }
    // handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmit = e => {
     e.preventDefault();
     console.log('current state is',this.state);
        let temp={
            name:this.state.temp_name,
            reps:this.state.temp_reps,
            sets:this.state.temp_sets,
            weight:this.state.temp_weight
        };
     this.addLocalEx(temp);
    
  };
    clearlocalEx=()=>{
        this.setState({temp_weight:'',temp_sets:'',temp_reps:'',temp_name:null});
    }
      
   render() {
       const { errors,data, loading,temp_name,temp_reps,temp_sets,temp_weight} = this.state;
      let localExercises=this.state.exercises ;
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
                            <Button onClick={()=>this.editLocalEx(i,ex,localExercises)} basic color='blue'>
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

          <Form>
          <TextArea rows={3} placeholder='Workout remarks' />
          </Form>
         
        </Grid.Column>
          {/* <Grid.Column mobile={16} tablet={8} computer={2} > */}

          {/*   <Button size="huge" onClick={this.handleOpen}> Add Exercise</Button>            */}
          {/* </Grid.Column> */}
          
        </Grid.Row>
        </Grid>  
      </Segment>
            {/* <Button primary attached='bottom' onClick={this.onSubmit} content='Submit'/> */}

        </div>
          <div>
            
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            size='small'
            /* style={inlineStyle.modal} */
          >
            <Header icon='browser' content='Exercise' />
            <Modal.Content>
   <Form onSubmit={this.handleSubmit}>
<Form.Group>
               <Grid centered>
                 <Grid.Row>
               <Form.Field >
               {this.state.exerciseList &&
                <Select value={temp_name} required={true} onChange={(e) => this.setState({temp_name: e.target.innerText})} options={this.state.exerciseList} placeholder='Select your exercise'/>}
      </Form.Field>
       </Grid.Row>
               <Grid.Row>
                <Form.Field>
                  <Input value={temp_sets}type='number' required={true} onChange={(e) => this.setState({temp_sets: e.target.value})}placeholder='Sets' />
                </Form.Field>
                <Form.Field>
                  <Input value={temp_reps}type='number' required={true}  onChange={(e) => this.setState({temp_reps: e.target.value})} placeholder='Reps' />
                </Form.Field>
       </Grid.Row>
       <Grid.Row>
                <Form.Field>
                  <Input value={temp_weight} type='number' required={true} size='massive'  onChange={(e) => this.setState({temp_weight: e.target.value})}placeholder='Weight' />

                </Form.Field>
             </Grid.Row>

                 <Button color='green' type='submit'  inverted> 
                   <Icon name='checkmark' /> Got it 
                 </Button> 
                </Grid> 


 </Form.Group> 
               </Form> 
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
