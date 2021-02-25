import { createContext, useState, ReactNode, useEffect } from 'react';
import challengs from '../../challenges.json';

interface IChallengeProviderProps {
  children: ReactNode;
}

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengsContextData {
  level: number;
  currentExperience: number;
  challengsCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: IChallenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
}

export const ChallengsContext = createContext({} as ChallengsContextData);

export function ChallengsProvider({children} : IChallengeProviderProps) {
  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengsCompleted, setChallengsCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challengs.length);
    const challenge = challengs[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengsCompleted(challengsCompleted + 1);
  }

  return (
    <ChallengsContext.Provider 
      value={{
        level, 
        currentExperience, 
        challengsCompleted,
        experienceToNextLevel,
        levelUp, 
        startNewChallenge,
        resetChallenge,
        activeChallenge,
        completedChallenge,
      }}
      >
      {children}
    </ChallengsContext.Provider>
  )
}