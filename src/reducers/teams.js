import {createSelector} from 'reselect';
import {
  TEAMS_CLEARED,
  TEAMS_FETCHED,
  TEAM_CREATED,
  TEAM_DELETED,
  TEAM_MODIFIED,
} from '../types';

export default function teams(state = {}, action = {}) {
  switch (action.type) {
    case TEAMS_FETCHED:
    case TEAM_CREATED:
      return {...state, ...action.data.entities.teams};
    case TEAMS_CLEARED:
      return {...action.state};
    case TEAM_DELETED:
      return {...action.state};
    case TEAM_MODIFIED:
      return {...action.state, ...actions.data.entities.teams};
    default:
      return state;
  }
}

// SELECTORS

export const teamsSelector = state => state.teams;

export const allTeamssSelector = createSelector(
  teamsSelector,
  teamsHash => Object.values(teamsHash),
);
