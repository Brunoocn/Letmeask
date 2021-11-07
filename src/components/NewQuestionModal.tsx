import Modal from "react-modal";
import { database } from "../services/firebase";
import { useParams } from "react-router-dom";
import { useRoom } from "../hooks/useRoom";

import DeleteModalImg from "../assets/icon-excluir.svg";

import "../styles/new-question-modal.scss";

type NewQuestionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

type RoomParams = {
  id: string;
};

export function NewQuestionModal({
  isOpen,
  onRequestClose,
}: NewQuestionModalProps) {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <form className="container">
        <img src={DeleteModalImg} alt="Exclua uma pergunta" />
        <h2>Excluir Pergunta</h2>
        <p>Tem certeza que deseja excluir esta pergunta?</p>
        <div className="button-container">
          <button className="button-cancel" onClick={onRequestClose}>
            Cancelar
          </button>

          {questions.map((question) => {
            return (
              <button
                className="button-delete"
                onClick={() => handleDeleteQuestion(question.id)}
                key={question.id}
              >
                Sim, excluir
              </button>
            );
          })}
        </div>
      </form>
    </Modal>
  );
}
