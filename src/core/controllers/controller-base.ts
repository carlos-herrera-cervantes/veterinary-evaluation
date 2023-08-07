export interface IControllerBase {
  baseUrl: string;
  handlers: Map<string, Map<string, Function[]>>;
}
