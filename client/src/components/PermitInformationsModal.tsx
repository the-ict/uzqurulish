import { X } from "lucide-react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

// Timeline bosqichlari
const steps = [
  {
    id: 1,
    title: "Ariza topshirish",
    description: "Asosiy ma'lumotlarni kiritish",
    status: "completed",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "Hujjatlar tayyorlash",
    description: "Kerakli hujjatlarni yig'ish",
    status: "completed",
    date: "2023-10-05",
  },
  {
    id: 3,
    title: "Qoidalar tekshiruvi",
    description: "Loyiha qoidalarga mosligi",
    status: "in-progress",
    date: "2023-10-10",
  },
  {
    id: 4,
    title: "To'lov amalga oshirish",
    description: "Davlat to'lovi",
    status: "pending",
    date: "2023-10-15",
  },
  {
    id: 5,
    title: "Ruxsatnoma olish",
    description: "Yakuniy tasdiqlash",
    status: "pending",
    date: "2023-10-20",
  },
];

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PermitInformationsModal({ isOpen, setIsOpen }: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      center
      classNames={{
        modal: "rounded-lg w-full max-w-md",
      }}
      animationDuration={300}
      closeIcon={<X className="h-4 w-4" />}
    >
      <div className="bg-white rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Jarayon bosqichlari</h3>

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : step.status === "in-progress"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.status === "completed" ? "✓" : step.id}
              </div>
              <div className="ml-4">
                <p
                  className={`font-medium ${
                    step.status === "completed"
                      ? "text-green-600"
                      : "text-gray-900"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-sm text-gray-500">{step.description}</p>
                {step.date && (
                  <p className="text-xs text-gray-400">{step.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
