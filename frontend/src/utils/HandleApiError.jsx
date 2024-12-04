export const HandleApiErrors = (errorResponse) => {
  if (errorResponse?.data?.errors) {
    const validationErrors = errorResponse.data.errors;
    return Object.entries(validationErrors)
      .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
      .join("\n");
  }

  if (errorResponse?.data?.message) {
    return String(errorResponse.data.message);
  }

  if (errorResponse?.data) {
    return JSON.stringify(errorResponse.data); 
  }

  return "An unexpected error occurred.";
};
