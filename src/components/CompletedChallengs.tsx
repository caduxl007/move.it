import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengsContexts';
import styles from '../styles/components/CompletedChallengs.module.css';

export function CompletedChallengs() {
  const { challengsCompleted } = useContext(ChallengsContext);

  return(
    <div className={styles.completedChallengsContainer}>
      <span>Desafios completos</span>
      <span>{challengsCompleted}</span>
    </div>
  );
}