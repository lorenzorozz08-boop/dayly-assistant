import { useState } from 'react';
import { useAuth } from '@dayly/shared';
import { Crown, Zap } from 'lucide-react';

interface FeatureLimitProps {
  featureName: string;
  currentUsage: number;
  limit: number;
  isPremium: boolean;
  onUpgrade: () => void;
}

export default function FeatureLimitBanner({
  featureName,
  currentUsage,
  limit,
  isPremium,
  onUpgrade,
}: FeatureLimitProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || isPremium || currentUsage < limit - 5) {
    return null;
  }

  const remaining = limit - currentUsage;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-4 mb-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="text-amber-600" size={24} />
          <div>
            <p className="font-semibold text-gray-800">
              Limite di {featureName} raggiunto!
            </p>
            <p className="text-sm text-gray-600">
              Hai {remaining} rimanenti su {limit} (Upgrade per illimitato)
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onUpgrade}
            className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Crown size={18} />
            Upgrade
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-600 hover:text-gray-800 px-2"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
