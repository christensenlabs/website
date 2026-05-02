import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useState, type JSX } from 'react';
import type { User } from 'firebase/auth';

function Profile(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (!u) navigate('/');
    });
  }, [navigate]);

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
      <button className="btn profile-signout" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </section>
  );
}

export default Profile;
