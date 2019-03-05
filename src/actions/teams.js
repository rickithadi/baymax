import { normalize } from "normalizr";
import {TEAM_DELETED,TEAM_MODIFIED, TEAMS_FETCHED,TEAMS_CLEARED, TEAM_CREATED } from "../types";
import api from "../api";
import { TEAMSchema } from "../schemas";

// data.entities.teams
const teamsFetched = data => ({
    type: TEAMS_FETCHED,
    data
});
const teamDeleted = data => ({
    type: TEAM_DELETED,
    data
});
const teamCreated = data => ({
    type: TEAM_CREATED,
    data
});
const teamModified = data => ({
    type: TEAM_MODIFIED,
    data
});
const teamCleared = data => ({
    type: TEAMS_CLEARED,
    data: undefined
});

export const clearteams = () => dispatch=> {dispatch(teamCleared());};

export const fetchteams = () => dispatch =>
    api.teams
    .fetch_teams()
    .then(teams => dispatch(teamsFetched(normalize(teams, [teamSchema]))))
    .catch(err => console.error(err));


export const createteam = (team,organisation_id) => dispatch =>
    api.teams
    .create_team(team,organisation_id)
          .then(team => dispatch(teamCreated(normalize(team, teamSchema))))
          .catch(err => console.error(err));
