import React from "react";

import gravatarUrl from "gravatar-url";
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


class UserForm extends React.Component {
    state = { modalOpen: false,EditModalOpen:false,   loading: false,
              workout:null, exerciseList:null, exercises:[], formError:false}

    handleOpen = () => this.setState({ modalOpen: true });
    componentDidMount=()=> {

      console.log('fuck me');
        // this.getExerciseList();
    }
    
      handleSubmit = e => {
          console.log('submitting form');
        this.handleOpen();
  };
    finalHandleSubmit = e => {
    };
    clearlocalEx=()=>{
        this.setState({temp_weight:'',temp_sets:'',temp_reps:'',temp_name:null});
    }

   render() {
       // const { user,errors,data, loading,temp_name,temp_reps,temp_sets,temp_weight} = this.state;
       const errorLabel= <h1>porpblem</h1>;

   return (
        <div>
       <Grid centered >
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={12} >

            <Image src={gravatarUrl(this.props.user.email)} centered/>
          <Formsy onValidSubmit={this.HandleSubmit} ref="finalForm">
     <Input name='workoutRemarks' size='huge'  placeholder='email' style={{width:'100%', padding:'5px'}}/>
     <Input name='workoutRemarks' size='huge'  placeholder='username' style={{width:'100%', padding:'5px'}}/>
     <Input name='workoutRemarks' size='huge'  placeholder='height'  style={{width:'100%', padding:'5px'}}/>
     <Input name='workoutRemarks' size='huge'  placeholder='weight'  style={{width:'100%', padding:'5px'}}/>
     <Input name='workoutRemarks' size='huge'  placeholder='Workout'  style={{width:'100%', padding:'5px'}}/>
     <Grid.Column textAlign='center' style={{textAlign:'center'}}>

     <Button type="submit" size='huge' style={{centered:'horizontal'}}> Submit</Button>
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
              <Formsy onValidSubmit={this.finalHandleSubmit} ref="form" >

                enter password here
       <Button/>
               </Formsy>
            </Modal.Content>
          </Modal>

        </div>
    );
  }
}

UserForm.propTypes = {
  // submit: PropTypes.func.isRequired,
 user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};
 function mapStateToProps(state) {return {

    user: state.user,
         exercises: allExercisesSelector(state),
     };
 }
export default connect(mapStateToProps,{}) (UserForm);
// export default userForm;
