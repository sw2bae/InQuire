import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";

function TakeSurvey() {
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState([]);
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        API.getSurveyById(id)
            .then(res => setQuestion(res))
            .catch(err => console.log(err));
    }, []);

    function submitBtn() {

        API.submitResults(answer)
            .then(() => {
                window.location.replace("/thankyou");
            })
    }

    function handleOnChange(e) {
        const userAnswer =
            [...document.querySelectorAll('input')]
                .filter(x => x.checked)
                .map(x => parseInt(x.value));
        // console.log(userAnswer);
        setAnswer(userAnswer);
    }

    function renderQuestions() {
        if (!question) {
            return (
                <>
                </>
            );
        } else {
            // console.log(question);
            return (
                <main>
                    <h2 className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg text-center">
                        Survey Title : {question.survey_name}
                    </h2>
                    {question.Questions.map((item, index) => {
                        if (item.question_type === "multipleChoice") {
                            return (
                                <article className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg" key={index}>
                                    {index + 1}) {item.question_title}<hr />
                                    <ul>
                                        {item.Answers.map((choice, index) => {
                                            return (
                                                <li onChange={handleOnChange} key={index}>
                                                    <label>
                                                        <input className="m-4" name={item.id} value={choice.id} type="radio" />
                                                        {choice.answer}
                                                    </label>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </article>
                            )
                        } else if (item.question_type === "selectApply") {
                            return (
                                <article className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg" key={index}>
                                    {index + 1}) {item.question_title}<hr />
                                    <ul>
                                        {item.Answers.map((choice, index) => {
                                            return (

                                                <li onChange={handleOnChange} key={index}>
                                                    <label>
                                                        <input className="m-4" name={item.id} value={choice.id} type="checkbox" />
                                                        {choice.answer}
                                                    </label>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </article>
                            )
                        } else {
                            return (
                                <article className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg" key={index}>
                                    {index + 1}) {item.question_title}<hr />
                                    <form>
                                        <input className="m-8" type="text" name="response" />
                                    </form>
                                </article>
                            )
                        }
                    })
                    }
                    <div className="flex">
                        <button className="mx-auto p-2 bg-yellow-500 rounded-full w-40" type="submit" onClick={submitBtn}>Submit Survey</button>
                    </div>
                </main>
            )
        }
    }
    return (
        renderQuestions()
    )
}

export default TakeSurvey;