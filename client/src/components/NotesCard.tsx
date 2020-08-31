import React, { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import ModalCardSection from "./ModalCardSection";
import { BASE_URL } from "..";

interface Note {
  id: number;
  note: string;
}

const NotesCard = ({ id }: { id: number }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASE_URL}/api/notes/${id}`);
      const notes = data.data.map((e: any) => {
        return { ...e };
      });

      setNotes(notes);
    })();
  }, [id]);

  const onNoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const note = textRef.current?.value;

    if (!note) return null;

    const res = await axios.post(`${BASE_URL}/api/notes`, {
      note,
      packageId: id,
    });

    if (res.status === 201) {
      setNotes([...notes, res.data.data]);
    }
  };

  const deleteNote = async (noteId: number) => {
    if (noteId) {
      const res = await axios.delete(`${BASE_URL}/api/notes/${noteId}/${id}`);
      setNotes(notes.filter((e) => e.id !== res.data.data[0].id));
    }
  };

  return (
    <ModalCardSection heading="notes">
      <NoteContainer>
        {notes.map(({ id, note }, i) => (
          <Fragment key={`note-${i}`}>
            {i !== 0 && <Divider />}
            <Note onClick={() => deleteNote(id)}>{note}</Note>
          </Fragment>
        ))}
      </NoteContainer>

      <Form onSubmit={onNoteSubmit}>
        <TextArea ref={textRef} />
        <Input type="submit" value="Submit" />
      </Form>
    </ModalCardSection>
  );
};

const Divider = styled.div`
  height: 10px;
  position: relative;
  width: 100%;
  background: radial-gradient(
    ellipse farthest-side at top center,
    rgba(0, 0, 0, 0.1),
    transparent
  );
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid black;
  resize: none;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Note = styled.div`
  padding: 5px;
  margin: 5px 0;

  :hover {
    height: 100%;
    background: radial-gradient(rgba(232, 59, 63, 0.2), transparent);
  }
`;

const Input = styled.input`
  background: none;
  color: inherit;
  border: 1px solid black;
  background-color: #4f3d85;
  color: #fff;
  padding: 8px;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  :hover {
    background-color: #745fb5;
  }
`;

const Form = styled.form``;

export default NotesCard;
