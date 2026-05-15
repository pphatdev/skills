# Skill: Postman Collection Standards

## Context
Use this skill when developing or updating features to ensure API documentation and testing collections are kept in sync with the implementation.

## Guidelines

### 1. Mandatory Updates
- **New Features**: You **must** create a corresponding Postman collection folder and requests when a new feature is implemented.
- **Updates**: Any change to API endpoints (parameters, paths, responses) must be reflected in the existing Postman collection immediately.

### 2. Collection Structure
The Postman collection should mirror the project's modular structure:
- **Folders**: Each module (e.g., `articles`, `auth`, `projects`) should have its own folder in the collection.
- **Request Naming**: Use descriptive names (e.g., "Get Article by ID", "Create New Project").
- **Ordering**: Arrange requests logically (e.g., Auth first, then CRUD operations).

### 3. Variables & Environments
- **Base URL**: Use `{{baseUrl}}` for all request URLs. Do not hardcode hostnames.
- **Authentication**: Use variables for tokens (e.g., `{{token}}`) and configure Auth at the folder or collection level.
- **Environment Files**: Ensure environment templates (e.g., `Local.postman_environment.json`) are updated if new variables are introduced.

### 4. Storage Location
- **Path**: All exported Postman collections and environment files must be stored in:
  `doc/collections/`

### 5. Automation Scripts
- **Token Capture**: Login and Refresh requests **must** include a test script to automatically update the `token` and `refreshToken` variables.
- **Scope Consistency**: Scripts should set variables in `pm.environment`, `pm.variables`, and `pm.collectionVariables` simultaneously to ensure availability across different Postman configurations.

### 6. CRUD Script Rules
Each type of request must include specific validation and variable management scripts:

- **Create (POST)**: 
  - Validate status code is `201 Created`.
  - Extract the new resource's ID or Slug from the response and update the corresponding collection variable (e.g., `articleId` or `slug`).
- **Read (GET)**:
  - Validate status code is `200 OK`.
  - (Optional) Verify that the returned object contains the expected identifier.
- **Update (PATCH/PUT)**:
  - Validate status code is `200 OK`.
- **Delete (DELETE)**:
  - Validate status code is `204 No Content` or `200 OK`.
  - (Optional) Clear the associated ID variable if it's no longer needed.

### 5. Documentation Standards
- **Request Descriptions**: Every request must have a clear description explaining its behavior, required permissions, and side effects.
- **Parameter Hints**: Query and path parameters must have descriptions explaining their type (e.g., "UUID of the article") and default values.
- **Response Examples**: Every request **must** include at least one saved "Example" response (e.g., 200 OK or 201 Created) to serve as a schema reference.

## Best Practices
- **Folder Nesting**: Use a Category > Feature > Action hierarchy (e.g., `Articles > Stats > Get Stats`).
- **Scripts**: Use the following standardized script snippet for token extraction:
  ```javascript
  if(pm.response.code === 200){
      const resp = pm.response.json();
      pm.collectionVariables.set("token", resp.accessToken);
      pm.collectionVariables.set("refreshToken", resp.refreshToken);
  }
  ```
- **Descriptions**: Always mention if a route is public or requires authentication.

## Troubleshooting
- **Outdated Collections**: If a request fails, verify that the Postman collection matches the latest route definitions in the code.
- **Variable Not Found**: Ensure you have selected the correct environment in Postman.
