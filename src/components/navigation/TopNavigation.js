import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import {Select, TextArea, Form, Input} from 'formsy-semantic-ui-react';
import {Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import * as userActions from '../../actions/users';
import * as actions from '../../actions/auth';
import * as bookActions from '../../actions/books';
import * as workoutActions from '../../actions/workouts';
import {allBooksSelector} from '../../reducers/books';
import {allWorkoutsSelector} from '../../reducers/workouts';
import {
  Header,
  Menu,
  Dropdown,
  Segment,
  Checkbox,
  Label,
  Grid,
  Icon,
  Modal,
  Item,
} from 'semantic-ui-react';

class TopNavigation extends React.Component {
  state = {
    open: false,
    activeItem: 'Dashboard',
    menu: 'general',
    name: '',
    genders: [
      {text: 'male', value: 'male'},
      {text: 'female', value: 'female'},
      {text: 'apache attack helicopter', value: 'apache attack helicopter'},
    ],
    gender: '',
    username: '',
    height: '',
    weight: '',
    submittedName: '',
  };

  handleOpen = () => {
    this.setState({open: true});
  };
  close = () => {
    this.setState({open: false});
    console.log('clicky', this.state.open);
  };
  handleItemClick = (e, {name}) => this.setState({activeItem: name});

  handleMenuClick = (e, {name}) => {
    console.log('clicked', name);
    this.setState({menu: name});
  };
 changePicture = () => {};
  handleSubmit = e => {
    let merged = {...this.props.user, ...e};
    console.log('submitting', merged);
    this.props.details(merged);
    this.setState({open: false});
   };

  render() {
    const inlineStyle = {
        marginTop: '1000px !important',
        marginLeft: 'auto',
        marginRight: 'auto',
	    display: 'flex !important'
	      };

    const general = (
      <Formsy onValidSubmit={this.handleSubmit} ref="generalForm">
        <Form.Group>
          <Grid centered>
            <Grid.Row>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              size="small"
              avatar
              style={{padding: '10px'}}
            />
		    </Grid.Row>
            <Grid.Row>
            <Label>{this.props.user.email}</Label>
    </Grid.Row>
            <Grid.Row>
              <Form.Input
                placeholder="Name"
                label="Name"
                name="name"
                value={this.props.user.name}
              />
            </Grid.Row>
            <Grid.Row>
              <Form.Input
                placeholder="Username"
                label="Username"
                name="username"
                value={this.props.user.username}
              />
            </Grid.Row>
            <Grid.Row>
              <Form.Input
                placeholder="Height"
                label="Height (cm)"
                name="height"
                value={this.props.user.height}
                type="number"
              />
              <Form.Input
                placeholder="Weight"
                label="Weight (kg)"
                name="weight"
                value={this.props.user.weight}
                type="number"
              />
            </Grid.Row>
            {/* todo gender */}
            {/* <Form.Field style={{paddingTop: '15px'}}> */}
            {/*   <Dropdown */}
            {/*     fluid */}
            {/*     name="gender" */}
            {/*     label="Gender" */}
            {/*     selection */}
            {/*     value={this.props.user.gender} */}
            {/*     options={this.state.genders} */}
            {/*     placeholder="Gender" */}
            {/*   /> */}
            {/* </Form.Field> */}
            <Grid.Column
              textAlign="center"
              style={{textAlign: 'center', paddingTop: '15px'}}>
              <Form.Button content="Save" size="large" />
            </Grid.Column>
          </Grid>
        </Form.Group>
      </Formsy>
    );
    const organisations = <div>org</div>;
    const exercises = <div>ex</div>;
    const {
      user,
      username,
      height,
      weight,
      genders,
      gender,
      name,
      email,
      activeItem,
      menu,
      open,
      hasworkouts,
      logout,
      details,
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
          to="/view"
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
          style={{marginTop:'0px',marginLeft:'3%',marginRight:'3%'}}
          size="fullscreen"
          closeIcon
          onClose={this.close}>
          <Modal.Header>Settings</Modal.Header>
          <Modal.Content style={{height: '95vh', width: '100wh'}}>
            <div className="ui grid">
              <div className="three wide column">
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
                    onClick={this.handleMenuClick}>
                    <Icon name="list" />
                  </Menu.Item>
                </Menu>
              </div>
              <div className="twelve wide stretched column">
                <div className="ui segment">
                  <Segment>
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
  details: PropTypes.func.isRequired,
  deets: PropTypes.func.isRequired,
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
  {
    logout: actions.logout,
    clear: bookActions.clearBooks,
    details: userActions.details,
    deets: actions.userDetails,
  },
)(TopNavigation);
