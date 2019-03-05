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
import {Header, Checkbox, Icon, Modal,Item} from 'semantic-ui-react';

class TopNavigation extends React.Component {
  state = {open: false, activeItem: 'Dashboard', menu: 'closest'};

  handleOpen = () => {
    this.setState({open: true});
    console.log('clicky', this.state.open);
  };
  handleItemClick = (e, {name}) => this.setState({activeItem: name});
  handleMenuClick = (e, {name}) =>{console.log('clicked',name)
  this.setState({menu: name});}

  render() {
    const general = <div>penis</div>;
    const organisations = <div>penis</div>;
    const exercises = <div>penis</div>;
    const {
      user,
      activeItem,
      menu,
      open,
      hasworkouts,
      logout,
      hasBooks,
      clear,
    } = this.state;
    return (
      <Menu secondary pointing>
        <Menu.Item
          as={Link}
          to="/dashboard"
          active={activeItem === 'Dashboard'}
          name="Dashboard"
          onClick={this.handleItemClick}
        />

        <Menu.Item
          as={Link}
          to="/workouts/new"
          name="new"
          active={activeItem === 'new'}
          onClick={this.handleItemClick}
        />

        <Menu.Menu position="right">
          <Dropdown
            trigger={<Image avatar src={gravatarUrl(this.props.user.email)} />}>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={event => {
                  this.props.logout();
                  this.props.clear();
                }}>
                logout
              </Dropdown.Item>
              {/* <Dropdown.Item as={Link} to="/settings">account settings</Dropdown.Item> */}
              <Dropdown.Item
                onClick={event => {
                  this.handleOpen();
                }}>
                account settings
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        <Modal
          open={this.state.open}
          CloseOnEscape={false}
          CloseOnDimmerClick={false}
          size="large"
          onClose={this.close}>
		  <Menu fluid vertical
		  position="left">
            <Menu.Item
              name="general"
              active={menu=== 'general'}
              onClick={this.handleMenuClick}

            />
            <Menu.Item
              name="exercises"
              active={menu=== 'exercises'}
              onClick={this.handleMenuClick}
            />
            <Menu.Item
              name="orgs"
              active={menu=== 'orgs'}
              onClick={this.handleMenuClick}
            />
          </Menu>
          <Modal.Content
            style={{height: '80vh', width: '100wh', float: 'left'}}>
					  {menu==='general' && <h1>penis</h1>}
					  {menu==='exercises' && <h1>mid</h1>}
					  {menu==='orgs' && <h1>dar</h1>}
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
