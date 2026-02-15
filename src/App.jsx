import React, { useState } from 'react';
import { Plus, Minus, Users, Trophy, RotateCcw } from 'lucide-react';

export default function EverdellTracker() {
  const [players, setPlayers] = useState([
    { 
      id: 1, 
      name: 'Player 1', 
      color: 'bg-amber-500',
      scores: {
        cards: 0,
        prosperity: 0,
        events: 0,
        journey: 0,
        other: 0
      }
    }
  ]);
  
  const [showSetup, setShowSetup] = useState(false);

  const addPlayer = () => {
    const colors = ['bg-amber-500', 'bg-emerald-500', 'bg-blue-500', 'bg-purple-500'];
    const newPlayer = {
      id: Date.now(),
      name: `Player ${players.length + 1}`,
      color: colors[players.length % colors.length],
      scores: {
        cards: 0,
        prosperity: 0,
        events: 0,
        journey: 0,
        other: 0
      }
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id) => {
    if (players.length > 1) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const updateScore = (playerId, category, delta) => {
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        const newScore = Math.max(0, player.scores[category] + delta);
        return {
          ...player,
          scores: { ...player.scores, [category]: newScore }
        };
      }
      return player;
    }));
  };

  const updateName = (playerId, newName) => {
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, name: newName } : player
    ));
  };

  const getTotalScore = (player) => {
    return Object.values(player.scores).reduce((sum, val) => sum + val, 0);
  };

  const resetAll = () => {
    if (confirm('Reset all scores?')) {
      setPlayers(players.map(player => ({
        ...player,
        scores: { cards: 0, prosperity: 0, events: 0, journey: 0, other: 0 }
      })));
    }
  };

  const sortedPlayers = [...players].sort((a, b) => getTotalScore(b) - getTotalScore(a));
  const winner = sortedPlayers[0];

  const categories = [
    { key: 'cards', label: 'Cards', description: 'Purple & Tan cards' },
    { key: 'prosperity', label: 'Prosperity', description: 'Basic & Special events' },
    { key: 'events', label: 'Events', description: 'Completed events' },
    { key: 'journey', label: 'Journey', description: 'Journey tiles (Bellfaire)' },
    { key: 'other', label: 'Other', description: 'Tokens, bonuses, etc.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
            🌳 Everdell Points Tracker
          </h1>
          <p className="text-green-700">Track your journey through the valley</p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6 justify-center flex-wrap">
          <button
            onClick={addPlayer}
            disabled={players.length >= 4}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Users size={18} />
            Add Player
          </button>
          <button
            onClick={resetAll}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Reset All
          </button>
          <button
            onClick={() => setShowSetup(!showSetup)}
            className="bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700"
          >
            {showSetup ? 'Hide' : 'Show'} Scoring Guide
          </button>
        </div>

        {/* Scoring Guide */}
        {showSetup && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4">📖 Scoring Reference</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-bold text-green-700 mb-2">Point Sources:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• <strong>Purple Cards:</strong> Worth printed points</li>
                  <li>• <strong>Tan Cards:</strong> Worth printed points</li>
                  <li>• <strong>Prosperity Cards:</strong> Bonus points</li>
                  <li>• <strong>Basic Events:</strong> 3 points each</li>
                  <li>• <strong>Special Events:</strong> 4 points each</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-green-700 mb-2">Additional Points:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• <strong>Journey Tiles:</strong> (Bellfaire expansion)</li>
                  <li>• <strong>Point Tokens:</strong> From various sources</li>
                  <li>• <strong>Other Bonuses:</strong> Miscellaneous scoring</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Player Scores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
          {players.map((player) => (
            <div key={player.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-200">
              {/* Player Header */}
              <div className={`${player.color} p-4 flex items-center justify-between`}>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updateName(player.id, e.target.value)}
                  className="bg-white bg-opacity-30 text-white font-bold text-xl px-3 py-1 rounded border-2 border-white border-opacity-50 focus:outline-none focus:border-opacity-100"
                />
                {players.length > 1 && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Score Categories */}
              <div className="p-4 space-y-3">
                {categories.map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{label}</div>
                      <div className="text-xs text-gray-500">{description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateScore(player.id, key, -1)}
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-bold text-lg text-gray-800">
                        {player.scores[key]}
                      </span>
                      <button
                        onClick={() => updateScore(player.id, key, 1)}
                        className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="border-t-2 border-gray-200 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-gray-800">Total Score</span>
                    <span className="font-bold text-3xl text-green-700">
                      {getTotalScore(player)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Winner Display */}
        {players.length > 1 && getTotalScore(winner) > 0 && (
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl shadow-xl p-6 text-center">
            <Trophy className="inline-block text-white mb-2" size={32} />
            <h2 className="text-2xl font-bold text-white mb-1">
              🎉 {winner.name} is Leading!
            </h2>
            <p className="text-white text-opacity-90 text-lg">
              with {getTotalScore(winner)} points
            </p>
          </div>
        )}
      </div>
    </div>
  );
}