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
import {  Button, Grid, Segment,Menu, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";


class UserForm extends React.Component {
    state = { modalOpen: false,EditModalOpen:false,   loading: false,
              workout:null, exerciseList:null, exercises:[], formError:false, activeItem:'pics'}

    handleOpen = () => this.setState({ modalOpen: true });
    componentDidMount=()=> {

      console.log('fuck me');
        // this.getExerciseList();
    }

    handleItemClick = (e, { name }) => {
        console.log('setting to',name)
        this.setState({ activeItem: name })
        console.log(this.state)}
   
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
       const inputStyle={
       padding:'15px'
       }
const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];
    const { activeItem } = this.state;

    return (
        <div>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical stackable>
            <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
            <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
            <Menu.Item
              name='companies'
              active={activeItem === 'companies'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='links'
              active={activeItem === 'links'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>

          {this.state.activeItem ==='bio' &&  
           <Segment>
       <Grid centered >
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={12} >

          <Formsy onValidSubmit={this.HandleSubmit} ref="form">
        <Grid.Row>
       </Grid.Row>
    <Grid.Column textAlign='center' style={{textAlign:'center'}}>

            <Image avatar src={gravatarUrl(this.props.user.email)} verticalAlign='middle' /><span>username</span>
     <Form.Group widths="equal">
          <Form.Input
            name="username"
            label="Username"
            fluid
            style={inputStyle}
            placeholder="user name"
            validations="isWords"
            /* errorLabel={ <Label color="red" pointing/> } */
            validationErrors={{
              isWords: 'No numbers or special characters allowed',
              isDefaultRequiredValue: 'First Name is Required',
            }}
          />
          <Form.Input
            name="name"
            label="Name"
            placeholder="Name"

            fluid
            style={inputStyle}
            required
            validations="isWords"
            /* errorLabel={ <Label color="red" pointing/> } */
            validationErrors={{
              isWords: 'No numbers or special characters allowed',
              isDefaultRequiredValue: 'Last Name is Required',
            }}
          />
         
          <Form.Input
            name="height"
            label="height"
            placeholder="height"

            fluid
            style={inputStyle}
            required
            validations="isWords"
            /* errorLabel={ <Label color="red" pointing/> } */
            validationErrors={{
              isWords: 'No numbers or special characters allowed',
              isDefaultRequiredValue: 'Last Name is Required',
            }}
          />

          <Form.Select
            name="gender"
            label="Gender"
            options={ options }
            style={inputStyle}
            placeholder="Gender"

            fluid
            required
            /* errorLabel={ <Label color="red" pointing/> } */
            validationErrors={{
              isDefaultRequiredValue: 'Gender is Required',
            }}
          />
        </Form.Group>

      

     <Button type="submit" size='huge' style={{centered:'horizontal', padding:'20px'}}> Submit</Button>
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

        
                                               </Segment>}
        </Grid.Column>
      </Grid>


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
