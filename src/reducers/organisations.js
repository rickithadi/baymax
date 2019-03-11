import {createSelector} from 'reselect';
import {
  ORGANISATIONS_CLEARED,
  ORGANISATIONS_FETCHED,
  ORGANISATION_CREATED,
  ORGANISATION_DELETED,
  ORGANISATION_MODIFIED,
} from '../types';

export default function ORGANISATIONs(state = {}, action = {}) {
  switch (action.type) {
    case ORGANISATIONS_FETCHED:
    case ORGANISATION_CREATED:
      return {...state, ...action.data.entities.ORGANISATIONs};
    case ORGANISATIONS_CLEARED:
      return {...action.state};
    case ORGANISATION_DELETED:
      return {...action.state};
    case ORGANISATION_MODIFIED:
      return {...action.state, ...action.data.entities.ORGANISATIONs};
    default:
      return state;
  }
}

// SELECTORS

export const organisationsSelector = state => state.organisations;

export const allOrganisationsSelector = createSelector(
  organisationsSelector,
  organisationsHash => Object.values(organisationsHash),
);
