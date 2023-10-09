export const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const numberLength = phoneNumber.length;
  if (numberLength < 4) return phoneNumber;
  if (numberLength < 8) {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
    3,
    7
  )} ${phoneNumber.slice(7, 10)}`;
};
