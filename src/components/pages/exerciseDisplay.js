import React from "react";
import Formsy from 'formsy-react';
import {Label,Dropdown,Select,TextArea,Form} from 'formsy-semantic-ui-react';
import { Card } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { connect } from "react-redux";
import { allExercisesSelector } from "../../reducers/exercises";
import { createExercise,fetchExercises } from "../../actions/exercises";
import PropTypes from "prop-types";
import {  Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class exerciseDisplay extends React.Component{
    state={
        loading:false,
        exercises:[]
    }
    componentDidMount=()=> {
        // this.getExerciseList();
        // this.props.getExercises;
    };
    render(){

        return(
            <div>
            <h2> fuck {this.props.id}</h2>

                <h1>anus</h1>
</div>

              ) ;

    }
 
}
    exerciseDisplay.propTypes={
        id:PropTypes.string.isRequired
    };
    // function mapStateToProps(state) {return {
    //     // exercises: allExercisesSelector(state),
    // };
    //                                 }

    export default exerciseDisplay;

