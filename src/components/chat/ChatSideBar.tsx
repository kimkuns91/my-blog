import { cn } from '@/utils/style';
import { AiChatRoom } from '@prisma/client';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

interface ChatSideBarProps {
  rooms?: AiChatRoom[];
  selectRoom: string | null;
  setSelectRoom: (roomId: string | null) => void;
  setCreateRoomMode: (mode: boolean) => void;
  fetchRooms: () => void;
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({
  rooms,
  selectRoom,
  setSelectRoom,
  setCreateRoomMode,
  fetchRooms,
}) => {
  return (
    <div className="flex size-full flex-col gap-8 border-r border-slate-500 px-4 py-6">
      <button
        onClick={() => {
          setCreateRoomMode(true);
        }}
        className={cn(
          'rounded-md border border-slate-500 bg-slate-900 p-4',
          'transition-all ease-in-out hover:opacity-70'
        )}
      >
        Create New Chat Room
      </button>
      {rooms &&
        rooms.map((room) => (
          <div
            key={room.id}
            className={cn(
              'flex cursor-pointer gap-4 rounded-md p-4',
              'transition-all ease-in-out hover:bg-[#7D6FEE]/30',
              selectRoom === room.id ? 'bg-[#7D6FEE]' : ''
            )}
            onClick={() => {
              setSelectRoom(room.id);
            }}
          >
            <p className="w-full truncate">{room.name}</p>
            <FaTrash
              onClick={async () => {
                try {
                  await axios.delete(`/api/chat/room/${room.id}`);
                  if (selectRoom === room.id) {
                    setSelectRoom(null);
                  }
                } catch (err) {
                  console.log(err);
                } finally {
                  fetchRooms();
                }
              }}
              className="text-red-500"
            />
          </div>
        ))}
    </div>
  );
};
export default ChatSideBar;
