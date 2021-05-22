export default function ({ hint, details, code, message = "Something went wrong" }) {
  return { hint, details, code, message }
}