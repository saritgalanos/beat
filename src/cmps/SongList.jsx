import { IoTimeOutline } from "react-icons/io5";
import { SongPreview } from "./SongPreview";

export function SongList({ songs, station, includeTitles, isPlaylist, onAddSong, onDeleteSong}) {
  if (!songs || songs.length == 0) return <></>
  
 
  
  return (
    <div className = "song-list">
    <div className = "dynamic-display">
    {includeTitles &&
      <div className="table-header font-normal">
        <div>#</div>
        <div>Title</div>
        <div>Date added</div>
        <div></div>

      </div>}
      </div>
    
    <ul className="font-normal">
      {(songs).map((song, index) => (
        <li key={song._id}>
          <SongPreview song={song} station={station} index={index} isPlaylist={isPlaylist} onAddSong={onAddSong} onDeleteSong={onDeleteSong} />
        </li>
      ))}

    </ul>
    </div>
  )
}