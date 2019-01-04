import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from "../../reducers/books";
import { allWorkoutsSelector } from "../../reducers/workouts";
import AddBookCtA from "../ctas/AddBookCtA";
import AddWorkoutCtA from "../ctas/AddWorkoutCtA";
import { fetchBooks } from "../../actions/books";
import { fetchWorkouts } from "../../actions/workouts";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

    onInit = props =>{ props.fetchBooks(); props.fetchWorkouts();}

 render() {
     const { isConfirmed, workouts,books} = this.props;

   return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {/* {books.length === 0 ? <AddBookCtA /> : <ul className="bookList"> */}
        {/*                                          {this.props.books.map(function(book){ */}
        {/*                                              return <div key={book._id}> */}

        {/*                                                       <div className="ui raised very padded text container segment"> */}
                                                                  
        {/*                                                         <h2 className="ui header">{book.title}</h2> */}
        {/*                                                         <div className="ui relaxed grid"> */}
                                                                  
        {/*                                                           <div className="four wide column"> */}
        {/*                                                             <img alt="" src={book.cover}/>  */}

        {/*                                                             </div> */}
        {/*                                                           <div className="eight wide column">{book.authors} */}
        {/*                                              <h3>{book.userId}</h3>  */}
        {/*                                                           </div> */}
 
        {/*                                                         </div> */}
        {/*                                                         </div> */}
                                                                  
        {/*                                                     </div>  ; */}
                                                                

        {/*                                          }) */}
        {/*                                          }  */}
        {/*                                        </ul>} */}
        {workouts.length === 0 ? <AddWorkoutCtA /> : <ul className="bookList">
                                                 {this.props.workouts.map(function(workout){
                                                     return <div key={workout._id}>

                                                              <div className="ui raised very padded text container segment">
                                                                  
                                                                <h2 className="ui header">{workout.name}</h2>
                                                                <div className="ui relaxed grid">
                                                                  
                                                                  <div className="four wide column">

                                                                    </div>
                                                                  <div className="eight wide column">{workout.weight}
                                                     <h3>{workout.userId}</h3> 
                                                                  </div>
 
                                                                </div>
                                                                </div>
                                                                  
                                                            </div>  ;
                                                                

                                                 })
                                                 } 
                                               </ul>} 
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
    fetchWorkouts: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
      books: allBooksSelector(state),
     workouts: allWorkoutsSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks, fetchWorkouts })(DashboardPage);
