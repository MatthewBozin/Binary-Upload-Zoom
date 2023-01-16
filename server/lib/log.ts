// Logging system that includes timestamps w/ logs
export default function log(...args) {
  console.log(new Date(), ...args)
}