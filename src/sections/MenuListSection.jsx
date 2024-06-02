import { Button, menu } from '@nextui-org/react'
import { Card, CardBody, Divider } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, useDisclosure } from "@nextui-org/react";
import { Listbox, ListboxItem, Input } from "@nextui-org/react";
import { ArrowRightIcon, CubeIcon, EllipsisVerticalIcon, PlusIcon } from '../components/Icons';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Utils from '../Utils';

import { v4 as uuid } from 'uuid'

let baseUrl = 'http://localhost:3000'

function MenuListSection({ menuList, currentApplicationUuid, fetchMenus, onMenuClick }) {
  const [menuListFormData, setMenuListFormData] = useState({});

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
    setMenuListFormData(data);
    onOpenForm();
  }

  async function onSaveMenu(onClose) {
    if (menuListFormData.uuid) {
      await axios.put(`${baseUrl}/applications/${currentApplicationUuid}/menus/${menuListFormData.uuid}`, menuListFormData);
    } else {
      const payload = {
        ...menuListFormData,
      };
      await axios.post(`${baseUrl}/applications/${currentApplicationUuid}/menus`, payload);
    }

    toast.success('Berhasil menyimpan menu!')
    fetchMenus();
    onClose();
  }

  function onOpenDeleteModal(data) {
    setMenuListFormData(data);
    onOpenDelete();
  }

  async function onDeleteMenu(onClose) {
    await axios.delete(`${baseUrl}/applications/${currentApplicationUuid}/menus/${menuListFormData.uuid}`, menuListFormData);

    toast.success('Berhasil menghapus menu!')
    fetchMenus();
    onClose();
  }

  function onAddChild(data) {
    setMenuListFormData({
      parentUuid: data.uuid
    });

    onOpenForm();
  }


  function generateMenusElement(data) {
    const menus = [];

    function recurseData(parentUuid, level) {
      const currentLevelMenus = data.filter((e) => e.parentUuid == parentUuid);
      currentLevelMenus.sort((a, b) => a.index - b.index);

      currentLevelMenus.forEach(menu => {
        menus.push((<MenuTile key={menu.uuid} level={level} data={menu} onOpenEditModal={onOpenEditModal} onOpenDeleteModal={onOpenDeleteModal} onAddChild={onAddChild} onMenuClick={onMenuClick} totalChildren={data.filter((e) => e.parentUuid == menu.uuid).length} />));
        recurseData(menu.uuid, level + 1);
      });
    }

    recurseData(null, 0);

    return menus;
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between mb-4'>
          <h1 className='font-medium text-xl'>Daftar Menu</h1>
          <Button size="sm" onClick={() => {
            setMenuListFormData({});
            onOpenForm();
          }}>
            Tambah
          </Button>
        </div>

        {generateMenusElement(menuList)}
      </div>

      <Modal isOpen={isOpenForm} onOpenChange={onOpenChangeForm} size='lg'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Form Menu</ModalHeader>
              <ModalBody>
                <Input type="text" label="Nama Menu"
                  value={menuListFormData.name ?? ''}
                  onChange={(e) => setMenuListFormData(Utils.copyObjectWith(menuListFormData, { name: e.target.value }))}
                />
                <Input type="text" label="Urutan"
                  value={menuListFormData.index ?? ''}
                  onChange={(e) => setMenuListFormData(Utils.copyObjectWith(menuListFormData, { index: e.target.value }))}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={() => onSaveMenu(onClose)}>
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
              <ModalHeader className="flex flex-col gap-1">Konfirmasi Hapus menu</ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin ingin menghapus menu ini beserta seluruh isinya?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant='light' onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" variant="solid" onPress={() => onDeleteMenu(onClose)}>
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

function MenuTile({ level, data, onAddChild, onOpenEditModal, onOpenDeleteModal, onMenuClick, totalChildren }) {
  return (
    <div className={`flex flex-row items-center justify-between my-1 py-1 ${totalChildren == 0 ? 'hover:bg-gray-200 cursor-pointer' : ''} rounded-lg transition`}
      style={{ paddingLeft: `${level * 1 + (totalChildren == 0 ? 1.5 : 0)}rem` }}
      onClick={() => totalChildren == 0 ? onMenuClick(data.uuid) : ''}
    >
      <div className='flex flex-row items-center'>
        {totalChildren != 0
          ? (<div className='mr-2'><ArrowRightIcon /></div>)
          : (<div />)
        }

        <div className='mr-2'>
          <CubeIcon />
        </div>
        <p className='text-sm'>{data.name}</p>
      </div>
      <div className='flex flex-row items-center mr-2'>
        <div className='hover:bg-gray-100 p-1 rounded-full transition mr-2' onClick={() => onAddChild(data)}>
          <PlusIcon />
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
      </div>
    </div>
  );
}

export default MenuListSection;