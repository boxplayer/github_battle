import React from 'react'
import PropTypes from 'prop-types'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'
import Card from '../Components/Card'
import Loading from './Loading'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
}

class ProfileList extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      hoveringLocation: true,
      hoveringCompany: true
    }
  }

  mouseOver() {
    
  }

  mouseOut() {
    
  }
  render () {
    const { profile } = this.props
    const { hoveringLocation, hoveringCompany } = this.state

    return (
      <ul className='card-list'>
        <li>
          <FaUser color='rgb(239, 115, 115)' size={22} />
          {profile.name}
        </li> 
        {profile.location && (
          <li>
            {hoveringLocation === true && <div style={styles.tooltip}>User's location</div>}
            <FaCompass color='rgb(144, 115, 255)' size={22} />
            {profile.location}
          </li>
        )}
        {profile.company && (
          <li>
            {hoveringCompany === true && <div style={styles.tooltip}>User's company</div>}
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </li>
        )}
        <li>
          <FaUsers color='rgb(129, 195, 245)' size={22} />
          {profile.followers.toLocaleString()} followers
        </li>
        <li>
          <FaUserFriends color='rgb(64, 183, 95)' size={22} />
          {profile.following.toLocaleString()} following
        </li>
      </ul>
    )
  }
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}


class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }

  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        })
      }).catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }

  render () {
    const { winner, loser, error, loading } = this.state
    const { resetBattle } = this.props

    if (loading === true){
      return <Loading />
    }

    if (error){
      return (<p className='center-text error'>{error}</p>)
    }

    return (
      <div>
        <div className='grid space-around container-sm'>
          <Card 
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
          <ProfileList profile={winner.profile} />
          </Card>

          <Card 
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
          <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button 
          className="btn dark-btn btn-space"
          onClick={() => resetBattle()}>
            Reset
        </button>
      </div>
    )
  }
}

export default Results

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  resetBattle: PropTypes.func.isRequired
}