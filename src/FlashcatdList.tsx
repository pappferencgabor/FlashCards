import Flashcard from "./Flashcard"
import { flashcardType } from "./type/type"

type flashcardsListProps = {
	flashcards: flashcardType[]
}

const FlashcatdList = ({flashcards}:flashcardsListProps) => {
	return (
		<div className="card-grid">
			{flashcards.map(flashcard=> (
				<Flashcard key={flashcard.id} flashcard={flashcard}/>
			))}
		</div>
	)
}

export default FlashcatdList