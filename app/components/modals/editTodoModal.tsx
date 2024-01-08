"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Todo } from "@prisma/client";
import toast from "react-hot-toast";
import { Button, Input, Modal, Select, Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface EditTodoModalProps {
  onOpen: boolean;
  onClose: () => void;
  todos: Todo;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  onOpen,
  onClose,
  todos,
}) => {
  const [title, setTitle] = useState(todos.title);
  const [status, setStatus] = useState(todos.status);
  const [todo, setTodo] = useState(todos.todo);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { TextArea } = Input;

  const updateTodo = async () => {
    try {
      setLoading(true);
      await axios
        .post("/api/updateTodo", {
          id: todos.id,
          title,
          status,
          todo,
        })
        .then(() => {
          router.refresh();
          toast.success("Updated successfully.");
        })
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setLoading(false);
          onClose();
        });
    } catch (error) {
      console.log("editTodo[ERROR]", error);
    }
  };

  return (
    <Modal
      open={onOpen}
      onCancel={onClose}
      title="Edit"
      footer={
        <Button type="primary" className="bg-blue-500" onClick={updateTodo}>
          {loading ? <LoadingOutlined /> : " Update"}
        </Button>
      }
    >
      <div className="flex justify-between items-center flex-wrap">
        <div>
          <label htmlFor="title">Title</label>
          <Input
            placeholder="Title"
            name="title"
            id="title"
            className="mt-1"
            allowClear
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="status">Status</label>
          <Select
            defaultValue="In progress"
            style={{ width: 220 }}
            id="status"
            value={status}
            onChange={(e) => setStatus(e)}
            options={[
              { value: "Done", label: "Done" },
              { value: "In progress", label: "in progress" },
              {
                value: "Waiting for execution",
                label: "Waiting for execution",
              },
            ]}
          />
        </div>
        <div className="mt-2 w-full pb-5">
          <label htmlFor="todo">Todo</label>
          <TextArea
            showCount
            maxLength={300}
            style={{ height: 176, resize: "none" }}
            className="mt-[8px]"
            allowClear
            name="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            minLength={7}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditTodoModal;
