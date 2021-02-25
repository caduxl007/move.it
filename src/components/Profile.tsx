import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengsContexts';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengsContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/caduxl007.png" alt="Eduardo Silva" />
      <div>
        <strong>Eduardo Silva</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}