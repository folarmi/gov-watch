import DOMPurify from "dompurify";

interface ArticleProps {
  articleContent: string;
}

const RenderArticle: React.FC<ArticleProps> = ({ articleContent }) => {
  const sanitizedContent = DOMPurify.sanitize(articleContent, {
    ALLOWED_TAGS: ["a", "p", "br", "strong", "em"], // Add all allowed tags
    ALLOWED_ATTR: ["href", "target", "rel", "class"], // Add necessary attributes for links
  });

  return (
    <div
      className="prose prose-lg max-w-none [&_a]:text-blue-800 [&_a]:font-medium [&_a]:underline [&_a:hover]:text-primary [&_a]:transition [&_a]:duration-200 [&_a]:cursor-pointer"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

export { RenderArticle };
