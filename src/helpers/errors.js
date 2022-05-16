export default function createErrorString(resData) {
  let message = resData?.message;
  const errors = resData?.errors;

  if (errors?.length && errors !== undefined) {
    message += errors[0]?.msg
  }

  return message;
}