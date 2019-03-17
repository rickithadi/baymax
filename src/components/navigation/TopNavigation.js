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
  Container,
  Button,
  Divider,
  Menu,
  Card,
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
    deleteOpen: false,
    open: false,
    activeItem: '',
    menu: 'general',
    name: '',
    genders: [
      {text: 'male', value: 'male'},
      {text: 'female', value: 'female'},
      {text: 'apache attack helicopter', value: 'apache attack helicopter'},
    ],
    exerciseList: {},
    maxs: [],
    targets: [],
    gender: '',
    username: '',
    height: '',
    weight: '',
    submittedName: '',
  };
  onInit = props => {
    props.puki();
  };
  puki = () => {
    this.setState({
      loading: true,
    });
    axios.get('/exercises').then(res => {
      console.log('retrieved', res.data);
      this.setState({
        loading: false,
        exerciseList: res.data,
      });
    });
  };
  handleOpen = () => {
    this.setState({open: true});
    this.puki();
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

  modifyExerciseMetrics = ex => {
    console.log('setting', this.props.user);
    if (typeof this.props.user.exercise_list=== 'undefined') {
console.log('list is undefined, setting to []')
      this.props.user.exercise_list = [];
    }
   this.props.user.exercise_list.push(ex)
    this.props.details(this.props.user);
    // this.setState({open: false});
  };

  render() {
    let exes = this.state.exerciseList;
    const inlineStyle = {
      marginTop: '1000px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex !important',
    };
    const centered = {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      padding: '15px',
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
                inline
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
            <Form.Button content="Save" size="medium" basic color="green" />
          </Grid>
        </Form.Group>
      </Formsy>
    );
    const organisations = <div>org</div>;
    const exercises = (ex, i) => {
      return (
        <Card raised fluid key={i}>
          <Icon
            name="close"
            floated="right"
            style={{position: 'absolute', right: '0%'}}
            onClick={event => {
              this.handleOpenDelete();
            }}
          />
          <Card.Content>
              <Card.Header>
		  {ex.text}
              </Card.Header>
              <Grid.Column>
		      <Formsy>
                <Form.Input
                  fluid
                  required
                  name="max"
                  placeholder="max"
                  value={ex.max}
                  type="number"
                  onChange={e => {
                    ex.max = e.target.value;
                  }}
                />
                <Form.Input
                  fluid
                  required
                  name="target"
                  value={ex.target}
                  placeholder="target"
                  onChange={e => {
                    ex.target = e.target.value;
                  }}
                  type="number"
                />
			</Formsy>
              </Grid.Column>
              <Button
                fluid
                size="medium"
                basic
                onClick={() => {
                  this.modifyExerciseMetrics(ex);
                }}
                color="green"
                content="Set"
              />
          </Card.Content>
          {deleteConfirm(ex.text)}
        </Card>
      );
    };

    const deleteConfirm = ex => (
      <Modal open={this.state.deleteOpen} size="tiny">
        <Modal.Content>
          <div className="image">
            <h1>Delete exercise "{ex}"</h1>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red">
            <Icon name="remove" /> No
          </Button>
          <Button color="green">
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
    const {
      user,
      username,
      height,
      exerciseList,
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
      <Menu fluid secondary pointing icon="labeled" size="tiny">
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
          style={{
            marginTop: '3%',
            marginLeft: '3%',
            marginRight: '3%',
            height: '100vh',
          }}
          size="fullscreen"
          closeIcon
          onClose={this.close}>
          <Modal.Header>Settings</Modal.Header>
          <Modal.Content image>
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
                    <Icon name="list" />
                  </Menu.Item>

                  <Menu.Item
                    name="orgs"
                    active={menu === 'orgs'}
                    onClick={this.handleMenuClick}>
                    <Icon name="group" />
                  </Menu.Item>
                </Menu>
              </div>
              <div className="twelve wide stretched column">
                <div
                  className="ui segment"
                  style={{
                    overflow: 'auto',
                    height: '100vh',
                    marginTop: '-40px',
                  }}>
                  <Segment>
                    {menu === 'general' && general}
                    {menu === 'exercises' && (
                      <div>
                        <Card.Group stackable itemsPerRow={3} style={centered}>
                          {this.state.exerciseList.map((ex, i) => {
                            return exercises(ex, i);
                          })}
                        </Card.Group>
                      </div>
                    )}
                    {menu === 'orgs' && <Grid centered>organisations</Grid>}
                  </Segment>
                </div>
              </div>
            </div>
          </Modal.Content>
        </Modal>
        <hr />
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
