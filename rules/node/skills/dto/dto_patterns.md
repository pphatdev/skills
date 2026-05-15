# Skill: DTO Implementation Patterns

## Context
Use this skill to implement clean, typed, and validated Data Transfer Objects. This ensures that the application remains robust against invalid data and that the API contract is decoupled from the internal data model.

## Guidelines

### 1. Zod Integration
- **Direct Definition**: Define DTOs using Zod schemas to get both validation and TypeScript types:
  ```typescript
  import { z } from 'zod';
  
  export const CreateArticleSchema = z.object({
    title: z.string().min(3).max(255),
    content: z.string(),
    published: z.boolean().default(false),
  });
  
  export type CreateArticleDto = z.infer<typeof CreateArticleSchema>;
  ```
- **Inferred Types**: Always export the inferred type alongside the schema for use in controllers and services.

### 2. Controller Usage
- **Validation Middleware**: Use Hono's `zValidator` or an Express middleware to validate the request against the DTO schema before it reaches the controller.
- **Typed Request Body**: Ensure the controller function receives a correctly typed body based on the DTO.

### 3. Response Transformation
- **Mapper Functions**: Create simple functions to convert ORM entities to Response DTOs:
  ```typescript
  export function toArticleResponse(article: ArticleEntity): ArticleResponse {
    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      createdAt: article.createdAt.toISOString(),
    };
  }
  ```
- **Privacy**: Use mappers to filter out internal metadata (e.g., `deleted_at`, `internal_notes`) before sending data to the client.

### 4. Nesting & Composition
- **Shared Schemas**: Reuse common schemas (e.g., `PaginationParamsSchema`) across multiple DTOs.
- **Complexity**: Keep DTOs relatively flat. If deep nesting is required, document the structure clearly.

## Best Practices
- **Strict Mode**: Use `.strict()` in Zod schemas to reject unknown fields in request bodies.
- **Documentation**: Use JSDoc on DTO properties to explain their meaning and validation rules.
- **Immutability**: Treat DTOs as immutable once they reach the service layer.

## References
- Node Framework Development: [../node/SKILL.md](../node/SKILL.md)
- Data Safety: [../../agent/data_safety.md](../../agent/data_safety.md)
