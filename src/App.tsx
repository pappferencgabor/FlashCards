import { useEffect, useState } from "react"
import { flashcardType } from "./type/type"
import { SampleFlashcards } from "./data/data"
import FlashcatdList from "./FlashcatdList"
import { fetchQuestions } from "./api/api"
import "./app.css"

function App() {
	const [flashcards, setFlashcards] = useState<flashcardType[]>(SampleFlashcards)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const getQuestions = async () => {
			const questions = await fetchQuestions()
			if (questions.length > 0) {
				setFlashcards(questions)
				setIsLoading(false)
			}
		}
		getQuestions()
	}, [])

	return (
		<>
		<div className="header">
			<div className="form-group">
				<label htmlFor="category">Category</label>
				<select name="" id="">
					{}
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="amount">Number of Questions</label>
				<input type="number" min={1} step={1} defaultValue={10} />
			</div>
			<div className="form-group">
				<button>Generate</button>
			</div>
		</div>
		<div className='container'>
			{ isLoading ? 'Loading' : (
				<FlashcatdList flashcards={flashcards}/>
			) }
		</div>
		</>
	)
}

export default App
