import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengsContexts';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengsContext);
  const { resetCountdonw } = useContext(CountdownContext);

  function handleChallengeSucceded() {
    completedChallenge();
    resetCountdonw();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdonw();
  }

  return(
    <div className={styles.challengeBoxContainer}>
     {activeChallenge ? (
       <div className={styles.challengeActive}>
         <header>Ganhe {activeChallenge.amount} xp</header>

         <main>
           <img src={`icons/${activeChallenge.type}.svg`} alt="Desafio"/>
           <strong>Novo desafio</strong>
           <p>{activeChallenge.description}</p>
         </main>

         <footer>
           <button
            className={styles.challengeFailedButton} 
            type="button"
            onClick={handleChallengeFailed}
            >
              Falhei
            </button>

            <button
            className={styles.challengeSucceededButton} 
            type="button"
            onClick={handleChallengeSucceded}
            >
              Completei
            </button>
         </footer>
       </div>
     ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </div>
     )}
    </div>
  )
}