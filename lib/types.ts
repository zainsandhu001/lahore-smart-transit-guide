export interface RouteOption {
  id: number;
  routeName: string;
  totalFarePKR: number;
  estimatedTimeMin: number;
  boardingPoint: string;
  transferPoint: string | null;
  dropoffPoint: string;
  studentGuide: string;
}

export interface GeminiRouteResponse {
  routes: RouteOption[];
}
