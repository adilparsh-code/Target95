"use client";

import Card from "./Card";

export default function WarningCard({ children }) {
  return (
    <Card title="Common Mistake" icon="warning">
      {children}
    </Card>
  );
}