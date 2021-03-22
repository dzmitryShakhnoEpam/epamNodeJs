process.stdin.on("readable", () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const str = chunk.toString();
    process.stdout.write(str.split("").reverse().join(""));
  }
});
