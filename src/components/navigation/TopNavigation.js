import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import * as actions from "../../actions/auth";
import * as bookActions from "../../actions/books";
import * as workoutActions from "../../actions/workouts";
import { allBooksSelector } from "../../reducers/books";
import { allWorkoutsSelector } from "../../reducers/workouts";


const TopNavigation = ({ user, hasworkouts, logout, hasBooks,clear }) => (

  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    {hasBooks && (
      <Menu.Item as={Link} to="/books/new">
        Add New Book
      </Menu.Item>)}
    {hasworkouts && (
        <Menu.Item as={Link} to="/workouts/new">
          Add New Workout
        </Menu.Item>
    )}

    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(event) =>{ logout() ;clear();}}>logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

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
