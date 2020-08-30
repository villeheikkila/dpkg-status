import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ModalCardSection from "./ModalCardSection";

const NotesCard = ({ id }: { id: number }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:2222/api/notes/${id}`);
      const notes = data.data.map((e: any) => e.note);
      setNotes(notes);
    })();
  }, [id]);

  if (id === null) return null;

  const onNoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const note = textRef.current?.value;

    if (!note) return null;

    const res = await axios.post("http://localhost:2222/api/notes", {
      note,
      packageId: id,
    });

    if (res.status === 201) {
      setNotes([...notes, res.data.data.note]);
    }
  };

  return (
    <ModalCardSection heading="notes">
      <NoteContainer>
        {notes.map((note) => (
          <Note>{note}</Note>
        ))}
      </NoteContainer>

      <form onSubmit={onNoteSubmit}>
        <TextArea ref={textRef} />
        <input type="submit" value="Submit" />
      </form>
    </ModalCardSection>
  );
};

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid black;
  resize: none;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Note = styled.div`
  padding: 5px;
  border: 1px solid black;
  margin: 5px 0;
`;

export default NotesCard;
