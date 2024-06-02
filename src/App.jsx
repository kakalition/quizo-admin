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
      <div className='flex flex-row h-screen overflow-y-hidden'>
        <div className='w-[20%] h-screen border-r-1 border-r-gray-300 p-4'>
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
          <MenuListSection menuList={menuList} fetchMenus={() => fetchMenus(currentApplicationUuid)} currentApplicationUuid={currentApplicationUuid} />
        </div>
        <div className='w-[55%] h-screen border-r-1 border-r-gray-300 p-4'>
          <QuizSection />
        </div>
      </div>
      <Toaster />
    </>
  )
}


export default App
