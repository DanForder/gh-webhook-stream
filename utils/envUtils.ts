export const getEnvironmentVariable = (variable: string): string => {
  if (process.env[variable] === undefined) {
    console.log(`Can't find env variable with name ${variable}.`);
  }
  return process.env[variable] ?? "";
};
