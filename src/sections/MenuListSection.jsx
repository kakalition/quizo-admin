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

function MenuListSection({ menuList, currentApplicationUuid, fetchMenus }) {
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
        parentUuid: null,
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
    await axios.delete(`${baseUrl}/menus/${menuListFormData.uuid}`, menuListFormData);

    toast.success('Berhasil menghapus menu!')
    fetchMenus();
    onClose();
  }

  function generateMenusElement(data) {
    const menus = [];
    let level = 0;

    function recurseData(parentUuid) {
      const currentLevelMenus = data.filter((e) => e.parentUuid == parentUuid);
      currentLevelMenus.sort((a, b) => a.index - b.index);

      currentLevelMenus.forEach(menu => {
        menus.push((<MenuTile key={menu.uuid} title={menu.name} level={level} />));

        recurseData(menu.uuid);
      });
    }

    recurseData(null);

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

        {/* <div className='flex flex-row items-center'>
          <div>
            <Button variant='light' isIconOnly>
              <ArrowRightIcon />
            </Button>
          </div>
          <div className='mr-2'>
            <CubeIcon />
          </div>
          <p className='text-sm'>Kelas 7</p>
        </div>

        <div className='flex flex-row items-center pl-3'>
          <div>
            <Button variant='light' isIconOnly>
              <ArrowRightIcon />
            </Button>
          </div>
          <div className='mr-2'>
            <CubeIcon />
          </div>
          <p className='text-sm'>Ilmu Pengetahuan Alam</p>
        </div>

        <div className='flex flex-row items-center justify-between pl-16 my-1 py-1 bg-gray-100 rounded-md'>
          <div className='flex flex-row items-center'>
            <div className='mr-2'>
              <CubeIcon />
            </div>
            <p className='text-sm'>Objek IPA dan Pengamatannya</p>
          </div>
          <div className='hover:bg-gray-100 p-1 rounded-full transition mr-1'>
            <PlusIcon />
          </div>
        </div>

        <div className='flex flex-row items-center justify-between pl-16 my-1 py-1'>
          <div className='flex flex-row items-center'>
            <div className='mr-2'>
              <CubeIcon />
            </div>
            <p className='text-sm'>Klasifikasi Makhluk Hidup</p>
          </div>
          <div className='hover:bg-gray-100 p-1 rounded-full transition mr-1'>
            <PlusIcon />
          </div>
        </div>

        <div className='flex flex-row items-center justify-between pl-16 my-1 py-1'>
          <div className='flex flex-row items-center'>
            <div className='mr-2'>
              <CubeIcon />
            </div>
            <p className='text-sm'>Monera, Protista, dan Jamur</p>
          </div>
          <div className='hover:bg-gray-100 p-1 rounded-full transition mr-1'>
            <PlusIcon />
          </div>
        </div>

        <div className='flex flex-row items-center justify-between pl-16 my-1 py-1'>
          <div className='flex flex-row items-center'>
            <div className='mr-2'>
              <CubeIcon />
            </div>
            <p className='text-sm'>Avertebrata dan Vertebrata</p>
          </div>
          <div className='hover:bg-gray-100 p-1 rounded-full transition mr-1'>
            <PlusIcon />
          </div>
        </div>

        <div className='h-2'></div>

        <div className='flex flex-row items-center'>
          <div>
            <Button variant='light' isIconOnly>
              <ArrowRightIcon />
            </Button>
          </div>
          <div className='mr-2'>
            <CubeIcon />
          </div>
          <p className='text-sm'>Kelas 8</p>
        </div>

        <div className='h-2'></div>

        <div className='flex flex-row items-center'>
          <div>
            <Button variant='light' isIconOnly>
              <ArrowRightIcon />
            </Button>
          </div>
          <div className='mr-2'>
            <CubeIcon />
          </div>
          <p className='text-sm'>Kelas 9</p>
        </div> */}
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

function MenuTile({ level = 0, title }) {
  return (
    <div className={`flex flex-row items-center justify-between my-1 py-1 pl-${level * 3}`}>
      <div className='flex flex-row items-center'>
        <Button variant='light' isIconOnly>
          <ArrowRightIcon />
        </Button>
        <div className='mr-2'>
          <CubeIcon />
        </div>
        <p className='text-sm'>{title}</p>
      </div>
      <div className='hover:bg-gray-100 p-1 rounded-full transition mr-1'>
        <PlusIcon />
      </div>
    </div>
  );
}

export default MenuListSection;