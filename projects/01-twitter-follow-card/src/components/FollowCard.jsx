import { useState } from "react"

// eslint-disable-next-line react/prop-types
export function FollowCard({ name, username }) {
  const [isFollowing, setIsFollowing] = useState(false)

  const btnText = isFollowing ? 'Following' : 'Follow'
  const btnClassName = isFollowing ? 'button card__button--following' : 'button card__button'

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="card">
      <div className="card__details">
        <img className="card__img" src={`https://unavatar.io/twitter/${username}`} alt={`${name}'s avatar`} />
        <div className="card__info">
          <strong className="card__name">{name}</strong>
          <span className="card__username">@{username}</span>
        </div>
      </div>

      <div>
        <button className={btnClassName} onClick={handleClick}>
          <span className="card__follow">{btnText}</span>
          <span className="card__unfollow">Unfollow</span>
        </button>
      </div>
    </div>
  )
}
