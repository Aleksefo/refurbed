import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface FeatureFlagToggleProps {
  onToggle: () => void;
}

export default function FeatureFlagToggle({ onToggle }: FeatureFlagToggleProps) {
  return (
    <Pressable onPress={onToggle} style={{ marginRight: 15 }}>
      <FontAwesome name="gear" size={24} color="#007AFF" />
    </Pressable>
  );
}
