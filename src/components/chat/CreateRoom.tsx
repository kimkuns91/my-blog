import axios from 'axios';
import Image from 'next/image';

interface CreateRoomProps {
  userId: string;
  setSelectRoom: (roomId: string) => void;
  setCreateRoomMode: (mode: boolean) => void;
  fetchRooms: () => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({
  userId,
  setSelectRoom,
  setCreateRoomMode,
  fetchRooms,
}) => {
  const createRooms = async (modeName: string) => {
    try {
      const response = await axios.post('/api/chat', {
        userId,
        mode: modeName,
      });
      setSelectRoom(response.data.id);
      setCreateRoomMode(false);
    } catch (err) {
      console.log(err);
    } finally {
      fetchRooms();
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-full cursor-pointer bg-stone-950/90" onClick={()=>{
      setCreateRoomMode(false)
    }}>
      <div className="flex size-full items-center justify-center gap-8">
        <div
          onClick={() => {
            createRooms('Black Mouse');
          }}
          className="max-w-sm cursor-pointer overflow-hidden rounded border border-slate-700 bg-[#030014] transition-all hover:shadow-2xl hover:shadow-[#9C5CF4]/50"
        >
          <div className="relative aspect-[1.8/1] w-full">
            <Image
              src={'/images/WhiteMouseAI.png'}
              fill
              sizes="360px"
              alt="WhiteMouseAI"
              className="object-contain"
              priority
            />
          </div>
          <div className="border-t border-slate-700 px-6 py-4">
            <h2 className="ellipsis mb-2 text-xl font-bold">Black Mouse</h2>
            <p>
              Black Mouse은 다소 입이 거칠지만, 알고보면 츤데레 같은 매력이
              있답니다.
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            createRooms('White Mouse');
          }}
          className="max-w-sm cursor-pointer overflow-hidden rounded border border-slate-700 bg-[#030014] transition-all hover:shadow-2xl hover:shadow-[#9C5CF4]/50"
        >
          <div className="relative aspect-[1.8/1] w-full">
            <Image
              src={'/images/ContactImg.webp'}
              fill
              sizes="360px"
              alt="WhiteMouseAI"
              className="object-cover"
              priority
            />
          </div>
          <div className="border-t border-slate-700 px-6 py-4">
            <h2 className="ellipsis mb-2 text-xl font-bold">White Mouse</h2>
            <p>
              WhiteMouse는 IT 전문가로서 IT 전문 지식에 대해 친절히 답해주는
              햄스터입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateRoom;
