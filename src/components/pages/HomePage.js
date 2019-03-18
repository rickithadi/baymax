import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';

const HomePage = ({isAuthenticated, logout}) => (
  <div>
    {isAuthenticated ? (
      <h1>already in</h1>
    ) : (
      <div>
        <div class="ui inverted vertical center aligned segment" style={{minHeight:'50vh',minWidth:'100wh'}}>
          <div class="ui large inverted pointing secondary menu">
            <div class="ui container">
              <a class="active item">Home</a>
              <a class="item">Work</a>
              <a class="item">Company</a>
              <a class="item">Careers</a>
              <div class="right item">
                <Link to="/login">
                  <a class="ui inverted button" role="button">
                    Log in
                  </a>
                </Link>
		<Link to="/signup">

                <a
                  //style="margin-left:0.5em"
                  class="ui inverted button"
                  role="button">
                  Sign Up
                </a>

		</Link>

             </div>
            </div>
          </div>
          <div class="ui text container">
            <h1
              //style="font-size:4em;font-weight:normal;margin-bottom:0;margin-top:3em"
              class="ui inverted header">
		    Strenk
            </h1>
            <h2
              //style="font-size:1.7em;font-weight:normal;margin-top:1.5em"
              class="ui inverted header">
		    Thick. Solid. Tight.
            </h2>
            <button class="ui huge primary button">
              Get Started
              <i aria-hidden="true" class="right arrow icon" />
            </button>
          </div>
          its lit
        </div>
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(
  mapStateToProps,
  {logout: actions.logout},
)(HomePage);
