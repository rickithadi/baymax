import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from "../../reducers/books";
import AddBookCtA from "../ctas/AddBookCtA";
import { fetchBooks } from "../../actions/books";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchBooks();

    // ListBooks(books){
    //     console.log('receiving', books);
    //     this.books.map(function(book){
    //     return <li key={book._id}>{book.title}</li> 
    //     });
    // }
  render() {
    const { isConfirmed, books } = this.props;

   return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {/* {books.length === 0 ? <AddBookCtA /> : <p>You have books!</p>} */}
        {books.length === 0 ? <AddBookCtA /> : <ul className="bookList">
                                                 {this.props.books.map(function(book){
                                                     return <div key={book._id}>

                                                              <div className="ui raised very padded text container segment">
                                                                  
                                                                <h2 className="ui header">{book.title}</h2>
                                                                <div className="ui relaxed grid">
                                                                  
                                                                  <div className="four wide column">
                                                                    <img alt="" src={book.cover}/> 

                                                                    </div>
                                                                  <div className="eight wide column">{book.authors}</div>
 
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
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);
