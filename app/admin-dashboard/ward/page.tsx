"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import CreateWard from "@/app/component/modals/CreateWard";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import React, { useState } from "react";

const Ward = () => {
  const [createWardModal, setCreateWardModal] = useState(false);

  const toggleModal = () => {
    setCreateWardModal(!createWardModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add Ward" onClick={toggleModal} />
      </div>
      {/* <Table columns={columns} data={data} /> */}

      <Modal show={createWardModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateWard toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Ward;
