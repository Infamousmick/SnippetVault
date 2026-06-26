import { Star, MessageSquare, GitFork } from "lucide-react";
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

const SnippetCard = ({ snippet }) => {
  const data = snippet || {
    author: {
      username: "Infamousmick",
      avatar_url: "https://avatars.githubusercontent.com/u/113915713?v=4",
    },
    timeAgo: "3h ago",
    title: "clear_cache — clear Android's cache",
    description:
      "Script to clear hidden cache from your Android device and print status",
    language: "shell",
    languageDisplay: "SH",
    code: `clear_cache() {
    num_iterations=44
    error_occurred=false
    printf "[i]Clearing cache\n"
    for i in $(seq 1 $num_iterations); do
        pm trim-caches 999999999999999999
        
        # Check if the command was successful
        if [ $? -ne 0 ]; then
            # An error occurred while executing the command
            printf "Error: Command pm trim-caches failed."
            error_occurred=true
            break
        fi
        
        if [ $i -eq 22 ]; then
            printf "[i]Please wait ...\n"
        fi
        
        # Progress counter
        progress=$((100 * i / num_iterations))
        # Print the progress counter
        echo -n -e "\r    ["
        for j in $(seq 1 $((progress / 2))); do
            echo -n "="
        done
        printf ">%02d%%]" $progress
    done
    
    if [ "$error_occurred" = false ]; then
        sleep 2
        clear
        printf "\n[+] Execution Succeed..! \n"
    fi
}
    clear_cache`,
    tags: ["react", "hooks", "typescript"],
    stats: { stars: 842, comments: 36, forks: 214 },
  };

  return (
    <MyCard className="mb-4">
      <MyCardHeader>
        <div className="d-flex align-items-center gap-2 mb-3">
          <img
            src={data.author.avatar_url}
            alt={data.author.username}
            className="author-avatar"
          />
          <div className="d-flex flex-column">
            <span className="author-name">{data.author.username}</span>
            <span className="author-handle">{data.timeAgo}</span>
          </div>
        </div>
        <MyCardTitle>{data.title}</MyCardTitle>
        <MyCardDescription>{data.description}</MyCardDescription>
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
              {data.languageDisplay}
            </span>
          </div>
          <SyntaxHighlighter
            language={data.language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              backgroundColor: "transparent",
              fontSize: "0.875rem",
            }}
          >
            {data.code}
          </SyntaxHighlighter>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {data.tags.map((tag, index) => (
            <span key={index} className="snippet-tag">
              #{tag}
            </span>
          ))}
        </div>
      </MyCardContent>

      <MyCardFooter className="gap-1">
        <button className="stat-btn active-star d-flex align-items-center gap-1">
          <Star size={16} className="stat-icon" />
          <span>{data.stats.stars}</span>
        </button>
        <button className="stat-btn d-flex align-items-center gap-1">
          <MessageSquare size={16} className="stat-icon" />
          <span>{data.stats.comments}</span>
        </button>
        <button className="stat-btn d-flex align-items-center gap-1">
          <GitFork size={16} className="stat-icon" />
          <span>{data.stats.forks}</span>
        </button>
      </MyCardFooter>
    </MyCard>
  );
};

export default SnippetCard;
