type FeatureFlag = 'showDealsSpotlight';

class FeatureFlagsService {
  private flags: Record<FeatureFlag, boolean> = {
    showDealsSpotlight: true,
  };

  isEnabled(flag: FeatureFlag): boolean {
    return this.flags[flag] ?? false;
  }

  setFlag(flag: FeatureFlag, value: boolean): void {
    this.flags[flag] = value;
  }
}

export const featureFlags = new FeatureFlagsService();
