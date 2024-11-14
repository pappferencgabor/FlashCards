import React, { FormEvent, useEffect, useState } from "react"
import { flashcardType, categoryType } from "./type/type"
import { SampleFlashcards } from "./data/data"
import FlashcatdList from "./FlashcatdList"
import { fetchQuestions, fetchCategories } from "./api/api"
import "./app.css"

function App() {
	const [flashcards, setFlashcards] = useState<flashcardType[]>(SampleFlashcards)
	const [isLoading, setIsLoading] = useState(true)

	const [categories, setCategories] = useState<categoryType[]>([])
	const [amount, setAmount] = useState(0)
	const [selectedCategory, setSelectedCategory] = useState(0)

	const handleAmountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		setAmount(parseInt(e.target.value));
	}

	const handleCatChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(parseInt(e.target.value));
	}

	const handleSubmit = async(e:FormEvent) => {
		e.preventDefault()
		const questions = await fetchQuestions(amount, selectedCategory)
		if (questions.length > 0) {
			setFlashcards(questions)
			setIsLoading(false)
		}
		setFlashcards(questions)
	}

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

	useEffect(() => {
		const getCategories = async () => {
			const categories = await fetchCategories()
			setCategories(categories)
		}
		getCategories()
	}, [])

	return (
		<>
		<form className="header" onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="category">Category</label>
				<select value={selectedCategory} onChange={handleCatChange}>
					{
						categories.map(category => (
							<option key={category.id} value={category.id}>{category.name}</option>
						))
					}
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="amount">Number of Questions</label>
				<input type="number" min={1} step={1} defaultValue={10} value={amount} onChange={handleAmountChange} />
			</div>
			<div className="form-group">
				<button className="btn" type="submit">Generate</button>
			</div>
		</form>
		<div className='container'>
			{ isLoading ? 'Loading' : (
				<FlashcatdList flashcards={flashcards}/>
			) }
		</div>
		</>
	)
}

export default App
