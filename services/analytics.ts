type AnalyticsEvent = 'deal_impression' | 'deal_click';

interface DealImpressionPayload {
  dealId: string;
  title: string;
  price: number;
  refurbed_score: number;
}

interface DealClickPayload {
  dealId: string;
  title: string;
}

type EventPayload = DealImpressionPayload | DealClickPayload;

class AnalyticsService {
  track(event: AnalyticsEvent, payload: EventPayload): void {
    console.log(`[Analytics] ${event}`, payload);
  }

  trackDealImpression(deal: DealImpressionPayload): void {
    this.track('deal_impression', deal);
  }

  trackDealClick(deal: DealClickPayload): void {
    this.track('deal_click', deal);
  }
}

export const analytics = new AnalyticsService();
