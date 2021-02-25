import { useContext, useEffect, useState } from "react";
import { ChallengsContext } from "../contexts/ChallengsContexts";
import styles from '../styles/components/CountDown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function CountDown() {
  const { startNewChallenge, iscompletedChallenge } = useContext(ChallengsContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [verifyIsCompleted, setVerifyIsCompleted] = useState(iscompletedChallenge);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setVerifyIsCompleted(false);
    setIsActive(true);
  }

  function resetCountdonw() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if(iscompletedChallenge) {
      setVerifyIsCompleted(iscompletedChallenge);
    }
  }, [iscompletedChallenge]);

  useEffect(() => {
    if(verifyIsCompleted) {
      setHasFinished(false);
      setIsActive(false);
      setTime(0.1 * 60);
    }

    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time, verifyIsCompleted]);

  return(
   <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

     {hasFinished ? (
       <button
       disabled
       onClick={resetCountdonw} 
       type="button" 
       className={styles.countdownButton}>
         Ciclo encerrado
     </button>
     ): (
       <>
        {isActive ? (
        <button 
          onClick={resetCountdonw} 
          type="button" 
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
            Abandonar ciclo
        </button>
     ) : (
      <button 
        onClick={startCountdown} 
        type="button" 
        className={styles.countdownButton}>
          Iniciar um ciclo
      </button>
     )}
       </>
     )}
   </div>
  )
}