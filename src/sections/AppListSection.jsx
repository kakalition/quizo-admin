import { Button } from '@nextui-org/react'
import { Card, CardBody, Divider } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, useDisclosure } from "@nextui-org/react";
import { Listbox, ListboxItem, Input } from "@nextui-org/react";
import { ArrowRightIcon, CubeIcon, EllipsisVerticalIcon, PlusIcon } from '../components/Icons';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import Utils from '../Utils';

let baseUrl = 'http://localhost:3000'

function AppListSection({ applicationList, fetchApplications, onApplicationClick, currentApplicationUuid }) {
  const [applicationFormData, setApplicationFormData] = useState({});

  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onOpenChange: onOpenChangeForm
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete
  } = useDisclosure();

  function onOpenEditModal(data) {
    setApplicationFormData(data);
    onOpenForm();
  }

  async function onSaveApplication(onClose) {
    if (applicationFormData.uuid) {
      await axios.put(`${baseUrl}/applications/${applicationFormData.uuid}`, applicationFormData);
    } else {
      await axios.post(`${baseUrl}/applications`, applicationFormData);
    }

    toast.success('Berhasil menyimpan aplikasi!')
    fetchApplications();
    onClose();
  }

  function onOpenDeleteModal(data) {
    setApplicationFormData(data);
    onOpenDelete();
  }

  async function onDeleteApplication(onClose) {
    await axios.delete(`${baseUrl}/applications/${applicationFormData.uuid}`, applicationFormData);

    toast.success('Berhasil menghapus aplikasi!')
    fetchApplications();
    onClose();
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between mb-4'>
          <h1 className='font-medium text-xl'>Daftar Aplikasi</h1>
          <Button size="sm" onClick={() => {
            setApplicationFormData({});
            onOpenForm();
          }}>
            Tambah
          </Button>
        </div>

        {applicationList.map((e) => (<ApplicationTile key={e.uuid} data={e}
          onOpenEditModal={onOpenEditModal}
          onOpenDeleteModal={onOpenDeleteModal}
          onApplicationClick={onApplicationClick}
          isSelected={currentApplicationUuid == e.uuid}
        />))
        }
      </div>

      <Modal isOpen={isOpenForm} onOpenChange={onOpenChangeForm} size='lg'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Form Aplikasi</ModalHeader>
              <ModalBody>
                <Input type="text" label="Nama Aplikasi"
                  value={applicationFormData.name ?? ''}
                  onChange={(e) => setApplicationFormData(Utils.copyObjectWith(applicationFormData, { name: e.target.value }))}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={() => onSaveApplication(onClose)}>
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} size='lg'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Konfirmasi Hapus Aplikasi</ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin ingin menghapus aplikasi ini beserta seluruh isinya?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant='light' onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" variant="solid" onPress={() => onDeleteApplication(onClose)}>
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

function ApplicationTile({ data, onOpenEditModal, onOpenDeleteModal, onApplicationClick, isSelected = false }) {
  return (
    <Card shadow='sm' className='mb-2' isPressable onClick={() => onApplicationClick(data.uuid)}>
      <CardBody className={`flex flex-row justify-between items-center border-2 rounded-2xl ${isSelected ? 'border-gray-400' : 'border-transparent'}`}>
        <div className='flex flex-row  justify-between items-center'>
          <div className='w-8 h-8 rounded-md bg-gray-200 mr-4'></div>
          <p>{data.name}</p>
        </div>
        <Popover placement="right" offset={10} showArrow>
          <PopoverTrigger>
            <div>
              <EllipsisVerticalIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Listbox
              aria-label="Actions"
              className='w-32'
            >
              <ListboxItem key="edit" onClick={() => onOpenEditModal(data)}>Edit</ListboxItem>
              <ListboxItem key="delete" className="text-danger" color="danger" onClick={() => onOpenDeleteModal(data)}>
                Hapus
              </ListboxItem>
            </Listbox>
          </PopoverContent>
        </Popover>
      </CardBody>
    </Card>
  );
}

export default AppListSection;