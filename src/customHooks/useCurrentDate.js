const useCurrentDate = () => {
  const extract = (cDate) =>
    cDate
      .toISOString()
      .split(/[^0-9]/)
      .slice(0, -1);
  const dateArray = extract(new Date());
  const currentTime = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]} ${
    parseInt(dateArray[3]) + 6
  }h ${dateArray[4]}min `;
  return currentTime;
};

export default useCurrentDate;
