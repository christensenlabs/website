import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useState, type JSX } from 'react';
import type { User } from 'firebase/auth';

function Profile(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (!u) navigate('/');
    });
  }, [navigate]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  if (loading) return <></>;
  if (!user) return <></>;

  return (
    <section className="profile">
      <img
        className="profile-avatar"
        src={user.photoURL ?? undefined}
        alt={user.displayName ?? 'User'}
        referrerPolicy="no-referrer"
      />
      <h2>{user.displayName}</h2>
      <p className="profile-email">{user.email}</p>
      <div className="profile-setting">
        <span>Dark Mode</span>
        <button
          className="toggle"
          role="switch"
          aria-checked={dark}
          onClick={toggleDark}
        />
      </div>
      <button className="btn profile-signout" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </section>
  );
}

export default Profile;
