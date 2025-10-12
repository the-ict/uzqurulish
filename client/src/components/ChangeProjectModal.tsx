import type { FormData } from "../types/new-project-modal.types";
import { validate } from "../functions/new-project-mode.func";
import ProjectsFunc from "../functions/projects.func";
import { useState, useEffect } from "react";
import { AlertCircle, Calendar1Icon, X } from "lucide-react";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import type { IProject } from "@/types/projects.types";

interface ChangeProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: IProject;
  onSuccess: () => void;
}

const ProjectsFunctions = new ProjectsFunc();

const projectTypes = [
  { value: "residential", label: "Aholi binosi" },
  { value: "commercial", label: "Tijorat binosi" },
  { value: "industrial", label: "Sanoat binosi" },
];

export default function ChangeProjectModal({
  isOpen,
  onClose,
  project,
  onSuccess,
}: ChangeProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    type: "residential",
    area: "",
    location: "",
    description: "",
    deadline: undefined,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOpenCalendarModal, setIsOpenCalendModal] = useState(false);


  useEffect(() => {
    if (isOpen) {
      setForm({
        name: project.name,
        type: project.type,
        area: project.area,
        location: project.location,
        description: project.description || "",
        deadline: project.deadline ? new Date(project.deadline) : undefined,
      });
      setErrors({});
    }
  }, [isOpen, project]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(form, setErrors)) return;

    setIsLoading(true);

    const payload = {
      name: form.name,
      type: form.type as 'residential' | 'commercial' | 'industrial',
      area: parseFloat(form.area),
      location: form.location,
      description: form.description,
      deadline: form.deadline,
    };

    try {
      await ProjectsFunctions.updateProject(project.id, payload).then(() => {
        toast.success("Loyiha muvaffaqiyatli yangilandi!");
        onSuccess();
        onClose();
      });
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} center classNames={{
      modal: "rounded-lg"
    }}
    animationDuration={300}
    closeIcon={<X className="h-4 w-4" />}
    >
      <h2 className="text-xl font-semibold mb-4">Loyihani tahrirlash</h2>

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg p-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between">
          {/* Loyiha nomi */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Loyiha nomi *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Loyiha nomini kiriting"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
              </p>
            )}
          </div>

          {/* Loyiha turi */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Loyiha turi *
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-sm text-red-600">{errors.type}</p>
            )}
          </div>

          {/* Maydon */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Maydon (m²) *
            </label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Masalan: 200"
            />
            {errors.area && (
              <p className="text-sm text-red-600">{errors.area}</p>
            )}
          </div>

          {/* Joylashuv */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Joylashuv *
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Masalan: Toshkent, Chilonzor"
            />
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Deadline */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Deadline *
            </label>
            <div
              className="flex items-center gap-2 border justify-between rounded-lg p-2 cursor-pointer"
              onClick={() => setIsOpenCalendModal(!isOpenCalendarModal)}
            >
              <span className="text-sm font-medium text-gray-500">
                {form.deadline
                  ? form.deadline.toLocaleDateString("uz-UZ")
                  : "Deadline tanlang"}
              </span>
              <Calendar1Icon className="text-gray-500 cursor-pointer" />
            </div>

            {isOpenCalendarModal && (
              <div className="absolute z-10 bg-white p-5 w-max shadow-2xl rounded-lg">
                <DayPicker
                  mode="single"
                  selected={form.deadline}
                  onSelect={(date) => {
                    setForm((prev) => ({ ...prev, deadline: date }));
                    setIsOpenCalendModal(false);
                  }}
                />
              </div>
            )}

            {errors.deadline && (
              <p className="text-sm text-red-600">{errors.deadline}</p>
            )}
          </div>
        </div>

        {/* Tavsif */}
        <div>
          <label className="block text-sm font-medium mb-1">Tavsif</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Loyiha haqida qisqacha yozing"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-10 cursor-pointer py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? "Yangilanmoqda..." : "Yangilash"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
