import { signInWithGoogle } from '../../firebase'

import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="dashboard login">
      <button className="flat-button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <Link to="/portfolio">
        <button className="flat-button">Back</button>
      </Link>
    </div>
  )
}

export default Login
