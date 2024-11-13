type dataProps = {
    id: number,
    question: string,
    correct_answer: string
}

export const fetchQuestions = async () => {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
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