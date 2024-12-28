import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Circle } from 'lucide-react';

const DevilsRoulette = () => {
  const [liveBullets, setLiveBullets] = useState(1);
  const [dummyBullets, setDummyBullets] = useState(1);
  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    const totalBullets = liveBullets + dummyBullets;
    setBullets(Array(totalBullets).fill('indeterminate'));
  }, [liveBullets, dummyBullets]);

  const cycleBulletState = (index) => {
    setBullets(prev => {
      const newBullets = [...prev];
      switch (newBullets[index]) {
        case 'indeterminate':
          newBullets[index] = 'live';
          break;
        case 'live':
          newBullets[index] = 'dummy';
          break;
        case 'dummy':
          newBullets[index] = 'indeterminate';
          break;
      }
      return newBullets;
    });
  };

  const getBulletColor = (state) => {
    switch (state) {
      case 'live':
        return 'text-red-500';
      case 'dummy':
        return 'text-gray-400';
      default:
        return 'text-blue-500';
    }
  };

  const getRemainingCounts = () => {
    const assignedLive = bullets.filter(b => b === 'live').length;
    const assignedDummy = bullets.filter(b => b === 'dummy').length;
    return {
      live: liveBullets - assignedLive,
      dummy: dummyBullets - assignedDummy
    };
  };

  const calculateProbability = (index) => {
    const remainingCounts = getRemainingCounts();
    const totalBullets = liveBullets + dummyBullets;
    if (totalBullets === 0) return 0;
    return ((remainingCounts.live / totalBullets) * 100).toFixed(1);
  };

  const remaining = getRemainingCounts();

  return (
    <div className="w-full max-w-md p-4 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="live">Live Bullets</Label>
          <Input
            id="live"
            type="number"
            min="0"
            value={liveBullets}
            onChange={(e) => setLiveBullets(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="dummy">Dummy Bullets</Label>
          <Input
            id="dummy"
            type="number"
            min="0"
            value={dummyBullets}
            onChange={(e) => setDummyBullets(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Remaining Live: {remaining.live}</span>
          <span>Remaining Dummy: {remaining.dummy}</span>
        </div>
      </div>

      <div className="space-y-2">
        {bullets.map((state, index) => (
          <div key={index} className="flex items-center space-x-2">
            <button
              onClick={() => cycleBulletState(index)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Circle 
                className={`w-6 h-6 ${getBulletColor(state)}`}
                fill={state !== 'indeterminate' ? 'currentColor' : 'none'}
              />
            </button>
            <span className="text-sm text-gray-500">
              {state === 'indeterminate' && `${calculateProbability(index)}% live`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevilsRoulette;