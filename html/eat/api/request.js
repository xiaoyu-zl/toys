const getLunchOptions = async () => {
  return await fetch(`${prefix}/eat/lunchOptions`).then((res) => res.json());
};

export { getLunchOptions };
