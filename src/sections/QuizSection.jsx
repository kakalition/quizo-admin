import { Button } from '@nextui-org/react'
import { Divider } from "@nextui-org/react";
import { Textarea, Input } from "@nextui-org/input";
import { ArrowRightIcon, CubeIcon, EllipsisVerticalIcon, PlusIcon } from '../components/Icons';

function QuizSection() {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-row justify-between mb-4'>
        <h1 className='font-medium text-xl'>Daftar Soal</h1>
        <Button size="sm">
          Tambah
        </Button>
      </div>
      <div className='overflow-y-scroll pr-4'>
        <div>
          <h2 className='font-semibold text-2xl mb-3'>
            Pertanyaan 1
          </h2>
          <Textarea
            label="Soal"
            labelPlacement="outside"
            placeholder="Masukkan soal"
            value={"Langkah awal yang harus dilakukan dalam sebuah penyelidikan IPA adalah..."}
            className='mb-3'
          />
          <p className='text-sm mb-2'>Pilihan Jawaban</p>
          <Input type="text" value="mengamati" className='mb-2' />
          <Input type="text" value="mengkomunikasikan" className='mb-2' />
          <Input type="text" value="menanyakan" className='mb-2' />
          <Input type="text" placeholder='Masukkan pilihan jawaban' className='mb-2' />
        </div>

        <Divider className="my-4" />

        <div>
          <h2 className='font-semibold text-2xl mb-3'>
            Pertanyaan 2
          </h2>
          <Textarea
            label="Soal"
            labelPlacement="outside"
            placeholder="Masukkan soal"
            value={"Pengertian inferensi dalam penyelidikan IPA adalah..."}
            className='mb-3'
          />
          <p className='text-sm mb-2'>Pilihan Jawaban</p>
          <Input type="text" value="mengumpulkan data dan informasi melalui pengamatan" className='mb-2' />
          <Input type="text" value="merumuskan penjelasan berdasarkan pengamatan" className='mb-2' />
          <Input type="text" value="membuat laporan tertulis tentang kesimpulan akhir dari hasil pengamatan" className='mb-2' />
          <Input type="text" value="melakukan pengamatan menggunakan panca indera" className='mb-2' />
        </div>

        <Divider className="my-4" />

        <div>
          <h2 className='font-semibold text-2xl mb-3'>
            Pertanyaan 3
          </h2>
          <Textarea
            label="Soal"
            labelPlacement="outside"
            placeholder="Masukkan soal"
            className='mb-3'
          />
          <p className='text-sm mb-2'>Pilihan Jawaban</p>
          <Input type="text" placeholder='Masukkan pilihan jawaban' value="" className='mb-2' />
          <Input type="text" placeholder='Masukkan pilihan jawaban' value="" className='mb-2' />
          <Input type="text" placeholder='Masukkan pilihan jawaban' value="" className='mb-2' />
          <Input type="text" placeholder='Masukkan pilihan jawaban' value="" className='mb-2' />
        </div>

        <div className='h-8'></div>
      </div>
    </div>
  )
}
export default QuizSection;