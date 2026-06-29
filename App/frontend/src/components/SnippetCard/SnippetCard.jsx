import { Star, MessageSquare, GitFork, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  MyCard,
  MyCardHeader,
  MyCardTitle,
  MyCardDescription,
  MyCardContent,
  MyCardFooter,
} from "../MyCard/MyCard";
import "./SnippetCard.css";
import GeminiBtn from "../GeminiBtn/GeminiBtn";

const countItems = (value) => {
  if (Array.isArray(value)) return value.length;

  return 0;
};

const SnippetCard = ({ snippet }) => {
  const [isCopied, setisCopied] = useState(false);
  const data = snippet || {};

  const username = data.user_id?.username ?? "Guest";
  const avatar_url = data.user_id?.avatar_url ?? "https://placehold.co/32";
  const title = data.title ?? "Untitled Snippet";
  const description = data.description ?? "";
  const language = data.language ?? "text";
  const languageDisplay = language.toUpperCase();
  const code =
    typeof data.code_content === "string"
      ? data.code_content.replace(/\r\n/g, "\n")
      : "";
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const starsCount = countItems(data.stars);
  const commentsCount = countItems(data.comments);
  const forksCount = countItems(data.forks);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setisCopied(true);
    setTimeout(() => setisCopied(false), 2000);
  };

  return (
    <MyCard className="mb-4">
      <MyCardHeader>
        <div className="d-flex align-items-center gap-2 mb-3">
          <img src={avatar_url} alt={username} className="author-avatar" />
          <div className="d-flex flex-column">
            <span className="author-name">{username}</span>
            <span className="author-handle">
              {data.createdAt
                ? new Date(data.createdAt).toLocaleDateString()
                : "Just now"}
            </span>
          </div>
        </div>
        <MyCardTitle>{title}</MyCardTitle>
        <MyCardDescription>{description}</MyCardDescription>
      </MyCardHeader>

      <MyCardContent>
        <div className="code-block-wrapper mb-3">
          <div className="code-block-header d-flex justify-content-between align-items-center px-3 py-2">
            <div className="d-flex gap-2">
              <span className="mac-dot mac-red"></span>
              <span className="mac-dot mac-yellow"></span>
              <span className="mac-dot mac-green"></span>
            </div>
            <span className="code-language text-uppercase">
              {languageDisplay}
            </span>
          </div>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              backgroundColor: "transparent",
              fontSize: "0.875rem",
              maxHeight: "280px",
              overflowY: "auto",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="snippet-tag">
              #{tag}
            </span>
          ))}
        </div>
      </MyCardContent>

      <MyCardFooter className="gap-3 flex-wrap justify-content-between">
        <div className="d-flex gap-2 flex-wrap">
          <button className="stat-btn active-star d-flex align-items-center gap-1">
            <Star size={16} className="stat-icon" />
            <span>{starsCount}</span>
          </button>
          <button className="stat-btn d-flex align-items-center gap-1">
            <MessageSquare size={16} className="stat-icon" />
            <span>{commentsCount}</span>
          </button>
          <button className="stat-btn d-flex align-items-center gap-1">
            <GitFork size={16} className="stat-icon" />
            <span>{forksCount}</span>
          </button>
        </div>

        <div className="d-flex gap-2 align-content-center flex-wrap">
          <button
            className="stat-btn d-flex align-items-center gap-1 copy-btn"
            onClick={handleCopy}
          >
            {isCopied ? (
              <Check size={16} className="text-success" />
            ) : (
              <Copy size={16} className="stat-icon" />
            )}
            <span>{isCopied ? "Copied" : "Copy"}</span>
          </button>
          <GeminiBtn />
        </div>
      </MyCardFooter>
    </MyCard>
  );
};
export default SnippetCard;
