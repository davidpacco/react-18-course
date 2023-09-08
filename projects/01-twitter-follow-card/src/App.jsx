import { FollowCard } from './components/FollowCard'
import './App.css'

const users = [
  { name: 'greg', username: 'greg16676935420'},
  { name: 'Elon Musk', username: 'elonmusk'},
  { name: 'NASA', username: 'NASA'},
]

function App() {
  return (
    <div className="cards">
      {
        users.map(({ name, username }) => (
          <FollowCard key={username} name={name} username={username}/>
        ))
      }
    </div>
  )
}

export default App
