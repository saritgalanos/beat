import { utilService } from "./util.service"

export const demoDataService = {
    createDemoStations
}




const stationNames = [
    'My Running Songs',
    'Best for winter',
    'vol4',
    'Christmas songs',
    'For my Car',
    'Party songs'
]


const imgs = [
    utilService.getImgUrl("square1.jpg"),
    utilService.getImgUrl("square2.jpg"),
    utilService.getImgUrl("square3.jpg"),
    utilService.getImgUrl("square4.jpg"),
    utilService.getImgUrl("square5.jpg"),
    ''
]

const creators = [
    'Sarit Galanos',
    'Roni Galanos',
    'Tsachi',
    'Rob Roy Junior',
    'Bob Marley',
    'Sarit Galanos'
]

const songs = [
    "Bob Dylan - Like a Rolling Stone",
    "Queen - Don't Stop Me Now",
    "Pink Floyd - Money",
    "Bob Dylan - The Times They Are a-Changin",
    "Elvis Presley - Love Me Tender",
    "The Rolling Stones - Sympathy for the Devil",
    "Madonna - Frozen",
    "Elton John - Your Song",
    "The Beatles - Let It Be",
    "Queen - Bohemian Rhapsody",
    "Michael Jackson - Billie Jean",
    "Madonna - Material Girl",
    "Elton John - Tiny Dancer",
    "The Rolling Stones - Paint It Black",
    "The Beatles - Help!",
    "Pink Floyd - Time",
    "Pink Floyd - Comfortably Numb",
    "Bob Dylan - Mr. Tambourine Man",
    "Led Zeppelin - Stairway to Heaven",
    "The Beatles - Hey Jude",
    "Elton John - Candle in the Wind",
    "Elvis Presley - Hound Dog",
    "Queen - We Will Rock You",
    "Michael Jackson - Thriller",
    "Madonna - Like a Virgin",
    "The Beatles - Yesterday",
    "Led Zeppelin - Whole Lotta Love",
    "The Rolling Stones - Gimme Shelter",
    "Elvis Presley - Jailhouse Rock",
    "Pink Floyd - Wish You Were Here",
    "Elton John - Rocket Man",
    "Michael Jackson - Smooth Criminal",
    "Queen - We Are the Champions",
    "The Beatles - Come Together",
    "Madonna - Vogue",
    "Led Zeppelin - Black Dog",
    "The Rolling Stones - Angie",
    "Elvis Presley - Suspicious Minds",
    "Pink Floyd - Another Brick in the Wall",
    "Bob Dylan - Knocking on Heaven's Door",
    "Elton John - Crocodile Rock",
    "Michael Jackson - Beat It",
    "Queen - Another One Bites the Dust",
    "Madonna - Like a Prayer"
]

const artist_songs = {
    "The Beatles": ["Hey Jude", "Let It Be", "Yesterday", "Come Together", "Help!"],
    "Elvis Presley": ["Hound Dog", "Suspicious Minds", "Jailhouse Rock", "Love Me Tender", "Heartbreak Hotel"],
    "Michael Jackson": ["Thriller", "Billie Jean", "Beat It", "Smooth Criminal", "Man in the Mirror"],
    "Madonna": ["Like a Virgin", "Vogue", "Material Girl", "Like a Prayer", "Frozen"],
    "Elton John": ["Your Song", "Rocket Man", "Tiny Dancer", "Candle in the Wind", "Crocodile Rock"],
    "Led Zeppelin": ["Stairway to Heaven", "Whole Lotta Love", "Immigrant Song", "Black Dog", "Rock and Roll"],
    "Pink Floyd": ["Comfortably Numb", "Wish You Were Here", "Another Brick in the Wall", "Money", "Time"],
    "Bob Dylan": ["Like a Rolling Stone", "Blowin' in the Wind", "The Times They Are a-Changin'", "Mr. Tambourine Man", "Knockin' on Heaven's Door"],
    "The Rolling Stones": ["Satisfaction", "Paint It Black", "Gimme Shelter", "Angie", "Sympathy for the Devil"],
    "Queen": ["Bohemian Rhapsody", "We Will Rock You", "Another One Bites the Dust", "Don't Stop Me Now", "We Are the Champions"]
}

function createDemoStations() {

    const demoStations = stationNames.map((station, index) => {
        return {
            _id: utilService.makeId(),
            name: station,
            createdBy: {
                _id: utilService.makeId(),
                fullname: creators[index],
                imgUrl: imgs[index]
            },
            songs: [..._generateRandomSongsList()]
        }
    })
    console.log(demoStations)
    return demoStations

}


function _generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function _generateSongDetails() {
    return songs.map (song => {
        return {
            _id:utilService.makeId(),
            title:song,
            randomColor: _generateRandomColor(),
            addedAt: _generateRandomTimestamp()
        }
    })
}


function _generateRandomSongsList() {
    const songDetails =_generateSongDetails()

    
    // Randomly decide the size of the new array (between 1 and the length of the songs array)
    const arraySize = Math.floor(Math.random() * songs.length) + 1

    // Randomly select songs from the list
    const shuffledSongs = songDetails.sort(() => 0.5 - Math.random())
    const selectedSongs = shuffledSongs.slice(0, arraySize)
    return selectedSongs
    
}

//generate timestamp from the last year
function _generateRandomTimestamp() {
    const currentDate = new Date()
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate())

    // Generate a random timestamp between now and one year ago
    const randomTimestamp = Math.floor(oneYearAgo.getTime() + Math.random() * (currentDate.getTime() - oneYearAgo.getTime()));

    return randomTimestamp

}

