"use client";

import Card from "./Card";

export default function TipCard({ children }) {
  return (
    <Card title="Tip" icon="bulb">
      {children}
    </Card>
  );
}