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
        return 'text-cyan-500';
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
    const assignedLive = bullets.filter(b => b === 'live').length;
    const assignedDummy = bullets.filter(b => b === 'dummy').length;
    if (totalBullets === 0) return 0;
    return ((remainingCounts.live / (totalBullets - assignedLive - assignedDummy)) * 100).toFixed(1);
  };

  const remaining = getRemainingCounts();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 space-y-6">
        <div className="space-y-4">
        
          <div>
            <Label htmlFor="live" className="text-black"><font color="#FF0000"><b>实</b></font>弹 Live Bullets</Label>
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
            <Label htmlFor="dummy" className="text-black"><font color="#15e7eb"><b>空</b></font>弹 Dummy Bullets</Label>
            <Input
              id="dummy"
              type="number"
              min="0"
              value={dummyBullets}
              onChange={(e) => setDummyBullets(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full"
            />
          </div>

          <div className="flex justify-between text-sm text-black">
            <span>剩余<font color="#FF0000"><b>实</b></font>弹 Remaining Live: {remaining.live}</span>
          </div>

          <div className="flex justify-between text-sm text-black">
            <span>剩余<font color="#15e7eb"><b>空</b></font>弹 Remaining Dummy: {remaining.dummy}</span>
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
                {state === 'indeterminate' && `${calculateProbability(index)}% 概率是实弹`}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-black">开源不易，欢迎点点Star、提交PR！</p>
        <iframe src="https://ghbtns.com/github-btn.html?user=antimony5292&repo=devils-roulette&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>
        <img
            src="./QRcode.png"
            alt="QR Code"
            className="w-32 h-32 object-contain border border-gray-300 rounded-lg shadow"
          />
      </div>

        <div className="absolute top-1/2 right-[calc(50%-160px)] transform -translate-y-1/2">
          {/* <iframe src="https://ghbtns.com/github-btn.html?user=twbs&repo=bootstrap&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe> */}
          {/* <p>开源不易，欢迎点点Star、提交PR！</p> */}
          {/* <img
            src="/path/to/your-qrcode.png"
            alt="QR Code"
            className="w-32 h-32 object-contain border border-gray-300 rounded-lg shadow"
          /> */}
      </div>
    </div>
  );
};

export default DevilsRoulette;