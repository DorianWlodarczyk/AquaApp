
import { useEffect, useState } from 'react';
import Aquarium from './components/aquarium';
import EmptyAquariumsList from './components/empty-list';
import AddIcon from '@mui/icons-material/Add';
import { AquariumData } from './models/aquarium.interface';
import AquariumListApi from './aquarium-list-api.service';
const AquariumsList = () => {

  const [aquaData, setAquaData] = useState<AquariumData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AquariumListApi.getAquariumList();
        console.log(data);
        setAquaData(data);
      } catch {

      }
    }

    fetchData();
  }, [])

  if (false)
    return (<EmptyAquariumsList />)

  return (
    <>
      <div className='m-5 grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7 pb-5'>
        {aquaData.map((item, index) => {
          return (
            <Aquarium
              imgID={item.imgID}
              id={item.id}
              name={item.name}
              fishNumber={item.fishNumber}
              key={index}
            />
          )
        })}

        <div className='group h-[130px] rounded-3xl border-dashed border-neutral-400 hover:border-neutral-500 border-[4px] flex items-center justify-center flex-row cursor-pointer select-none'>
          <div className='text-neutral-400 group-hover:text-neutral-500 font-bold'>
            Dodaj nowe akwarium
          </div>
        </div>

      </div>
      <button className='w-[64px] h-[64px] bg-sky-600 hover:bg-sky-500 fixed right-[5%] bottom-[5%] rounded-full flex items-center justify-center shadow-lg duration-100'>
        <AddIcon className='text-white' style={{ fontSize: '36px' }} />
      </button>
    </>
  )
}

export default AquariumsList