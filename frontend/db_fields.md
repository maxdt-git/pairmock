Fields for the database

interface AvailableCardProps { # Card to book
    imageSrc: string,
    username: string,
    description: string,
    date: string,
    time: string,
    difficulty: string
}

interface BookedCardProps { # booked card by user
    imageSrc: string,
    username: string,
    description: string,
    date: string,
    time: string,
    difficulty: string
}

interface UserNavigationProps { # nickname and photo of the user
    imageSrc: string
    username: string
}