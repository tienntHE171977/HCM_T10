// src/components/Quiz.jsx
import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import './Quiz.css';

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswerSelect = (index) => {
        if (showExplanation) return; // Prevent changing answer after selection

        setSelectedAnswer(index);
        setShowExplanation(true);

        if (index === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setShowResult(false);
    };

    const question = QUIZ_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

    if (showResult) {
        const percentage = (score / QUIZ_QUESTIONS.length) * 100;
        let feedback = '';
        let emoji = '';

        if (percentage >= 80) {
            feedback = 'Xuất sắc! Bạn hiểu rất rõ về Chủ tịch Hồ Chí Minh!';
            emoji = '🎉';
        } else if (percentage >= 60) {
            feedback = 'Tốt lắm! Bạn có kiến thức khá tốt!';
            emoji = '👏';
        } else if (percentage >= 40) {
            feedback = 'Cố gắng thêm nhé! Bạn cần tìm hiểu thêm.';
            emoji = '📚';
        } else {
            feedback = 'Hãy học thêm về Bác Hồ để hiểu rõ hơn nhé!';
            emoji = '💪';
        }

        return (
            <div className="quiz-wrapper">
                <div className="quiz-section">
                    <div className="quiz-container">
                        <div className="quiz-result">
                            <div className="result-emoji">{emoji}</div>
                            <h2 className="result-title">Kết Quả</h2>
                            <div className="result-score">
                                {score}/{QUIZ_QUESTIONS.length}
                            </div>
                            <div className="result-percentage">{percentage.toFixed(0)}%</div>
                            <p className="result-feedback">{feedback}</p>
                            <button className="quiz-restart-btn" onClick={handleRestart}>
                                🔄 Làm Lại Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-wrapper">
            <div className="quiz-section">
                <h2 className="quiz-title">Kiểm Tra Kiến Thức</h2>
                <p className="quiz-subtitle">Trả lời các câu hỏi về Chủ tịch Hồ Chí Minh</p>

                <div className="quiz-container">
                    {/* Progress Bar */}
                    <div className="quiz-progress-bar">
                        <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="quiz-progress-text">
                        Câu {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
                    </div>

                    {/* Question Card */}
                    <div className="quiz-card">
                        <h3 className="quiz-question">{question.question}</h3>

                        <div className="quiz-options">
                            {question.options.map((option, index) => {
                                let optionClass = 'quiz-option';

                                if (showExplanation) {
                                    if (index === question.correctAnswer) {
                                        optionClass += ' correct';
                                    } else if (index === selectedAnswer) {
                                        optionClass += ' incorrect';
                                    }
                                } else if (selectedAnswer === index) {
                                    optionClass += ' selected';
                                }

                                return (
                                    <button
                                        key={index}
                                        className={optionClass}
                                        onClick={() => handleAnswerSelect(index)}
                                        disabled={showExplanation}
                                    >
                                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                        <span className="option-text">{option}</span>
                                        {showExplanation && index === question.correctAnswer && (
                                            <span className="option-icon">✓</span>
                                        )}
                                        {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                                            <span className="option-icon">✗</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation */}
                        {showExplanation && (
                            <div className="quiz-explanation">
                                <div className="explanation-icon">💡</div>
                                <p>{question.explanation}</p>
                            </div>
                        )}

                        {/* Next Button */}
                        {showExplanation && (
                            <button className="quiz-next-btn" onClick={handleNext}>
                                {currentQuestion < QUIZ_QUESTIONS.length - 1 ? 'Câu Tiếp Theo →' : 'Xem Kết Quả 🎯'}
                            </button>
                        )}
                    </div>

                    {/* Score Indicator */}
                    <div className="quiz-score-indicator">
                        Điểm hiện tại: <strong>{score}</strong> / {currentQuestion + (showExplanation ? 1 : 0)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
