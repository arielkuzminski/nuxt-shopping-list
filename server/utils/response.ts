/**
 * Create a successful API response
 */
export function successResponse<T>(data: T) {
  return {
    success: true as const,
    ...data,
  };
}

/**
 * Create and throw an error response
 */
export function errorResponse(message: string, statusCode = 500): never {
  throw createError({
    statusCode,
    message,
  });
}

/**
 * Create a validation error response
 */
export function validationError(message: string): never {
  return errorResponse(message, 400);
}

/**
 * Create a not found error response
 */
export function notFoundError(message = 'Resource not found'): never {
  return errorResponse(message, 404);
}
