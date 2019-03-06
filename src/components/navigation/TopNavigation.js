import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Menu, Dropdown, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';
import * as bookActions from '../../actions/books';
import * as workoutActions from '../../actions/workouts';
import {allBooksSelector} from '../../reducers/books';
import {allWorkoutsSelector} from '../../reducers/workouts';
import {Header, Segment, Checkbox, Icon, Modal, Item} from 'semantic-ui-react';

class TopNavigation extends React.Component {
  state = {
    open: false,
    activeItem: 'Dashboard',
    menu: 'general',
    name: '',
    gender: '',
    username: '',
    height: '',
    weight: '',
    submittedName: '',
  };

  handleOpen = () => {
    this.setState({open: true});
    console.log('clicky', this.state.open);
  };
  handleItemClick = (e, {name}) => this.setState({activeItem: name});
  handleMenuClick = (e, {name}) => {
    console.log('clicked', name);
    this.setState({menu: name});
  };

  handleSubmit = () => {
    const {name, gender, username,height,weight} = this.state;
    //todo set the shit then post and close modal
    this.setState({submittedName: name, username: username});
  };

  render() {
    const general = (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Name"
            label="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Username"
            label="Username"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Gender"
            label="Gender"
            name="gender"
            value={gender}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Email"
            label="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Height"
            label="Height"
            name="Height"
            value={height}
		  type="number"
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Weight"
            label="Weight"
            name="weight"
            value={email}
		  type="number"
            onChange={this.handleChange}
          />
           <Form.Button content="Save" />
        </Form.Group>
      </Form>
    );
    const organisations = <div>org</div>;
    const exercises = <div>ex</div>;
    const {
      user,
      username,
      height,weight,
      gender,
      name,
      email,
      activeItem,
      menu,
      open,
      hasworkouts,
      logout,
      hasBooks,
      clear,
    } = this.state;
    return (
      <Menu secondary pointing icon="labeled">
        <Menu.Item
          as={Link}
          to="/dashboard"
          active={activeItem === 'Dashboard'}
          name="Dashboard"
          onClick={this.handleItemClick}>
          <Icon color="blue" name="home" />
          {/* Dashboard */}
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/workouts/new"
          name="new"
          active={activeItem === 'new'}
          onClick={this.handleItemClick}>
          <Icon color="blue" name="plus" />
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/workouts/new"
          name="feed"
          active={activeItem === 'feed'}
          onClick={this.handleItemClick}>
          <Icon color="blue" name="feed" />
        </Menu.Item>

        <Menu.Item position="right">
          <Dropdown icon="user" floating button className="icon">
            <Dropdown.Menu direction="left">
              <Dropdown.Item
                onClick={event => {
                  this.props.logout();
                  this.props.clear();
                }}>
                logout
              </Dropdown.Item>

              <Dropdown.Item
                onClick={event => {
                  this.handleOpen();
                }}>
                settings
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Icon color="blue" name="user"/> */}
        </Menu.Item>
        <Modal
          open={this.state.open}
          CloseOnEscape={false}
          CloseOnDimmerClick={false}
          size="fullscreen"
          onClose={this.close}>
				<Modal.Header>Settings</Modal.Header>
          <Modal.Content
            style={{height: '95vh', width: '100wh' }}>
            <div class="ui grid">
              <div class="three wide column">
                <Menu icon="labeled" fluid vertical pointing position="left">
                  <Menu.Item
                    name="general"
                    active={menu === 'general'}
                    onClick={this.handleMenuClick}>
                    <Icon name="user" />
                  </Menu.Item>
                  <Menu.Item
                    name="exercises"
                    active={menu === 'exercises'}
                    onClick={this.handleMenuClick}>
                    <Icon name="group" />
                  </Menu.Item>

                  <Menu.Item
                    name="orgs"
                    active={menu === 'orgs'}
                    onClick={this.handleMenuClick}
		  >
      <Icon name="list" />
                  </Menu.Item>


                </Menu>
              </div>
              <div class="twelve wide stretched column">
                <div class="ui segment">
                  <Segment attached="right">
                    {menu === 'general' && general}
                    {menu === 'exercises' && exercises}
                    {menu === 'orgs' && organisations}
                  </Segment>
                </div>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </Menu>
    );
  }
}
TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  hasBooks: PropTypes.bool.isRequired,

  hasworkouts: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    hasBooks: allBooksSelector(state).length > 0,
    hasworkouts: allWorkoutsSelector(state).length > 0,
  };
}

export default connect(
  mapStateToProps,
  {logout: actions.logout, clear: bookActions.clearBooks},
)(TopNavigation);
