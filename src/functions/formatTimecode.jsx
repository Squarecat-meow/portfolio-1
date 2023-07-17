const formatTimecode = (number) => {
  let minutes = Math.floor(number / 60);
  let seconds = Math.round(number % 60);

  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = seconds >= 10 ? seconds : "0" + seconds;

  const combined = minutes + ":" + seconds;

  return combined;
};

export default formatTimecode;
