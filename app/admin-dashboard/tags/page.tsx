"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import CreateLCDA from "@/app/component/modals/CreateLCDA";
import CreateTag from "@/app/component/modals/CreateTag";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import React, { useState } from "react";

const Tags = () => {
  const [createTagModal, setCreateTagModal] = useState(false);

  const toggleModal = () => {
    setCreateTagModal(!createTagModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add Tag" onClick={toggleModal} />
      </div>
      {/* <Table columns={columns} data={data} /> */}

      <Modal show={createTagModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateTag toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Tags;
