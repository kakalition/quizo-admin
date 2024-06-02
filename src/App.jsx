import { useEffect, useState } from 'react'
import AppListSection from './sections/AppListSection';
import MenuListSection from './sections/MenuListSection';
import QuizSection from './sections/QuizSection';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

let baseUrl = 'http://localhost:3000'

function App() {
  const [applicationList, setApplicationList] = useState([]);
  const [currentApplicationUuid, setCurrentApplicationUuid] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [currentMenuUuid, setCurrentMenuUuid] = useState(null);

  async function fetchApplications() {
    const data = await axios({
      method: 'GET',
      url: `${baseUrl}/applications`,
    });

    setApplicationList(data.data);
  }

  async function fetchMenus(appUuid) {
    const data = await axios({
      method: 'GET',
      url: `${baseUrl}/applications/${appUuid}/menus`,
    });

    setMenuList(data.data);
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <div className='flex flex-col h-screen overflow-y-hidden'>
        <div className='flex items-center h-[7%] px-3 border-b-1 border-b-gray-300'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>

          <h1 className='font-medium text-xl'>Manajemen Aplikasi Quiz</h1>
        </div>
        <div className='flex flex-row h-[93%]'>
          <div className='w-[20%] border-r-1 border-r-gray-300 p-4'>
            <AppListSection
              fetchApplications={fetchApplications}
              applicationList={applicationList}
              onApplicationClick={(uuid) => {
                setCurrentApplicationUuid(uuid);
                console.log('app uuid', uuid)
                fetchMenus(uuid);
              }}
              currentApplicationUuid={currentApplicationUuid}
            />
          </div>
          <div className='w-[25%] h-screen border-r-1 border-r-gray-300 p-4'>
            <MenuListSection menuList={menuList} fetchMenus={() => fetchMenus(currentApplicationUuid)} currentApplicationUuid={currentApplicationUuid} onMenuClick={(uuid) => setCurrentMenuUuid(uuid)} />
          </div>
          <div className='w-[55%] h-screen border-r-1 border-r-gray-300 p-4'>
            <QuizSection currentApplicationUuid={currentApplicationUuid} currentMenuUuid={currentMenuUuid} />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}


export default App
