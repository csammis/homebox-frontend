/** Validate that a "name" field cannot be blank */
export const NameNotBlank = [
  (value: string) => {
    if (value) return true;
    return "Please fill in your name";
  },
];

/** Validate that a "subject" field cannot be blank */
export const SubjectNotBlank = [
  (value: string) => {
    if (value) return true;
    return "Please enter a subject";
  },
];
