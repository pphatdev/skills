/**
 * Service for handling hello module business logic.
 */
export class HelloService {
  /**
   * Generates a greeting message.
   * @param name The name to greet
   * @returns A greeting string
   */
  getGreeting(name: string): string {
    return `Hello, ${name}! This is a modular Hono demo.`;
  }
}
