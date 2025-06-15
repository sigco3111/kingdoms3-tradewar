
import React from 'react';
import Modal from './common/Modal';
import Button from './common/Button';
// FactionId might not be needed directly if we pass name
// import { GameContext } from '../App'; // Not needed if props are sufficient

interface GameOverModalProps {
  victoriousFactionName: string;
  playerWealth: number;
  onReset: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ victoriousFactionName, playerWealth, onReset }) => {
  // const context = useContext(GameContext);
  // if (!context) return null;
  // const { gameState } = context; // gameState can be used if more complex info is needed

  let title = "천하 통일";
  let message = `${victoriousFactionName}이(가) 마침내 천하를 통일했습니다!`;
  
  // Custom message based on player's performance could be added here later
  // For example, if playerWealth is very high: "그 과정에서 당신은 막대한 부를 쌓아올린 전설적인 거상이 되었습니다."
  // If playerWealth is low: "당신은 격동의 시대에서 큰 족적을 남기지 못했습니다."

  return (
    <Modal isOpen={true} title={title}>
      <div className="text-center space-y-4">
        <p className="text-lg">{message}</p>
        <p className="text-xl font-semibold text-yellow-400">
          당신의 최종 자산: {playerWealth.toLocaleString()} 금
        </p>
        <Button onClick={onReset} variant="primary" size="lg">
          새로운 시대에 다시 도전
        </Button>
      </div>
    </Modal>
  );
};

export default GameOverModal;
