import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged, type User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

function Nav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const handleLogin = () => signInWithPopup(auth, googleProvider);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">ChristensenLabs</Link>
        <ul className="nav-links">
          <li><a href="/#services">Services</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
          <li>
            {user ? (
              <Link to="/profile">
                <img
                  className="nav-avatar"
                  src={user.photoURL ?? undefined}
                  alt={user.displayName ?? 'User'}
                  referrerPolicy="no-referrer"
                />
              </Link>
            ) : (
              <button className="nav-auth" onClick={handleLogin}>
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
