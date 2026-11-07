/**
 * Student class as a bare number string ("10"). Sign-up stores `studentClass`
 * ("Class 10"), while older/imported profiles may use `class`; admin filters
 * and the class breakdown must understand both.
 */
export function resolveStudentClass(data) {
  const raw = data?.class ?? data?.studentClass ?? "";
  const match = String(raw).match(/\d{1,2}/);
  return match ? match[0] : "";
}
