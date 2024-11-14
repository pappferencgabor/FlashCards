type dataProps = {
    id: number,
    question: string,
    correct_answer: string
}

export const fetchQuestions = async (amount=10, category=0) => {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`)
        if (!response.ok) {
            throw new Error();
        }
        const data = await response.json();
        console.log(data);
        const formattedData = data.results.map((d:dataProps, index:number) => {
            return {
                id: index,
                question: decodeStr(d.question),
                answer: decodeStr(d.correct_answer)
            }
        })
        return formattedData
    } catch (error) {
        console.error(error);
        return []
    }
}

const decodeStr = (str: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str
    return textarea.value;
}

export const fetchCategories = async() => {
    const response = await fetch('https://opentdb.com/api_category.php')
    const data = await response.json();
    return data.trivia_categories;
}