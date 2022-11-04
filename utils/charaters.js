const lowerCaseValue = (originObj, exclude = []) => {
    const newObj = Object.keys(originObj).reduce((acc, cur) => {
      typeof originObj[cur] === "string" && !exclude.includes(cur)
        ? (acc[cur] = originObj[cur].toLowerCase())
        : (acc[cur] = originObj[cur]);
      return acc;
    }, {});
    return newObj;
  };

  module.exports = lowerCaseValue;