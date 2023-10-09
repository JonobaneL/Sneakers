export const normilzeCardNumber = (value, callback) => {
  var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  for (var i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    callback(parts.join(" "));
    return parts.join(" ");
  } else {
    callback(value);
    return value;
  }
};
export const normilizeDate = (value, callback) => {
  const nValue =
    value
      .replace(/\s/g, "")
      .match(/(\d{1,2})/g)
      ?.join("/")
      .substring(0, 5) || "";
  callback(nValue);
  return nValue;
};
