export const getUserNames = (fullName: string = '', initialsOnly = false) => {
  const names = fullName.trim().split(' ');
  const firstName = names[0];
  const lastName = names.length > 1 ? names[names.length - 1] : '';
  if (initialsOnly) {
    return firstName.charAt(0).concat(lastName.charAt(0)).toUpperCase();
  }

  return `${firstName} ${lastName}`;
};
