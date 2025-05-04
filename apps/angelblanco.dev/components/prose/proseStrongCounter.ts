let counter = 1;

export default function proseStrongCounter() {
  counter += 1;

  if (counter > 3) {
    counter = 1;
  }

  const newCounter = counter;

  return newCounter;
}
