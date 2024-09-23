import { useState } from "react";
import Modal from "./_components/Modals/Modal";
import Popup from "./_components/Modals/Popup";

interface Button {
  type: "cancel" | "delete";
  text: string;
}

interface ComponentData {
  type: "Modal" | "Popup";
  hasOverlay: boolean;
  title: string;
  description: string;
  buttons: Button[];
}

const data: ComponentData[] = [
  {
    type: "Modal",
    hasOverlay: true,
    title: "Подтверждение удаления",
    description: "Вы уверены что хотите удалить запись?",
    buttons: [
      { type: "cancel", text: "Отмена" },
      { type: "delete", text: "Удалить" },
    ],
  },
  {
    type: "Modal",
    hasOverlay: false,
    title: "Подтверждение удаления",
    description: "Вы уверены что хотите удалить запись?",
    buttons: [
      { type: "cancel", text: "Отмена" },
      { type: "delete", text: "Удалить" },
    ],
  },
  {
    type: "Popup",
    hasOverlay: true,
    title: "Подтверждение удаления",
    description: "Вы уверены что хотите удалить запись?",
    buttons: [
      { type: "cancel", text: "Отмена" },
      { type: "delete", text: "Удалить" },
    ],
  },
  {
    type: "Popup",
    hasOverlay: false,
    title: "Подтверждение удаления",
    description: "Вы уверены что хотите удалить запись?",
    buttons: [
      { type: "cancel", text: "Отмена" },
      { type: "delete", text: "Удалить" },
    ],
  },
];

const ModalsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeComponent = () => setActiveIndex(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {data.map((item, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Открыть {item.type} {index + 1}
        </button>
      ))}

      {data.map((item, index) => {
        if (index === activeIndex) {
          if (item.type === "Modal") {
            return (
              <Modal
                isOpen={true}
                onClose={closeComponent}
                hasOverlay={item.hasOverlay}
                key={index}
              >
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <div className="mt-4 space-x-2">
                  {item.buttons.map((button, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 rounded ${
                        button.type === "cancel"
                          ? "bg-gray-400 text-white"
                          : "bg-red-600 text-white"
                      }`}
                      onClick={closeComponent}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </Modal>
            );
          } else if (item.type === "Popup") {
            return (
              <Popup
                isOpen={true}
                onClose={closeComponent}
                hasOverlay={item.hasOverlay}
                position="bottom"
                key={index}
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-gray-600">{item.description}</p>
                <div className="mt-4 space-x-2">
                  {item.buttons.map((button, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 rounded ${
                        button.type === "cancel"
                          ? "bg-gray-400 text-white"
                          : "bg-red-600 text-white"
                      }`}
                      onClick={closeComponent}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </Popup>
            );
          }
        }
        return null;
      })}
    </div>
  );
};

export default ModalsPage;
