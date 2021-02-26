import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challengs from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface IChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengsCompleted: number;
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
  closeLevelUpModal: () => void;
}

export const ChallengsContext = createContext({} as ChallengsContextData);

export function ChallengsProvider({children, ...rest} : IChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengsCompleted, setChallengsCompleted] = useState(rest.challengsCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengsCompleted', String(challengsCompleted));
  }, [level, currentExperience, challengsCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
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
        closeLevelUpModal,
      }}
      >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengsContext.Provider>
  )
}