import styles from '../styles/components/CompletedChallengs.module.css';

export function CompletedChallengs() {
  return(
    <div className={styles.completedChallengsContainer}>
      <span>Desafios completos</span>
      <span>5</span>
    </div>
  );
}