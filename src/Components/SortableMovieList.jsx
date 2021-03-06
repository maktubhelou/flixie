import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MovieList from './MovieList'
import GenreList from './GenreList'

const backGroundUrl = require('../images/fancy-pants.jpg')
const upArrow = require('../images/upArrow.png')
const downArrow = require('../images/downArrow.png')

const styles = {
  arrowImageStyle: {
    padding: '0',
    width: '36px',
    backgroundColor: 'transparent',
    verticalAlign: 'middle',
    border: 'none',
  },
  buttonStyle: {
    textTransform: 'uppercase',
    height: '24px',
    background: '#222244',
    color: '#9999aa',
    fontSize: '14px',
    textAlign: 'center',
    border: '1px #444455',
    boxShadow: '0 0 3px #9999aa',
    margin: '8px',
    cursor: 'pointer',
  },
  listStyle: {
    backgroundImage: `url(${backGroundUrl})`,
    backgroundAttachment: 'fixed',
    position: 'relative',
    paddingTop: '40px',
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    justifyContent: 'center',
  },
  sortRow: {
    width: '100%',
    float: 'left',
  },
}

class SortableMovieList extends Component {
  constructor(props) {
    super(props)

    this.sortList = this.sortList.bind(this)
    this.toggleSortOrder = this.toggleSortOrder.bind(this)

    this.state = {
      sortCriteria: 'title',
      sortOrder: 'asc',
    }
  }

  toggleSortOrder() {
    this.setState(prevState => {
      return {
        sortOrder: prevState.sortOrder === 'asc' ? 'desc' : 'asc',
      }
    })
  }

  // TODO: complete logic for sorting genres
  sortList(key, order) {
    return function sort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return order === 'desc' ? comparison * -1 : comparison
    }
  }

  render() {
    const { sortCriteria, sortOrder } = this.state
    const { loaded, movies, genres, setGenre } = this.props
    if (!loaded) return <div className="loader" />

    movies.sort(this.sortList(sortCriteria, sortOrder))

    return (
      <div>
        <div style={styles.sortRow}>
          <GenreList
            setGenre={setGenre}
            genres={genres}
            sortOrder={sortOrder}
          />
          <button
            style={styles.buttonStyle}
            type="button"
            onClick={() => this.setState({ sortCriteria: 'title' })}
            selected="selected"
          >
            Title
          </button>
          <button
            style={styles.buttonStyle}
            type="button"
            onClick={() => this.setState({ sortCriteria: 'score' })}
          >
            Votes
          </button>
          <button
            style={styles.buttonStyle}
            type="button"
            onClick={() => this.setState({ sortCriteria: 'genreIds' })}
          >
            Genre
          </button>
          <button
            style={styles.buttonStyle}
            type="button"
            onClick={() => this.setState({ sortCriteria: 'releaseDate' })}
          >
            Date
          </button>
          <button
            type="button"
            onClick={this.toggleSortOrder}
            style={styles.arrowImageStyle}
          >
            {sortOrder === 'asc' ? (
              <img src={upArrow} style={styles.arrowImageStyle} alt="uparrow" />
            ) : (
              <img
                src={downArrow}
                style={styles.arrowImageStyle}
                alt="downArrow"
              />
            )}
          </button>
        </div>
        <div style={styles.listStyle}>
          <MovieList movies={movies} />
        </div>
      </div>
    )
  }
}

SortableMovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool.isRequired,
  setGenre: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default SortableMovieList
