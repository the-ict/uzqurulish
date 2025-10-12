import type { FormData } from "../types/new-project-modal.types";

const validate = (
  form: FormData,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
  let newErrors: { [key: string]: string } = {};
  if (form.name.trim().length < 3)
    newErrors.name = "Loyiha nomi kamida 3 ta belgidan iborat bo‘lishi kerak";
  if (!form.type) newErrors.type = "Loyiha turini tanlang";
  if (!form.area.trim()) newErrors.area = "Maydonni kiriting";
  if (!form.location.trim()) newErrors.location = "Joylashuvni kiriting";
  if (!form.deadline) newErrors.deadline = "Deadline ni tanlang";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export { validate };
