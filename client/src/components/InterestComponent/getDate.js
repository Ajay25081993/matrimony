export const getDate = (createdAt) => {
  if (!createdAt) return "";

  const expiryDate = new Date(createdAt);
  expiryDate.setFullYear(expiryDate.getFullYear());
 console.log(expiryDate);
 
  return expiryDate.toLocaleDateString("en-IN");
};
