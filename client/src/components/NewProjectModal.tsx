import type { FormData } from "../types/new-project-modal.types";
import { validate } from "../functions/new-project-mode.func";
import ProjectsFunc from "../functions/projects.func";
import { useState, useEffect } from "react";
import { AlertCircle, Calendar1Icon, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import MuchLoadingModal from "./MuchLoadingModal";


interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ProjectsFunctions = new ProjectsFunc();

const projectTypes = [
  { value: "residential", label: "Aholi binosi" },
  { value: "commercial", label: "Tijorat binosi" },
  { value: "industrial", label: "Sanoat binosi" },
];



export default function AddProjectModal({
  isOpen,
  onClose,
}: AddProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [form, setForm] = useState<FormData>({
    name: "",
    type: "residential",
    area: "",
    location: "",
    description: "",
    deadline: undefined,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOpenCalendarModal, setIsOpenCalendModal] = useState<boolean>(false);

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

    try {
      console.log(form, "form");
      await ProjectsFunctions.createProject(form).then((res) => {
        if(res) {
          toast.success("Loyiha muvaffaqiyatli yaratildi!");
          onClose();
          window.location.reload();
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: "",
        type: "residential",
        area: "",
        location: "",
        description: "",
        deadline: new Date(),
      });
      setSelectedMembers([]);
      setErrors({});
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      animationDuration={300}
      closeIcon={<X className="h-4 w-4" />}
      center
      classNames={{
        modal: "rounded-lg w-full max-w-4xl h-auto max-h-[90vh]"
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Yangi loyiha yaratish</h2>

      <form onSubmit={handleSubmit} className="space-y-6 p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between">
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

          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              <p>Deadline *</p>

              <div className="flex items-center gap-2 border justify-between rounded-lg p-2 cursor-pointer">
                <span className="text-sm font-medium text-gray-500">
                  {form.deadline
                    ? form.deadline.toLocaleDateString("uz-UZ")
                    : "Deadline tanlang"}
                </span>

                <Calendar1Icon
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setIsOpenCalendModal(!isOpenCalendarModal)}
                />
              </div>

              {isOpenCalendarModal && (
                <div className="absolute z-10 bg-white p-5 w-max shadow-2xl rounded-lg">
                  <DayPicker
                    animate
                    mode="single"
                    selected={form.deadline}
                    onSelect={(date) => {
                      setForm((prev) => ({ ...prev, deadline: date }));
                      setIsOpenCalendModal(false);
                    }}
                    startMonth={form.deadline}
                  />
                </div>
              )}
            </label>

            {errors.deadline && (
              <p className="text-sm text-red-600">{errors.deadline}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tavsif</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg h-[300px]"
            placeholder="Loyiha haqida qisqacha yozing"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-10 cursor-pointer py-2 ${isLoading ? "bg-indigo-600 disabled:cursor-not-allowed" : "bg-indigo-600"} text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50`}
          >
            {isLoading ? <div>
             <div className="flex items-center gap-2">
             <p>Yaratilmoqda...</p>
             <Loader2 className="animate-spin"/>
             </div>

            </div> : "Yaratish"}
          </button>

          {isLoading && (
             <p className="text-sm text-gray-500">Bu jarayon biroz vaqt olishi mumkin!</p>
          )}
        </div>
      </form>
    </Modal>
  );
}
