import React from "react";
import { Card } from 'semantic-ui-react';
import {  Header, Checkbox,Icon, Modal } from 'semantic-ui-react';
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import { TextArea } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';

class WorkoutForm extends React.Component {
    
    state = { modalOpen: false,   loading: false,
              workout:null, exerciseList:null
}

    handleOpen = () => this.setState({ modalOpen: true }); 

    handleClose = () => this.setState({ modalOpen: false })

    componentDidMount() {
        this.getExerciseList();
       
        
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

 onSubmit = e => {
     // this.props.submit();

     console.log(this.state);
    // e.preventDefault();
    // const errors = this.validate(this.state.data);
    // this.setState({ errors });
    // if (Object.keys(errors).length === 0) {
    //   this.setState({ loading: true });
    //   this.props
    //     .submit(this.state.data)
    //     .catch(err =>
    //       this.setState({ errors: err.response.data.errors, loading: false })
    //     );
    // }
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.authors) errors.authors = "Can't be blank";
    if (!data.pages) errors.pages = "Can't be blank";
    return errors;
  };

  render() {
      const { errors, data, loading} = this.state;
      // let exercises=this.state.exerciseList;
   return (
        <div>
          <div>
            {this.exerciseList}
         
      <Segment attached>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Card.Group itemsPerRow={3}>
            <Card>
              <Card.Content>
                <Card.Header>Matthew Harris</Card.Header>
                <Card.Meta>Co-Worker</Card.Meta>
                <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Card.Header content='Jake Smith' />
                <Card.Meta content='Musicians' />
                <Card.Description content='Jake is a drummer living in New York.' />
              </Card.Content>
            </Card>

            <Card>
              <Card.Content
                header='Elliot Baker'
                meta='Friend'
                description='Elliot is a music producer living in Chicago.'
              />
            </Card>

            <Card
              header='Add Exercise'
              meta='add'
              description='Jenny is a student studying Media Management at the New School'
            />
          </Card.Group>
          
        </Form>
        <Grid centered >
        <Grid.Row>
        <Grid.Column mobile={16} tablet={8} computer={12} >

          <Form>
          <TextArea rows={3} placeholder='Workout remarks' />
          </Form>
         
        </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={2} >

            <Button size="huge" onClick={this.handleOpen}> Add Exercise</Button>           
          </Grid.Column>
          
        </Grid.Row>
        </Grid>  
      </Segment>
            <Button primary attached='bottom' onClick={this.onSubmit} >Submit</Button>

        </div>
          <div>
            
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            size='large'
            /* style={inlineStyle.modal} */
          >
            <Header icon='browser' content='Cookies policy' />
            <Modal.Content>
              <Grid centered>
                  {/* {this.state.exerciseList && <h1>anus</h1>} */}
                {this.state.exerciseList &&
                 <select ref="userInput" defaultValue="" required>
                   <option value="" disabled>Exercise</option>
                   {
                       this.state.exerciseList.map(function(ex) {
                           return <option key={ex.key}
                       value={ex.name}>{ex.name}</option>;
                       })
                   }
                 </select>}
              <Form>
                {/* <Dropdown placeholder='Select Country' fluid search selection options={this.state.exerciseList.name}key={this.state.exerciseList.id}  /> */}

                <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit' onClick={this.onSubmit}>Submit</Button>
              </Form>

              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.handleClose} inverted>
                <Icon name='checkmark' /> Got it
              </Button>
            </Modal.Actions>
          </Modal>
         
        </div>
        </div>
    );
  }
}

WorkoutForm.propTypes = {
  submit: PropTypes.func.isRequired,
    // exerciseList:PropTypes.array.isRequired
  };

export default WorkoutForm;