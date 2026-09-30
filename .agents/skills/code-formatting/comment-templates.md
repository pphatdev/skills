# Comment Templates

The comment pattern ports to every language that supports block or doc
comments. The fields stay the same - author, description, params,
returns for declarations; purpose, context, inputs, outputs for
business logic - only the comment syntax and tooling change. Where the
language's doc tooling has no exact tag, the idiomatic equivalent
carries the same information (noted per language).

Square-bracket placeholders are filled per declaration; omit fields
that do not apply (a zero-arg constant has no param or return).

## TypeScript / JavaScript (JSDoc)

Reference form - all other languages adapt this block.

```typescript
/**
 * @author - [AUTHOR_NAME]
 * @description - [SHORT_DESCRIPTION]
 * @param {type} [PARAMETER_NAME] - [PARAMETER_DESCRIPTION]
 * @returns {type} - [RETURN_DESCRIPTION]
 */
function name(parameter: type): returnType {
  // ...implementation
}
```

The same block sits above `const` / arrow-function constants (with or
without `export`) and above each class and each class method.

## Java (Javadoc)

```java
/**
 * [SHORT_DESCRIPTION]
 *
 * @author - [AUTHOR_NAME]
 * @param parameter - [PARAMETER_DESCRIPTION]
 * @return - [RETURN_DESCRIPTION]
 */
public ReturnType name(Type parameter) {
    // ...implementation
}
```

Javadoc has no `@description` tag - the free text before the first tag
is the description.

## Kotlin (KDoc)

```kotlin
/**
 * [SHORT_DESCRIPTION]
 *
 * @author - [AUTHOR_NAME]
 * @param parameter - [PARAMETER_DESCRIPTION]
 * @return - [RETURN_DESCRIPTION]
 */
fun name(parameter: Type): ReturnType {
    // ...implementation
}
```

## PHP (PHPDoc)

```php
/**
 * @author - [AUTHOR_NAME]
 * @description - [SHORT_DESCRIPTION]
 * @param type $parameter - [PARAMETER_DESCRIPTION]
 * @return type - [RETURN_DESCRIPTION]
 */
function name(Type $parameter): ReturnType
{
    // ...implementation
}
```

## C / C++ (Doxygen)

```c
/**
 * @author - [AUTHOR_NAME]
 * @brief - [SHORT_DESCRIPTION]
 * @param parameter - [PARAMETER_DESCRIPTION]
 * @return - [RETURN_DESCRIPTION]
 */
returnType name(type parameter)
{
    /* ...implementation */
}
```

Doxygen uses `@brief` for the description and `@return` (singular).

## C# (XML doc comments)

```csharp
/// <summary>
/// [SHORT_DESCRIPTION]
/// </summary>
/// <author>[AUTHOR_NAME]</author>
/// <param name="parameter">[PARAMETER_DESCRIPTION]</param>
/// <returns>[RETURN_DESCRIPTION]</returns>
public ReturnType Name(Type parameter)
{
    // ...implementation
}
```

## Go (godoc)

```go
// Name does [SHORT_DESCRIPTION].
//
// Author: [AUTHOR_NAME]
//
// Parameters:
//   parameter - [PARAMETER_DESCRIPTION]
//
// Returns:
//   [RETURN_DESCRIPTION]
func Name(parameter Type) ReturnType {
	// ...implementation
}
```

godoc has no tags - the comment is free text directly above the
declaration and its first sentence starts with the identifier name.

## Python (docstrings)

```python
def name(parameter: type) -> ReturnType:
    """[SHORT_DESCRIPTION]

    Author: [AUTHOR_NAME]

    Args:
        parameter (type): [PARAMETER_DESCRIPTION]

    Returns:
        ReturnType: [RETURN_DESCRIPTION]
    """
    # ...implementation
```

Google-style docstring; no `@` tags exist in Python docstrings.

## Rust (rustdoc)

```rust
/// [SHORT_DESCRIPTION]
///
/// Author: [AUTHOR_NAME]
///
/// # Arguments
///
/// * `parameter` - [PARAMETER_DESCRIPTION]
///
/// # Returns
///
/// [RETURN_DESCRIPTION]
fn name(parameter: Type) -> ReturnType {
    // ...implementation
}
```

## Swift

```swift
/// [SHORT_DESCRIPTION]
///
/// Author: [AUTHOR_NAME]
///
/// - Parameters:
///   - parameter: [PARAMETER_DESCRIPTION]
/// - Returns: [RETURN_DESCRIPTION]
func name(parameter: Type) -> ReturnType {
    // ...implementation
}
```

## Dart

```dart
/// [SHORT_DESCRIPTION]
///
/// Author: [AUTHOR_NAME]
///
/// - `parameter`: [PARAMETER_DESCRIPTION]
/// - Returns: [RETURN_DESCRIPTION]
ReturnType name(Type parameter) {
  // ...implementation
}
```

## Ruby (YARD)

```ruby
# @author - [AUTHOR_NAME]
# @description - [SHORT_DESCRIPTION]
# @param parameter - [PARAMETER_DESCRIPTION]
# @return - [RETURN_DESCRIPTION]
def name(parameter)
  # ...implementation
end
```

## Shell / YAML / INI (hash comments)

```bash
# Author: [AUTHOR_NAME]
# Description: [SHORT_DESCRIPTION]
# Parameters: [PARAMETER_DESCRIPTION]
# Returns: [RETURN_DESCRIPTION]
name() {
  # ...implementation
}
```

Line-comment-only languages carry one field per `#` line; there is no
doc tool, so the block is for the human reader.

## SQL

```sql
-- Author: [AUTHOR_NAME]
-- Description: [SHORT_DESCRIPTION]
-- Parameters: [PARAMETER_DESCRIPTION]
-- Returns: [RETURN_DESCRIPTION]
CREATE FUNCTION name(parameter type) RETURNS returnType AS $$
BEGIN
  -- ...implementation
END;
$$ LANGUAGE plpgsql;
```

Dialects with block comments (`/* ... */`, MySQL, PostgreSQL, T-SQL)
may use them instead of `--` lines.

## CSS / SCSS (block comments)

```css
/**
 * Author: [AUTHOR_NAME]
 * Description: [SHORT_DESCRIPTION]
 */
.component {
  /* ...rules */
}
```

Params and returns do not apply; author and description still do.

## Any other language

If the language has a block comment (`/* */`, `--[[ ]]`, `#=`, etc.),
port the declaration fields into it in the order author, description,
params, returns. If it only has line comments (`//`, `--`, `#`, `%`),
write one field per line as in the shell form.

## Business logic block

The same four fields - purpose, context, inputs, outputs - in the
declaration language's comment syntax:

```typescript
/**
 * @purpose - [PURPOSE_DESCRIPTION]
 * @context - [CONTEXT_DESCRIPTION]
 * @inputs - [INPUTS_DESCRIPTION]
 * @outputs - [OUTPUTS_DESCRIPTION]
 */
```

```python
"""
Purpose: [PURPOSE_DESCRIPTION]
Context: [CONTEXT_DESCRIPTION]
Inputs: [INPUTS_DESCRIPTION]
Outputs: [OUTPUTS_DESCRIPTION]
"""
```

```go
// Purpose: [PURPOSE_DESCRIPTION]
// Context: [CONTEXT_DESCRIPTION]
// Inputs:  [INPUTS_DESCRIPTION]
// Outputs: [OUTPUTS_DESCRIPTION]
```

Place the block above the algorithm, rule, or non-obvious flow it
documents, in whichever syntax section above matches the language.
