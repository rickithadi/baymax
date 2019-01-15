import React from "react";
import Formsy from 'formsy-react';
import {Label,Dropdown,Select,TextArea,Form,Input} from 'formsy-semantic-ui-react';
import { Card } from 'semantic-ui-react';
import {  Header, Checkbox,Icon, Modal } from 'semantic-ui-react';
import axios from "axios";
// import { Input } from 'semantic-ui-react';
import { connect } from "react-redux";
import { allExercisesSelector } from "../../reducers/exercises";
import { createExercise,fetchExercises } from "../../actions/exercises";
import PropTypes from "prop-types";
import {  Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";


class userForm extends React.Component {
    state = { modalOpen: false,EditModalOpen:false,   loading: false,
              workout:null, exerciseList:null, exercises:[], formError:false}

    componentDidMount=()=> {
        // this.getExerciseList();
    }
    onInit = props =>{
      console.log('fuck me');
       // this.clearlocalEx();
    }
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
       const errorLabel= <h1>porpblem</h1>;

   return (
        <div>
          <h2> fuck off</h2>
       <Grid centered >
        <Grid.Row>

          <h1>psnis</h1>
          <Grid.Column mobile={16} tablet={8} computer={12} >
          <Formsy onValidSubmit={this.finalHandleSubmit} ref="finalForm">

     <TextArea name='workoutRemarks' size='huge' rows={3} placeholder='Workout remarks' style={{width:'100%', padding:'5px'}}/>
     <Grid.Column textAlign='center' style={{textAlign:'center'}}>

     <Button type="submit" size='huge' disabled={this.state.exercises.length<1} style={{centered:'horizontal'}}> Submit</Button>
              </Grid.Column>

          </Formsy>

          </Grid.Column>
        </Grid.Row>
        </Grid>
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
          </Modal>

        </div>
    );
  }
}

userForm.propTypes = {
  submit: PropTypes.func.isRequired,
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};
 function mapStateToProps(state) {return {
         exercises: allExercisesSelector(state),
     };
 }
export default connect(mapStateToProps,{}) (userForm);
// export default userForm;
