"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Modal, Select, Form } from "antd";

// icons
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

interface ICreateTodoModalProps {
  onOpen: boolean;
  onClose: () => void;
}

const CreateTodoModal: React.FC<ICreateTodoModalProps> = ({
  onOpen,
  onClose,
}) => {
  const { TextArea } = Input;
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (title.length < 3 && status.length < 1 && todo.length < 7) {
      return;
    }
    try {
      setLoading(true);
      await axios
        .post("/api/createTodo", {
          title,
          status,
          todo,
        })
        .then(() => {
          router.refresh();
          toast.success("Created successfully!");
          onClose();
        })
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setTitle("");
          setStatus("");
          setTodo("");
          setLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong");
      console.log("createTodoModal[ERROR]", error);
    }
  };

  return (
    <Modal title="Create todo" open={onOpen} onCancel={onClose} footer="">
      <Form layout="vertical" onFinish={onSubmit}>
        <div className="flex justify-between items-center flex-wrap pt-2">
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
              defaultValue="Select a progress"
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
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 block ml-auto mt-3  w-[100px] h-[40px] text-lg font-normal text-center "
          disabled={loading}
        >
          {loading ? <LoadingOutlined /> : "Create"}
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateTodoModal;
