import React from "react";
import PropTypes from "prop-types";
import {Form,Button, Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import * as actions from "../../actions/auth";
import * as bookActions from "../../actions/books";
import * as workoutActions from "../../actions/workouts";
import { allBooksSelector } from "../../reducers/books";
import { allWorkoutsSelector } from "../../reducers/workouts";
import { Header, Checkbox,Icon, Modal } from 'semantic-ui-react';


class TopNavigation extends React.Component {

state={open:false}

    handleOpen = () => {this.setState({open:true});
                        console.log('clicky',this.state.open)}


render() {
const modal=()=> {
    return(
<Modal
  open={true}
  CloseOnEscape= {false}
    CloseOnDimmerClick={false}
  onClose={this.close}
>
  ashdsajdh
</Modal>)}
    const { user, open,hasworkouts, logout, hasBooks,clear } =this.state
return(
 <Menu secondary pointing>
   <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
        <Menu.Item as={Link} to="/workouts/new">
          Add New Workout
        </Menu.Item>

    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(this.props.user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(event) =>{ this.props.logout() ;this.props.clear();}}>logout</Dropdown.Item>
          {/* <Dropdown.Item as={Link} to="/settings">account settings</Dropdown.Item> */}
          <Dropdown.Item onClick={(event)=>{this.handleOpen()}} >account settings</Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
    </Menu.Menu>
<Modal
  open={this.state.open}
  CloseOnEscape= {false}
    CloseOnDimmerClick={false}
  onClose={this.close}
>
  <Form>
	      <Form.Group>
		            <Form.Input label='First name' placeholder='First Name' width={6} />
			          <Form.Input label='Middle Name' placeholder='Middle Name' width={4} />
				        <Form.Input label='Last Name' placeholder='Last Name' width={6} />
					    </Form.Group>
					        <Form.Group>
							      <Form.Input placeholder='2 Wide' width={2} />
							            <Form.Input placeholder='12 Wide' width={12} />
								          <Form.Input placeholder='2 Wide' width={2} />
									      </Form.Group>
									          <Form.Group>
											        <Form.Input placeholder='8 Wide' width={8} />
												      <Form.Input placeholder='6 Wide' width={6} />
												            <Form.Input placeholder='2 Wide' width={2} />
													        </Form.Group>
														  </Form>

		<h1>fuck you pussy</h1>
  ashdsajdh
				<Button>click to submit</Button>
</Modal>

  </Menu>

)}}
TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  hasBooks: PropTypes.bool.isRequired,

    hasworkouts:PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    clear:PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
      hasBooks: allBooksSelector(state).length > 0,
      hasworkouts: allWorkoutsSelector(state).length>0
  };
}

export default connect(mapStateToProps, { logout: actions.logout, clear: bookActions.clearBooks })(
  TopNavigation
);
