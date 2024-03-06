import { IoTimeOutline } from "react-icons/io5";
import { SongPreview } from "./SongPreview";

export function SongList({ songs, station, includeTitles, isPlaylist, onAddSong, onDeleteSong }) {
  if (!songs || songs.length == 0) return <></>



  return (
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

      <ul>
        {(songs).map((song, index) => (
          <li key={song.id}>
            <SongPreview song={song} station={station} index={index} isPlaylist={isPlaylist} onAddSong={onAddSong} onDeleteSong={onDeleteSong} />
          </li>
        ))}

      </ul>
    </div>
  )
}