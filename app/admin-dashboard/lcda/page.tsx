"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import CreateLCDA from "@/app/component/modals/CreateLCDA";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import React, { useState } from "react";

const LCDA = () => {
  const [createLCDAModal, setCreateLCDAModal] = useState(false);

  const toggleModal = () => {
    setCreateLCDAModal(!createLCDAModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add LCDA" onClick={toggleModal} />
      </div>
      {/* <Table columns={columns} data={data} /> */}

      <Modal show={createLCDAModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateLCDA toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default LCDA;
