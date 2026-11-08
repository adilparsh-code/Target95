// Single source of truth for the "where this content comes from" disclosure, so the About,
// Terms, Copyright and footer wording can never drift apart.
export const CONTENT_SOURCE_NOTICE =
  "The study content on Target95+ has been prepared by summarising and simplifying material from well-regarded ICSE and ISC textbooks and reference books, so that students can understand each topic clearly. It is not original work of Target95+. The underlying content, and all rights in it, belong to the respective authors and publishers, and Target95+ does not claim ownership of it. Target95+ only aims to explain this material in a simpler, more organised way so students can study better and move ahead with confidence.";

export const CONTENT_SOURCE_NOTICE_SHORT =
  "Study content is summarised from standard ICSE/ISC books. All rights in the underlying content belong to the respective authors and publishers.";

export default function ContentSourceNotice({ className = "" }) {
  return <p className={className}>{CONTENT_SOURCE_NOTICE}</p>;
}
