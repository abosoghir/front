import { PostMessageClient } from "./post-message";
import { ErrorMappingResult, mapErrorStack } from "./source-map";
import { getPreCatchErrors } from "./pre-error-catch";
export class RuntimeErrorCollector {  client;  originalConsoleError;
  constructor() {
    const preCatchErrors = getPreCatchErrors();
    if (preCatchErrors.length > 0) {
      preCatchErrors.forEach((error) => {
        if (error.type === "console.error") {
          this.handleConsoleError(error.args);
        } else if (error.type === "runtime") {
          this.handleError(error.args);
        }
      });
    }
    this.client = new PostMessageClient(window.parent);
    this.originalConsoleError = console.error;
    this.initErrorHandlers();
  }  initErrorHandlers() {    window.addEventListener('error', this.handleError.bind(this));    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));    this.interceptConsoleError();  }  async handleError(event) {    const target = event.target;
    if (target && target instanceof HTMLElement && target.tagName) {      const resourceTags = ['IMG', 'SCRIPT', 'LINK', 'VIDEO', 'AUDIO', 'SOURCE', 'IFRAME'];
      if (resourceTags.includes(target.tagName)) {
        return;
      }
    }
    if (event.error && event.error.stack) {
      try {
        const mappingResult = await mapErrorStack(event.error);
        this.sendError(mappingResult);
      } catch (error) {
        console.warn('Failed to map error stack:', error);
      }
    }
  }  async handlePromiseRejection(event) {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    if (error.stack) {
      try {
        const mappingResult = await mapErrorStack(error);
        this.sendError(mappingResult);
      } catch (mapError) {
        console.warn('Failed to map promise rejection stack:', mapError);
      }
    }
  }  interceptConsoleError() {
    console.error = (...args[]) => {      this.originalConsoleError.apply(console, args);      const errorArg = args.find(arg => arg instanceof Error);
      if (errorArg && errorArg.stack) {
        this.handleConsoleError(errorArg);
      } else if (args.length > 0) {        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        const syntheticError = new Error(message);
        this.handleConsoleError(syntheticError);
      }
    };
  }  async handleConsoleError(error) {
    try {
      const mappingResult = await mapErrorStack(error);
      this.sendError(mappingResult);
    } catch (mapError) {
      console.warn('Failed to map console error stack:', mapError);
    }
  }
  // Provide manual reporting method for React Error Boundary use  reportError(error) {
    this.handleReactError(error);
  }  async handleReactError(error) {
    try {
      const mappingResult = await mapErrorStack(error);
      this.sendError(mappingResult);
    } catch (mapError) {
      console.warn('Failed to map React error stack:', mapError);
    }
  }  async sendError(errorInfo) {
    if (!errorInfo) {
      console.warn('error is too many');
      return;
    }
    if (errorInfo.sourceContext.length === 0) {
      return;
    }
    try {
      await this.client.post('runtime-error', errorInfo);
    } catch (error) {
      console.warn('Failed to send error to parent:', error);
    }
  }  destroy() {    console.error = this.originalConsoleError;
    this.client.destroy();
  }
}
export function initRuntimeErrorCollector() {
  const collector = new RuntimeErrorCollector();  (window).runtimeErrorCollector = collector;
  return collector;
}