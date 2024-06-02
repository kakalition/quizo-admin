import { Button, RadioGroup } from '@nextui-org/react'
import { Divider, Checkbox, Radio } from "@nextui-org/react";
import { Textarea, Input } from "@nextui-org/input";
import { ArrowRightIcon, CubeIcon, EllipsisVerticalIcon, PlusIcon } from '../components/Icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast';

let baseUrl = 'http://localhost:3000'

function QuizSection({ currentApplicationUuid, currentMenuUuid }) {
  const [currentQuizUuid, setCurrentQuizUuid] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState([]);

  async function fetchQuiz() {
    const data = await axios({
      method: 'GET',
      url: `${baseUrl}/applications/${currentApplicationUuid}/menus/${currentMenuUuid}/quiz`,
    });

    setCurrentQuizUuid(data.data.uuid);
    setCurrentQuiz(data.data.quiz);
  }

  async function saveQuiz() {
    const payload = {
      menuUuid: currentMenuUuid,
      quiz: currentQuiz,
    };

    if (currentQuizUuid) {
      await axios.put(
        `${baseUrl}/applications/${currentApplicationUuid}/menus/${currentMenuUuid}/quiz/${currentQuizUuid}`,
        payload
      );
    } else {
      await axios.post(
        `${baseUrl}/applications/${currentApplicationUuid}/menus/${currentMenuUuid}/quiz`,
        payload
      );
    }

    toast.success('Berhasil menyimpan quiz!')

    fetchQuiz();
  }

  useEffect(() => {
    fetchQuiz();
  }, [currentMenuUuid]);

  function addQuiz() {
    const temp = [...currentQuiz];
    temp.push({
      index: currentQuiz.length,
      uuid: uuid(),
      question: '',
      answers: [
        '',
        '',
        '',
        '',
      ],
      correctAnswer: '',
    });

    setCurrentQuiz(temp);
  }

  function generateQuizElement(data) {
    const elements = [];

    data.forEach((e, index) => {
      elements.push((
        <div key={e.uuid}>
          <h2 className='font-semibold text-2xl mb-3'>
            Pertanyaan {e.index + 1}
          </h2>
          <Textarea
            label="Soal"
            labelPlacement="outside"
            placeholder="Masukkan soal"
            value={e.question}
            onChange={(event) => {
              const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

              clonedRow.question = event.target.value;

              const tempCurrentQuiz = [...currentQuiz];
              tempCurrentQuiz[index] = clonedRow;

              setCurrentQuiz(tempCurrentQuiz);
            }}
            className='mb-3'
          />

          <p className='text-sm mb-2'>Pilihan Jawaban</p>

          <div className='flex flex-row items-center mb-2'>
            <input type='radio'
              className='mr-3'
              name={`correct-answer-${e.uuid}`}
              checked={currentQuiz[index].correctAnswer == 0}
              onChange={() => {
                const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

                clonedRow.correctAnswer = 0;

                const tempCurrentQuiz = [...currentQuiz];
                tempCurrentQuiz[index] = clonedRow;

                setCurrentQuiz(tempCurrentQuiz);
              }}
            />
            <Input type="text"
              placeholder='Masukkan pilihan jawaban'
              value={e.answers[0]}
              onChange={(event) => {
                const quizArrayIndex = currentQuiz.indexOf(e);
                const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

                clonedRow.answers[0] = event.target.value;

                const tempCurrentQuiz = [...currentQuiz];
                tempCurrentQuiz[quizArrayIndex] = clonedRow;

                setCurrentQuiz(tempCurrentQuiz);
              }} />
          </div>

          <div className='flex flex-row items-center mb-2'>
            <input type='radio'
              className='mr-3'
              name={`correct-answer-${e.uuid}`}
              checked={currentQuiz[index].correctAnswer == 1}
              onChange={() => {
                const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

                clonedRow.correctAnswer = 1;

                const tempCurrentQuiz = [...currentQuiz];
                tempCurrentQuiz[index] = clonedRow;

                setCurrentQuiz(tempCurrentQuiz);
              }}
            />
            <Input type="text"
              placeholder='Masukkan pilihan jawaban'
              value={e.answers[1]}
              onChange={(event) => {
                const quizArrayIndex = currentQuiz.indexOf(e);
                const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

                clonedRow.answers[1] = event.target.value;

                const tempCurrentQuiz = [...currentQuiz];
                tempCurrentQuiz[quizArrayIndex] = clonedRow;

                setCurrentQuiz(tempCurrentQuiz);
              }} />
          </div>

          <div className='flex flex-row items-center mb-2'>
            <input type='radio'
              className='mr-3'
              name={`correct-answer-${e.uuid}`}
              checked={currentQuiz[index].correctAnswer == 2}
              onChange={() => {
                const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

                clonedRow.correctAnswer = 2;

                const tempCurrentQuiz = [...currentQuiz];
                tempCurrentQuiz[index] = clonedRow;

                setCurrentQuiz(tempCurrentQuiz);
              }}
            />
            <Input type="text"
              placeholder='Masukkan pilihan jawaban'
              value={e.answers[2]}
              onChange={(event) => {
                const quizArrayIndex = currentQuiz.indexOf(e);
                const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

                clonedRow.answers[2] = event.target.value;

                const tempCurrentQuiz = [...currentQuiz];
                tempCurrentQuiz[quizArrayIndex] = clonedRow;

                setCurrentQuiz(tempCurrentQuiz);
              }} />
          </div>

          <div className='flex flex-row items-center mb-2'>
            <input type='radio'
              className='mr-3'
              name={`correct-answer-${e.uuid}`}
              checked={currentQuiz[index].correctAnswer == 3}
              onChange={() => {
                const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

                clonedRow.correctAnswer = 3;

                const tempCurrentQuiz = [...currentQuiz];
                tempCurrentQuiz[index] = clonedRow;

                setCurrentQuiz(tempCurrentQuiz);
              }}
            />
            <Input type="text"
              placeholder='Masukkan pilihan jawaban'
              value={e.answers[3]}
              onChange={(event) => {
                const quizArrayIndex = currentQuiz.indexOf(e);
                const clonedRow = structuredClone(currentQuiz.filter((row) => row.uuid == e.uuid)[0]);

                clonedRow.answers[3] = event.target.value;

                const tempCurrentQuiz = [...currentQuiz];
                tempCurrentQuiz[quizArrayIndex] = clonedRow;

                setCurrentQuiz(tempCurrentQuiz);
              }} />
          </div>

          <Divider className="my-8" />
        </div>
      ))
    });

    return elements;
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-row justify-between mb-4'>
        <h1 className='font-medium text-xl'>Daftar Soal</h1>
        <div className='flex flex-row'>
          <Button size="sm" className='mr-2' onClick={addQuiz}>
            Tambah
          </Button>
          <Button size="sm" color='primary' onClick={saveQuiz}>
            Simpan
          </Button>
        </div>
      </div>
      <div className='overflow-y-scroll pr-4'>
        {generateQuizElement(currentQuiz ?? [])}
      </div>
    </div>
  )
}
export default QuizSection;