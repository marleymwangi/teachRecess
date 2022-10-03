export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const isEmpty = (e) => {
  switch (e) {
    case "":
    case null:
    case false:
    case undefined:
    case Object.keys(e).length === 0:
    case Object.getPrototypeOf(e) === Object.prototype:
      return true;
    default:
      return false;
  }
};

export const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const formatSubjectNames = (sub) => {
  switch (sub) {
    case "math":
      return "Mathematics";
    case "science":
      return "Science";
    case "english":
      return "English";
    case "swahili":
      return "Kiswahili";
    case "religious":
      return "Religious Education";
    case "hygiene":
      return "Hygiene";
    case "evironment":
      return "Environment";
    case "career":
      return "Career";
    default:
      break;
  }
};
