function displayTranslatedPersonType(type, t) {
  const separator = ", ";

  if (!type.includes(separator)) {
    return t(type);
  }

  const types = type.split(separator);

  return types
    .map((type) => t(type))
    .join(", ")
    .trim();
}

export default displayTranslatedPersonType;
