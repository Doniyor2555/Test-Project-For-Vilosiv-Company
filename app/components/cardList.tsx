"use client";
import { useState, useEffect } from "react";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { Card, Skeleton } from "antd";
import DeleteModal from "./modals/deleteModal";
import axios from "axios";
import toast from "react-hot-toast";
import EditTodoModal from "./modals/editTodoModal";

interface CardListProps {
  todo: Todo;
}

const CardList: React.FC<CardListProps> = ({ todo }) => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const router = useRouter();
  const { Meta } = Card;

  const toggleDeleteModal = () => {
    setShowDeleteModal((modal) => !modal)
  }

  const toggleEditModal = () => {
    setShowEditModal((modal) => !modal)
  }

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <div className="pl-12 relative">
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <DeleteOutlined key="delete" onClick={toggleDeleteModal} />,

          <EditOutlined key="edit" onClick={toggleEditModal}/>,
        ]}
        className='shadow-lg'
      >
        <Skeleton loading={loading} avatar active>
          <Meta title={todo.title} description={todo.todo} />
        </Skeleton>
        <div className="absolute right-4 mt-1 pb-2">status: {todo.status}</div>
      </Card>
      <DeleteModal title={todo.title} onOpen={showDeleteModal} onClose={toggleDeleteModal} todoId={todo.id}/>
      <EditTodoModal onOpen={showEditModal} onClose={toggleEditModal} todos={todo}/>
    </div>
  );
};

export default CardList;
