"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";

interface DeleteModalProps {
  title: string;
  onOpen: boolean;
  onClose: () => void;
  todoId: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  onOpen,
  onClose,
  todoId,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteTodo = async () => {
    try {
      setLoading(true);
      await axios
        .post("/api/deleteTodo", {
          id: todoId,
        })
        .then(() => {
          router.refresh();
          toast.success(`Успешно удалено ${title}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("cardList[ERROR]", error);
    }
  };

  return (
    <Modal
      title="Are you sure to delete"
      open={onOpen}
      onCancel={onClose}
      footer={
        <button
          className="w-[100px] h-[40px] text-lg font-normal bg-[#FF0028] text-white hover:bg-red-700 rounded-md transition duration-200 ease-in"
          onClick={deleteTodo}
        >
          Delete
        </button>
      }
    >
      <div className="text-xl font-bold">“{title}”?</div>
    </Modal>
  );
};

export default DeleteModal;