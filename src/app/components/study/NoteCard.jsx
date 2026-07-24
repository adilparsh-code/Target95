"use client";

import Card from "./Card";

export default function NoteCard({ children }) {
  return (
    <Card title="Note" icon="book">
      {children}
    </Card>
  );
}