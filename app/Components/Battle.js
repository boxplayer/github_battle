import React from 'react'
import PlayerInput from './PlayerInput'
import Results from './Results'
import PropTypes from 'prop-types'
import { FaUserFriends, 
         FaFighterJet, 
         FaTrophy, 
         FaUser, 
         FaPlaneDeparture, 
         FaTimesCircle } from 'react-icons/fa'

function Instructions () {
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>
        Instructions
      </h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3> 
          <FaUserFriends className='bg-light' color='rgb(255,191,166)' size={80} />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3> 
          <FaFighterJet className='bg-light' color='#727272' size={80} />
        </li>
        <li>
          <h3 className='header-sm'>See the winners</h3> 
          <FaTrophy className='bg-light' color='rgb(255,215,0)' size={80} />
        </li>
      </ol>
    </div>
  )
}

function PlayerPreview({ username, onReset, label }) {
  return(
    <div className='column player'>
    <h3 className='player-label'>{label}</h3>
    <div className='row bg-light'>
      <div className='player-info'>
        <img
          className='avatar-small'
          src={`https://github.com/${username}.png?size=200`}
          alt={`Avatar for ${username}`}
        />
        <a
          href={`https://github.com/${username}`}
          className='link'>
            {username}
        </a>
      </div>
      <button className='btn-clear flex-center' onClick={onReset}>
        <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
      </button>
    </div>
  </div>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

class Battle extends React.Component {
  constructor(props) { 
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onReset = this.onReset.bind(this)
    this.resetBattle = this.resetBattle.bind(this)
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player
    })
  }

  resetBattle() {
    this.setState({
      playerOne: null,
      playerTwo: null,
      battle: false
    })
  }

  onReset(id) {
    this.setState({
      [id]: null
    })
  }



  render() {
    const { playerOne, playerTwo, battle } = this.state

    if (battle) {
      return (
        <Results 
          playerOne={playerOne}
          playerTwo={playerTwo}
          resetBattle={this.resetBattle}
        />
      )}

    return (
      <React.Fragment>
        <Instructions />
        <div className='players-container'>
          {}
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {!playerOne ? (
              <PlayerInput
                label='Player One'
                onSubmit={(player) => this.handleSubmit('playerOne', player)}
              />
            ) : <PlayerPreview 
                  username={playerOne}
                  label='Player One'
                  onReset={() => this.onReset('playerOne')}
                />}
            
            {!playerTwo ? (
              <PlayerInput
                label='Player Two'
                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
              />
            ): <PlayerPreview 
                username={playerTwo}
                label='Player Two'
                onReset={() => this.onReset('playerTwo')}
                />}
          </div>
          {playerOne && playerTwo && (
            <button
              className='btn dark-btn btn-space'
              onClick={() => this.setState({battle: true})}>
              Battle
            </button>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default Battle