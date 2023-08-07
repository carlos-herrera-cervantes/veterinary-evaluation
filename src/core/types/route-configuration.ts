export type RouteConfiguration = {
  controllerName: string;
  routeMapping: Map<string, Map<string, Function[]>>;
};
