import DOMPurify from "dompurify";

interface ArticleProps {
  articleContent: string;
}

const RenderArticle: React.FC<ArticleProps> = ({ articleContent }) => {
  const sanitizedContent = DOMPurify.sanitize(articleContent);

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

export { RenderArticle };
