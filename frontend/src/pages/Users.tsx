import { useRef } from 'react';
import Modal, { type ModalHandle } from '../components/Modal';
import Button from '../components/Button';
import { userFormConfig } from '../utils/formConfig';

export default function Users() {
  const modalRef = useRef<ModalHandle>(null);

  const handleOpenModal = () => {
    modalRef.current?.open();
  };

  return (
    <div>
      <h1>Users</h1>
      <Button text="Add User" onClick={handleOpenModal} />
      <Modal ref={modalRef} config={userFormConfig} />
    </div>
  );
}