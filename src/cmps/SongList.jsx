import { IoTimeOutline } from "react-icons/io5";
import { SongPreview } from "./SongPreview";
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { useEffect, useState } from "react";

export function SongList({ songs: initialSongs, station, includeTitles, isPlaylist, onAddSong, onDeleteSong, onReorderSongs }) {
  const [songs, setSongs] = useState(initialSongs);

  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs])


  const onDragEnd = (result) => {
    const { destination, source } = result

    // Do nothing if the item is dropped outside the list or dropped back into its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const newSongs = Array.from(songs)
    const [removed] = newSongs.splice(source.index, 1)
    newSongs.splice(destination.index, 0, removed)

    setSongs(newSongs)
    onReorderSongs(newSongs)
  }


  if (!songs || songs.length === 0) return <></>

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="song-list fs15">
        <div className="not-for-mobile">
          {includeTitles &&
            <div className="table-header">
              <div>#</div>
              <div>Title</div>
              <div className='album'>Album</div>
              <div className='date-added'>Date added</div>
              <div> </div>
              <IoTimeOutline className='duration' />
            </div>}
        </div>

        <Droppable droppableId="songs">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {songs.map((song, index) => (
                <Draggable key={song.id} draggableId={`song-${song.id}`} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} >
                      <SongPreview song={song} station={station} index={index} isPlaylist={isPlaylist}
                        onAddSong={onAddSong} onDeleteSong={onDeleteSong} dragHandleProps={provided.dragHandleProps} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

// export function SongList({ songs, station, includeTitles, isPlaylist, onAddSong, onDeleteSong }) {
//   if (!songs || songs.length == 0) return <></>


//   return (
//     <div className="song-list fs15">
//       <div className="not-for-mobile">
//         {includeTitles &&
//           <div className="table-header">
//             <div>#</div>
//             <div>Title</div>
//             <div className='album'>Album</div>
//             <div className='date-added'>Date added</div>
//             <div> </div>
//             <IoTimeOutline className='duration' />

//           </div>}
//       </div>

//       <ul>

//         {(songs).map((song, index) => (
//           <li key={song.id}>
//             <SongPreview song={song} station={station} index={index} isPlaylist={isPlaylist} onAddSong={onAddSong} onDeleteSong={onDeleteSong} />
//           </li>
//         ))}


//       </ul>
//     </div>
//   )
// }




// return (
//   <div className="song-list fs15">
//     <div className="not-for-mobile">
//       {includeTitles &&
//         <div className="table-header">
//           <div>#</div>
//           <div>Title</div>
//           <div className='album'>Album</div>
//           <div className='date-added'>Date added</div>
//           <div> </div>
//           <IoTimeOutline className='duration' />

//         </div>}
//     </div>

//     <ul>

//       {songs.map((song, index) => (
//         <Draggable key={song.id} draggableId={`song-${song.id}`} index={index}>
//           {(provided) => (
//             // The <li> now uses the provided draggable props and ref.
//             <li
//               ref={provided.innerRef}
//               {...provided.draggableProps}
//               {...provided.dragHandleProps}
//               key={song.id}
//             >
//               <SongPreview
//                 song={song}
//                 station={station}
//                 index={index}
//                 isPlaylist={isPlaylist}
//                 onAddSong={onAddSong}
//                 onDeleteSong={onDeleteSong}
//               />
//             </li>
//           )}
//         </Draggable>
//       ))}

//     </ul>
//   </div>
// )
// }
