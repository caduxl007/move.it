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
  iscompletedChallenge: boolean;
  activeChallenge: IChallenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: (xp: number) => void;
}

export const ChallengsContext = createContext({} as ChallengsContextData);

export function ChallengsProvider({children} : IChallengeProviderProps) {
  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengsCompleted, setChallengsCompleted] = useState(0);
  const [iscompletedChallenge, setIscompletedChallenge] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    if(currentExperience >= experienceToNextLevel) {
      setLevel(level + 1);
      setCurrentExperience(currentExperience - experienceToNextLevel);
    }

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    setIscompletedChallenge(false);
    const randomChallengeIndex = Math.floor(Math.random() * challengs.length);
    const challenge = challengs[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
    setIscompletedChallenge(false);
  }

  function completedChallenge(xp: number) {
    setActiveChallenge(null);
    setCurrentExperience(currentExperience + xp);
    setIscompletedChallenge(true);
    setChallengsCompleted(challengsCompleted + 1);
  }

  return (
    <ChallengsContext.Provider 
      value={{
        level, 
        currentExperience, 
        challengsCompleted,
        experienceToNextLevel,
        iscompletedChallenge,
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