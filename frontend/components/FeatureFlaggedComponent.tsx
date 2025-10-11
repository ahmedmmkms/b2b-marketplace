// components/FeatureFlaggedComponent.tsx
import { useFeatureFlag } from '../libs/providers/FeatureFlagProvider';

interface FeatureFlaggedComponentProps {
  flag: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function FeatureFlaggedComponent({ 
  flag, 
  children, 
  fallback = null 
}: FeatureFlaggedComponentProps) {
  // Type assertion since we're receiving the flag as a string prop
  const isEnabled = useFeatureFlag(flag as any);
  
  if (!isEnabled) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}